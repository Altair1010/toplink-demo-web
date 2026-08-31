# Toplink P3A Direction Sprint Prototype

Static comparison harness only. It does not change app-demo, define production tokens or contain
approved service/contact facts.

## P3B chosen-direction lock

`lock.html` is the authoritative Direction C browser harness for P3B. It preserves the P3A A/B/C
comparison intact while giving P4 one chosen-direction surface with no tournament UI.

- Home: `lock.html?surface=home`
- Service detail: `lock.html?surface=service`
- Knowledge detail: `lock.html?surface=knowledge`

The text identity, content and conditional material colors remain documented scaffolds, not verified
production facts or final asset inputs.

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
