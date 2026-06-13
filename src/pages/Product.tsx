import React, { useState, useRef, useCallback } from 'react';
import { useParams, useLocation, Link } from 'wouter';
import { Star, Shield, RotateCcw, Award, CheckCircle, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { WatchCard } from '../components/common/WatchCard';
import { SEOHead } from '../components/common/SEOHead';
import { WATCHES, formatPrice } from '../services/data';
import { useGlobalState } from '../context/GlobalStateContext';

const VIEW_LABELS = ['Front View', 'Case Detail', 'Movement', 'Caseback'];

const Product: React.FC = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { addToCart, addToWishlist, currency, currencyRates, user } = useGlobalState();

  const watch = WATCHES.find(w => w.id === id);

  if (!watch) {
    setLocation('/not-found');
    return null;
  }

  const allImages = [watch.images[0], ...watch.altImages];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStrap, setSelectedStrap] = useState('Alligator');
  const [selectedSize, setSelectedSize] = useState(watch.specs.caseSize);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState<'movement' | 'case' | 'dimensions' | 'craftsmanship'>('movement');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const straps = ['Alligator', 'Calfskin', 'Rubber', 'Bracelet'];
  const sizes = ['38mm', '40mm', '42mm'];

  const changeImage = useCallback((idx: number) => {
    if (idx === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsTransitioning(false);
    }, 220);
  }, [activeIndex]);

  const nextImage = () => changeImage((activeIndex + 1) % allImages.length);
  const prevImage = () => changeImage((activeIndex - 1 + allImages.length) % allImages.length);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  const handleAddToCart = () => {
    addToCart({ ...watch, image: watch.images[0], strap: selectedStrap, size: selectedSize });
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    addToCart({ ...watch, image: watch.images[0], strap: selectedStrap, size: selectedSize });
    setLocation('/checkout');
  };

  const handleWishlist = () => {
    addToWishlist({ ...watch, image: watch.images[0] });
    toast.success('Added to wishlist');
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    toast.success('Review submitted — thank you.');
    setReviewText('');
  };

  const relatedWatches = WATCHES.filter(w => w.id !== id).slice(0, 3);

  const specSections = {
    movement: [
      { label: 'Calibre', value: watch.specs.caliber },
      { label: 'Complication', value: watch.specs.complication },
      { label: 'Power Reserve', value: watch.specs.powerReserve },
      { label: 'Frequency', value: watch.specs.frequency },
      { label: 'Jewels', value: watch.specs.jewels },
      { label: 'Finishing', value: watch.specs.finishing },
    ],
    case: [
      { label: 'Case Material', value: watch.specs.caseMaterial },
      { label: 'Crystal', value: watch.specs.crystal },
      { label: 'Water Resistance', value: watch.specs.waterResistance },
    ],
    dimensions: [
      { label: 'Diameter', value: watch.specs.caseSize },
      { label: 'Thickness', value: watch.specs.caseThickness },
      { label: 'Weight', value: watch.specs.weight },
    ],
    craftsmanship: [],
  };

  return (
    <div className="w-full bg-[#1B3A2D]">
      <SEOHead
        title={`${watch.name} — ${watch.collection} | VÉRDE Horology`}
        description={watch.description}
        image={watch.images[0]}
        url={`/product/${watch.id}`}
        type="product"
      />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumb
          items={[
            { label: 'Collections', href: '/collections' },
            { label: watch.collection, href: '/collections' },
            { label: watch.name },
          ]}
          className="mb-8 sm:mb-12"
        />

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* ── Left: Gallery ── */}
          <div className="w-full lg:w-[55%]">
            {/* Main Image */}
            <div
              ref={imgRef}
              className={`relative aspect-[4/5] overflow-hidden bg-[#0F2318] border border-[rgba(201,168,76,0.12)] cursor-crosshair select-none ${isZooming ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              aria-label={`${watch.name} — ${VIEW_LABELS[activeIndex]}`}
            >
              {watch.limited && (
                <div className="absolute top-5 left-5 z-10 bg-[#C9A84C] text-[#0F2318] font-sans text-[9px] tracking-[0.25em] px-4 py-1 uppercase pointer-events-none">
                  Limited — {watch.limitedPieces} Pieces
                </div>
              )}

              <div className="absolute top-5 right-5 z-10 text-[#C9A84C] opacity-60 pointer-events-none">
                <ZoomIn size={18} />
              </div>

              <img
                src={allImages[activeIndex]}
                alt={`${watch.name} — ${VIEW_LABELS[activeIndex]}`}
                loading="eager"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isTransitioning ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
                } ${isZooming ? 'scale-150' : ''}`}
                style={isZooming ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />

              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#0F2318]/70 border border-[rgba(201,168,76,0.2)] flex items-center justify-center hover:border-[#C9A84C] transition-colors"
              >
                <ChevronLeft size={18} className="text-[#C9A84C]" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#0F2318]/70 border border-[rgba(201,168,76,0.2)] flex items-center justify-center hover:border-[#C9A84C] transition-colors"
              >
                <ChevronRight size={18} className="text-[#C9A84C]" />
              </button>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changeImage(i)}
                    aria-label={`View ${VIEW_LABELS[i] ?? i + 1}`}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeIndex ? 'bg-[#C9A84C] w-5' : 'bg-[rgba(201,168,76,0.35)]'}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => changeImage(i)}
                  aria-label={VIEW_LABELS[i] ?? `View ${i + 1}`}
                  className={`relative aspect-square overflow-hidden border transition-all duration-300 bg-[#0F2318] group ${
                    activeIndex === i
                      ? 'border-[#C9A84C]'
                      : 'border-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.5)]'
                  }`}
                >
                  <img
                    src={img}
                    alt={VIEW_LABELS[i] ?? `View ${i + 1}`}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-500 ${activeIndex === i ? 'grayscale-0 opacity-100' : 'grayscale opacity-50 group-hover:opacity-80'}`}
                  />
                  <span className="absolute bottom-1.5 left-0 right-0 text-center font-sans text-[7px] uppercase tracking-[0.15em] text-[#C9A84C] opacity-80">
                    {VIEW_LABELS[i] ?? `View ${i + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div className="w-full lg:w-[45%] flex flex-col">
            <div className="reveal">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3 block">
                {watch.collection}
              </span>
              <h1 className="font-serif text-[36px] sm:text-[48px] font-light mb-2 leading-tight text-[#F5F0E8]">
                {watch.name}
              </h1>
              <p className="font-serif text-[18px] italic text-[rgba(245,240,232,0.45)] mb-5">
                {watch.tagline}
              </p>

              <button
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 mb-7 group"
                aria-label="Jump to reviews"
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={14} fill="#C9A84C" color="#C9A84C" aria-hidden="true" />
                  ))}
                </div>
                <span className="font-sans text-[11px] text-[rgba(245,240,232,0.5)] group-hover:text-[#C9A84C] transition-colors">
                  ({watch.reviews.length} Reviews)
                </span>
              </button>

              <div className="font-serif text-[34px] sm:text-[40px] text-[#C9A84C] mb-10 tracking-tight">
                {formatPrice(watch.price, currency, currencyRates[currency])}
              </div>
            </div>

            <div className="space-y-8 reveal border-t border-[rgba(201,168,76,0.1)] pt-8">
              {/* Strap */}
              <div>
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[rgba(245,240,232,0.5)] mb-3">
                  Strap · <span className="text-[#F5F0E8]">{selectedStrap}</span>
                </p>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Select strap">
                  {straps.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStrap(s)}
                      aria-pressed={selectedStrap === s}
                      className={`font-sans text-[9px] tracking-[0.15em] uppercase px-5 py-2 transition-all ${
                        selectedStrap === s
                          ? 'bg-[#C9A84C] text-[#0F2318]'
                          : 'border border-[rgba(201,168,76,0.25)] text-[#F5F0E8] hover:border-[#C9A84C]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[rgba(245,240,232,0.5)] mb-3">
                  Case Size · <span className="text-[#F5F0E8]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Select case size">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      aria-pressed={selectedSize === s}
                      className={`font-sans text-[9px] tracking-[0.15em] uppercase px-5 py-2 transition-all ${
                        selectedSize === s
                          ? 'bg-[#C9A84C] text-[#0F2318]'
                          : 'border border-[rgba(201,168,76,0.25)] text-[#F5F0E8] hover:border-[#C9A84C]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <GoldButton onClick={handleAddToCart} className="w-full">Add to Cart</GoldButton>
                <div className="flex gap-3">
                  <GhostButton onClick={handleBuyNow} className="flex-1">Buy Now</GhostButton>
                  <GhostButton onClick={handleWishlist} className="flex-1">Wishlist</GhostButton>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/bespoke"
                  className="font-sans text-[10px] tracking-[0.15em] text-[rgba(245,240,232,0.5)] hover:text-[#C9A84C] underline decoration-[#C9A84C]/30 underline-offset-4 transition-colors"
                >
                  Request Bespoke Commission →
                </Link>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-4 gap-3 pt-6 border-t border-[rgba(201,168,76,0.1)]">
                {[
                  { icon: <Award size={18} aria-hidden="true" />, text: 'Swiss Made' },
                  { icon: <Shield size={18} aria-hidden="true" />, text: '2-Year Warranty' },
                  { icon: <RotateCcw size={18} aria-hidden="true" />, text: 'Free Returns' },
                  { icon: <CheckCircle size={18} aria-hidden="true" />, text: 'Authenticity' },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-2 text-[rgba(245,240,232,0.5)]">
                    <div className="text-[#C9A84C]">{badge.icon}</div>
                    <span className="font-sans text-[8px] uppercase tracking-[0.1em]">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabbed Specification Detail ── */}
      <section className="bg-[#0F2318] py-20 sm:py-28 border-y border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="font-serif text-[28px] sm:text-[36px] text-center mb-4 text-[#C9A84C] reveal">
            Anatomy of the {watch.name}
          </h2>
          <p className="font-sans text-[13px] text-center text-[rgba(245,240,232,0.5)] mb-12 reveal">
            Every specification. Every material. Every decision.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-0 mb-14 border border-[rgba(201,168,76,0.2)] divide-x divide-[rgba(201,168,76,0.2)] overflow-hidden reveal">
            {(['movement', 'case', 'dimensions', 'craftsmanship'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
                role="tab"
                className={`flex-1 min-w-[80px] sm:min-w-0 font-sans text-[9px] tracking-[0.2em] uppercase py-3 px-3 sm:px-6 transition-all ${
                  activeTab === tab
                    ? 'bg-[#C9A84C] text-[#0F2318]'
                    : 'text-[rgba(245,240,232,0.5)] hover:text-[#F5F0E8] hover:bg-[rgba(201,168,76,0.05)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="reveal" role="tabpanel">
            {activeTab !== 'craftsmanship' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">
                {specSections[activeTab].map(({ label, value }) => (
                  <div key={label} className="border-b border-[rgba(201,168,76,0.12)] pb-4 flex justify-between items-end gap-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.45)] flex-shrink-0">
                      {label}
                    </span>
                    <span className="font-serif text-[16px] text-[#F5F0E8] text-right leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-serif text-[22px] text-[#C9A84C] mb-5">The Finishing</h3>
                  <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.75)]">
                    {watch.craftsmanship}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-[22px] text-[#C9A84C] mb-5">The Materials</h3>
                  <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.75)]">
                    {watch.materials}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-serif text-[22px] text-[#C9A84C] mb-5">The Movement</h3>
                  <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.75)]">
                    {watch.movement}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Craftsmanship Editorial ── */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="/images/craftsmanship-bg.png"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-8"
          />
          <div className="absolute inset-0 bg-[#1B3A2D]/92" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl text-center reveal">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-6 block">
            The Art of Making
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] mb-8 leading-tight">
            {watch.description}
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mb-8 opacity-60" />
          <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.7)] mb-12">
            {watch.craftsmanship}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <GhostButton href="/craftsmanship">Our Craftsmanship</GhostButton>
            <GoldButton href="/private-viewing">Book Private Viewing</GoldButton>
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="py-20 sm:py-24 bg-[#0F2318]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-[28px] sm:text-[32px] text-center mb-14 tracking-wider">
            Other Masterpieces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedWatches.map(w => (
              <div key={w.id} className="reveal">
                <WatchCard watch={w} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="py-20 sm:py-24 bg-[#1B3A2D] border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="font-serif text-[28px] sm:text-[32px] mb-14 text-center reveal tracking-wider">
            Collector Reviews
          </h2>

          {watch.reviews.length > 0 ? (
            <div className="space-y-10 mb-16 reveal">
              {watch.reviews.map((review, i) => (
                <article key={i} className="border-b border-[rgba(201,168,76,0.1)] pb-8">
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <div>
                      <span className="font-serif text-[19px] text-[#C9A84C] block">{review.name}</span>
                      <span className="font-sans text-[10px] text-[rgba(245,240,232,0.4)] uppercase tracking-widest">{review.location}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-0.5" aria-label={`${review.stars} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={13} fill={star <= review.stars ? '#C9A84C' : 'transparent'} color="#C9A84C" aria-hidden="true" />
                        ))}
                      </div>
                      <span className="font-sans text-[10px] text-[rgba(245,240,232,0.4)] tracking-widest uppercase">{review.date}</span>
                    </div>
                  </div>
                  <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.75)] italic">
                    "{review.text}"
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 mb-16 text-[rgba(245,240,232,0.4)]">
              <p className="font-sans text-[13px]">No reviews yet. Be the first to review this timepiece.</p>
            </div>
          )}

          <div className="bg-[#0F2318] p-8 sm:p-12 border border-[rgba(201,168,76,0.15)] reveal">
            <h3 className="font-serif text-[22px] mb-8 text-[#C9A84C]">Share Your Experience</h3>
            {!user.isLoggedIn ? (
              <div className="text-center py-8">
                <p className="font-sans text-[13px] text-[rgba(245,240,232,0.5)] mb-6">
                  Sign in to leave a collector review
                </p>
                <GoldButton href="/login">Sign In</GoldButton>
              </div>
            ) : (
              <form onSubmit={submitReview} className="flex flex-col gap-5">
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.5)] mb-3 block">
                    Rating
                  </label>
                  <div className="flex gap-2" role="radiogroup" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                        aria-checked={star <= reviewRating}
                        role="radio"
                      >
                        <Star
                          size={22}
                          fill={star <= reviewRating ? '#C9A84C' : 'transparent'}
                          color="#C9A84C"
                          className="hover:scale-110 transition-transform"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="review-text" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.5)] mb-3 block">
                    Your Review
                  </label>
                  <textarea
                    id="review-text"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Share your thoughts on this timepiece..."
                    required
                    className="w-full bg-[#1B3A2D] border border-[rgba(201,168,76,0.2)] p-4 text-[#F5F0E8] font-sans text-[13px] h-28 focus:outline-none focus:border-[#C9A84C] resize-none transition-colors"
                  />
                </div>
                <GoldButton type="submit" className="self-start">Submit Review</GoldButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
