import { isChecked } from '../utils.js';

export function addTechniqueOptions(command) {
  let techniques = '';

  ['b', 'e', 'u', 's', 't', 'q'].forEach(tech => {
    if (isChecked(`tech-${tech}`)) {
      techniques += tech.toUpperCase();
    }
  });

  if (techniques) command += ` --technique=${techniques}`;

  return command;
}
