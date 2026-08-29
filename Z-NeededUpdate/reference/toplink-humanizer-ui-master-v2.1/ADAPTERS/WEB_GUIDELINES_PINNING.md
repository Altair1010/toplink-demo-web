# Web Guidelines Pinning

Vercel's `web-design-guidelines` skill currently instructs the agent to fetch `web-interface-guidelines/main/command.md` before each review.  
**Nguồn:** [Vercel skill](https://github.com/vercel-labs/agent-skills/blob/dd089a8c752c966dee8bf0f27cb625ba193ffd9e/skills/web-design-guidelines/SKILL.md)

For Humanizer Gate C, use the pinned rules revision:

`e3d624baaf29dc1fc645aff3e38f03e564d2d6b1`

**Nguồn:** [Pinned guideline file](https://github.com/vercel-labs/web-interface-guidelines/blob/e3d624baaf29dc1fc645aff3e38f03e564d2d6b1/command.md)

Reason: release evaluation must be reproducible. Updating the pin is an explicit package maintenance action, not an invisible change during a release review.
