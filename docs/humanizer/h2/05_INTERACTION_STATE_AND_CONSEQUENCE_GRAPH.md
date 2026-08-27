# 05 — Interaction State and Consequence Graph

**Status:** `PROPOSED — READY FOR HUMAN REVIEW`

**Hard Runtime Truth:** the current booking destination is unconfigured and the UI can display success without a transmitted request. This is not a valid future confirmation contract.

## Critical actions

| Action | Expectation | Target state | Human owner | Response | Failure | Recovery |
| --- | --- | --- | --- | --- | --- | --- |
| `Chia sẻ tình trạng` | describe concern without diagnosis or forced choice | `ORIENTED` → optional `INPUT` | `MISSING OPERATIONAL EVIDENCE` | scope, plain-language boundary, guided-conversation/service-information choice | no reviewed wording/safe path | stop, explain limit, offer verified contact only if available |
| `Tôi chưa biết chọn dịch vụ nào` | someone can help; no need to guess | `ORIENTED` → guided `INPUT` | `MISSING OPERATIONAL EVIDENCE` | collect only justified request context and disclose recipient pre-send | no owner/triage/data policy/channel | no promise; retry or verified alternative if available |
| `Xem dịch vụ` | learn what an option covers | browse → detail | `MISSING OPERATIONAL EVIDENCE` | approved scope/caution detail, not a fit verdict | register/detail unavailable | state information is pending review; return to guided path |
| `Trao đổi trước` | contact a real channel before booking | channel disclosure → input/external handoff | `MISSING OPERATIONAL EVIDENCE` | channel/data/response policy only when verified | unconfigured/unavailable channel | alternate verified channel or transparent unavailable state |
| `Đặt lịch` | request a time and know status | `IDLE → ORIENTED → INPUT → REVIEW → SENDING → CONFIRMED` | `MISSING OPERATIONAL EVIDENCE` | confirm only after actual transport and defined handoff | validation/network/endpoint/slot/service uncertainty | correct, retry, change request/channel, human handoff |
| `Nhắn Zalo` | published channel belongs to Toplink | external handoff | `MISSING OPERATIONAL EVIDENCE` | handoff disclosure before leaving site | broken/unowned channel | return; use another verified channel |
| `Gọi` | number reaches relevant operation | external handoff | `MISSING OPERATIONAL EVIDENCE` | disclose purpose/hours only after verification | unavailable/outside hours/wrong number | verified alternate channel/time policy |
| `Xem địa điểm` | see a real reachable location | route/map disclosure | `MISSING OPERATIONAL EVIDENCE` | verified address/access route | no verified location/map/asset | do not render a location claim |

## Booking state architecture

```text
IDLE
  → ORIENTED (request vs confirmation; recipient; necessary data; uncertainty path)
  → INPUT (service or “not sure”, justified contact/request information)
  → REVIEW (edit and confirm exact request/channel/consequence)
  → SENDING (actual transport; duplicate-send protection; accessible progress)
  → CONFIRMED (only after successful transport and defined receiving handoff)
  → HUMAN HANDOFF (owner/response expectation only when verified)

Branches:
  INPUT → VALIDATION ERROR → corrected INPUT
  REVIEW/SENDING → SUBMISSION FAILURE → RETRY or alternate verified channel
  INPUT/REVIEW → SLOT / SERVICE UNCERTAINTY → change choice / clarification / HUMAN HANDOFF
  any pre-confirmation state → cancel/change → IDLE or ORIENTED
```

## State contract

| State | User can see/do | System must do | Required evidence | Forbidden |
| --- | --- | --- | --- | --- |
| `IDLE` | choose booking, consultation, verified direct channel | clarify a request is not confirmation | ED-01, ED-06 | imply real-time availability |
| `ORIENTED` | understand process and no-choice path; return/change | no inferred diagnosis; accessible controls | ED-02, ED-05, ED-06 | force service or body-state verdict |
| `INPUT` | enter only necessary contact/request data | local validation, field-purpose explanation | ED-06 | collect health detail without approved purpose |
| `REVIEW` | edit before submit | show recipient, target, next consequence | ED-06 | conceal this until after submit |
| `SENDING` | receive truthful progress | await actual transport result | ED-06 | simulated success |
| `CONFIRMED` | know transmission and verified human next step | state truthful handoff/reference if provided | ED-06 | say a person read it when untrue |
| `VALIDATION ERROR` | find/fix a specific problem | accessible summary, focus, safe data preservation | later a11y implementation | generic error |
| `SUBMISSION FAILURE` | know no request is confirmed; retry/change | preserve safe input; explain transparently | ED-06 | silent loss/success wording |
| `SLOT / SERVICE UNCERTAINTY` | change or ask a person | offer only actual alternatives | ED-05, ED-06 | invented availability/substitution |
| `RETRY` / `HUMAN HANDOFF` | retry safely or know the next person | duplicate protection; disclose role/SLA only if true | ED-01, ED-06 | fake immediacy |

## Accessibility and privacy constraints

- Controls need plain-language names, visible focus, keyboard order, and a reduced-motion equivalent.
- Orientation is readable without hover, color, animation, body-map region, or specialist vocabulary.
- Textual state messages do not depend on color alone.
- No H2 contract selects a component, API, or booking provider.
