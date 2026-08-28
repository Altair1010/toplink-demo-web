# 02 — M3S-B Before / After State Graph

## Before — verified runtime at baseline

```text
NEED CHOICE
    |
    v
FILTERED SERVICE CHOICE
    |
    v
NAME / PHONE / DATE / BRANCH / NOTE
    |
    v
"GỬI YÊU CẦU ĐẶT LỊCH"
    |
    +--> placeholder Google Form configured?
    |         |
    |         +-- no --> 600ms timer -------------------+
    |         |                                         |
    |         `-- yes --> hidden POST --> 1200ms timer -+
    |                                                   |
    v                                                   v
submitting                                          finish()
                                                        |
                                                        v
submitted + success toast + callback promise
                                                        |
                                                        v
VISITOR CAN REASONABLY BELIEVE THE REQUEST WAS RECEIVED
```

Browser reproduction reached the false terminal copy even though no mutating request occurred.
The source also carried placeholder form action/field IDs, an iframe sink and timeout-based success.

## After — implemented runtime

```text
NEED CHOICE
    |
    v
SERVICE CHOICE OR "CHƯA BIẾT"
    |
    v
LOCAL REVIEW
    |
    v
"CHƯA CÓ YÊU CẦU NÀO ĐƯỢC GỬI ĐI"
    |
    +--> CHỈNH LẠI ---------> service choice
    |
    +--> TÔI VẪN CHƯA CHẮC -> local uncertainty note
    |
    `--> DỪNG VÀ XOÁ -------> clear local choices
                                  |
                                  +--> start again
                                  `--> home

NETWORK MUTATION: 0
```

The route no longer asks for name, phone, desired time, branch or note because no approved
recipient exists. This removes unnecessary local handling of personal/contact data rather than
preserving an input form with no truthful consequence.

## Consequence ordering

```text
REVIEWED LOCAL CHOICES
          |
          v
DOM + VISUAL NO-SEND CONSEQUENCE
          |
          v
EDIT / UNCERTAIN / STOP
```

The consequence is a visible `role="status"` statement before the terminal actions. Focus moves to
the new state heading after step, review, uncertainty and stop transitions; the initial page load
does not steal focus.
