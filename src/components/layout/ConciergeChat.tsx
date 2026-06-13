import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { WATCHES, BOUTIQUES } from '../../services/data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  suggestions?: string[];
}

const WATCHES_LIST = WATCHES.map(w => ({
  id: w.id,
  name: w.name,
  collection: w.collection,
  price: w.price,
  tagline: w.tagline,
  category: w.category,
}));

type Intent =
  | 'greeting' | 'price' | 'collections' | 'specific_watch' | 'bespoke'
  | 'boutique' | 'heritage' | 'movement' | 'materials' | 'craftsmanship'
  | 'care' | 'warranty' | 'delivery' | 'limited' | 'gift'
  | 'sport' | 'dress' | 'comparison' | 'contact' | 'sustainability'
  | 'investment' | 'servicing' | 'fallback';

function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/\b(hello|hi|good morning|good afternoon|good evening|bonjour|greetings|hey)\b/.test(t)) return 'greeting';
  if (/\b(price|cost|how much|chf|usd|gbp|eur|expensive|afford|budget|value)\b/.test(t)) return 'price';
  if (/\b(foret|forêt|perpetuelle|perpetual|calendar|moonphase)\b/.test(t)) return 'specific_watch';
  if (/\b(noir|classique)\b/.test(t) && !t.includes('alpine')) return 'specific_watch';
  if (/\b(alpine|sport|chronograph|flyback|200m)\b/.test(t)) return 'sport';
  if (/\b(1887|heritage edition|rose gold engraved)\b/.test(t)) return 'specific_watch';
  if (/\b(champagne dress|diamond bezel|ultra.thin|slim watch)\b/.test(t)) return 'specific_watch';
  if (/\b(bespoke|custom|commission|personalise|personalize|unique|one of a kind|made for me)\b/.test(t)) return 'bespoke';
  if (/\b(boutique|store|shop|visit|location|where|city|london|paris|geneva|dubai|tokyo|new york|singapore|milan)\b/.test(t)) return 'boutique';
  if (/\b(history|heritage|founded|1887|antoine|origin|story|tradition|lineage)\b/.test(t)) return 'heritage';
  if (/\b(movement|calibre|caliber|tourbillon|automatic|manual|winding|mechanism|gear|jewel|frequency|power reserve)\b/.test(t)) return 'movement';
  if (/\b(material|gold|platinum|titanium|ceramic|enamel|sapphire|crystal|meteorite|strap|bracelet|alligator|leather)\b/.test(t)) return 'materials';
  if (/\b(craft|handmade|finishing|perlage|chamfer|artisan|watchmaker|atelier|workshop|hours per)\b/.test(t)) return 'craftsmanship';
  if (/\b(care|maintain|clean|polish|oil|lubricat|winding|daily wear)\b/.test(t)) return 'care';
  if (/\b(service|overhaul|service interval|how often|repair)\b/.test(t)) return 'servicing';
  if (/\b(warranty|guarantee|certificate|authentication|genuine|real|authentic|original)\b/.test(t)) return 'warranty';
  if (/\b(delivery|shipping|ship|arrive|wait|timeline|dispatch|post|courier)\b/.test(t)) return 'delivery';
  if (/\b(gift|present|anniversary|birthday|wedding|occasion|someone special)\b/.test(t)) return 'gift';
  if (/\b(collection|range|line|what do you have|available|selection|catalogue|catalog|show me)\b/.test(t)) return 'collections';
  if (/\b(limited|rare|edition|numbered|exclusive|scarce|88)\b/.test(t)) return 'limited';
  if (/\b(active|outdoor|adventure|robust|durable|water|swim|dive)\b/.test(t)) return 'sport';
  if (/\b(dress|formal|occasion|elegant|dinner|suit|business|thin)\b/.test(t)) return 'dress';
  if (/\b(contact|speak|call|email|appointment|representative|human|person|director)\b/.test(t)) return 'contact';
  if (/\b(sustainab|responsible|environment|ethical|carbon|green|recycled|vegan)\b/.test(t)) return 'sustainability';
  if (/\b(invest|hold value|appreciate|resale|secondary|auction|asset)\b/.test(t)) return 'investment';
  if (/\b(compare|versus|vs|difference|better|prefer|choose|which one)\b/.test(t)) return 'comparison';
  return 'fallback';
}

