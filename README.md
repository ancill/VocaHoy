# VocaHoy

## Session population method

If already know push to end of array, if not insert to middle
After day ended or all cards mastered in session:

- Repeat tomorrow
- On day 4 set to next week
- After next week to next month

![Alt text](readme_pic.png?raw=true "Title")

In DeckSession field nextDay stays updated for tomorrow
while `today - createDate <= 4` then nextDay will be `today + 4 days` then `today + `
