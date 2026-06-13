import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-verde-dark flex flex-col items-center justify-center px-6 text-center">
      <p className="text-gold font-sans tracking-[0.25em] text-xs uppercase mb-8">
        Error 404
      </p>
      <h1 className="font-serif text-5xl md:text-7xl text-cream mb-6">
        This Page Does<br />
        <em className="text-gold italic">Not Exist.</em>
      </h1>
      <p className="text-cream/60 font-sans text-sm max-w-md mb-12 leading-relaxed">
        The page you are looking for may have been moved, renamed, or no longer exists.
        Our collection, however, awaits.
      </p>
      <Link href="/">
        <button className="border border-gold text-gold font-sans tracking-[0.2em] text-xs uppercase px-10 py-4 hover:bg-gold hover:text-verde-dark transition-all duration-300">
          Return to the House of VÉRDE
        </button>
      </Link>
    </div>
  );
}
