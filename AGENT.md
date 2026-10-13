# Manx Sailings agent interface

Independent, unaffiliated compilation of Steam Packet published autumn 2026 timetables. Not live status, prices, ticket availability, a Government dataset or a booking service.

## Stable files

- https://marroccofella-ops.github.io/manx-sailings/data/timetable.json
- https://marroccofella-ops.github.io/manx-sailings/data/timetable.csv
- https://marroccofella-ops.github.io/manx-sailings/data/metadata.json
- https://marroccofella-ops.github.io/manx-sailings/data/timetable.schema.json
- https://marroccofella-ops.github.io/manx-sailings/data/metadata.schema.json
- https://marroccofella-ops.github.io/manx-sailings/data/snapshots/2026-10-14-v1/ (timetable.json, timetable.csv, metadata.json)

Fetch metadata first. Check coverage and review date before answering. Use a pinned snapshot plus its SHA-256 file hashes for reproducibility. Snapshots are never overwritten with changed content: bump the version in build-agent-data.cjs. File hashes describe exported bytes, not verified original PDFs. Null PDF URL/hash or extraction date means unknown, never substitute the build date.

## Interpreting records

Date is departure date; from/to are explicit ports. Arrival_date is inferred as next day when arrival clock time precedes departure. Duration is an ISO-style local clock interval, not DST-correct elapsed time. All times are local port times; UTC offsets are not supplied. JSON notes are an array; CSV notes encode that array as JSON inside a quoted cell. CSV action columns match JSON actions.

Within documented route coverage, an absent row means no record in the imported source; it is not a cancellation or sold out. Outside coverage or Dublin means missing coverage. The withheld Larne date must not be silently converted to 16 November. All source records reference metadata.sources. The supplied UK source lacks a retained original PDF URL; its source URL is the official directory, explicitly disclosed.

## Local query API

No server endpoint is promised by this static Pages site. Fetch structured files and filter locally, or clone the repository and call query.cjs. No network, authentication, booking or amendment is performed by this function.

~~~js
const {queryTimetable}=require('./query.cjs');
const rows=require('./data/timetable.json');
const metadata=require('./data/metadata.json');
queryTimetable(rows,metadata,{from:'Liverpool',to:'Isle of Man',date:'2026-11-07',mode:'day'});
~~~

Mode day returns every departure on the date. Mode next returns the earliest record on or after the date, not a realtime next departure (no time-of-day supplied). Statuses: published_results, no_record_in_source, no_later_record_in_snapshot, missing_coverage, invalid_query. Results always carry dataset version, source review date and official actions. Machine callers must supply explicit endpoints; no route guessing.

CLI takes one JSON argument. It also accepts question, reference_date and current_route for the existing deterministic parser. Supply reference_date as YYYY-MM-DD and current_route explicitly when direction is implicit. The helper understands named ports, from/to direction, 2026 ISO or DD/MM/YYYY dates, tomorrow and next. It is not a general language model. Examples: “from Liverpool to Isle of Man tomorrow”; “next ferry to Larne 2026-11-05”.

## Official hand-off and citation

- Status: https://www.steam-packet.com/sailing-status
- Book: https://commerce.steam-packet.com/
- Amend: https://commerce.steam-packet.com/login

Surface these actions with every answer. Do not claim a scheduled sailing is operating or bookable without official verification. Any real transaction needs the user's instruction and the operator system. Cite “Manx Sailings, independent Steam Packet timetable compilation, snapshot 2026-10-14-v1, source review 7 October 2026”, the record source, and its limitations. Code is MIT; original source rights remain separate.

## Human notes and updates

See travel-notes.md, DATA-SOURCES.md, DATA-FORMAT.md, CONTRIBUTING.md and UPDATE-TIMETABLE.md. The full source table is rendered in the original HTML without JavaScript. The website remains human-first in presentation; agent files are linked from its methodology panel.