function generateResponse(intent: Intent, userText: string): { text: string; suggestions: string[] } {
  const t = userText.toLowerCase();

  switch (intent) {
    case 'greeting':
      return {
        text: `Bonjour. I'm the VÉRDE Horology concierge.\n\nWhether you're exploring the collection for the first time, considering a bespoke commission, or have a specific question — I'm here without hurry.\n\nHow may I assist you?`,
        suggestions: ['Tell me about the collection', 'What makes VÉRDE different?', 'Bespoke commission options', 'Find a boutique near me'],
      };

    case 'price': {
      const sorted = [...WATCHES_LIST].sort((a, b) => a.price - b.price);
      const cheapest = sorted[0];
      const expensive = sorted[sorted.length - 1];
      return {
        text: `Our collection ranges from CHF ${cheapest.price.toLocaleString()} for the ${cheapest.name} to CHF ${expensive.price.toLocaleString()} for the ${expensive.name}.\n\nBespoke commissions begin at CHF 45,000, priced according to the calibre, materials, and complications selected in consultation with our atelier.\n\nAll pieces include a cedar presentation box, authenticity certificate, two-year warranty, and complimentary first service.`,
        suggestions: ['Which watch is the most accessible?', 'What is included in the price?', 'Tell me about the bespoke programme', 'View the full collection'],
      };
    }

    case 'specific_watch': {
      const watch =
        WATCHES_LIST.find(w =>
          t.includes(w.name.toLowerCase()) ||
          t.includes(w.id.replace(/-/g, ' ')) ||
          (t.includes('noir') && w.id === 'noir-classique') ||
          (t.includes('alpine') && w.id === 'alpine-sport') ||
          (t.includes('champagne') && w.id === 'champagne-dress') ||
          (t.includes('perpetuelle') && w.id === 'foret-perpetuelle') ||
          (t.includes('foret') && w.id === 'foret-perpetuelle') ||
          ((t.includes('1887') || t.includes('edition')) && w.id === 'edition-1887')
        ) || WATCHES_LIST[0];
      return {
        text: `The ${watch.name} is from our ${watch.collection} collection.\n\n${watch.tagline}\n\nIt is priced from CHF ${watch.price.toLocaleString()}. I can answer specific questions about the movement, materials, dimensions, or availability — or I can direct you to the full product page.`,
        suggestions: [`What movement is in the ${watch.name}?`, 'Is this available for bespoke customisation?', 'How does this compare to other pieces?', 'Book a private viewing'],
      };
    }

    case 'collections':
      return {
        text: `We produce six references:\n\n• Forêt Perpetuelle (Masterpiece) — CHF 98,500\n• Noir Classique (Dress) — CHF 42,000\n• Alpine Sport (Sport) — CHF 35,000\n• Edition 1887 (Heritage) — CHF 67,000\n• Champagne Dress (Celebration) — CHF 55,000\n• Bespoke Atelier (Custom) — from CHF 145,000\n\nPlus a Bespoke Commission programme for clients who require something without a reference number.`,
        suggestions: ['Which is best for everyday wear?', 'What complications are available?', 'Tell me about the limited editions', 'Bespoke commission options'],
      };

    case 'bespoke':
      return {
        text: `The VÉRDE Bespoke Commission is a twelve to eighteen month collaboration between you and our Geneva atelier.\n\nThere is no catalogue, no reference number, and no second example. You meet with our Bespoke Director — in Geneva, at one of our boutiques, or by private video — and describe what you are trying to hold in your hand. We listen. We propose. You refine.\n\nCommissions begin at CHF 45,000. Every piece receives the commissioner's name engraved inside the caseback alongside the responsible master's initials.`,
        suggestions: ['How long does a commission take?', 'What materials can I choose?', 'Can I visit the Geneva atelier?', 'Start a consultation request'],
      };

    case 'boutique': {
      const mentioned = BOUTIQUES.find(b =>
        t.includes(b.city.toLowerCase().replace(/\s*\(hq\)/, '')) ||
        t.includes(b.country.toLowerCase())
      );
      if (mentioned) {
        return {
          text: `Our ${mentioned.city} boutique is at ${mentioned.address}.\n\nHours: ${mentioned.hours}\nPhone: ${mentioned.phone}\n\nDirected by ${mentioned.director}. Private viewings and Bespoke consultations available by appointment.`,
          suggestions: ['Book a private viewing', 'View all boutiques', 'Can I visit the Geneva atelier?', 'Contact the boutique directly'],
        };
      }
      return {
        text: `We have eight boutiques across four continents:\n\n🇨🇭 Geneva (Headquarters)\n🇫🇷 Paris · 🇬🇧 London · 🇮🇹 Milan\n🇺🇸 New York · 🇦🇪 Dubai\n🇯🇵 Tokyo · 🇸🇬 Singapore\n\nEach boutique offers the full collection, private viewing rooms, and access to the Bespoke consultation programme.`,
        suggestions: ['Tell me about the Geneva boutique', 'Book a private viewing', 'London boutique details', 'Tokyo boutique details'],
      };
    }

    case 'heritage':
      return {
        text: `VÉRDE Horology was founded in Geneva in 1887 by Antoine Verde.\n\nAntoine destroyed his first forty movements because each lost a second per month — inconsistently. That distinction mattered to him above all else.\n\nThe house has never grown large by design. We produce fewer than 200 watches per year. Every movement is designed and assembled in-house. We retain technical records of every watch ever made, with the capability to service any of them — regardless of age.`,
        suggestions: ['Tell me about the collection', 'What distinguishes VÉRDE?', 'Explore the Heritage page', 'What complications are available?'],
      };

    case 'movement':
      return {
        text: `Every VÉRDE calibre is designed and assembled entirely in-house at our Geneva atelier.\n\nCurrent manufacture range:\n\n• V.24-001 — Manual wind, twin barrel, perpetual calendar\n• V.12-003 — Automatic, hours/minutes, small seconds\n• V.35-007 — Automatic chronograph, column wheel\n• V.18-001 — Manual wind, 5-day power reserve\n• V.08-002 — Ultra-thin automatic, micro-rotor\n\nAll COSC-certified. Masterpiece and Heritage lines additionally carry the Geneva Seal.`,
        suggestions: ['What is the Geneva Seal?', 'Which watch has the longest power reserve?', 'Tell me about the tourbillon', 'Bespoke movement options'],
      };

    case 'materials':
      return {
        text: `We use only what is necessary, at its best.\n\nCase materials: 18k Champagne Gold (proprietary alloy), White Gold, Rose Gold, Platinum 950, Grade 5 Titanium, Black Ceramic bezel.\n\nDials: Grand Feu Enamel (six firings at 840°C), Widmanstätten Meteorite, Aventurine, Champagne Guilloché.\n\nCrystal: Domed or flat sapphire, triple anti-reflective coated.\n\nStraps: Alligator, Calfskin, Medical-grade Rubber, Integrated Steel Bracelet.`,
        suggestions: ['What is grand feu enamel?', 'Tell me about the meteorite dial', 'Which case material is most durable?', 'Strap options for the Alpine Sport'],
      };

    case 'craftsmanship':
      return {
        text: `A VÉRDE watch requires an average of 400 hours to produce — from first metal cut to caseback closure.\n\nCase finishing alone takes 47 hours of hand-polishing across eleven distinct surfaces. Each movement receives full perlage — 2,847 overlapping circles, applied by hand.\n\nGrand complication assembly is the sole responsibility of one master watchmaker. It takes eleven weeks on average. The completed movement then undergoes 1,000 hours of testing before receiving the VÉRDE mark.`,
        suggestions: ['Can I visit the atelier?', 'Tell me about the materials used', 'What is perlage?', 'Explore the Craftsmanship page'],
      };

    case 'care':
      return {
        text: `Your VÉRDE timepiece requires very little from you, and a great deal from us.\n\nFor daily wear:\n• Wind a manual-wind calibre gently, at the same time each morning.\n• Avoid prolonged exposure to magnetic fields.\n• For water-resistant models, confirm the crown is fully seated before water contact.\n\nFor servicing:\n• Standard calibres: full service every 8–10 years.\n• Tourbillons: every 5–7 years.\n• Our Geneva service centre accepts any VÉRDE reference, regardless of age.`,
        suggestions: ['Service intervals for my watch', 'How do I wind a manual watch?', 'What is covered by the warranty?', 'Contact the service centre'],
      };

    case 'servicing':
      return {
        text: `We recommend a full service every 8–10 years for standard calibres, and every 5–7 years for tourbillons and grand complications.\n\nServicing is available at our Geneva service centre for any VÉRDE reference, regardless of age. We have never refused a service for a watch bearing our name. We retain every technical schematic and the tooling to match.\n\nService turnaround: 6–8 weeks standard, 12–16 weeks grand complications. Courtesy loans are available by request at any boutique.`,
        suggestions: ['How do I send a watch for service?', 'What is covered under warranty?', 'Contact the service centre', 'Book a boutique appointment'],
      };

    case 'warranty':
      return {
        text: `Every VÉRDE timepiece carries a two-year international warranty from date of purchase.\n\nCovered: manufacturing defects in movement, case, and dial.\nNot covered: misuse damage, water damage outside stated resistance, loss or theft.\n\nEach watch includes:\n• Authenticity certificate\n• Numbered warranty card\n• Watchmaker's signature on movement\n• Permanent archive entry in Geneva\n\nFor authentication of pre-owned pieces, our Geneva service centre offers formal verification and re-certification.`,
        suggestions: ['How do I register my warranty?', 'Authentication for a pre-owned piece', 'Book a service appointment', 'Contact us directly'],
      };

    case 'delivery':
      return {
        text: `Standard delivery for in-stock pieces is 5–7 business days worldwide, via fully insured, signature-required courier.\n\nAll timepieces are delivered in a cedar presentation box with linen cloth, care documentation, warranty card, and authenticity certificate.\n\nAlternatively, delivery may be arranged through any boutique for a private in-person presentation.\n\nBespoke commissions are never shipped — they are delivered in person by our Bespoke Director or a nominated representative.`,
        suggestions: ['Which boutique can receive my delivery?', 'Tell me about the bespoke delivery', 'Returns policy', 'Book a boutique appointment'],
      };

    case 'gift':
      return {
        text: `A VÉRDE timepiece arrives in a hand-finished cedar presentation box with a cream linen cloth, care documentation, and a card bearing your chosen dedication — written by hand in Geneva.\n\nFor gifts, we offer:\n• Complimentary gift inscription on the caseback (up to 40 characters)\n• Private boutique presentation — you collect the piece in person and present it yourself\n• A Bespoke commission designed around the recipient\n\nWe can assist with any of these by appointment. There is no additional charge for gift presentation.`,
        suggestions: ['Which watch makes the best gift?', 'Caseback inscription options', 'Private boutique presentation', 'Bespoke commission for someone special'],
      };

    case 'sport':
      return {
        text: `The Alpine Sport is our answer to the argument that a watch built for real use cannot also be beautiful.\n\nGrade 5 Titanium case and bracelet. Black ceramic bezel. Flyback chronograph. 200 metres water resistance. 60-hour power reserve. The lightest piece in our collection at 120g.\n\nIt is the only piece you could take to 4,000 metres or into the sea without reservation. It is also the only one that weighs less than a standard glass of water. That combination required nearly four years of engineering.`,
        suggestions: ['What is the water resistance rating?', 'Tell me about the titanium case', 'Compare to the Noir Classique', 'View the Alpine Sport'],
      };

    case 'dress':
      return {
        text: `For formal occasions, we recommend either the Noir Classique or the Champagne Dress — depending on the wearer and the context.\n\nThe Noir Classique: obsidian enamel dial, no date, no complication beyond hours and minutes. 8.2mm thick. It disappears under a cuff while remaining unmistakable under a loupe.\n\nThe Champagne Dress: ultra-thin at 6.2mm, diamond-set bezel, solid champagne gold dial. The watch for when the final detail is the only one that matters.`,
        suggestions: ['Tell me about the Noir Classique', 'Tell me about the Champagne Dress', 'Price comparison between the two', 'Book a private viewing'],
      };

    case 'comparison':
      return {
        text: `VÉRDE does not position itself against other houses. We make no comparisons. What we can tell you is what we do:\n\nFewer than 200 watches per year. Every movement designed and assembled in Geneva. The responsible watchmaker's initials engraved on every movement. Technical records retained for every piece ever produced. A servicing commitment that does not expire.\n\nWhether that compares favourably to any other house is a question you are better placed to answer than we are.`,
        suggestions: ['What complications does VÉRDE offer?', 'Tell me about the craftsmanship', 'Pricing and availability', 'Book a private viewing'],
      };

    case 'limited':
      return {
        text: `The Forêt Perpetuelle is produced in a limited edition of 88 pieces per year — a number chosen for its significance and because 88 is precisely what our atelier can produce to the required standard in twelve months.\n\nOnce a numbered edition is exhausted, it is closed. We do not reopen numbers. We do not produce continuations.\n\nTo be notified of limited releases before public announcement, you may register with our Private Client programme through any boutique.`,
        suggestions: ['How do I join the Private Client programme?', 'The Forêt Perpetuelle — full details', 'What other rare pieces are available?', 'Book a boutique appointment'],
      };

    case 'contact':
      return {
        text: `You can reach us through several channels:\n\n• Our website contact form: /contact\n• Geneva headquarters: +41 22 000 1234\n• Any of our eight boutiques worldwide\n\nFor Bespoke consultations, press enquiries, or collector relations — the Geneva Maison is the appropriate contact. Response time is 24–48 hours for written enquiries.`,
        suggestions: ['Which boutique is nearest to me?', 'Book a private viewing', 'Bespoke consultation request', 'Go to the contact page'],
      };

    case 'sustainability':
      return {
        text: `Sustainability, for us, means primarily longevity. A watch made to last a century and serviced indefinitely generates no waste — it generates inheritance.\n\nMore specifically:\n• Gold sourced exclusively from certified responsible operations.\n• Vegan strap alternatives in Pinatex and responsibly sourced rubber.\n• Our atelier is powered by Swiss hydroelectric energy.\n• We do not discount. We do not create artificial urgency. We do not overproduce.\n\nOur full sustainability commitments are published on the Sustainability page.`,
        suggestions: ['Tell me about the vegan strap options', 'What certifications does VÉRDE hold?', 'Bespoke with sustainable materials', 'Explore the Sustainability page'],
      };

    case 'investment':
      return {
        text: `We do not sell our watches as investments. We sell them as objects — made to be worn, not stored.\n\nThat said: VÉRDE has maintained a consistent secondary market presence that reflects quality. Limited editions have historically appreciated. Our lifetime servicing commitment means a well-maintained piece retains both its function and its certification value indefinitely.\n\nIf investment return is your primary criterion, I'd suggest consulting a specialist auction house. If wear is your criterion — we can help directly.`,
        suggestions: ['Tell me about limited editions', 'What is included with each purchase?', 'Authentication and re-certification', 'Explore the collection'],
      };

    default:
      return {
        text: `Thank you for your question. I want to give you a precise answer — could you tell me a little more about what you're looking for?\n\nI can help with the collection, pricing, boutique locations, bespoke commissions, movement and materials information, care, and servicing.`,
        suggestions: ['Tell me about the collection', 'Pricing and availability', 'Bespoke commission options', 'Find a boutique'],
      };
  }
}

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  text: `Bonjour. I'm the VÉRDE Horology concierge.\n\nWhether you're exploring the collection for the first time, considering a commission, or have a specific question — I'm here without hurry.\n\nHow may I help you today?`,
  suggestions: ['Tell me about the collection', 'Bespoke commission options', 'Find a boutique', 'Pricing and availability'],
};

