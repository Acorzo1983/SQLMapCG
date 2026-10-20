/**
 * Quote a value as a POSIX shell double-quoted argument.
 *
 * Escapes backslashes, double quotes, dollar signs and backticks so that a
 * pasted URL/cookie/POST body cannot break out of the argument or trigger
 * command substitution when the command is executed.
 */
export function quoteArg(value) {
  return `"${String(value).replace(/[\\"$`]/g, '\\$&')}"`;
}

/**
 * Read an integer input, clamp it to [min, max] and write the clamped value
 * back to the field so the UI always matches the generated command.
 */
export function readNumber(id, { min, max, fallback }) {
  const field = document.getElementById(id);
  const parsed = Number.parseInt(field.value, 10);
  const value = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, min), max)
    : fallback;

  field.value = String(value);
  return value;
}

/** Read a text input and trim surrounding whitespace. */
export function readText(id) {
  return document.getElementById(id).value.trim();
}

/** True when a checkbox is checked. */
export function isChecked(id) {
  return Boolean(document.getElementById(id).checked);
}
