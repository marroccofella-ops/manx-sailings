# ◆ Manx Sailings Research Lab

An open-source computational study of published ferry schedules, temporal transport coverage, provenance and a small natural-language classification baseline. The GitHub Pages site is an interactive demonstration of this repository's code and reproducible experiments. It is not a ferry company, reseller storefront or commercial software service.

[Run the research demo](https://marroccofella-ops.github.io/manx-sailings/) · [Methods](RESEARCH.md) · [Model card](MODEL-CARD.md) · [Reproduced results](research/results.json)

## Research questions

1. How does the density of published departures vary by route, direction and weekday when every covered day is included in the denominator?
2. What zero-record runs appear in the imported snapshot?
3. How would removing one vessel's records change the observed schedule, assuming no substitutions?
4. Can a tiny locally trained text classifier distinguish travel direction on a transparent synthetic test set?

The lab exposes date/route controls, scenario comparisons, metrics, a weekday table, machine-readable results and source code. A multinomial Naive Bayes model learns unigram/bigram weights from 24 synthetic phrases and reports all 12 template-disjoint test cases. The existing deterministic planner remains a separate evidence-inspection tool. Neither experiment predicts live service or automates bookings.

## Reproduce without dependencies

Requires Node.js; no package installation, API key or account. From this directory:

~~~text
node validate-timetable.cjs
node build.cjs
node reproduce.cjs
node tests.cjs
node agent-tests.cjs
node research-tests.cjs
~~~

The results are deterministic: repeat reproduce.cjs and compare research/results.json byte-for-byte. Build generates the standalone HTML, data exports and immutable dated snapshots. Open Manx-Sailings-Standalone.html for an offline demonstration; the multi-file website requires any static HTTP server. External references need internet access.

## Evidence and limitations

402 published autumn 2026 departures: 331 supplied UK entries and 71 Ireland entries. Source review: 7 October 2026. England coverage is 21 September–30 November; Larne is 2 September–30 November. Dublin and other dates are not imported. One conflicting Ireland row is withheld. Missing records do not establish cancellations, sold-out sailings or absence of real service. See [provenance](DATA-SOURCES.md), [agent contract](AGENT.md) and [metadata](data/metadata.json). Original UK PDF URL/hash and exact extraction dates were not retained; null means unknown.

This project is independent and unaffiliated with Steam Packet or the Isle of Man Government. Official references allow readers to verify source material and operating status. There is no ticket checkout, commission tracking, lead collection, payment processing, customer account, remote AI service or passenger-data collection. Any separate future reseller business would need suitable separate hosting and agreements; it is not the purpose of this Pages demo.

## Contribute

Reproduce a result, challenge the metrics, add independently labelled NLP evaluation cases or submit a source-backed data correction. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [the import procedure](UPDATE-TIMETABLE.md). Do not post passenger data or booking details.

## Rights and attribution

Code: MIT, copyright Dominic Marrocco. Original operator material retains its rights; no blanket data license is asserted. The retained historic Douglas photograph by John Lucas is CC BY-SA 2.0; it is not used as a promotional hero. See the source record for attribution. Part of the 42.uk / Mannin Knowledge Engine open research work.

## Research v2: useful visualisation and environmental context

The lab adds a clickable daily coverage calendar, labelled SVG weekday rates and a chronological holdout chart with exact-value tables. Compare weekday and constant baselines by MAE; inspect bounded gaps, vessel concentration and robust duration-screening candidates. The NLP challenge report includes an ablation, majority baseline, abstentions and feature explanations.

Historical weather: 19,211 NOAA GSOD daily records, Ronaldsway station 03204099999, 1973-01-01 to 2025-08-24. Fifty-three original annual CSVs are pinned as gzip with source hashes. Filter monthly charts by variable and reporting completeness. This is surface history, not offshore sea state or a current forecast. A separate uncalibrated tidal/pressure teaching model demonstrates physics without claiming port predictions. See ENVIRONMENT.md and RESEARCH-NOTES.md.

Run npm test for all suites. Run node import-weather.cjs to reproduce summaries from local pinned source files (offline); the explicit --download option is for a deliberate source acquisition only. Build before tests after code changes. Source downloads do not run on every site visit or in CI.

## GitHub Pages policy compliance

The maintainer assessment is that this static, non-commercial research demonstration conforms to Pages project-showcase use; it contains no ticket sales, commercial SaaS, checkout, affiliate tracking or lead collection. See [the explicit policy-to-evidence statement](HOSTING-REVIEW.md), [rights inventory](LICENSES.md) and policy-tests.cjs. This is not a GitHub-issued approval or guarantee; GitHub retains its enforcement decision. Commercial reseller activity is outside the Pages project and would require separate appropriate hosting.

## Dated port forecasts
Weather, wind, gusts, waves and tide-inclusive sea-level forecasts for all five ports now sit beside the route planner. See [methods and refresh instructions](PORT-CONDITIONS.md) and the [machine-readable snapshot](data/port-conditions.json). These provider forecasts are separate from historical observations and illustrative physics simulations. Daily production builds fetch forecasts at 05:23 UTC, validate and redeploy the static site; visitors make no third-party API calls. See the daily update workflow for run status.
