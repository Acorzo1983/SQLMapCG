import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * Minimal DOM shim: the option builders only need getElementById(id) with
 * value/checked accessors, which is enough to test the command they produce.
 */
const values = new Map();
const checked = new Map();

globalThis.document = {
  getElementById(id) {
    return {
      id,
      get value() {
        return values.get(id) ?? '';
      },
      set value(next) {
        values.set(id, String(next));
      },
      get checked() {
        return checked.get(id) ?? false;
      },
      set checked(next) {
        checked.set(id, Boolean(next));
      }
    };
  }
};

const { buildCommand } = await import('../js/commandBuilder.js');

const DEFAULTS = {
  url: 'http://example.com/vuln.php?id=1',
  'google-dork': '',
  data: '',
  cookie: '',
  'crawl-depth': '0',
  'crawl-exclude': '',
  'random-agent': false,
  tor: false,
  proxy: '',
  optimize: false,
  threads: '1',
  'keep-alive': false,
  level: '1',
  risk: '1',
  verbosity: '1',
  'tech-b': true,
  'tech-e': true,
  'tech-u': true,
  'tech-s': true,
  'tech-t': true,
  'tech-q': true,
  all: false,
  banner: false,
  'current-user': false,
  'current-db': false,
  passwords: false,
  dbs: false,
  tables: false,
  columns: false,
  schema: false,
  dump: false,
  'os-shell': false,
  'os-pwn': false,
  batch: true,
  'flush-session': false,
  tamper: ''
};

function reset(overrides = {}) {
  values.clear();
  checked.clear();

  for (const [id, value] of Object.entries({ ...DEFAULTS, ...overrides })) {
    if (typeof value === 'boolean') {
      checked.set(id, value);
    } else {
      values.set(id, String(value));
    }
  }
}

test('builds a minimal command with sqlmap defaults', () => {
  reset();

  assert.equal(
    buildCommand(),
    'sqlmap -u "http://example.com/vuln.php?id=1" --level=1 --risk=1 -v 1 --technique=BEUSTQ --batch'
  );
});

test('does not force crawling when crawl depth is 0', () => {
  reset({ 'crawl-depth': '0' });

  assert.ok(!buildCommand().includes('--crawl'));
});

test('emits --crawl only for a positive depth', () => {
  reset({ 'crawl-depth': '3', 'crawl-exclude': 'logout|admin' });

  assert.match(buildCommand(), /--crawl=3 --crawl-exclude="logout\|admin"/);
});

test('clamps numeric options to their valid ranges', () => {
  reset({
    level: '99',
    risk: '0',
    verbosity: '-4',
    threads: '999',
    'crawl-depth': '50'
  });

  const command = buildCommand();

  assert.match(command, /--crawl=10 /);
  assert.match(command, /--threads=10 /);
  assert.match(command, /--level=5 --risk=1 -v 0 /);
});

test('falls back to defaults for non-numeric input', () => {
  reset({ level: 'abc', risk: '', verbosity: '', threads: '', 'crawl-depth': '' });

  const command = buildCommand();

  assert.ok(!command.includes('--crawl'));
  assert.ok(!command.includes('--threads'));
  assert.match(command, /--level=1 --risk=1 -v 1 /);
});

test('escapes shell metacharacters inside quoted arguments', () => {
  reset({
    url: 'http://example.com/?q=$(id)',
    data: 'user="admin"&pass=`whoami`',
    cookie: 'session=a$b',
    proxy: 'http://127.0.0.1:8080\\path',
    'google-dork': 'inurl:".php?id=1"',
    tamper: 'space2comment,between'
  });

  const command = buildCommand();

  assert.match(command, /-u "http:\/\/example\.com\/\?q=\\\$\(id\)"/);
  assert.match(command, /--data="user=\\"admin\\"&pass=\\`whoami\\`"/);
  assert.match(command, /--cookie="session=a\\\$b"/);
  assert.match(command, /--proxy="http:\/\/127\.0\.0\.1:8080\\\\path"/);
  assert.match(command, /--tamper="space2comment,between"/);
});

test('includes every selected option in a stable order', () => {
  reset({
    'google-dork': 'inurl:".php?id=1"',
    data: 'id=1',
    cookie: 'PHPSESSID=abc',
    'crawl-depth': '2',
    'random-agent': true,
    tor: true,
    proxy: 'http://127.0.0.1:8080',
    optimize: true,
    threads: '4',
    'keep-alive': true,
    level: '3',
    risk: '2',
    verbosity: '4',
    'tech-b': true,
    'tech-e': true,
    'tech-u': false,
    'tech-s': false,
    'tech-t': false,
    'tech-q': false,
    all: true,
    'os-shell': true,
    'os-pwn': true,
    'flush-session': true,
    tamper: 'space2comment'
  });

  assert.equal(
    buildCommand(),
    'sqlmap -u "http://example.com/vuln.php?id=1" -g "inurl:\\".php?id=1\\"" --data="id=1" --cookie="PHPSESSID=abc" ' +
      '--crawl=2 --random-agent --tor --proxy="http://127.0.0.1:8080" -o --threads=4 --keep-alive ' +
      '--level=3 --risk=2 -v 4 --technique=BE --all --os-shell --os-pwn --batch --flush-session ' +
      '--tamper="space2comment"'
  );
});
