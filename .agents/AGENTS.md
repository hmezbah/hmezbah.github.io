# Developer Instructions — Habibullah Mezbah Portfolio

This project is a premium, responsive personal portfolio website for **Habibullah Mezbah**, a professional Web Developer based in Dhaka, Bangladesh. When updating or modifying this repository, adhere strictly to these architectural patterns, configurations, and structures.

---

## Technical Stack & Architecture

- **Core**: Pure HTML5, Vanilla CSS3, and modern ES6 JavaScript. No framework overhead (no React/Vue/Next/Nuxt dependencies) and no CSS libraries (no Bootstrap, no Tailwind) are to be introduced unless requested.
- **Hosting**: Pre-configured for static hostings like **GitHub Pages (`github.io`)**, Netlify, and Vercel.

---

## File System Map

```
my portfolio website/
├── .agents/
│   └── AGENTS.md            # Agent workspace instructions (This file)
├── index.html              # Core HTML structure (11 semantic sections)
├── sitemap.xml             # XML sitemap for SEO indexes
├── css/
│   ├── style.css           # Custom properties, typography, grids, layout
│   └── animations.css      # Keyframes, scroll animations, micro-interactions
├── js/
│   ├── main.js             # Nav, counting stats, carousel, contact AJAX
│   ├── theme.js            # Dark/light mode local storage persistence
│   └── animations.js       # Intersection Observer setup for scroll fades
├── assets/
│   ├── images/             # PNG mockups for project screens & avatars
│   └── resume/             # Contains CV (Habibullah-Mezbah-CV.pdf)
```

---

## Design System Guidelines

- **Themes**: Supports Dark (default/system matched) and Light themes using the `data-theme` attribute on the `<html>` node. Always write color properties using CSS custom vars (e.g. `var(--bg-primary)`).
- **Typography**: Inter (Body/Headings) and JetBrains Mono (Tech Tags/Code blocks).
- **Grid Layout**: 
  - Desktop: 3-column cards (`repeat(3, 1fr)`) for portfolio projects; 3-column for blog and services.
  - Tablet (1024px): 2-column cards (`repeat(2, 1fr)`).
  - Mobile (768px): 1-column list (`1fr`).

---

## Completed Modules & Integrations

### 1. Contact Form Mail Integration
- **Backend Service**: Uses **FormSubmit.co** AJAX API.
- **Endpoint**: `https://formsubmit.co/ajax/hmezbah@gmail.com`
- **AJAX Code**: Form submission is handled asynchronously in `js/main.js` using `fetch()`. The loading text defaults to "Sending..." and button is disabled during submission.
- **Config**: Disables reCAPTCHA confirmation screens via hidden input `<input type="hidden" name="_captcha" value="false">` for a smooth inline message experience.

### 2. Portfolio Projects List (13 Active Cards)

Any AI assistant can use this catalog to identify, edit, or reference the 13 active portfolio cards in `index.html`:

| # | Project Name | Category | Live URL | Tech Stack | Key Features |
|---|---|---|---|---|---|
| 1 | Wholesale Textile & Garments Trading ERP | `erp` | *(Demo Request)* | Laravel, PHP, MySQL, Bootstrap | Inventory, Sales/Purchase, Accounting, Debtors/Creditors |
| 2 | Police Force Mess Management System | `laravel` | *(Demo Request)* | Laravel, PHP, MySQL, Bootstrap | Meal tracking, Financials, Members, PDF/Excel reports |
| 3 | Bismillah Computer & Technology | `laravel` | `https://bct.com.bd/` | Laravel, PHP, MySQL, JS | Tech catalog, Service requests, Portal dashboards |
| 4 | Opus Technology Limited | `laravel` | `https://opus-bd.com/` | Laravel, PHP, MySQL, Bootstrap | Software showcases, Dynamic inquiries, Careers, Portfolio |
| 5 | বাংলাদেশ পুলিশ নারী কল্যাণ সমিতি (পুনাক) | `wordpress` | `https://punak.police.gov.bd/` | WordPress, PHP, Custom Theme | notice boards, Event photo galleries, Bengali localization |
| 6 | Design Hub | `wordpress` | `https://designhub-bd.com/` | WordPress, Elementor, CSS | Visual portfolio, Intake forms, Agency service listings |
| 7 | HouseofIT.uk | `wordpress` | `https://houseofit.uk/` | WordPress, Elementor, SEO | IT services directory, Client ticket portals, Security audits |
| 8 | AST Fashion Limited | `wordpress` | `https://astfashionbd.com/` | WordPress, WooCommerce, PHP | Garments catalog grid, Sourcing forms, Global buyer portal |
| 9 | Lenient Fashion Ltd. | `wordpress` | `https://lenientfashion.com/` | WordPress, PHP, Custom Theme | Sustainable fabric catalog, Factory tour media, Exporter info |
| 10 | Expect Apparel Ltd. | `wordpress` | `https://expectapparelbd.com/` | WordPress, PHP, Elementor | Capacity trackers, Supply chain maps, Exporter catalog |
| 11 | BlueArc Sourcing | `wordpress` | `https://bluearcsourcing.net/` | WordPress, Elementor, PHP | Buyer portal, Sourcing maps, RFQ dynamic forms |
| 12 | Ignite Global Ltd | `wordpress` | `https://ignitegloballtd.com/` | WordPress, SEO, PHP | Consultation intakes, Trade networks map, Enterprise layout |
| 13 | Aust Alumni Association of EEE (AAAEEE) | `wordpress` | `https://aaaeee.org/` | WordPress, PHP, Custom Theme | Alumni directory, Subscription sign-ups, Event coordinators |

### 3. Social Integrations
- WhatsApp icon added next to LinkedIn and GitHub pointing directly to `https://wa.me/8801722734209`.
- WhatsApp text link added to the footer Connect column.

### 4. CV Download
- Download CV link in the hero section opens `assets/resume/Habibullah-Mezbah-CV.pdf` in a new tab (`target="_blank"`).
