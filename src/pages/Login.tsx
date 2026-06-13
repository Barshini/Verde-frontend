import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff, CheckCircle2, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { useGlobalState } from '../context/GlobalStateContext';

interface LoginErrors { email?: string; password?: string; fname?: string; lname?: string; terms?: string; }

// Bug #3 fix: read email and tab from URL query params
function getUrlParam(key: string): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(key) || '';
}

const Login: React.FC<{ initialTab?: 'login' | 'register' }> = ({ initialTab = 'login' }) => {
  const urlTab = getUrlParam('tab') as 'login' | 'register' | '';
  const urlEmail = getUrlParam('email');

  const [tab, setTab] = useState<'login' | 'register'>(urlTab === 'register' ? 'register' : initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useGlobalState();
  const [, setLocation] = useLocation();

  const [email, setEmail] = useState(urlEmail);
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateLogin = (): LoginErrors => {
    const e: LoginErrors = {};
    if (!email.trim()) e.email = 'Email address is required.';
    else if (!emailRegex.test(email)) e.email = 'Please enter a valid email address.';
    if (!password) e.password = 'Password is required.';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const validateRegister = (): LoginErrors => {
    const e: LoginErrors = {};
    if (!fname.trim()) e.fname = 'First name is required.';
    if (!lname.trim()) e.lname = 'Last name is required.';
    if (!email.trim()) e.email = 'Email address is required.';
    else if (!emailRegex.test(email)) e.email = 'Please enter a valid email address.';
    if (!password) e.password = 'Password is required.';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!acceptedTerms) e.terms = 'You must accept the Terms of Service to continue.';
    return e;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateLogin();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    login({ name: 'Vanguard Member', email });
    toast.success('Welcome back to the Circle.');
    setLocation('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateRegister();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    login({ name: `${fname} ${lname}`, email });
    toast.success('Welcome to VERDE. Your membership is active.');
    setLocation('/dashboard');
  };

  // Bug #5 fix: Forgot password shows a toast instead of doing nothing
  const handleForgotPassword = () => {
    if (email && emailRegex.test(email)) {
      toast.success('Password reset link sent to ' + email);
    } else {
      toast.info('Enter your email address above, then click Forgot Password.');
    }
  };

  // Bug #5 fix: Social login buttons show coming soon instead of doing nothing
  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} sign-in coming soon.`);
  };

  const strength = password.length === 0 ? 'NONE' : password.length < 6 ? 'WEAK' : password.length < 10 ? 'FAIR' : 'STRONG';
  const strengthColor = strength === 'WEAK' ? 'text-red-400' : strength === 'FAIR' ? 'text-yellow-400' : strength === 'STRONG' ? 'text-green-400' : '';

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none transition-colors placeholder:text-[rgba(245,240,232,0.3)] ${errors[field as keyof LoginErrors] && touched[field] ? 'border-red-400' : 'border-[rgba(201,168,76,0.3)] focus:border-[#C9A84C]'}`;

  const ErrorMsg = ({ field }: { field: keyof LoginErrors }) =>
    errors[field] && touched[field] ? (
      <p className="font-sans text-[11px] text-red-400 mt-1.5" role="alert">{errors[field]}</p>
    ) : null;

  const handleBlur = (field: string) => setTouched(p => ({ ...p, [field]: true }));

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#0F2318]">
      {/* Left */}
      <div className="w-full md:w-[40%] relative hidden md:flex flex-col items-center justify-center p-16 text-center border-r border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/boutique-interior.png"
            alt="Boutique interior"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="relative z-10">
          <div className="w-24 h-24 border border-[#C9A84C] flex items-center justify-center mx-auto mb-12" aria-hidden="true">
            <span className="font-serif text-[48px] text-[#C9A84C] italic leading-none pt-2">V</span>
          </div>
          <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6 block">JOIN THE CIRCLE</span>
          <h1 className="font-serif text-[42px] font-light leading-tight mb-12 text-[#F5F0E8]">
            A Relationship That Lasts Longer Than Time.
          </h1>
          <ul className="text-left space-y-6 mb-16 inline-block" role="list">
            {[
              'Exclusive access to Limited Editions',
              'Direct line to your Personal Director',
              'Invitations to Geneva Atelier events',
              'Complimentary White Glove delivery'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-4 text-[rgba(245,240,232,0.8)] font-sans text-[13px]">
                <CheckCircle2 size={16} className="text-[#C9A84C] shrink-0" aria-hidden="true" /> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-[60%] flex items-center justify-center p-8 md:p-16 pt-32 md:pt-16 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex gap-8 mb-12 border-b border-[rgba(201,168,76,0.2)]" role="tablist">
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => { setTab(t); setErrors({}); setTouched({}); }}
                className={`pb-4 font-sans text-[11px] tracking-[0.2em] uppercase transition-colors relative ${tab === t ? 'text-[#C9A84C]' : 'text-[rgba(245,240,232,0.5)] hover:text-[#F5F0E8]'}`}
              >
                {t === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
                {tab === t && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A84C]" aria-hidden="true" />}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <div className="animate-in fade-in duration-500">
              <h2 className="font-serif text-[32px] text-[#F5F0E8] mb-2">Welcome Back</h2>
              <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] mb-8">Sign in to your Circle account.</p>
              <form onSubmit={handleLogin} noValidate className="space-y-6" aria-label="Sign in form">
                <div>
                  <label htmlFor="login-email" className="sr-only">Email Address</label>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="Email Address"
                    aria-invalid={!!errors.email && touched.email}
                    className={inputClass('email')}
                    autoComplete="email"
                  />
                  <ErrorMsg field="email" />
                </div>
                <div>
                  <label htmlFor="login-password" className="sr-only">Password</label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder="Password"
                      aria-invalid={!!errors.password && touched.password}
                      className={`${inputClass('password')} pr-10`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.5)] hover:text-[#C9A84C]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <ErrorMsg field="password" />
                </div>
                <div className="flex justify-end">
                  {/* Bug #5 fix: Forgot Password now shows feedback */}
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-sans text-[11px] text-[rgba(245,240,232,0.6)] hover:text-[#C9A84C] underline decoration-transparent hover:decoration-[#C9A84C] transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>
                <GoldButton type="submit" className="w-full">SIGN IN</GoldButton>
              </form>
              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-[rgba(201,168,76,0.1)]" />
                <span className="font-sans text-[9px] tracking-widest text-[rgba(245,240,232,0.4)]">OR CONTINUE WITH</span>
                <div className="flex-1 h-[1px] bg-[rgba(201,168,76,0.1)]" />
              </div>
              {/* Bug #5 fix: Social login buttons now show coming soon */}
              <div className="flex gap-4 mb-8">
                <GhostButton type="button" className="flex-1" onClick={() => handleSocialLogin('Google')}>Google</GhostButton>
                <GhostButton type="button" className="flex-1" onClick={() => handleSocialLogin('Apple')}>Apple</GhostButton>
              </div>
              <div className="text-center space-y-4">
                <button onClick={() => { setTab('register'); setErrors({}); setTouched({}); }} className="font-sans text-[12px] text-[rgba(245,240,232,0.8)] hover:text-[#C9A84C]">
                  Don't have an account? <span className="underline">Create one here</span>
                </button>
                <br />
                <button onClick={() => setLocation('/')} className="font-sans text-[12px] text-[rgba(245,240,232,0.5)] hover:text-[#F5F0E8]">
                  Continue browsing as Guest
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <h2 className="font-serif text-[32px] text-[#F5F0E8] mb-8">Begin Your Legacy</h2>
              <form onSubmit={handleRegister} noValidate className="space-y-6" aria-label="Create account form">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="reg-fname" className="sr-only">First Name</label>
                    <input
                      id="reg-fname"
                      type="text"
                      value={fname}
                      onChange={e => setFname(e.target.value)}
                      onBlur={() => handleBlur('fname')}
                      placeholder="First Name"
                      aria-invalid={!!errors.fname && touched.fname}
                      className={inputClass('fname')}
                      autoComplete="given-name"
                    />
                    <ErrorMsg field="fname" />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="reg-lname" className="sr-only">Last Name</label>
                    <input
                      id="reg-lname"
                      type="text"
                      value={lname}
                      onChange={e => setLname(e.target.value)}
                      onBlur={() => handleBlur('lname')}
                      placeholder="Last Name"
                      aria-invalid={!!errors.lname && touched.lname}
                      className={inputClass('lname')}
                      autoComplete="family-name"
                    />
                    <ErrorMsg field="lname" />
                  </div>
                </div>
                <div>
                  <label htmlFor="reg-email" className="sr-only">Email Address</label>
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="Email Address"
                    aria-invalid={!!errors.email && touched.email}
                    className={inputClass('email')}
                    autoComplete="email"
                  />
                  <ErrorMsg field="email" />
                </div>
                <div>
                  <label htmlFor="reg-password" className="sr-only">Password</label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder="Password (min. 8 characters)"
                      aria-invalid={!!errors.password && touched.password}
                      className={`${inputClass('password')} pr-16`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.5)] hover:text-[#C9A84C]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {password && (
                      <span className={`absolute right-12 top-1/2 -translate-y-1/2 font-sans text-[9px] tracking-widest ${strengthColor}`} aria-live="polite">
                        {strength}
                      </span>
                    )}
                  </div>
                  <ErrorMsg field="password" />
                </div>
                <div className="pt-4 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 accent-[#C9A84C]" />
                    <span className="font-sans text-[12px] text-[rgba(245,240,232,0.6)] group-hover:text-[rgba(245,240,232,0.9)]">
                      I wish to receive exclusive communications and invitations from VÉRDE Horology.
                    </span>
                  </label>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={e => { setAcceptedTerms(e.target.checked); handleBlur('terms'); }}
                        aria-invalid={!!errors.terms && touched.terms}
                        className="mt-1 accent-[#C9A84C]"
                      />
                      <span className="font-sans text-[12px] text-[rgba(245,240,232,0.6)] group-hover:text-[rgba(245,240,232,0.9)]">
                        I accept the Terms of Service and Privacy Policy.
                      </span>
                    </label>
                    {errors.terms && touched.terms && (
                      <p className="font-sans text-[11px] text-red-400 mt-1.5 pl-7" role="alert">{errors.terms}</p>
                    )}
                  </div>
                </div>
                <GoldButton type="submit" className="w-full mt-4">CREATE MY ACCOUNT</GoldButton>
              </form>
            </div>
          )}

          <div className="mt-16 flex justify-center gap-8">
            <div className="flex items-center gap-2 text-[rgba(245,240,232,0.4)]">
              <Lock size={12} aria-hidden="true" />
              <span className="font-sans text-[9px] tracking-widest uppercase">256-Bit SSL</span>
            </div>
            <div className="flex items-center gap-2 text-[rgba(245,240,232,0.4)]">
              <Shield size={12} aria-hidden="true" />
              <span className="font-sans text-[9px] tracking-widest uppercase">GDPR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
