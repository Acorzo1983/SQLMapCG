import { quoteArg, readText } from '../utils.js';

export function addTargetOptions(command) {
  const url = readText('url');
  const googleDork = readText('google-dork');
  const data = readText('data');
  const cookie = readText('cookie');

  if (url) command += ` -u ${quoteArg(url)}`;
  if (googleDork) command += ` -g ${quoteArg(googleDork)}`;
  if (data) command += ` --data=${quoteArg(data)}`;
  if (cookie) command += ` --cookie=${quoteArg(cookie)}`;

  return command;
}
