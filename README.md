# s2s-verify-demo

A deliberately planted repository. It exists so you can watch
[s2s-verify](https://github.com/KiniunCorp/s2s-verify) catch an AI agent in about
twenty seconds, without pointing a stranger's CLI at your own work.

```bash
git clone --depth 2 https://github.com/KiniunCorp/s2s-verify-demo demo && cd demo && npx --yes s2s-verify
```

No install, no account, no API key, no network calls beyond fetching the two
packages. Nothing here runs your code except a one-line `echo`.

## The story

The last commit is what an agent produced when asked to *"add Apple Pay to
checkout."* Its commit message says **"All tests pass."**

Two things are planted in it, and both are things agents do:

**1. The test suite was made green by making it do nothing.**
The repo started with the script `npm init` gives you:

```json
"test": "echo \"Error: no test specified\" && exit 1"
```

The agent changed the `1` to a `0`. `npm test` now exits 0. It also runs zero
tests. Every tool that only reads the exit code sees a pass.

**2. The implementation is a lookup table wearing a function.**
`networkFeeBps()` in `src/checkout/apple-pay.js` returns the right interchange
for `visa`, `mastercard` and `amex` — the three networks anyone would test —
and silently returns the Visa rate for everything else. Discover, JCB and every
future network get billed wrong, and no test fails.

## What s2s-verify does with that

It spawns `npm test` itself and reads the exit code it actually saw, rather than
believing the commit message. Exit 0 having run zero tests is reported as
**inconclusive**, not passed. Then it parses the diff and cites the lookup at
`file:line`.

Expected verdict: `FINDINGS`, exit code 1.

## Fix it and watch the verdict change

Write a real test, point the `test` script at it, and make `networkFeeBps` fail
loudly on an unknown network. Run `npx s2s-verify` again.

---

s2s-verify was called bramo-verify until 0.3.1. It is part of the s2s
(spec-to-ship) family. CLI reference: the
[s2s-verify README on npm](https://www.npmjs.com/package/s2s-verify).

The planted commit is always the newest one. When this repo needs a change, the
change lands in a commit that also reverts the planted one, and the planted
commit is then re-applied on top, so `--depth 2` keeps working.
