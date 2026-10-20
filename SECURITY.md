# Security Policy

## Supported versions

Only the latest commit on `main` (and the deployed GitHub Pages site) is
supported. This is a static, client-side tool: there is no backend and no
user data is stored.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Use GitHub's private vulnerability reporting:

1. Go to the [Security tab](https://github.com/Acorzo1983/SQLMapCG/security/advisories/new).
2. Describe the issue, the steps to reproduce it and the impact.
3. You will get a response as soon as possible, and credit in the fix if you
   want it.

## Scope

In scope:

- Vulnerabilities in the generator itself (for example, command injection in
  the generated sqlmap command, or XSS through the form fields).
- Vulnerable dependencies shipped by this repository (`package-lock.json`).

Out of scope:

- Vulnerabilities in [sqlmap](https://github.com/sqlmapproject/sqlmap) itself.
- Anything that requires the user to paste attacker-controlled input into
  their own terminal and run it.
