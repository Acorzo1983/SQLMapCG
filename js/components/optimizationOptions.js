import { isChecked, readNumber } from '../utils.js';

export function addOptimizationOptions(command) {
  if (isChecked('optimize')) command += ' -o';

  const threads = readNumber('threads', { min: 1, max: 10, fallback: 1 });
  if (threads > 1) command += ` --threads=${threads}`;

  if (isChecked('keep-alive')) command += ' --keep-alive';

  return command;
}
