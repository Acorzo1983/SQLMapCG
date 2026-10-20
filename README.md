# SQLMap Command Generator
<img alt="SQLMap Command Generator" src="image_sqlmapcg.png"> </img>

## Description

SQLMap Command Generator is a web-based application designed to assist penetration testers and security enthusiasts in generating SQLMap commands with various options for testing SQL injection vulnerabilities. It provides an easy-to-use interface where users can configure various parameters, such as target URL, Google dork, POST data, connection options, detection levels, and techniques for SQL injection.

## Features

- **Target Configuration**: Define target URL or Google dork.
- **Connection Options**: Configure proxy, random user-agent, and use Tor network.
- **Detection Options**: Set the test level, risk, and verbosity.
- **Injection Techniques**: Select from multiple SQL injection techniques, including boolean-based, error-based, union-based, and more.
- **Enumeration Options**: Choose data to extract from the database (e.g., tables, columns, passwords).
- **Advanced Options**: Configure additional attack options like OS shell, OS pwn, and batch mode.

## Requirements

- A Unix-based operating system (Linux/macOS).
- Python 3.x (used to serve the static site).
- A browser (Firefox, or any browser via `xdg-open`/`open`).
- *Optional, for development only:* Node.js `^20.19.0 || >=22.12.0` and npm.


## Web Usage Live

https://acorzo1983.github.io/SQLMapCG/


## Installation & Usage

To install and run the application, follow these steps:

0. **OneLiner Automatic Install and Run**:

```bash
git clone https://github.com/Acorzo1983/SQLMapCG.git && cd SQLMapCG && chmod +x run.sh && ./run.sh
```

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Acorzo1983/SQLMapCG.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd SQLMapCG
   ```

3. **Make the `run.sh` script executable**:

   ```bash
   chmod +x run.sh
   ```

4. **Run the script**:

   ```bash
   ./run.sh
   ```

   This will start an HTTP server on an available port (either 8082-8085 or a custom port you specify) and open the web application in your browser.

## Development

The site is plain HTML/CSS/JavaScript, so `run.sh` is enough to use it. Vite is
only needed to develop and build it:

```bash
npm ci          # install the toolchain
npm test        # run the unit tests (node:test, no extra dependencies)
npm run dev     # dev server on http://localhost:3000
npm run build   # production build in dist/
npm run preview # serve the production build
```

## Security

- Dependencies are monitored by Dependabot (see `.github/dependabot.yml`) and
  audited in CI with `npm audit`.
- The generated command is quoted for POSIX shells: backslashes, double quotes,
  `$` and backticks in your input are escaped so a pasted URL cannot break out
  of its argument or run command substitution.
- Please report vulnerabilities privately — see [SECURITY.md](SECURITY.md).

## Available Options

- **Target URL**: Input the target URL to be tested (e.g., `http://example.com/vuln.php?id=1`).
- **Google Dork**: Use a Google dork to find vulnerable pages (e.g., `inurl:".php?id=1"`).
- **POST Data**: Provide any POST data parameters.
- **Cookie**: Provide any cookies needed for the session.

## Troubleshooting

- **Port Availability**: The script will check if ports 8082-8085 are available. If none of them are free, it will prompt you to choose another port.
- **Permissions**: Ensure you have the required permissions to run the script and make the `run.sh` file executable.
- **Dependencies**: The script requires `python3`; if `lsof` is missing it falls back to a Python socket check, and it opens Firefox, `xdg-open` or `open`, whichever is available.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Albert C (2024)
