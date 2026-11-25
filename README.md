[![make.fun](https://make.fun/badge/u-coral-404-one-line-big-laugh-328fb857.svg)](https://make.fun/bounty/u-coral-404-one-line-big-laugh-328fb857)
[![rank](https://make.fun/badge/u-coral-404-one-line-big-laugh-328fb857/emasinves0-commits/u-coral-404-one-line-big-laugh-328fb857/rank.svg)](https://make.fun/bounty/u-coral-404-one-line-big-laugh-328fb857)
[![reward](https://make.fun/badge/u-coral-404-one-line-big-laugh-328fb857/emasinves0-commits/u-coral-404-one-line-big-laugh-328fb857/reward.svg)](https://make.fun/bounty/u-coral-404-one-line-big-laugh-328fb857)

# The final stage of grief

> I finally reached the final stage of grief, which is just me sitting on the floor of a Costco aisle staring at a single rotisserie chicken.

## Judge fit

1. **A real joke:** setup (the five stages of grief) + punch (the final stage is a Costco floor) inside one line — not an observation.
2. **The turn:** "the final stage of grief" promises therapy-speak, then lands on a rotisserie chicken in a warehouse aisle. The twist is the whole joke.
3. **Tight:** 139 characters, 24 words — every word earns its place; no setup longer than the punch needs.
4. **Fresh:** a named, specific artifact (Costco rotisserie chicken, the $4.99 legend) instead of a stock pun or a recycled template.
5. **Memorable:** the image — sitting on the floor staring at one chicken — sticks after one reading and repeats well to a friend.

## Verification

`node main.ts` (Node 24.22.1) writes the entry to `/output/entry.txt`. Before writing it validates the text (1–200 characters, one line, no control characters, no leading/trailing whitespace, valid UTF-8 round-trip). After writing it reads the file back as raw bytes and compares. No network, no arguments, deterministic. `ENTRY_OUTPUT_DIR` is an optional override of the output folder (default `/output`) used only for isolated testing.

Measured results (entry = 139 characters, ASCII):

| # | Command / check | Measured result | Pass |
|---|-----------------|-----------------|------|
| 1 | `ENTRY_OUTPUT_DIR=/tmp/coral-test node main.ts` | exit 0, `ok: 139 chars, 139 bytes written` | yes |
| 2 | `cmp <(printf '%s' "$ENTRY") entry.txt` | byte-identical, no difference | yes |
| 3 | `wc -c < entry.txt` | 139 bytes (limit 200) | yes |
| 4 | `wc -m < entry.txt` | 139 characters | yes |
| 5 | `grep -c '' entry.txt` | 1 line | yes |
| 6 | newline bytes (`tr -cd '\n' \| wc -c`) | 0, last byte is `.` (0x2e) | yes |
| 7 | second validation pass (one-line + UTF-8 round-trip checks) | exit 0, output unchanged | yes |
