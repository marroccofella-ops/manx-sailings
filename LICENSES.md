# Open-source licence and third-party rights

## Project software, original documentation and synthetic experiments

MIT License, copyright (c) 2026 Dominic Marrocco. See LICENSE. This covers original JavaScript/CJS, original documentation, CSS/HTML code, synthetic NLP training/test templates and original experiment code. There are no bundled third-party JavaScript libraries, model weights or remote inference dependencies. The project licence does not erase upstream data or image rights.

## Rights inventory

| Material | Rights / source | Handling |
|---|---|---|
| Project code, original docs and synthetic NLP fixtures | MIT, LICENSE | Source and reproduction steps included |
| Steam Packet timetable facts/source material | Original source rights retained; no blanket operator-data licence asserted | Provenance and known gaps in DATA-SOURCES.md and data/metadata.json; no original PDF or logo bundled |
| NOAA GSOD historical observations | NOAA NCEI public environmental-data distribution; source citation/use constraints apply | Original compressed CSV, source URLs/hashes, units and missing-data handling in ENVIRONMENT.md; not relicensed as project code |
| Historic Douglas ferry photograph, retained unused asset | John Lucas, CC BY-SA 2.0 | Original unmodified JPEG at assets/douglas-ferry.jpg; not part of the current hero or teaching model |
| PSMSL, Met Office and Government external archive/forecast pages | Respective providers | Links only; no blanket redistribution licence claimed |

Photograph source: https://commons.wikimedia.org/wiki/File:The_Isle_of_Man_ferry_enters_port_at_Douglas_-_geograph.org.uk_-_5035733.jpg ; author John Lucas, 2016; licence https://creativecommons.org/licenses/by-sa/2.0/ . Retain attribution and apply ShareAlike requirements to image adaptations. MIT applies to the original project code, not that photograph.

NOAA source/citation: https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00516/html . NOAA and NCEI disclaim accuracy/completeness warranties; users must assess fitness for use. Cite dataset, station subset and access date.

No endorsement by GitHub, Steam Packet, NOAA, PSMSL or the Isle of Man Government is claimed. Before adding third-party datasets, record the provider's licence and any restrictions separately; public accessibility alone is not an open-source licence.

## Port forecast snapshot
`data/port-conditions.json`: Open-Meteo, DWD, ECMWF and Meteo-France / Copernicus Marine, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Requested coastal locations, source URLs, retrieval time and original response hashes are preserved. This imported data is not relicensed under MIT. See PORT-CONDITIONS.md for limitations and provider API usage terms.
