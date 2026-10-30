# Nacre Dental design system

## Direction

Nacre uses an editorial, optimistic approach to clinical care. Large display typography, warm mineral colours, candid close-crop photography and simple geometric shapes create a premium Downtown Dubai identity without making the clinic feel cold.

## Foundations

- Typeface: Onest, weights 400 and 500.
- Display tracking: `-0.055em` with line-height between `0.95` and `1`.
- Body line-height: `1.45–1.5`.
- Main gutter: `clamp(1.25rem, 3.2vw, 3.5rem)`.
- Card radius: `1.4rem`; pill actions use `999px`.
- Rules: `1.5px` in the current text colour at 30–55% opacity where needed.

## Colour tokens

| Token | Value | Use |
| --- | --- | --- |
| Cream | `#f5efdd` | Main page field and calm content sections |
| Rust | `#9b4325` | Primary brand field and conversion sections |
| Dark rust | `#6f2b18` | Text on bright backgrounds |
| Lime | `#e7f24b` | Calls to action, seals and highlights |
| Lavender | `#a99aec` | Specialists, editorial feature sections |
| Lilac | `#e1c8f4` | FAQ and softer supporting content |
| Peach | `#efc4a4` | Portrait and audience accents |
| Gold | `#f3d47d` | Service-card accent |
| Blue | `#bdd2f4` | Specialist and service accent |
| Ink | `#672914` | Default text and rules |
| White | `#fffdf8` | Text on rust and clean cards |

## Components

- Header: white wordmark at the upper left, a two-line menu mark centred above the image, and uppercase navigation stacked at the upper right. Hero navigation does not use a booking pill.
- Hero: full-viewport, full-bleed photography darkened slightly at image level for contrast. The oversized title stays near two lines at the lower left and a short supporting sentence sits subtly at the lower right.
- Buttons: lime is primary, rust is secondary on light fields, cream is used on rust.
- Service rows: oversized labels, thin rules, one image and a clear detail-page link.
- Cards: large fields of colour with minimal borders; colour establishes grouping.
- Testimonials: three-card editorial grids use white, gold and lilac fields. Seed names and review copy are stored as replaceable content for the client handoff.
- Doctor imagery: transparent clinician cutouts are layered over the clinic interior for real photographic context. The same high-resolution portrait source is reused from homepage thumbnail to profile hero.
- Doctor profiles: include care approach, professional background, credentials and doctor-specific stories. All current profile data is editable seed content for the client handoff.
- FAQ: native `details` elements with large questions and plus-to-close motion.
- Forms: visible labels, solid 1.5px outlines and plain-language helper copy.
- Footer: four-column rust field with lime section labels.

## Motion

- GSAP hero and scroll reveals use `power4.out` and remain under 1.5 seconds.
- Service expansion is 720ms; closing is 420ms.
- Carousels support arrows, pointer drag and native touch swipe.
- Reduced-motion preferences disable long transitions and smooth scrolling.

## Content rules

- Lead with the patient’s question, then answer it in the first sentence.
- Use specific service names and Downtown Dubai naturally; avoid repeated keyword strings.
- Explain suitability, sequence, comfort and aftercare without guarantees.
- Pair every important service with a clear booking or consultation route.
- Review and doctor content must be verified by the clinic before launch.
