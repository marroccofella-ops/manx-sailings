# Environmental research methods and archive catalogue

## Historical weather: measured surface observations

NOAA NCEI Global Surface Summary of the Day (GSOD), dataset C00516, station 03204099999, named ISLE OF MAN, ICAO EGNS/Ronaldsway. Station coordinates 54.083333, -4.623889; airport surface observations are not a measurement of the open Irish Sea. The official ISD station catalogue identified the 1973–2025 historical span. We retrieved 53 available annual CSV files, giving 19,211 daily records from 1973-01-01 to 2025-08-24. The final year is partial. This is the retrieved station subset, not every historical record relating to the Isle of Man.

Files: research/weather/raw/YYYY.csv.gz contain gzip-compressed, unchanged source CSV bytes. history.json records the original uncompressed SHA-256 for each source URL and the retrieval date (17 October 2026). Explicit import: node import-weather.cjs --download. Cached files are reused; ordinary reproduction is offline: node import-weather.cjs. Network imports never run in CI.

CSV sentinels become null: temperature/sea-level pressure 9999.9; wind, gust and visibility 999.9. Fahrenheit becomes Celsius via (F−32)×5/9. Visibility miles become kilometres via ×1.609344. Wind and gust stay in knots. Mean monthly values use nonmissing daily summaries; n counts available daily values. Per-variable coverage is n / calendar days in that month. The default chart requires 80%; changing this threshold exposes selection sensitivity. Missing/filtered months are gaps and never interpolated as zero. Gust charts average available daily maxima, not the absolute monthly peak.

GSOD days are GMT-based; variable sample counts and operating hours affect daily summaries. Daily extremes may include part of the previous day. This is neither a homogeneous climate-trend analysis nor a marine hindcast. The 1973–2025 archive does not overlap the autumn 2026 sailing snapshot, so no weather/cancellation model or causal link is fitted.

Source metadata and citation: https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00516/html . Cite NOAA National Centers for Environmental Information (1999), Global Surface Summary of the Day - GSOD 1.0, station 03204099999 subset, accessed 17 October 2026. NOAA data liability and citation conditions apply; original data are not relabelled as project MIT code.

## Tide and pressure teaching model: synthetic, uncalibrated

A lunar semidiurnal cosine with approximate period 12.42 hours and solar semidiurnal cosine with period 12 hours are summed using user-selected arbitrary amplitudes and phase. The ideal equilibrium inverse-barometer offset is Δh = −100(P−1013.25)/(1025×9.80665), where pressure is hPa and result metres. Assumed density is 1025 kg/m³; gravity 9.80665 m/s². This demonstrates interference and pressure sensitivity, not full hydrodynamics.

Time is hours since an arbitrary model origin; elevation is relative to arbitrary zero, not chart datum. There are no calibrated port harmonics, nodal corrections, bathymetry, wind setup, wave/current coupling, vessel draught or harbour restrictions. Do not use it for navigation, tides at a named location, safety or sailing decisions.

Primary harmonic-method reference: https://tidesandcurrents.noaa.gov/about_harmonic_constituents.html . Actual prediction requires station observations, harmonic constants, phase/datum/time conventions and validation.

## Historical and current resource catalogue

- Port Erin sea-level archive, PSMSL station 1793: https://psmsl.org/data/obtaining/stations/1793.php . Station catalogue spans 1992–2025, with RLR/metric completeness and datum notes. Link-only; not rehosted under a guessed licence. Monthly mean sea level is not a high/low-tide series or harbour clearance.
- Broader PSMSL archives and annual snapshots: https://psmsl.org/data/obtaining/ and https://psmsl.org/data/obtaining/year_end/ . Read station flags and referencing guidance.
- Official local tides and flapgate references: https://www.gov.im/categories/travel-traffic-and-motoring/harbours/tides-and-flapgates/ . Time zones and chart datums must be checked at source.
- Ronaldsway shipping and coastal forecasts: https://www.gov.im/weather/current-shipping-forecast/ and https://www.gov.im/weather/5-day-coastal-forecast/ . External live pages; no stale forecast copied into the static demo.
- Coastal overtopping: https://www.gov.im/weather/coastal-overtopping/ . Weather warnings, land access, harbour restrictions and ship-operating decisions are separate.
- Met Office station climate averages for Ronaldsway: https://www.metoffice.gov.uk/research/climate/maps-and-data/location-specific-long-term-averages/gcsewtg52 . Climate normals are long-period statistics, not forecasts; referenced, not transcribed.

Further work: obtain permitted high-frequency gauge and offshore wind/wave datasets with matched dates, quality flags and datums before studying coupled effects. A study of disruptions additionally needs actual operator outcomes, not a published timetable alone. No unsourced sailing wind/wave limit is provided.
