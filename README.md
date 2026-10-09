# ◆ Manx Sailings

A small, offline-capable Isle of Man ferry planner in the 42.uk terminal theme.

[Open the live website](https://marroccofella-ops.github.io/manx-sailings/) · [Source repository](https://github.com/marroccofella-ops/manx-sailings)

Choose a route and date. See departures, arrival times, overnight crossings, the next listed sailing, and alternative English ports on days with no service.

## Run in your browser

Open **Manx-Sailings-Standalone.html** directly for the self-contained offline app. No installation, API key, account, or network access is required. Official-source links need internet access.

For the multi-file app, serve this directory with a static HTTP server and open `index.html`. GitHub Pages serves the same entry point.

## Features

- Liverpool, Heysham and Larne in both directions.
- 402 published departures: 331 UK entries and 71 Larne entries.
- Next departure and alternative-port suggestions derived from the actual data.
- Seven-day departure strip and full route timetable.
- Ireland coverage notes, vessel profiles, freight guidance and travel help.
- Semantic HTML, keyboard-friendly controls, responsive layout and printable views.
- No analytics, trackers, third-party scripts, cookies, remote fonts or paid services.

## Data and limitations

This is an independent timetable companion, not an official Steam Packet product. It does not provide live sailing status, availability, ticket prices or freight capacity. Always check [Steam Packet's official status](https://www.steam-packet.com/sailing-status) before travel.

England data covers 21 September–30 November 2026. Larne data covers 2 September–30 November 2026. Dublin dates are not included in the linked autumn source; selecting Dublin directs readers to the operator rather than inventing sailings.

The [Ireland timetable PDF](https://www.steam-packet.com/media/b4toofjz/ireland-timetable-sept-oct-nov-2026-v2.pdf) contains a November-section Larne return printed as **16/10/2026, 01:00–06:15, Ben My Chree**. That inconsistent row is withheld. Neither 16 October nor 16 November is assumed confirmed.

The interface calculates differences between published local clock times. Daylight-saving changes may affect elapsed journey time. Fleet overview information does not override the vessel printed for a departure.

## Sources

- [Official routes and timetables](https://www.steam-packet.com/routes-and-times)
- [Ireland autumn 2026 timetable](https://www.steam-packet.com/media/b4toofjz/ireland-timetable-sept-oct-nov-2026-v2.pdf)
- [Official fleet](https://www.steam-packet.com/about-us/our-vessels)
- [Commercial and freight](https://www.steam-packet.com/ferry/commercial-freight)
- [Passenger help](https://www.steam-packet.com/frequently-asked-questions)

Reference information reviewed 7 October 2026. Dates and guidance are snapshots, not an automatic update service.

## Development

Vanilla HTML, CSS and JavaScript with no build dependencies. Run `node tests.cjs` for data and planner checks. Run `node build.cjs` after changing source files to regenerate the standalone HTML.

Contributions that improve accessibility, source validation and clarity are welcome. Include evidence for timetable changes and preserve explicit source conflicts.

## License

App code and original documentation are MIT-licensed. Timetable facts are attributed to Steam Packet; the MIT license does not grant rights to the operator's trademarks, branding, source PDFs or third-party material. See [DATA-SOURCES.md](DATA-SOURCES.md).

Part of the **42.uk universe**. **RELAX. IT'S ALREADY OVER.**

## Project identity and media

Part of the Mannin Knowledge Engine, with 42.uk styling, a 52.uk reference and Promptus.ai project credit. AI-generated design and code; timetable facts are sourced from Steam Packet, not a verified Isle of Man Government dataset. This independent, free project is unaffiliated with the operator or Government. The offline helper uses deterministic rules.

The Douglas ferry photograph by John Lucas (2016) is licensed separately under CC BY-SA 2.0, not MIT. Source: https://commons.wikimedia.org/wiki/File:The_Isle_of_Man_ferry_enters_port_at_Douglas_-_geograph.org.uk_-_5035733.jpg . License: https://creativecommons.org/licenses/by-sa/2.0/ . The original image is included unchanged; its on-page display is cropped with CSS. The standalone file embeds it for offline use.

## GitHub Pages use

A static open-source project showcase and free timetable tool. No checkout, payment collection, paid SaaS or lead collection. Related project credits are secondary to the travel tool. See GitHub Pages limits and Acceptable Use Policies for the hosting conditions.