export const ConciergeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const intent = detectIntent(text);
    const { text: responseText, suggestions } = generateResponse(intent, text);
    const delay = 600 + Math.min(responseText.length * 2.5, 1400);

    await new Promise(r => setTimeout(r, delay));

    setMessages(prev => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText, suggestions },
    ]);
    setIsTyping(false);
  }, [isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close concierge' : 'Open VÉRDE Concierge'}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#C9A84C] flex items-center justify-center shadow-2xl hover:bg-[#B8973B] transition-colors chat-pulse focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A2D]"
      >
        {isOpen
          ? <ChevronDown size={22} className="text-[#0F2318]" aria-hidden="true" />
          : <MessageCircle size={22} className="text-[#0F2318]" aria-hidden="true" />
        }
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="VÉRDE Horology Concierge"
        aria-hidden={!isOpen}
        className={`fixed bottom-24 right-3 sm:right-6 z-40 w-[calc(100vw-1.5rem)] sm:w-[390px] max-h-[78vh] flex flex-col bg-[#0F2318] border border-[rgba(201,168,76,0.22)] shadow-2xl origin-bottom-right transition-all duration-350 ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(201,168,76,0.12)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" aria-hidden="true" />
            <div>
              <p className="font-serif text-[15px] text-[#F5F0E8] leading-none">VÉRDE Concierge</p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.35)] mt-0.5">
                Available · Geneva
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="text-[rgba(245,240,232,0.35)] hover:text-[#C9A84C] transition-colors p-1"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-5 space-y-5 hide-scrollbar"
          aria-live="polite"
          aria-label="Conversation"
        >
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[90%]">
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-1.5" aria-hidden="true">
                    <div className="w-5 h-5 bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-[8px] text-[#0F2318] font-bold">V</span>
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.3)]">Concierge</span>
                  </div>
                )}
                <div
                  className={`px-4 py-3 font-sans text-[12px] leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.2)] text-[#F5F0E8]'
                      : 'bg-[#1B3A2D] border border-[rgba(201,168,76,0.07)] text-[rgba(245,240,232,0.82)]'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(s)}
                        disabled={isTyping}
                        className="font-sans text-[9px] tracking-[0.08em] uppercase border border-[rgba(201,168,76,0.2)] text-[rgba(245,240,232,0.45)] px-3 py-1.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors disabled:opacity-30"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start" aria-label="Concierge is composing">
              <div className="bg-[#1B3A2D] border border-[rgba(201,168,76,0.07)] px-4 py-3">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] opacity-60"
                      style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.18}s infinite` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-[rgba(201,168,76,0.1)] flex gap-2.5 flex-shrink-0"
        >
          <label htmlFor="concierge-input" className="sr-only">Message the concierge</label>
          <input
            id="concierge-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask about any timepiece…"
            autoComplete="off"
            className="flex-1 bg-[#1B3A2D] border border-[rgba(201,168,76,0.12)] px-4 py-2.5 font-sans text-[12px] text-[#F5F0E8] placeholder:text-[rgba(245,240,232,0.2)] focus:outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            aria-label="Send"
            className="w-10 h-10 bg-[#C9A84C] disabled:opacity-25 flex items-center justify-center hover:bg-[#B8973B] transition-colors flex-shrink-0 focus:outline-none"
          >
            <Send size={15} className="text-[#0F2318]" aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
};

