# Dr. Sneha Naik Samant – Psychiatrist Website

## Current State
New project. No existing frontend or backend code.

## Requested Changes (Diff)

### Add
- Full multi-section marketing/clinic website for Dr. Sneha Naik Samant, consultant psychiatrist in Mumbai
- Hero section with headline, subheadline, and two CTAs (Book Appointment scrolling to form, Call Now tel link)
- About section with bio, 8+ years experience, counselling + medication approach
- Conditions Treated section with 10 condition cards (ADHD, Depression, Anxiety, Panic Attacks, Phobias, OCD, Bipolar Disorder, Sleep Disorders, Stress Management, Substance De-Addiction)
- Services section with 7 service cards
- Why Choose section with 6 bullet trust points
- Testimonials section with 4–5 sample testimonials (clearly marked as illustrative)
- Clinic Location section: address card for Aura Clinic, Borivali East + "Get Directions" button linking to Google Maps
- Appointment Booking section: form with Name, Phone, Condition, Preferred Time fields; submit redirects to WhatsApp pre-filled message
- Footer with address, phone, service areas, WhatsApp button, copyright
- Sticky floating WhatsApp + Call buttons (bottom-right)
- SEO: optimized page title, meta description, Open Graph tags, JSON-LD schema for MedicalClinic and Physician

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Write spec.md (this file)
2. Generate hero wellness/consultation image and doctor profile placeholder image
3. Select no special Caffeine components needed (no auth, no blob storage)
4. Generate Motoko backend with a simple appointment inquiry store (name, phone, condition, preferred time, timestamp)
5. Build React frontend with all sections, SEO meta tags, WhatsApp redirect logic (pre-filling name/phone/condition into wa.me message), sticky buttons, and responsive layout
