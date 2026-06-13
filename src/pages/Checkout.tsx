import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { toast } from 'sonner';
import { useGlobalState } from '../context/GlobalStateContext';
import { formatPrice } from '../services/data';
import { GoldButton } from '../components/common/GoldButton';

interface ContactErrors { email?: string; phone?: string; }
interface ShippingErrors { fullName?: string; address?: string; city?: string; postal?: string; country?: string; }
interface PaymentErrors { cardNumber?: string; nameOnCard?: string; expiry?: string; cvv?: string; }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;
const cardRegex = /^[\d\s]{13,19}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvvRegex = /^\d{3,4}$/;
const postalRegex = /^[\w\s\-]{3,10}$/;

const Checkout: React.FC = () => {
  const { cart, clearCart, user, currency, currencyRates } = useGlobalState();
  const [, setLocation] = useLocation();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isPending, setIsPending] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [paymentTab, setPaymentTab] = useState<'CREDIT CARD' | 'BANK TRANSFER' | 'APPLE PAY'>('CREDIT CARD');

  // Contact
  const [contact, setContact] = useState({ email: user.email || '', phone: '' });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [contactTouched, setContactTouched] = useState<Record<string, boolean>>({});

  // Shipping
  const [shipping, setShipping] = useState({ fullName: user.name || '', address: '', city: '', postal: '', country: '', giftNote: '' });
  const [shippingErrors, setShippingErrors] = useState<ShippingErrors>({});
  const [shippingTouched, setShippingTouched] = useState<Record<string, boolean>>({});

  // Payment
  const [payment, setPayment] = useState({ cardNumber: '', nameOnCard: '', expiry: '', cvv: '' });
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});
  const [paymentTouched, setPaymentTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (cart.length === 0) setLocation('/cart');
  }, [cart, setLocation]);

  if (cart.length === 0) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.077;
  const total = subtotal + vat;

  const validateContact = (): ContactErrors => {
    const e: ContactErrors = {};
    if (!contact.email.trim()) e.email = 'Email address is required.';
    else if (!emailRegex.test(contact.email)) e.email = 'Please enter a valid email address.';
    if (!contact.phone.trim()) e.phone = 'Phone number is required for director confirmation.';
    else if (!phoneRegex.test(contact.phone)) e.phone = 'Please enter a valid phone number.';
    return e;
  };

  const validateShipping = (): ShippingErrors => {
    const e: ShippingErrors = {};
    if (!shipping.fullName.trim()) e.fullName = 'Full name is required.';
    if (!shipping.address.trim()) e.address = 'Street address is required.';
    if (!shipping.city.trim()) e.city = 'City is required.';
    if (!shipping.postal.trim()) e.postal = 'Postal code is required.';
    else if (!postalRegex.test(shipping.postal)) e.postal = 'Please enter a valid postal code.';
    if (!shipping.country) e.country = 'Please select a country.';
    return e;
  };

  const validatePayment = (): PaymentErrors => {
    const e: PaymentErrors = {};
    if (paymentTab === 'CREDIT CARD') {
      if (!payment.cardNumber.trim()) e.cardNumber = 'Card number is required.';
      else if (!cardRegex.test(payment.cardNumber)) e.cardNumber = 'Please enter a valid card number.';
      if (!payment.nameOnCard.trim()) e.nameOnCard = 'Name on card is required.';
      if (!payment.expiry.trim()) e.expiry = 'Expiry date is required.';
      else if (!expiryRegex.test(payment.expiry)) e.expiry = 'Use MM/YY format (e.g. 09/27).';
      if (!payment.cvv.trim()) e.cvv = 'CVV is required.';
      else if (!cvvRegex.test(payment.cvv)) e.cvv = 'CVV must be 3 or 4 digits.';
    }
    return e;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateContact();
    setContactErrors(errs);
    setContactTouched({ email: true, phone: true });
    if (Object.keys(errs).length === 0) setStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateShipping();
    setShippingErrors(errs);
    setShippingTouched({ fullName: true, address: true, city: true, postal: true, country: true });
    if (Object.keys(errs).length === 0) setStep(3);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validatePayment();
    setPaymentErrors(errs);
    setPaymentTouched({ cardNumber: true, nameOnCard: true, expiry: true, cvv: true });
    if (Object.keys(errs).length > 0) return;
    setIsPending(true);
    setTimeout(() => {
      clearCart();
      toast.success('Order confirmed. Your director will call within 2 hours.');
      setLocation('/order-confirmation');
    }, 1500);
  };

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const inputBase = 'w-full bg-transparent px-4 py-3 font-sans text-[13px] text-[#F5F0E8] focus:outline-none transition-colors placeholder:text-[rgba(245,240,232,0.3)]';
  const inputClass = (err?: string, touched?: boolean) =>
    `${inputBase} border-b ${err && touched ? 'border-red-400' : 'border-[rgba(201,168,76,0.3)] focus:border-[#C9A84C]'}`;

  const ErrMsg = ({ msg }: { msg?: string }) =>
    msg ? <p className="font-sans text-[11px] text-red-400 mt-1.5" role="alert">{msg}</p> : null;

  return (
    <div className="w-full min-h-screen bg-[#1B3A2D] pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Progress */}
        <nav aria-label="Checkout progress" className="flex justify-center items-center gap-4 mb-16 font-sans text-[10px] tracking-[0.2em] uppercase">
          <Link href="/cart" className="text-[rgba(245,240,232,0.5)] hover:text-[#C9A84C]">CART</Link>
          <span className="text-[#C9A84C]" aria-hidden="true">—</span>
          <span className="text-[#C9A84C] font-bold" aria-current="page">CHECKOUT</span>
          <span className="text-[rgba(245,240,232,0.3)]" aria-hidden="true">—</span>
          <span className="text-[rgba(245,240,232,0.3)]">CONFIRMED</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left */}
          <div className="w-full lg:w-[60%]">

            {/* Step 1 */}
            <div className={`mb-8 border border-[rgba(201,168,76,0.2)] bg-[#0F2318] p-8 transition-opacity ${step !== 1 ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-[24px] text-[#F5F0E8]">1. Contact Information</h2>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="font-sans text-[10px] uppercase text-[#C9A84C] underline underline-offset-4">Edit</button>
                )}
              </div>
              {step === 1 ? (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-4" aria-label="Contact information">
                  <div>
                    <label htmlFor="co-email" className="sr-only">Email Address</label>
                    <input
                      id="co-email"
                      type="email"
                      value={contact.email}
                      onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                      onBlur={() => setContactTouched(p => ({ ...p, email: true }))}
                      placeholder="Email Address"
                      autoComplete="email"
                      className={inputClass(contactErrors.email, contactTouched.email)}
                    />
                    <ErrMsg msg={contactTouched.email ? contactErrors.email : undefined} />
                  </div>
                  <div>
                    <label htmlFor="co-phone" className="sr-only">Phone Number</label>
                    <input
                      id="co-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                      onBlur={() => setContactTouched(p => ({ ...p, phone: true }))}
                      placeholder="Phone Number (for director confirmation)"
                      autoComplete="tel"
                      className={inputClass(contactErrors.phone, contactTouched.phone)}
                    />
                    <ErrMsg msg={contactTouched.phone ? contactErrors.phone : undefined} />
                  </div>
                  <div className="pt-4">
                    <GoldButton type="submit">Continue to Shipping</GoldButton>
                  </div>
                </form>
              ) : (
                <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)]">{contact.email}</p>
              )}
            </div>

            {/* Step 2 */}
            <div className={`mb-8 border border-[rgba(201,168,76,0.2)] bg-[#0F2318] p-8 transition-opacity ${step !== 2 ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-[24px] text-[#F5F0E8]">2. Delivery Details</h2>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="font-sans text-[10px] uppercase text-[#C9A84C] underline underline-offset-4">Edit</button>
                )}
              </div>
              {step === 2 && (
                <form onSubmit={handleShippingSubmit} noValidate className="space-y-6" aria-label="Delivery details">
                  <div>
                    <label htmlFor="sh-name" className="sr-only">Full Name</label>
                    <input
                      id="sh-name"
                      type="text"
                      value={shipping.fullName}
                      onChange={e => setShipping(p => ({ ...p, fullName: e.target.value }))}
                      onBlur={() => setShippingTouched(p => ({ ...p, fullName: true }))}
                      placeholder="Full Name"
                      autoComplete="name"
                      className={inputClass(shippingErrors.fullName, shippingTouched.fullName)}
                    />
                    <ErrMsg msg={shippingTouched.fullName ? shippingErrors.fullName : undefined} />
                  </div>
                  <div>
                    <label htmlFor="sh-addr" className="sr-only">Street Address</label>
                    <input
                      id="sh-addr"
                      type="text"
                      value={shipping.address}
                      onChange={e => setShipping(p => ({ ...p, address: e.target.value }))}
                      onBlur={() => setShippingTouched(p => ({ ...p, address: true }))}
                      placeholder="Street Address"
                      autoComplete="street-address"
                      className={inputClass(shippingErrors.address, shippingTouched.address)}
                    />
                    <ErrMsg msg={shippingTouched.address ? shippingErrors.address : undefined} />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2/3">
                      <label htmlFor="sh-city" className="sr-only">City</label>
                      <input
                        id="sh-city"
                        type="text"
                        value={shipping.city}
                        onChange={e => setShipping(p => ({ ...p, city: e.target.value }))}
                        onBlur={() => setShippingTouched(p => ({ ...p, city: true }))}
                        placeholder="City"
                        autoComplete="address-level2"
                        className={inputClass(shippingErrors.city, shippingTouched.city)}
                      />
                      <ErrMsg msg={shippingTouched.city ? shippingErrors.city : undefined} />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="sh-postal" className="sr-only">Postal Code</label>
                      <input
                        id="sh-postal"
                        type="text"
                        value={shipping.postal}
                        onChange={e => setShipping(p => ({ ...p, postal: e.target.value }))}
                        onBlur={() => setShippingTouched(p => ({ ...p, postal: true }))}
                        placeholder="Postal Code"
                        autoComplete="postal-code"
                        className={inputClass(shippingErrors.postal, shippingTouched.postal)}
                      />
                      <ErrMsg msg={shippingTouched.postal ? shippingErrors.postal : undefined} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="sh-country" className="sr-only">Country</label>
                    <select
                      id="sh-country"
                      value={shipping.country}
                      onChange={e => setShipping(p => ({ ...p, country: e.target.value }))}
                      onBlur={() => setShippingTouched(p => ({ ...p, country: true }))}
                      autoComplete="country"
                      className={`${inputClass(shippingErrors.country, shippingTouched.country)} appearance-none bg-[#0F2318]`}
                    >
                      <option value="" disabled>Select Country</option>
                      <option value="CH">Switzerland</option>
                      <option value="FR">France</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="JP">Japan</option>
                      <option value="AE">United Arab Emirates</option>
                    </select>
                    <ErrMsg msg={shippingTouched.country ? shippingErrors.country : undefined} />
                  </div>

                  <div className="pt-6">
                    <h3 className="font-sans text-[11px] uppercase tracking-widest text-[#C9A84C] mb-4">Delivery Method</h3>
                    <div className="space-y-3" role="radiogroup" aria-label="Delivery method">
                      <label className="flex items-center gap-4 border border-[#C9A84C] p-4 cursor-pointer bg-[rgba(201,168,76,0.05)]">
                        <input type="radio" name="shipping" defaultChecked className="accent-[#C9A84C]" />
                        <div>
                          <p className="font-sans text-[13px] text-[#F5F0E8]">White Glove Delivery</p>
                          <p className="font-sans text-[11px] text-[rgba(245,240,232,0.6)]">Complimentary — Hand delivered by specialist (3–5 days)</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-4 border border-[rgba(201,168,76,0.2)] p-4 cursor-pointer">
                        <input type="radio" name="shipping" className="accent-[#C9A84C]" />
                        <div>
                          <p className="font-sans text-[13px] text-[#F5F0E8]">Express White Glove</p>
                          <p className="font-sans text-[11px] text-[rgba(245,240,232,0.6)]">CHF 250 — Next business day</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[rgba(201,168,76,0.2)]">
                    <label className="flex items-center gap-3 cursor-pointer mb-4">
                      <input type="checkbox" checked={isGift} onChange={e => setIsGift(e.target.checked)} className="accent-[#C9A84C]" />
                      <span className="font-sans text-[13px] text-[#C9A84C] uppercase tracking-widest">This is a gift</span>
                    </label>
                    {isGift && (
                      <textarea
                        value={shipping.giftNote}
                        onChange={e => setShipping(p => ({ ...p, giftNote: e.target.value }))}
                        placeholder="Complimentary handwritten note..."
                        maxLength={300}
                        aria-label="Gift note"
                        className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] p-4 font-serif text-[16px] text-[#F5F0E8] italic focus:outline-none focus:border-[#C9A84C] h-24 resize-none"
                      />
                    )}
                  </div>

                  <div className="pt-4">
                    <GoldButton type="submit">Continue to Payment</GoldButton>
                  </div>
                </form>
              )}
            </div>

            {/* Step 3 */}
            <div className={`mb-8 border border-[rgba(201,168,76,0.2)] bg-[#0F2318] p-8 transition-opacity ${step !== 3 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <h2 className="font-serif text-[24px] text-[#F5F0E8] mb-6">3. Payment</h2>
              <form onSubmit={handlePlaceOrder} noValidate className="space-y-8" aria-label="Payment information">
                <div className="flex border-b border-[rgba(201,168,76,0.2)]" role="tablist" aria-label="Payment method">
                  {(['CREDIT CARD', 'BANK TRANSFER', 'APPLE PAY'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      aria-selected={paymentTab === t}
                      onClick={() => setPaymentTab(t)}
                      className={`px-6 py-4 font-sans text-[10px] tracking-widest uppercase border-b-2 ${paymentTab === t ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-transparent text-[rgba(245,240,232,0.5)] hover:text-[#F5F0E8]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {paymentTab === 'CREDIT CARD' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="pay-card" className="sr-only">Card Number</label>
                      <input
                        id="pay-card"
                        type="text"
                        inputMode="numeric"
                        value={payment.cardNumber}
                        onChange={e => setPayment(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                        onBlur={() => setPaymentTouched(p => ({ ...p, cardNumber: true }))}
                        placeholder="Card Number"
                        autoComplete="cc-number"
                        maxLength={19}
                        className={inputClass(paymentErrors.cardNumber, paymentTouched.cardNumber)}
                      />
                      <ErrMsg msg={paymentTouched.cardNumber ? paymentErrors.cardNumber : undefined} />
                    </div>
                    <div>
                      <label htmlFor="pay-name" className="sr-only">Name on Card</label>
                      <input
                        id="pay-name"
                        type="text"
                        value={payment.nameOnCard}
                        onChange={e => setPayment(p => ({ ...p, nameOnCard: e.target.value }))}
                        onBlur={() => setPaymentTouched(p => ({ ...p, nameOnCard: true }))}
                        placeholder="Name on Card"
                        autoComplete="cc-name"
                        className={inputClass(paymentErrors.nameOnCard, paymentTouched.nameOnCard)}
                      />
                      <ErrMsg msg={paymentTouched.nameOnCard ? paymentErrors.nameOnCard : undefined} />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label htmlFor="pay-exp" className="sr-only">Expiry Date</label>
                        <input
                          id="pay-exp"
                          type="text"
                          inputMode="numeric"
                          value={payment.expiry}
                          onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                          onBlur={() => setPaymentTouched(p => ({ ...p, expiry: true }))}
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          maxLength={5}
                          className={inputClass(paymentErrors.expiry, paymentTouched.expiry)}
                        />
                        <ErrMsg msg={paymentTouched.expiry ? paymentErrors.expiry : undefined} />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="pay-cvv" className="sr-only">CVV</label>
                        <input
                          id="pay-cvv"
                          type="text"
                          inputMode="numeric"
                          value={payment.cvv}
                          onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                          onBlur={() => setPaymentTouched(p => ({ ...p, cvv: true }))}
                          placeholder="CVV"
                          autoComplete="cc-csc"
                          maxLength={4}
                          className={inputClass(paymentErrors.cvv, paymentTouched.cvv)}
                        />
                        <ErrMsg msg={paymentTouched.cvv ? paymentErrors.cvv : undefined} />
                      </div>
                    </div>
                  </div>
                )}

                {paymentTab === 'BANK TRANSFER' && (
                  <div className="border border-[rgba(201,168,76,0.2)] p-6 space-y-3">
                    <p className="font-sans text-[12px] text-[rgba(245,240,232,0.7)] leading-relaxed">Your director will send wire transfer instructions to <span className="text-[#C9A84C]">{contact.email || 'your email'}</span> within 2 business hours. Your order is reserved for 48 hours pending receipt.</p>
                    <p className="font-sans text-[11px] text-[rgba(245,240,232,0.4)] uppercase tracking-widest">Bank: Bank Julius Bär & Co. Ltd. · IBAN: CH00 0000 0000 0000 0000 0</p>
                  </div>
                )}

                {paymentTab === 'APPLE PAY' && (
                  <div className="border border-[rgba(201,168,76,0.2)] p-6 text-center">
                    <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] mb-4">Apple Pay integration requires backend configuration.</p>
                    <p className="font-sans text-[11px] text-[rgba(245,240,232,0.4)]">Available once connected to a payment processor.</p>
                  </div>
                )}

                <div>
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-[#C9A84C] mb-4">Financial Preference</h3>
                  <select className="w-full bg-[#0F2318] border border-[rgba(201,168,76,0.3)] p-4 font-sans text-[13px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] appearance-none">
                    <option>Full Payment</option>
                    <option>50% Reservation Deposit</option>
                  </select>
                </div>

                <details className="text-[rgba(245,240,232,0.6)]">
                  <summary className="font-sans text-[11px] uppercase tracking-widest cursor-pointer hover:text-[#C9A84C]">Returns & Exchanges Policy</summary>
                  <p className="mt-4 font-sans text-[12px] leading-relaxed pl-4 border-l border-[#C9A84C]">
                    We accept returns within 14 days of delivery for pieces in their original, unworn condition. Bespoke commissions and personalised pieces are entirely exempt from return.
                  </p>
                </details>

                <GoldButton
                  type="submit"
                  disabled={isPending}
                  className="w-full py-5 text-[12px] relative overflow-hidden"
                >
                  <span className={isPending ? 'opacity-0' : 'opacity-100'}>
                    PLACE ORDER — {formatPrice(total, currency, currencyRates[currency])} →
                  </span>
                  {isPending && (
                    <div className="absolute inset-0 flex items-center justify-center" aria-label="Processing order">
                      <div className="w-5 h-5 border-2 border-[#0F2318] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </GoldButton>

                <p className="text-center font-sans text-[9px] uppercase tracking-widest text-[rgba(245,240,232,0.4)]">
                  256-bit SSL Encryption | Authenticity Guaranteed
                </p>
              </form>
            </div>
          </div>

          {/* Right Summary */}
          <div className="w-full lg:w-[40%]">
            <div className="sticky top-[100px] bg-[#0F2318] border border-[rgba(201,168,76,0.2)] p-8">
              <h3 className="font-serif text-[24px] text-[#F5F0E8] mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-[#1B3A2D] grayscale" />
                    <div>
                      <p className="font-serif text-[16px] text-[#C9A84C]">{item.name}</p>
                      <p className="font-sans text-[10px] text-[rgba(245,240,232,0.6)] uppercase">Qty: {item.quantity} | {item.strap}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 font-sans text-[12px] tracking-wider text-[rgba(245,240,232,0.8)] border-t border-[rgba(201,168,76,0.2)] pt-6 mb-6">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal, currency, currencyRates[currency])}</span></div>
                <div className="flex justify-between"><span>VAT (7.7%)</span><span>{formatPrice(vat, currency, currencyRates[currency])}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className="text-[#C9A84C]">COMPLIMENTARY</span></div>
                <div className="flex justify-between"><span>Gift Packaging</span><span className="text-[#C9A84C]">COMPLIMENTARY</span></div>
              </div>
              <div className="flex justify-between items-center border-t border-[rgba(201,168,76,0.2)] pt-6">
                <span className="font-sans text-[12px] uppercase tracking-widest text-[#F5F0E8]">Total</span>
                <span className="font-serif text-[28px] text-[#C9A84C]">{formatPrice(total, currency, currencyRates[currency])}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
