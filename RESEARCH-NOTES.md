# Research and engineering notes — 17 October 2026

## Review findings and changes

- Tables alone made temporal patterns hard to see. Added readable SVG weekday rates, clickable daily calendar and chronological holdout chart, retaining exact-value tables and exports. Colour is supplemented by counts, labels and dashed scenario borders.
- Raw totals can mislead when coverage differs. Every profile includes inclusive observed-day denominators; date windows are explicit and validated.
- Seasonal weekly patterns need a benchmark. Train weekday means on the first 70% of the selected baseline interval, test on the rest, and compare MAE with a constant training-mean baseline. No test data fit the model. This is a retrospective source-pattern test, not a sailing forecast. At least 14 days are required.
- Added vessel concentration HHI and explicit bounded gap intervals. These describe source records, not fleet reliability or seats.
- Original tiny NLP test was too favourable. Retained it for comparison and added a 22-case constructed challenge suite, a majority-class baseline, unigram ablation, answer-coverage/abstention reporting and feature log-likelihood explanations. Guards reject negation, multi-port and underspecified inputs. Predictions remain isolated from the planner.
- Current challenge results are not perfect: bigram model 21/22 correct including abstentions; unsupported false answers 0/7 on this fixed set. This is synthetic evidence, not a real-world accuracy claim.
- Added duplicate-key checks and median/MAD duration screening; flagged candidates are not presumed erroneous.
- Verified historical weather station identity through NOAA's ISD catalogue. Pinned 53 available annual files, preserving raw source bytes as gzip, hashes and missing-value conventions. NOAA station observations are not offshore wave data. No weather/sailing-outcome model is trained because dates/outcomes do not match.
- Added an uncalibrated two-constituent tidal demonstration plus ideal pressure offset, clearly separated from official tides, warnings and Port Erin historical sea-level resources.
- Added explicit policy assessment and rights inventory. No claim of GitHub approval or a blanket licence over third-party data. No private communications or credentials belong in this public research record.

## Remaining limitations and useful next steps

Get independent human-labelled NLP cases; evaluate robustness and calibration rather than tune to the challenge suite. Obtain permitted higher-frequency gauge/offshore data and real operational outcomes with matching times before causal or disruption research. Retain incomplete source provenance as null and validate new timetables against originals. Environmental catalogue is curated, not a claim to cover every historical Isle of Man record.

## Verification commands

node build.cjs; node import-weather.cjs; node reproduce.cjs; npm test. These are separate commands; no download is required once pinned sources are present. GitHub CI repeats these checks and verifies no generated-file differences. Browser review must check controls, calendar inspection, invalid ranges, model abstention/explanation, reporting-coverage filters, tide sliders, exports, phone layout and the standalone file.
