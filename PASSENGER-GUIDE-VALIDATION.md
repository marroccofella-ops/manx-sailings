# Passenger guide implementation review — 14 October 2026

The 20 suggestions are grouped into existing timetable controls and six expandable travel panels rather than twenty competing sections.

| Suggestions | Implementation |
|---|---|
| 1–3 Conditions, sickness, motion | Comfort panel; Ronaldsway forecasts and NHS self-care; no unsupported wave statistics or guaranteed vessel comfort ranking. |
| 4 Rough-crossing reminder | Dated official Storm Amy 2025 disruption example. The proposed passenger-sickness/vehicle-damage allegation was not verified and is excluded. |
| 5–8 Check-in, ports, pets, onward travel | Port addresses, check-in deadlines, terminal parking/opening/connection links, vehicle and pet guidance, assistance process. Volatile prices and generic dimension limits are not copied. |
| 9 Coverage | Existing planner banner retains exact coverage and actual timetable review date. Practical-resource review has its own date. |
| 10 History | Short operator-sourced 1830 context, separated from modern patterns. |
| 11–12 Accuracy and methodology | Explicit schedule-change caveat, no-row versus cancellation distinction, source counts, withheld row and import workflow links. |
| 13–14 Official hand-off, forecasts | Persistent planner actions; direct official booking destination; Government shipping/coastal forecasts. No external live forecast is represented as embedded data. |
| 15 Fleet | Existing vessel summaries and official fleet/facilities links retained; comfort panel explains limits of comparisons. |
| 16–19 Disruptions, seasonality, contacts, assistance | Dedicated disruption, history and special-needs panels; official booking account, reservations and guidance links. No TT dates inferred. |
| 20 Independence | Short limitation reminder always visible beside planner results. |

Checks: dataset validation; existing 402-row integrity and offline-package tests; duplicate/invalid candidate rejection; internal anchor integrity; guide sections and external resource destinations; deployed content and browser review. External operational guidance must always be confirmed on the provider site.
