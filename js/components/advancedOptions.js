import { isChecked, quoteArg, readText } from '../utils.js';

export function addAdvancedOptions(command) {
  const advancedOptions = ['os-shell', 'os-pwn', 'batch', 'flush-session'];

  advancedOptions.forEach(opt => {
    if (isChecked(opt)) {
      command += ` --${opt}`;
    }
  });

  const tamper = readText('tamper');
  if (tamper) command += ` --tamper=${quoteArg(tamper)}`;

  return command;
}
