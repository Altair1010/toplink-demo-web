# 19 — M2A1 State Graph

## Production graph

```text
IDLE
  |
  +--> ordinary-language option
  +--> "Tôi chưa biết nên bắt đầu từ đâu"
  `--> "Khác" editable path
            |
            v
EDITING: exact wording remains visible and editable
            |
            +--> empty / >240 characters --> specific local error --> EDITING
            +--> remove -------------------------------> IDLE
            `--> review
                    |
                    v
              CLEAR BOUNDARY
              no diagnosis / no classification / no auto-service
                    |
                    v
              REVIEW: exact wording
                    |
                    v
              NO-SEND CONSEQUENCE
                    |
                    +--> edit -------------------------> EDITING
                    +--> remove -----------------------> IDLE
                    +--> uncertainty remains valid ----> REVIEW
                    `--> stop --> clears local wording --> STOPPED
                                                        |
                                                        `--> restart --> IDLE
```

## State object

```text
stage        idle | editing | review | stopped
optionId     bounded ordinary-language identifier | null
originalText exact initial visible wording
summary      exact current user-visible wording
error        recoverable visible error | null
```

The object intentionally has no `diagnosis`, `taxonomy`, `service`, `recommendation`, `recipient`,
`pending`, `submitted`, `sent` or `confirmed` field.

## Test assertions

The Node suite contains ten passing tests:

1. safe IDLE shape;
2. predefined wording preservation;
3. first-class uncertainty;
4. exact Vietnamese custom wording;
5. empty custom recovery;
6. overlong input recovery without silent truncation;
7. no-choice review blocked;
8. local REVIEW without send semantics;
9. edit/remove behavior;
10. stop/restart clearing behavior.

## Consequence boundary

REVIEW is not a submission step. It explains that data remains local to the current page and names
the absence of diagnosis, automatic selection, recipient and confirmation before offering any next
control.
