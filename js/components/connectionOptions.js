import { isChecked, quoteArg, readText } from '../utils.js';

export function addConnectionOptions(command) {
  if (isChecked('random-agent')) command += ' --random-agent';
  if (isChecked('tor')) command += ' --tor';

  const proxy = readText('proxy');
  if (proxy) command += ` --proxy=${quoteArg(proxy)}`;

  return command;
}
