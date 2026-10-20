import { readNumber } from '../utils.js';

export function addDetectionOptions(command) {
  const level = readNumber('level', { min: 1, max: 5, fallback: 1 });
  const risk = readNumber('risk', { min: 1, max: 3, fallback: 1 });
  const verbosity = readNumber('verbosity', { min: 0, max: 6, fallback: 1 });

  command += ` --level=${level} --risk=${risk} -v ${verbosity}`;

  return command;
}
