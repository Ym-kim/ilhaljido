# Wakation Motion System v1

Motion should explain hierarchy, state or direction. It must not manufacture urgency or make a travel editorial feel like an animated advertisement.

## Tokens

| Token | Value | Use |
| --- | ---: | --- |
| `--wak-motion-micro` | 150 ms | Icon and direct-control feedback |
| `--wak-motion-ui` | 220 ms | Menu, disclosure and compact state change |
| `--wak-motion-reveal` | 520 ms | Standard one-shot section reveal |
| `--wak-motion-editorial` | 720 ms | Hero or major editorial composition only |
| `--wak-motion-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | UI feedback |
| `--wak-motion-ease-emphasis` | `cubic-bezier(0.22, 1, 0.36, 1)` | Editorial arrival |

## Patterns

- `data-motion="reveal"`: 18px upward fade, once per mount.
- `data-motion-variant="fade"`: opacity only for dense or dark sections.
- `data-motion-variant="left"`: 18px horizontal arrival for relationship diagrams.
- `data-motion-speed="editorial"`: 720ms, reserved for major compositions.
- `data-motion-order="1"` through `6`: optional 60ms stagger increments. Do not stagger long lists.

`MotionRuntime` is one small client boundary. It observes declarative targets, marks already visible content before enabling the hidden state, observes dynamically inserted Trip Match questions, and unobserves an element after its first reveal. The rest of each page remains in its existing server/client boundary.

## Continuous motion

Continuous motion is exceptional:

- Home hero zoom is limited to 3.5% over 32 seconds.
- The recommendation ticker takes 76 seconds, pauses on hover and focus, and has a persistent play/pause button with localized accessible names.
- Decorative status dots do not pulse.
- Pulse and spin remain only where they communicate loading, and stop under reduced motion.

## Reduced motion

At `prefers-reduced-motion: reduce`:

- reveal targets are visible without translation;
- `animate-rise` is explicitly reset to opacity 1;
- Ken Burns and ticker transforms stop;
- transition and animation durations collapse to 0.01ms;
- smooth scrolling is disabled;
- content, state and CTA availability remain unchanged.

## Accessibility and performance

- Motion never carries the only state signal.
- Continuous motion has a keyboard-operable pause control with a 44px target.
- Reveal uses opacity and transform only.
- No animation library or new font/image payload was added.
- `will-change` is removed after a reveal completes.
- The runtime emits only the non-personal `motion_preference_detected` event; the ticker toggle emits `promo_ticker_motion_toggled`.

## Authoring rules

1. Prefer a direct state change under 220ms for controls.
2. Add a section reveal only when it marks a new decision or chapter.
3. Never animate every card in a product grid.
4. Never use pulse, bounce, countdown or shake to imply demand or urgency.
5. Verify 390×844, 1440×900 and reduced motion before merging.
