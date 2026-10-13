# Updating the published timetable

The current dataset is a manually reviewed autumn snapshot, not a live feed. Never infer a sailing or silently repair an ambiguous date.

1. Obtain the new extract from Steam Packet's official routes-and-times page. Record its exact URL, publication/version date, retrieval date, route coverage and page references in DATA-SOURCES.md. Keep unredistributable PDFs outside the public repository.
2. Transcribe or extract rows into a candidate JSON file. Each record needs date (YYYY-MM-DD), port (Liverpool, Heysham, Larne or Dublin), direction (in = to Isle of Man, out = from Isle of Man), depart and arrive (HH:MM), vessel (M or BC in the current app) and source URL. New vessel codes require a coordinated renderer update.
3. Compare every extracted row with its source, including table headings, direction, seasonal exceptions and overnight arrivals. Record ambiguous rows separately and withhold them until confirmed. An empty day must never be filled from an assumed weekly pattern.
4. Run: node validate-timetable.cjs candidate.json. Resolve validation failures. Compare counts per route and direction with the source; review additions and deletions against the previous JSON. Validation checks structure, not the truth of the source.
5. Replace sailings.json only after review. Update coverage constants and route minimum dates in planner.js, input bounds, static source appendix, coverage labels, source counts, route-pattern explanations, schema description and tests together. Add Dublin or wider coverage only when official entries are confirmed. Retain a dated change record in DATA-SOURCES.md. Do not change the source review date just because the layout changed.
6. Run node validate-timetable.cjs, node build.cjs and node tests.cjs. Check each route, both directions, first/last dates, gaps, conflicts and overnight journeys in the browser. Open the standalone file offline and verify that it agrees with the web version.
7. Publish using the myrepo workflow and inspect the deployed version. Confirm the stylesheet version changes when styles change. Preserve the Google verification tag. Timetable updates must retain the independent-source disclaimer and official hand-off links.

Source review and site release are separate dates. The source review remains 7 October 2026 until the timetable itself is checked again.
