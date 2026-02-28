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
          ? "bg-white/95 backdrop-blur-md shadow-card"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-site px-4 md:px-8 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start text-left"
          >
            <span className="font-display text-base md:text-lg font-bold text-brand-blue leading-tight">
              Dr. Sneha Naik Samant
            </span>
            <span className="text-xs text-muted-foreground font-body">
              Psychiatrist · Mumbai
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <button
                type="button"
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm font-body font-medium text-foreground/70 hover:text-brand-blue transition-colors"
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
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-white border-t border-border px-4 py-4 shadow-float"
          >
            {links.map((l) => (
              <button
                type="button"
                key={l.id}
                onClick={() => {
                  scrollTo(l.id);
                  setMenuOpen(false);
                }}
                className="flex items-center w-full py-3 text-sm font-body font-medium text-foreground/80 hover:text-brand-blue transition-colors border-b border-border/40 last:border-0"
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
          </motion.div>
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
    { icon: <Users size={14} />, label: "Adult & Child Psychiatry" },
    { icon: <Shield size={14} />, label: "Confidential Care" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-consultation.dim_1200x600.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 container-site px-4 md:px-8 mx-auto py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs font-body font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Aura Clinic · Borivali East, Mumbai
          </div>

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
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-blue font-body font-bold text-base shadow-float hover:bg-sky-50 transition-colors"
            >
              Book Appointment
              <ChevronRight size={16} />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="tel:08850188789"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white font-body font-bold text-base hover:bg-white/25 transition-colors"
            >
              <Phone size={16} />
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
                {b.icon}
                {b.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
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
  const stats = [
    { value: "8+", label: "Years Experience" },
    { value: "Adults & Children", label: "Patients Served" },
    { value: "Holistic", label: "Care Approach" },
  ];

  return (
    <section id="about" className="section-pad bg-white">
      <div className="container-site px-4 md:px-8 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
              <Heart size={12} />
              About the Doctor
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
              About Dr. Sneha Naik Samant
            </h2>
            <p className="font-body text-sm text-brand-blue font-semibold mb-5">
              Consultant Psychiatrist – Borivali, Mira-Bhayandar & Malad
            </p>
            <p className="font-body text-foreground/75 text-base leading-relaxed mb-8">
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

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-brand-blue-light rounded-2xl p-4 text-center border border-brand-blue/10"
                >
                  <div className="font-display text-xl font-bold text-brand-blue mb-1">
                    {s.value}
                  </div>
                  <div className="font-body text-xs text-foreground/65 leading-tight">
                    {s.label}
                  </div>
                </motion.div>
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
                src="/assets/generated/wellness-abstract.dim_800x600.jpg"
                alt="Mental wellness illustration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Floating credential badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center flex-shrink-0">
                    <Brain size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm text-foreground">
                      Dr. Sneha Naik Samant
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      MBBS · MD Psychiatry · 8+ Years
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                      <Star
                        key={k}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
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
      emoji: "🧠",
      name: "ADHD (Children & Adults)",
      desc: "Attention, focus & hyperactivity challenges",
    },
    {
      emoji: "🌧️",
      name: "Depression",
      desc: "Persistent sadness, loss of motivation & energy",
    },
    {
      emoji: "😰",
      name: "Anxiety Disorders",
      desc: "Excessive worry, fear & nervousness",
    },
    {
      emoji: "💨",
      name: "Panic Attacks",
      desc: "Sudden intense fear with physical symptoms",
    },
    {
      emoji: "🕷️",
      name: "Phobias",
      desc: "Irrational fear of specific objects or situations",
    },
    {
      emoji: "🔄",
      name: "OCD",
      desc: "Obsessive thoughts & compulsive behaviours",
    },
    {
      emoji: "⚡",
      name: "Bipolar Disorder",
      desc: "Extreme mood swings & emotional episodes",
    },
    {
      emoji: "🌙",
      name: "Sleep Disorders",
      desc: "Insomnia, hypersomnia & disrupted sleep",
    },
    {
      emoji: "🔥",
      name: "Stress Management",
      desc: "Chronic stress, burnout & overwhelm",
    },
    {
      emoji: "🤝",
      name: "Substance De-Addiction",
      desc: "Support for alcohol & drug dependency",
    },
  ];

  return (
    <section id="conditions" className="section-pad bg-muted/40">
      <div className="container-site px-4 md:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <Brain size={12} />
            Conditions We Treat
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Conditions We Treat
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-xl mx-auto">
            Expert diagnosis and personalised treatment plans for a wide range
            of mental health conditions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {conditions.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-4 text-center shadow-card border border-border/60 cursor-default group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {c.emoji}
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
      icon: <Stethoscope size={22} />,
      title: "Adult Psychiatry",
      desc: "Comprehensive diagnosis and evidence-based treatment for adults across all mental health conditions.",
    },
    {
      icon: <Baby size={22} />,
      title: "Child & Adolescent Psychiatry",
      desc: "Specialised, age-appropriate care for children and teenagers with developmental and emotional challenges.",
    },
    {
      icon: <Pill size={22} />,
      title: "Medication Management",
      desc: "Evidence-based pharmacotherapy with regular monitoring and adjustment for optimal outcomes.",
    },
    {
      icon: <MessageSquare size={22} />,
      title: "Counselling Therapy",
      desc: "One-on-one talk therapy using CBT and other techniques to build resilience and coping skills.",
    },
    {
      icon: <Home size={22} />,
      title: "Family Counselling",
      desc: "Guidance, communication tools, and support for the whole family unit.",
    },
    {
      icon: <Dumbbell size={22} />,
      title: "Stress & Lifestyle Management",
      desc: "Practical tools for managing chronic stress, burnout, and building a healthier lifestyle.",
    },
    {
      icon: <HeartHandshake size={22} />,
      title: "Addiction Counselling",
      desc: "Compassionate de-addiction support, relapse prevention, and long-term recovery guidance.",
    },
  ];

  return (
    <section id="services" className="section-pad bg-white">
      <div className="container-site px-4 md:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <Activity size={12} />
            Our Services
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
      icon: <Clock size={20} />,
      title: "8+ Years of Clinical Experience",
      desc: "Deep expertise across adult and child psychiatric conditions.",
    },
    {
      icon: <UserCheck size={20} />,
      title: "Personalised Treatment Plans",
      desc: "Every patient receives a tailored approach, not a generic protocol.",
    },
    {
      icon: <Heart size={20} />,
      title: "Holistic Mental Wellness",
      desc: "Integrating mind, body, and lifestyle for complete wellbeing.",
    },
    {
      icon: <Shield size={20} />,
      title: "Friendly & Non-Judgmental",
      desc: "A safe, warm environment where you can speak openly.",
    },
    {
      icon: <Shield size={20} />,
      title: "Complete Confidentiality",
      desc: "Your privacy and confidentiality are always fully guaranteed.",
    },
    {
      icon: <MapPin size={20} />,
      title: "Multi-Location Service",
      desc: "Conveniently available in Borivali, Mira-Bhayandar & Malad.",
    },
  ];

  return (
    <section
      id="why-us"
      className="section-pad bg-brand-blue relative overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-site px-4 md:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-body font-semibold mb-4 border border-white/20">
            <Star size={12} />
            Why Choose Dr. Sneha?
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Why Choose Dr. Sneha?
          </h2>
          <p className="font-body text-white/75 mt-3 max-w-xl mx-auto">
            When it comes to mental health, who you trust matters deeply.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 hover:bg-white/18 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={18} className="text-white" />
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
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
/*  TESTIMONIALS                                                             */
/* ════════════════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya M.",
      location: "Mumbai",
      text: "Dr. Sneha helped me understand my anxiety and gave me the tools to manage it. I feel like a new person.",
    },
    {
      name: "Rajesh K.",
      location: "Borivali",
      text: "My son was struggling with ADHD and we didn't know where to turn. Dr. Sneha's guidance changed everything for our family.",
    },
    {
      name: "Ananya S.",
      location: "Malad",
      text: "She listens without judgment and explains everything clearly. I finally feel understood and hopeful.",
    },
    {
      name: "Suresh P.",
      location: "Mira Road",
      text: "After years of avoiding help, Dr. Sneha made me feel safe and supported. Best decision I ever made.",
    },
    {
      name: "Meera T.",
      location: "Mumbai",
      text: "The combination of therapy and medication has transformed my life. I'm grateful for Dr. Sneha's compassionate approach.",
    },
  ];

  return (
    <section id="testimonials" className="section-pad bg-muted/40">
      <div className="container-site px-4 md:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <Star size={12} />
            Patient Stories
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What Patients Say
          </h2>
        </motion.div>
        <p className="font-body text-muted-foreground text-sm text-center mb-10 italic">
          * These are illustrative testimonials — names changed for privacy
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-border/60 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                  <Star
                    key={k}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              {/* Quote */}
              <div className="text-brand-blue text-3xl font-display leading-none mb-2 select-none">
                "
              </div>
              <p className="font-body text-foreground/80 text-sm leading-relaxed flex-1 mb-4">
                {t.text}
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="w-9 h-9 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue font-display font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
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
      <div className="container-site px-4 md:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
            <MapPin size={12} />
            Find Us
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Find Us
          </h2>
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
              <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center">
                <MapPin size={22} className="text-white" />
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
                <Phone size={16} className="text-brand-blue flex-shrink-0" />
                <a
                  href="tel:08850188789"
                  className="font-body text-sm font-semibold text-brand-blue hover:underline"
                >
                  088501 88789
                </a>
              </div>
              <div className="flex gap-3 items-start">
                <Zap
                  size={16}
                  className="text-brand-blue flex-shrink-0 mt-0.5"
                />
                <p className="font-body text-sm text-foreground/70">
                  Borivali · Mira-Bhayandar · Malad
                </p>
              </div>
            </address>

            <a
              href="https://maps.google.com/?q=Aura+Clinic+Borivali+East+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white font-body font-semibold text-sm hover:bg-brand-blue/90 transition-colors shadow-blue-glow"
            >
              <MapPin size={15} />
              Get Directions
            </a>
          </motion.div>

          {/* Hours card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-7 border border-border/60 shadow-card"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue-light flex items-center justify-center">
                <Clock size={22} className="text-brand-blue" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Opening Hours
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  Clinic Schedule
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { day: "Monday", time: "10:00 AM – 7:00 PM" },
                { day: "Tuesday", time: "10:00 AM – 7:00 PM" },
                { day: "Wednesday", time: "10:00 AM – 7:00 PM" },
                { day: "Thursday", time: "10:00 AM – 7:00 PM" },
                { day: "Friday", time: "10:00 AM – 7:00 PM" },
                { day: "Saturday", time: "10:00 AM – 7:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center py-2 border-b border-border/40 last:border-0"
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
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
              <p className="font-body text-xs text-green-700 font-medium">
                WhatsApp appointments available anytime
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
        await actor.submitInquiry(
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
      <div className="container-site px-4 md:px-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-body font-semibold mb-4 border border-brand-blue/20">
              <MessageCircle size={12} />
              Book an Appointment
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Book an Appointment
            </h2>
            <p className="font-body text-muted-foreground mt-3">
              Fill in your details and we'll connect you on WhatsApp
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-float border border-border/40"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="font-body text-sm font-semibold text-foreground/80"
                >
                  Full Name *
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
                  Phone Number *
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
                  htmlFor="condition"
                  className="font-body text-sm font-semibold text-foreground/80"
                >
                  Condition / Concern *
                </Label>
                <Select
                  value={form.condition}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, condition: v }))
                  }
                  required
                >
                  <SelectTrigger
                    id="condition"
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
                  Preferred Time *
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
              className="mt-6 w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full font-body font-bold text-base text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "oklch(0.65 0.18 145)",
                boxShadow: "0 4px 20px oklch(0.65 0.18 145 / 0.3)",
              }}
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
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
              {submitting ? "Sending…" : "Send via WhatsApp"}
            </button>

            <p className="font-body text-xs text-muted-foreground text-center mt-3">
              This will open WhatsApp with your details pre-filled.
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
      <div className="container-site px-4 md:px-8 mx-auto py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              Dr. Sneha Naik Samant
            </h3>
            <p className="font-body text-sm text-white/60 mb-4">
              Consultant Psychiatrist · Mumbai
            </p>
            <p className="font-body text-sm text-white/65 leading-relaxed mb-5 max-w-xs">
              Providing compassionate, holistic psychiatric care for adults and
              children across Borivali, Mira-Bhayandar, and Malad.
            </p>
            <a
              href="https://wa.me/918850188789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "oklch(0.65 0.18 145)" }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(l.id)}
                    className="font-body text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

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
                />
                <p className="font-body text-sm text-white/65 leading-relaxed">
                  102 C Wing, Shantidwar CHS, Shantivan, Borivali East, Mumbai
                  400066
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Phone size={14} className="text-sky-400 flex-shrink-0" />
                <a
                  href="tel:08850188789"
                  className="font-body text-sm text-white/65 hover:text-white transition-colors"
                >
                  088501 88789
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <Zap size={14} className="text-sky-400 flex-shrink-0" />
                <p className="font-body text-sm text-white/65">
                  Borivali · Mira-Bhayandar · Malad
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} Dr. Sneha Naik Samant. All rights
            reserved.
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
        className="flex items-center gap-2 pr-4 pl-3 py-3 rounded-full text-white font-body font-semibold text-sm shadow-float"
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
        aria-label="Call Dr. Sneha"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 pr-4 pl-3 py-3 rounded-full text-white font-body font-semibold text-sm bg-brand-blue shadow-blue-glow"
      >
        <Phone size={18} className="flex-shrink-0" />
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
      <main>
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
