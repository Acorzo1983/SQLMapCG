import { isChecked } from '../utils.js';

export function addEnumerationOptions(command) {
  const enumOptions = [
    'all', 'banner', 'current-user', 'current-db', 'passwords',
    'dbs', 'tables', 'columns', 'schema', 'dump'
  ];

  enumOptions.forEach(opt => {
    if (isChecked(opt)) {
      command += ` --${opt}`;
    }
  });

  return command;
}
