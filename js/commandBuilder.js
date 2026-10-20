import { addTargetOptions } from './components/targetOptions.js';
import { addCrawlingOptions } from './components/crawlingOptions.js';
import { addConnectionOptions } from './components/connectionOptions.js';
import { addOptimizationOptions } from './components/optimizationOptions.js';
import { addDetectionOptions } from './components/detectionOptions.js';
import { addTechniqueOptions } from './components/techniqueOptions.js';
import { addEnumerationOptions } from './components/enumerationOptions.js';
import { addAdvancedOptions } from './components/advancedOptions.js';

/**
 * Assemble the sqlmap command from the current state of the form.
 * Kept free of DOM event wiring so it can be unit-tested.
 */
export function buildCommand() {
  let command = 'sqlmap';

  command = addTargetOptions(command);
  command = addCrawlingOptions(command);
  command = addConnectionOptions(command);
  command = addOptimizationOptions(command);
  command = addDetectionOptions(command);
  command = addTechniqueOptions(command);
  command = addEnumerationOptions(command);
  command = addAdvancedOptions(command);

  return command;
}
