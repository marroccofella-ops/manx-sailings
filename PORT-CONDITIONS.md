# Port forecasts: sources and reproducibility

This separate layer contains externally supplied numerical weather and tide-inclusive sea-level forecasts for Douglas, Liverpool, Heysham, Larne and Dublin. It is not an observation archive, harbour gauge feed, official tide table, or sailing-status service.

## Source and dates

`data/port-conditions.json` preserves each provider response, its units, hourly UTC validity times, requested representative coastal coordinates and returned grid coordinates. `retrieved_at` is the import time, not a model issue time. The API does not supply a model issue timestamp; that field is explicitly null. SHA-256 values identify the serialized original responses. Source URLs reproduce the request parameters but return newer forecasts when revisited.

Weather: https://open-meteo.com/en/docs
Marine: https://open-meteo.com/en/docs/marine-weather-api
Licence: https://open-meteo.com/en/licence
Terms: https://open-meteo.com/en/terms

Attribution: Open-Meteo, DWD, ECMWF and Meteo-France / Copernicus Marine. Forecast data is CC BY 4.0, separately from MIT project code. Provider best-match selection is used; the response does not identify a single model run. Free API use is limited to this noncommercial educational research project. Commercial reuse of the API requires a suitable provider agreement.

## Interpretation

Sea-level height includes tides and is relative to global mean sea level, not local chart datum or Lowest Astronomical Tide. Coastal grid resolution and harbour geometry limit accuracy. Values must not be used for navigation, under-keel clearance, berth access, or safe-sailing decisions. Wave heights describe model grid cells, not conditions inside a sheltered harbour. No cancellation or vessel-specific operating thresholds are inferred.

The planner filters hourly samples by each port's IANA local time (Europe/London or Europe/Dublin). UTC remains visible in the hourly table. Missing values display as unavailable; dates outside the snapshot show no substituted values. Graphs break at missing samples. The forecast panel updates independently of timetable coverage, so Dublin can show weather without implying available sailings. All five ports are accessible through the comparison disclosure.

## Refresh and validation

Run `node import-port-conditions.cjs --download` manually with network access, inspect units, validity, grids and null values, then run `npm run build` and `npm test`. Commit the dated snapshot and regenerated standalone HTML together. The validation workflow uses the frozen snapshot. A separate production workflow fetches forecasts at 05:23 UTC daily, on main-branch pushes, and on manual dispatch. It runs the full build and tests, commits only the validated forecast and standalone file, and explicitly deploys Pages with the built artifact. No personal access token is used. A fetch or validation failure stops publication and retains the previously deployed site. The update status link exposes failures; after 36 hours the site labels the snapshot overdue. The public page makes no third-party API requests: source links open only when followed. Daily updates are scheduled, not guaranteed: GitHub may delay schedules and disable them after prolonged repository inactivity. The timestamp denotes successful data retrieval, not a model issue or future scheduled run. The standalone download is a frozen copy and does not update itself. The standalone file embeds the same data and works offline.

Historical NOAA weather and uncalibrated harmonic teaching simulations remain separate sections and separate datasets. No forecast values are synthesized from the teaching model.
