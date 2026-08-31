# Toplink P3A Direction Sprint Prototype

Static comparison harness only. It does not change app-demo, define production tokens or contain
approved service/contact facts.

## Run

From this directory:

    npx --yes http-server . -p 4173 -c-1

Home directions:

- http://127.0.0.1:4173/?direction=A
- http://127.0.0.1:4173/?direction=B
- http://127.0.0.1:4173/?direction=C

Morphology probes:

- http://127.0.0.1:4173/probe.html?direction=A&type=service
- http://127.0.0.1:4173/probe.html?direction=A&type=knowledge

Replace A with B or C for the other systems.

## Boundaries

- One content.js supplies every direction.
- Candidate values are provisional comparison variables only.
- CSS/native interaction only; no GSAP or production dependency.
- CSS material fields are neutral scaffolds, not Toplink premises, staff, customer or treatment media.
