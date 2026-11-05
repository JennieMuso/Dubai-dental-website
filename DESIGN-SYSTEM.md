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
| Cream | `#fff6ec` | Main page field and calm content sections |
| Burgundy | `#6c151e` | Primary brand field and conversion sections |
| Dark burgundy | `#4b0e15` | Default text and rules on light surfaces |
| Light cream | `#f5dabf` | Calls to action, navigation hover and highlights |
| Warm brown | `#dfb991` | Testimonial card surface |
| White | `#fffaf4` | Clean audience cards and text on burgundy |

## Components

- Header: centred floating pill with a frosted cream hero state and a solid cream state after scrolling past the hero. On tablet and mobile it becomes a two-line menu control and full-viewport menu.
- Hero: full-viewport, full-bleed photography darkened slightly at image level for contrast. The oversized title stays near two lines at the lower left and a short supporting sentence sits subtly at the lower right.
- Buttons: light cream is primary, burgundy is secondary on light fields, and every action has hover, pressed and keyboard-focus states.
- Service rows: oversized labels, thin rules, one image and a clear detail-page link.
- Cards: large fields of colour with minimal borders; colour establishes grouping.
- Testimonials: three-card editorial grids use the warm-brown surface for separation from cream sections. Seed names and review copy are stored as replaceable content for the client handoff.
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
