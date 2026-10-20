import { quoteArg, readNumber, readText } from '../utils.js';

export function addCrawlingOptions(command) {
  // 0 = crawling disabled (sqlmap's own default), so nothing is emitted.
  const crawlDepth = readNumber('crawl-depth', { min: 0, max: 10, fallback: 0 });
  const crawlExclude = readText('crawl-exclude');

  if (crawlDepth > 0) command += ` --crawl=${crawlDepth}`;
  if (crawlExclude) command += ` --crawl-exclude=${quoteArg(crawlExclude)}`;

  return command;
}
