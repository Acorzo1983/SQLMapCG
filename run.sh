#!/usr/bin/env bash

set -uo pipefail

# List of default ports to check
PORTS=(8082 8083 8084 8085)
SELECTED_PORT=""

# Function to check if a port is in use
is_port_in_use() {
  local port="$1"

  if command -v lsof >/dev/null 2>&1; then
    lsof -i ":$port" >/dev/null 2>&1
    return $?
  fi

  # Fallback for systems without lsof (e.g. minimal containers)
  python3 - "$port" <<'PY'
import socket
import sys

port = int(sys.argv[1])
with socket.socket() as sock:
    sock.settimeout(0.2)
    sys.exit(0 if sock.connect_ex(("127.0.0.1", port)) == 0 else 1)
PY
}

open_browser() {
  local url="$1"

  if command -v firefox >/dev/null 2>&1; then
    firefox "$url" >/dev/null 2>&1 &
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$url" >/dev/null 2>&1 &
  elif command -v open >/dev/null 2>&1; then
    open "$url" >/dev/null 2>&1 &
  else
    echo "Open $url in your browser."
  fi
}

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 is required but was not found in PATH." >&2
  exit 1
fi

# Find the first available port from the default list
for PORT in "${PORTS[@]}"; do
  if ! is_port_in_use "$PORT"; then
    SELECTED_PORT="$PORT"
    break
  fi
done

# If no default port found in the list, prompt the user to specify another port
if [ -z "$SELECTED_PORT" ]; then
  echo "None of the default ports (8082-8085) are available."
  while true; do
    read -r -p "Please specify a port that is available: " user_port
    if ! [[ "$user_port" =~ ^[0-9]+$ ]] || [ "$user_port" -lt 1 ] || [ "$user_port" -gt 65535 ]; then
      echo "Invalid input. Please enter a numeric port between 1 and 65535."
    elif is_port_in_use "$user_port"; then
      echo "Port $user_port is already in use. Please choose another."
    else
      SELECTED_PORT="$user_port"
      break
    fi
  done
else
  echo "Port $SELECTED_PORT is available."
fi

URL="http://localhost:$SELECTED_PORT"

# Start HTTP server on the selected port
echo "Starting HTTP server on port $SELECTED_PORT..."
python3 -m http.server "$SELECTED_PORT" >/dev/null 2>&1 &
SERVER_PID=$!

sleep 0.5
if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "Error: the HTTP server could not be started on port $SELECTED_PORT." >&2
  exit 1
fi

echo "Server running at $URL (PID $SERVER_PID). Stop it with: kill $SERVER_PID"

# Open the web application
open_browser "$URL"
