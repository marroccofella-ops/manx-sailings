# Methods and reproducibility

## Inputs

The sole operational input is sailings.json (402 imported published records). Coverage bounds come from data/metadata.json. reproduce.cjs records the exact input SHA-256 and dataset version in research/results.json. Published records are observations of a source document, not observations of ship operation.

## Temporal profiling

Select one port/direction and an inclusive date interval within its source coverage. Enumerate every date at UTC noon to avoid daylight-saving changes in date iteration. For each date count matching departures, including zero-record dates. Weekday denominators count observed dates of that weekday, not just dates with departures. Departures per observed weekday-day is departures divided by this denominator; an empty denominator is N/A. Sum of six route profiles must equal 402.

Longest zero-record run is the maximum consecutive covered dates without a matching retained record. It is bounded by the selected interval, does not bridge unavailable coverage and is not a cancellation measure. Counts do not measure seats, freight capacity, demand, reliability or passenger outcomes. The known withheld Larne row can affect gap metrics.

## Counterfactual

Remove every record whose vessel code matches the selected vessel, holding dates and all other records fixed. Compare retained departures with baseline; removed departures = baseline minus retained. There are no substitutions, recovery services, demand response or weather assumptions. This is a sensitivity experiment, not disruption prediction or a forecast.

## NLP

See MODEL-CARD.md. The browser trains a tiny multinomial Naive Bayes classifier from public synthetic templates. It is isolated from the evidence planner. A separate deterministic rules parser continues to support the planner; neither is a remote language model.

## Verification

Run the six README commands. research-tests.cjs checks a hand-counted seven-day fixture (two departure days, four-day longest gap), vessel removal arithmetic, invalid coverage, denominator totals, unsupported-input abstention and benchmark accounting. agent-tests.cjs checks exported schema shapes, hashes, 402-row correspondence, snapshots and query boundaries. tests.cjs checks planner integrity, offline packaging and check-in arithmetic. Browser checks cover UI controls and readable outputs.

## Threats to validity

A single short seasonal snapshot cannot establish general year-round patterns. Original document provenance is incomplete for the supplied UK timetable. Data may be superseded by operational notices. Local clock durations are not corrected for DST. Synthetic text variants are highly related and do not establish real-world model performance. No statistical significance or causal claims are made.
