# Stay Pilot home entry v1 — 2026-09

## Scope

- When a user selects Fukuoka, Osaka or Tokyo in the Home Hero and supplies a valid check-in/check-out pair, route the search through the server-gated Stay Pilot entry.
- Preserve the current Booking.com redirect for free-form destinations, all other cities and searches without dates.
- Prefill destination, dates and the default two-adult party on the internal Pilot page, then run the search once because the user already submitted the Home form.
- Attribute the resulting search, result and fallback events to the Home Hero without storing free-form destination text or personal information.

## Safety

- The browser does not read `AGODA_STAY_PILOT` or any Agoda credential.
- The server entry route validates locale, destination, dates and guest bounds.
- When the private feature flag is disabled, the entry route returns the existing Booking.com affiliate search with `aid=7854081` instead of a broken Pilot page.
- Agoda failures after entry continue to use the existing Booking fallback in the Stay Engine.
- Only provider-returned landing URLs are used for Agoda property CTAs.

## Rollback

Remove the Home call to `buildStayPilotEntryHref` and the `/api/stays/entry` route. The existing Booking redirect path then becomes the only Home behavior again. No migration, environment change or affiliate parameter change is involved.
