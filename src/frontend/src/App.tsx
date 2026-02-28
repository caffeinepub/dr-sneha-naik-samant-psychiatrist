import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  Baby,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Dumbbell,
  Heart,
  HeartHandshake,
  Home,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Phone,
  Pill,
  Shield,
  Star,
  Stethoscope,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

/* ── Helper to scroll to section ───────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ── WhatsApp deep-link builder ─────────────────────────────────────────── */
function buildWhatsAppUrl(
  name: string,
  phone: string,
  condition: string,
  preferredTime: string,
): string {
  const text = [
    "Hello Dr. Sneha, I would like to book an appointment.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Condition: ${condition}`,
    `Preferred Time: ${preferredTime}`,
  ].join("\n");
  return `https://wa.me/918850188789?text=${encodeURIComponent(text)}`;
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  NAV                                                                      */
/* ════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "About", id: "about" },
    { label: "Conditions", id: "conditions" },
    { label: "Services", id: "services" },
    { label: "Why Us", id: "why-us" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md shadow-card"
          : "bg-white/85 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start text-left group"
          >
            <span className="font-display text-base md:text-lg font-bold text-brand-blue leading-tight group-hover:text-brand-blue/80 transition-colors">
              Dr. Sneha Naik Samant
            </span>
            <span className="text-xs text-muted-foreground font-body">
              Consultant Psychiatrist · Mumbai
            </span>
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {links.map((l) => (
              <button
                type="button"
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm font-body font-medium text-foreground/70 hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
              >
                {l.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollTo("booking")}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white font-body font-semibold rounded-full px-5 shadow-blue-glow"
            >
              Book Appointment
            </Button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-white border-t border-border px-4 py-4 shadow-float"
            aria-label="Mobile navigation"
          >
            {links.map((l) => (
              <button
                type="button"
                key={l.id}
                onClick={() => {
                  scrollTo(l.id);
                  setMenuOpen(false);
                }}
                className="flex items-center w-full py-3 text-sm font-body font-medium text-foreground/80 hover:text-brand-blue transition-colors border-b border-border/40 last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight size={14} className="mr-2 text-brand-blue" />
                {l.label}
              </button>
            ))}
            <Button
              className="mt-4 w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-body font-semibold rounded-full"
              onClick={() => {
                scrollTo("booking");
                setMenuOpen(false);
              }}
            >
              Book Appointment
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  HERO                                                                     */
/* ════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const trustBadges = [
    { icon: <Clock size={14} />, label: "8+ Years Experience" },
    { icon: <Users size={14} />, label: "500+ Patients Helped" },
    { icon: <MapPin size={14} />, label: "Multi-Location Practice" },
    { icon: <Shield size={14} />, label: "Confidential Care" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-doctor-consultation.dim_1400x700.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs font-body font-semibold mb-6"
          >
            <span
              className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
              aria-hidden="true"
            />
            Aura Clinic · Borivali East, Mumbai
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Expert Psychiatrist in Mumbai for{" "}
            <span className="text-sky-200">Adult & Child</span> Mental Health
          </h1>

          <p className="font-body text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Personalised, confidential, and holistic psychiatric care by Dr.
            Sneha Naik Samant.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("booking")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-blue font-body font-bold text-base shadow-float hover:bg-sky-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Book Appointment
              <ChevronRight size={16} aria-hidden="true" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="tel:08850188789"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white font-body font-bold text-base hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone size={16} aria-hidden="true" />
              Call: 088501 88789
            </motion.a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {trustBadges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-body font-semibold"
              >
                <span aria-hidden="true">{b.icon}</span>
                {b.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0 80L60 72C120 64 240 48 360 42.7C480 37 600 43 720 48C840 53 960 59 1080 56C1200 53 1320 43 1380 37.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="oklch(0.985 0.004 228)"
          />
        </svg>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  ABOUT                                                                    */
/* ════════════════════════════════════════════════════════════════════════ */
function AboutSection() {
  const credentials = [
    { label: "MBBS" },
    { label: "MD Psychiatry" },
    { label: "8+ Years Clinical Experience" },
    { label: "Adult & Child Specialist" },
  ];

  return (
    <section id="about" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
              <Heart size={12} aria-hidden="true" />
              About the Doctor
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
              About Dr. Sneha Naik Samant
            </h2>
            <p className="font-body text-sm text-brand-blue font-semibold mb-5">
              Consultant Psychiatrist – Borivali, Mira-Bhayandar & Malad
            </p>
            <p className="font-body text-foreground/75 text-base leading-relaxed mb-7">
              Dr. Sneha Naik Samant is a consultant psychiatrist based in
              Borivali, Mira-Bhayandar, and Malad, providing specialised
              treatment for adults and children experiencing conditions like
              ADHD, depression, anxiety, phobias, and substance de-addiction.
              With over 8 years of experience, she combines medication
              management with personalised counselling to support patients and
              their families. Her practice focuses on improving mental health,
              creating awareness, and de-stigmatising psychiatric disorders,
              while ensuring patient comfort and holistic care.
            </p>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-2">
              {credentials.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-brand-blue text-white text-xs font-body font-semibold"
                >
                  {c.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-float">
              <img
                src="/assets/uploads/dr_sneha-naik-1.png"
                alt="Dr. Sneha Naik Samant – Consultant Psychiatrist"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              {/* Floating credential badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center flex-shrink-0">
                    <Brain
                      size={18}
                      className="text-brand-blue"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm text-foreground">
                      Dr. Sneha Naik Samant
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      MBBS · MD Psychiatry · 8+ Years
                    </p>
                  </div>
                  <div
                    className="ml-auto flex gap-0.5"
                    aria-label="5 star rating"
                  >
                    {[1, 2, 3, 4, 5].map((k) => (
                      <Star
                        key={k}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-brand-lavender -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-brand-mint -z-10"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  CONDITIONS                                                               */
/* ════════════════════════════════════════════════════════════════════════ */
function ConditionsSection() {
  const conditions = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3a6 6 0 0 1 6 6c0 2.04-.64 3.93-1.73 5.48L15 17H9l-1.27-2.52A6 6 0 0 1 12 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v1a3 3 0 0 0 6 0v-1"
          />
        </svg>
      ),
      name: "ADHD (Children & Adults)",
      desc: "Attention, focus & hyperactivity challenges",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.727 12.727.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.364 5.636l.707-.707"
          />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
      name: "Depression",
      desc: "Persistent sadness, loss of motivation & energy",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 9l-2 2-2-2"
          />
        </svg>
      ),
      name: "Anxiety Disorders",
      desc: "Excessive worry, fear & nervousness",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.5s1-5 4-5 4 5 4 5 1-5 4-5 4 5 4 5"
          />
        </svg>
      ),
      name: "Panic Attacks",
      desc: "Sudden intense fear with physical symptoms",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M4 19V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
          />
        </svg>
      ),
      name: "Phobias",
      desc: "Irrational fear of specific objects or situations",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      name: "OCD",
      desc: "Obsessive thoughts & compulsive behaviours",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      name: "Bipolar Disorder",
      desc: "Extreme mood swings & emotional episodes",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"
          />
        </svg>
      ),
      name: "Sleep Disorders",
      desc: "Insomnia, hypersomnia & disrupted sleep patterns",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          />
        </svg>
      ),
      name: "Stress Management",
      desc: "Chronic stress, burnout & overwhelm",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      name: "Substance De-Addiction",
      desc: "Support for alcohol & drug dependency",
    },
  ];

  return (
    <section id="conditions" className="section-pad bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <Brain size={12} aria-hidden="true" />
            Mental Health Conditions
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Conditions We Treat
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-xl mx-auto">
            Expert diagnosis and personalised treatment plans for a wide range
            of mental health conditions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {conditions.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-4 text-center shadow-card border border-brand-blue/10 cursor-default group hover:border-brand-blue/30 hover:shadow-blue-glow transition-all duration-200"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                {c.icon}
              </div>
              <h3 className="font-body font-semibold text-sm text-foreground leading-tight mb-1.5">
                {c.name}
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-tight">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  SERVICES                                                                 */
/* ════════════════════════════════════════════════════════════════════════ */
function ServicesSection() {
  const services = [
    {
      icon: <Stethoscope size={22} aria-hidden="true" />,
      title: "Adult Psychiatry",
      desc: "Comprehensive diagnosis and evidence-based treatment for adults across all mental health conditions.",
    },
    {
      icon: <Baby size={22} aria-hidden="true" />,
      title: "Child & Adolescent Psychiatry",
      desc: "Specialised, age-appropriate care for children and teenagers with developmental and emotional challenges.",
    },
    {
      icon: <Pill size={22} aria-hidden="true" />,
      title: "Medication Management",
      desc: "Evidence-based pharmacotherapy with regular monitoring and adjustment for optimal outcomes.",
    },
    {
      icon: <MessageSquare size={22} aria-hidden="true" />,
      title: "Counselling Therapy",
      desc: "One-on-one talk therapy using CBT and other techniques to build resilience and coping skills.",
    },
    {
      icon: <Home size={22} aria-hidden="true" />,
      title: "Family Counselling",
      desc: "Guidance, communication tools, and support for the whole family unit.",
    },
    {
      icon: <Dumbbell size={22} aria-hidden="true" />,
      title: "Stress & Lifestyle Management",
      desc: "Practical tools for managing chronic stress, burnout, and building a healthier lifestyle.",
    },
    {
      icon: <HeartHandshake size={22} aria-hidden="true" />,
      title: "Addiction Counselling",
      desc: "Compassionate de-addiction support, relapse prevention, and long-term recovery guidance.",
    },
  ];

  return (
    <section id="services" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <Activity size={12} aria-hidden="true" />
            Psychiatric Services
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-xl mx-auto">
            A full spectrum of psychiatric and counselling services delivered
            with compassion and expertise.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative rounded-2xl p-6 border border-border/60 shadow-card hover:shadow-blue-glow hover:-translate-y-1 transition-all duration-200 ${
                i === 0 ? "bg-brand-blue text-white" : "bg-white"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                  i === 0
                    ? "bg-white/20 text-white"
                    : "bg-brand-blue-light text-brand-blue"
                }`}
              >
                {s.icon}
              </div>
              <h3
                className={`font-body font-bold text-base mb-2 ${
                  i === 0 ? "text-white" : "text-foreground"
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`font-body text-sm leading-relaxed ${
                  i === 0 ? "text-white/80" : "text-muted-foreground"
                }`}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  WHY CHOOSE                                                               */
/* ════════════════════════════════════════════════════════════════════════ */
function WhyChooseSection() {
  const reasons = [
    {
      icon: <Clock size={20} aria-hidden="true" />,
      title: "8+ Years of Clinical Experience",
      desc: "Deep expertise across adult and child psychiatric conditions.",
    },
    {
      icon: <UserCheck size={20} aria-hidden="true" />,
      title: "Personalised Treatment Plans",
      desc: "Every patient receives a tailored approach, not a generic protocol.",
    },
    {
      icon: <Heart size={20} aria-hidden="true" />,
      title: "Focus on Holistic Mental Wellness",
      desc: "Integrating mind, body, and lifestyle for complete wellbeing.",
    },
    {
      icon: <MessageCircle size={20} aria-hidden="true" />,
      title: "Friendly & Safe Environment",
      desc: "A warm, non-judgmental environment where you can speak openly.",
    },
    {
      icon: <Shield size={20} aria-hidden="true" />,
      title: "Complete Confidentiality",
      desc: "Your privacy and confidentiality are always fully guaranteed.",
    },
    {
      icon: <MapPin size={20} aria-hidden="true" />,
      title: "Multi-Location Service",
      desc: "Conveniently available in Borivali, Mira-Bhayandar & Malad.",
    },
  ];

  return (
    <section
      id="why-us"
      className="section-pad bg-brand-blue relative overflow-hidden"
    >
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: heading + quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-body font-semibold mb-4 border border-white/20">
              <Star size={12} aria-hidden="true" />
              Why Choose Dr. Sneha?
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Why Choose Dr. Sneha?
            </h2>
            <p className="font-body text-white/75 mb-8">
              When it comes to mental health, who you trust matters deeply. Dr.
              Sneha combines clinical expertise with genuine compassion.
            </p>

            {/* Doctor quote card */}
            <div className="bg-white/12 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div
                className="text-white/40 font-display text-5xl leading-none mb-2 select-none"
                aria-hidden="true"
              >
                "
              </div>
              <p className="font-body text-white/90 text-sm leading-relaxed italic">
                My goal is to make every patient feel heard, understood, and
                hopeful. Mental health is not a luxury — it is a fundamental
                part of your overall wellbeing.
              </p>
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/15">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-display font-bold text-white text-xs">
                    SN
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-white text-xs">
                    Dr. Sneha Naik Samant
                  </p>
                  <p className="font-body text-white/55 text-xs">
                    Consultant Psychiatrist
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: reasons grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2
                      size={18}
                      className="text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-white text-sm mb-1">
                      {r.title}
                    </h3>
                    <p className="font-body text-white/70 text-sm leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  TESTIMONIALS                                                             */
/* ════════════════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const testimonials = [
    {
      initials: "R.S.",
      text: "After years of struggling with anxiety, Dr. Sneha's calm and structured approach finally gave me the tools to manage my daily life. I feel like myself again.",
      condition: "Anxiety Treatment",
    },
    {
      initials: "P.M.",
      text: "My son was diagnosed with ADHD and we were lost. Dr. Sneha explained everything clearly and her treatment plan made a real difference in just a few months.",
      condition: "ADHD Management",
    },
    {
      initials: "A.K.",
      text: "I was skeptical about seeing a psychiatrist but Dr. Sneha made the process so comfortable and non-judgmental. Highly recommend to anyone hesitating.",
      condition: "Depression Treatment",
    },
    {
      initials: "S.D.",
      text: "The family counselling sessions helped us communicate better as a family. Dr. Sneha's holistic approach is truly unique.",
      condition: "Family Counselling",
    },
    {
      initials: "N.J.",
      text: "I overcame my social phobia after 6 months of sessions. Dr. Sneha's patience and expertise are exceptional.",
      condition: "Phobia Treatment",
    },
  ];

  return (
    <section id="testimonials" className="section-pad bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <Star size={12} aria-hidden="true" />
            Patient Stories
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What Patients Say
          </h2>
        </motion.div>
        <p className="font-body text-muted-foreground text-sm text-center mb-10 italic">
          These are illustrative testimonials. Real patient identities are kept
          confidential.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.initials}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-border/60 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((k) => (
                  <Star
                    key={k}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Illustrative badge */}
              <div className="mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-body font-semibold border border-amber-200">
                  Illustrative
                </span>
              </div>

              {/* Quote */}
              <p className="font-body text-foreground/80 text-sm leading-relaxed flex-1 mb-4">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div
                  className="w-9 h-9 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue font-display font-bold text-sm flex-shrink-0"
                  aria-hidden="true"
                >
                  {t.initials.charAt(0)}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    {t.initials}
                  </p>
                  <p className="font-body text-xs text-brand-blue font-medium">
                    {t.condition}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  LOCATION                                                                 */
/* ════════════════════════════════════════════════════════════════════════ */
function LocationSection() {
  return (
    <section id="contact" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <MapPin size={12} aria-hidden="true" />
            Visit Us
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Find Us
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto">
            Conveniently located in Borivali East, Mumbai with multi-location
            services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Address card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-blue-light rounded-3xl p-7 border border-brand-blue/15"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Aura Clinic
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  Primary Location
                </p>
              </div>
            </div>

            <address className="not-italic space-y-3 mb-6">
              <div className="flex gap-3">
                <MapPin
                  size={16}
                  className="text-brand-blue flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  102 C Wing, Shantidwar CHS, Shantivan,
                  <br />
                  Borivali East, Mumbai,
                  <br />
                  Maharashtra 400066
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone
                  size={16}
                  className="text-brand-blue flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:08850188789"
                  className="font-body text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  088501 88789
                </a>
              </div>
              <div className="flex gap-3 items-start">
                <Zap
                  size={16}
                  className="text-brand-blue flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="font-body text-sm text-foreground/70">
                  Borivali · Mira-Bhayandar · Malad
                </p>
              </div>
            </address>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Aura+Clinic+Borivali+East+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white font-body font-semibold text-sm hover:bg-brand-blue/90 transition-colors shadow-blue-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MapPin size={15} aria-hidden="true" />
                Get Directions
              </a>
              <a
                href="tel:08850188789"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-blue border border-brand-blue/30 font-body font-semibold text-sm hover:bg-brand-blue-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Phone size={15} aria-hidden="true" />
                Call Now
              </a>
              <a
                href="https://wa.me/918850188789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-body font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ backgroundColor: "oklch(0.65 0.18 145)" }}
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Info/Hours card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-7 border border-border/60 shadow-card"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue-light flex items-center justify-center flex-shrink-0">
                <Clock
                  size={22}
                  className="text-brand-blue"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Clinic Hours
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  Appointment Schedule
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
                { day: "Saturday", time: "10:00 AM – 5:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center py-2.5 border-b border-border/40 last:border-0"
                >
                  <span className="font-body text-sm text-foreground/70">
                    {h.day}
                  </span>
                  <span
                    className={`font-body text-sm font-semibold ${
                      h.time === "Closed"
                        ? "text-destructive"
                        : "text-brand-blue"
                    }`}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse"
                aria-hidden="true"
              />
              <p className="font-body text-xs text-green-700 font-medium">
                WhatsApp appointments available 24/7
              </p>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-sky-50 border border-sky-200">
              <p className="font-body text-xs text-sky-700 font-medium text-center">
                📍 Also serving Mira-Bhayandar & Malad
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  BOOKING FORM                                                             */
/* ════════════════════════════════════════════════════════════════════════ */
function BookingSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    condition: "",
    preferredTime: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const conditionOptions = [
    "ADHD (Children & Adults)",
    "Depression",
    "Anxiety Disorders",
    "Panic Attacks",
    "Phobias",
    "OCD",
    "Bipolar Disorder",
    "Sleep Disorders",
    "Stress Management",
    "Substance De-Addiction",
    "Other / Not Sure",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.condition || !form.preferredTime) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      if (actor) {
        await actor.submitAppointment(
          form.name,
          form.phone,
          form.condition,
          form.preferredTime,
          BigInt(Date.now()),
        );
      }
    } catch {
      // Non-critical — still redirect to WhatsApp
    }
    const url = buildWhatsAppUrl(
      form.name,
      form.phone,
      form.condition,
      form.preferredTime,
    );
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp to connect with Dr. Sneha!");
    setForm({ name: "", phone: "", condition: "", preferredTime: "" });
    setSubmitting(false);
  }

  return (
    <section id="booking" className="section-pad bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
              <MessageCircle size={12} aria-hidden="true" />
              Get in Touch
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Book an Appointment
            </h2>
            <p className="font-body text-muted-foreground mt-3">
              Fill in your details and we'll connect you on WhatsApp.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-float border border-border/40"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="font-body text-sm font-semibold text-foreground/80"
                >
                  Full Name <span aria-hidden="true">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="font-body rounded-xl border-border"
                  autoComplete="name"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="font-body text-sm font-semibold text-foreground/80"
                >
                  Phone Number <span aria-hidden="true">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  className="font-body rounded-xl border-border"
                  autoComplete="tel"
                />
              </div>

              {/* Condition */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label
                  htmlFor="condition-trigger"
                  className="font-body text-sm font-semibold text-foreground/80"
                >
                  Condition / Concern <span aria-hidden="true">*</span>
                </Label>
                <Select
                  value={form.condition}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, condition: v }))
                  }
                  required
                >
                  <SelectTrigger
                    id="condition-trigger"
                    className="font-body rounded-xl border-border"
                  >
                    <SelectValue placeholder="Select your condition or concern" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionOptions.map((c) => (
                      <SelectItem key={c} value={c} className="font-body">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred time */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label
                  htmlFor="preferredTime"
                  className="font-body text-sm font-semibold text-foreground/80"
                >
                  Preferred Time <span aria-hidden="true">*</span>
                </Label>
                <Input
                  id="preferredTime"
                  type="text"
                  placeholder="e.g. Weekday mornings, Saturday afternoon"
                  value={form.preferredTime}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, preferredTime: e.target.value }))
                  }
                  required
                  className="font-body rounded-xl border-border"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full font-body font-bold text-base text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: "oklch(0.65 0.18 145)",
                boxShadow: "0 4px 20px oklch(0.65 0.18 145 / 0.3)",
              }}
            >
              {submitting ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              )}
              {submitting ? "Connecting…" : "Chat on WhatsApp"}
            </button>

            <p className="font-body text-xs text-muted-foreground text-center mt-3">
              This will open WhatsApp with your details pre-filled for Dr.
              Sneha's team.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  FOOTER                                                                   */
