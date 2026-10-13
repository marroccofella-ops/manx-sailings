# Timetable data and reuse

JSON contains 402 community-compiled published departures. CSV is generated from that same JSON by node build.cjs, with columns date, port, direction, depart, arrive and vessel. Date is YYYY-MM-DD; times are local HH:MM; in means to Isle of Man and out means from it. M is Manannan; BC is Ben My Chree. JSON includes a source URL where available; consult DATA-SOURCES.md for complete provenance.

Earlier arrival clock times indicate next-day arrival. Clock changes affect elapsed journey time. Absent coverage and withheld ambiguous rows are not confirmed cancellations.

Code is MIT-licensed. Original operator content retains its respective rights; this project grants no blanket operator-data license. Verify permission for redistribution and retain provenance. The photograph is separately CC BY-SA 2.0.

Standalone HTML embeds JSON and CSV downloads for offline export. Validation checks structure and duplicate rows; factual verification requires comparison with official source documents.
