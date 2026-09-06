# Cruise affiliate linkage — 2026-09-06

## Request source

- Jetsetter Costa Serena campaign: `https://www.jetsetter.kr/?UseCache=false&id=30313`

The page promotes two Busan-departure Costa Serena products:

- Busan → Kobe, 2 nights / 3 days, departing 2026-09-12.
- Busan → Sasebo → Shanghai → Jeju → Busan, 5 nights / 6 days, departed 2026-09-02.

## Affiliate decision

- **Jetsetter:** no public affiliate/referral parameter or partner program was found on the campaign, product, navigation, or footer surfaces checked. Its direct product URLs therefore must not be labelled as affiliate links.
- **Trip.com:** the same Costa Serena Busan → Kobe sailing is listed on Trip.com, and Wakation already has the verified `Allianceid=9024807` partner relationship. The production link uses the evergreen Busan-departure cruise hub so the card does not become a dead dated offer after the September sailing.
- **KKday:** product 589493 matches the September 12 sailing but was marked sold out when checked, so it is not exposed.
- **Expired itinerary:** the Jetsetter September 2 sailing is not exposed because its departure date has passed.

## Production link

`https://kr.trip.com/cruises/from-busan-253/?Allianceid=9024807`

The EN/JA host is localized by `localizeOutboundHref`; the path and `Allianceid` query parameter remain unchanged.

## Guardrails

- Do not identify Jetsetter as an affiliate until a documented tracking agreement and link are supplied.
- Do not present a sold-out or departed itinerary as bookable.
- Do not hard-code a near-expiry fare. The new card sends users to live partner inventory and displays no static price.
- Preserve `rel="sponsored noopener noreferrer"` and existing `affiliate_click` tracking through `AffiliateCard`.