/* ════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const quickLinks = [
    { label: "About", id: "about" },
    { label: "Conditions Treated", id: "conditions" },
    { label: "Services", id: "services" },
    { label: "Why Choose Dr. Sneha", id: "why-us" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Book Appointment", id: "booking" },
  ];

  return (
    <footer className="bg-foreground text-white/80">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              Dr. Sneha Naik Samant
            </h3>
            <p className="font-body text-sm text-white/60 mb-4">
              Consultant Psychiatrist · Aura Clinic, Mumbai
            </p>
            <p className="font-body text-sm text-white/65 leading-relaxed mb-5 max-w-xs">
              Providing compassionate, holistic psychiatric care for adults and
              children across Borivali, Mira-Bhayandar, and Malad.
            </p>
            <a
              href="https://wa.me/918850188789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: "oklch(0.65 0.18 145)" }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-body font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(l.id)}
                    className="font-body text-sm text-white/65 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <MapPin
                  size={14}
                  className="text-sky-400 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="font-body text-sm text-white/65 leading-relaxed">
                  102 C Wing, Shantidwar CHS, Shantivan,
                  <br />
                  Borivali East, Mumbai 400066
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Phone
                  size={14}
                  className="text-sky-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:08850188789"
                  className="font-body text-sm text-white/65 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm"
                >
                  088501 88789
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <Zap
                  size={14}
                  className="text-sky-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="font-body text-sm text-white/65">
                  Borivali · Mira-Bhayandar · Malad
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-body text-xs text-white/40">
              © {new Date().getFullYear()} Dr. Sneha Naik Samant – Aura Clinic.
              All rights reserved.
            </p>
            <p className="font-body text-xs text-white/30">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-white/70 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
          <p className="font-body text-[11px] text-white/30 text-center">
            This website is for informational purposes only and does not
            constitute medical advice. Please consult a qualified healthcare
            professional for diagnosis and treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  STICKY FLOATING BUTTONS                                                  */
/* ════════════════════════════════════════════════════════════════════════ */
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 items-end">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/918850188789"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 pr-4 pl-3 py-3 rounded-full text-white font-body font-semibold text-sm shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{ backgroundColor: "oklch(0.65 0.18 145)" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-white flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:08850188789"
        title="Call Dr. Sneha"
        aria-label="Call Dr. Sneha: 088501 88789"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 pr-4 pl-3 py-3 rounded-full text-white font-body font-semibold text-sm bg-brand-blue shadow-blue-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Phone size={18} className="flex-shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">Call Now</span>
      </motion.a>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  APP ROOT                                                                 */
/* ════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ConditionsSection />
        <ServicesSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <LocationSection />
        <BookingSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
