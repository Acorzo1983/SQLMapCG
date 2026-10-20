import { buildCommand } from './commandBuilder.js';
import { toggleTheme, initTheme } from './theme.js';

const EMPTY_MESSAGE = 'Choose a Target URL or a Google Dork, then press "Generate Command".';

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // Add event listeners
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('generate-btn').addEventListener('click', generateCommand);
    document.getElementById('copy-btn').addEventListener('click', copyCommand);

    // Handle incompatible options
    const allOption = document.getElementById('all');
    allOption.addEventListener('change', function () {
        const enumOptions = [
            'banner', 'current-user', 'current-db', 'passwords',
            'dbs', 'tables', 'columns', 'schema', 'dump'
        ];

        enumOptions.forEach(opt => {
            const el = document.getElementById(opt);
            el.disabled = this.checked;
            if (this.checked) el.checked = false;
        });
    });
});

function generateCommand() {
    const output = document.getElementById('output');
    const copyButton = document.getElementById('copy-btn');
    const url = document.getElementById('url').value.trim();
    const googleDork = document.getElementById('google-dork').value.trim();

    if (!url && !googleDork) {
        output.textContent = EMPTY_MESSAGE;
        output.dataset.state = 'empty';
        copyButton.disabled = true;
        return;
    }

    output.textContent = buildCommand();
    output.dataset.state = 'ready';
    copyButton.disabled = false;
}

async function copyCommand() {
    const output = document.getElementById('output');
    const button = document.getElementById('copy-btn');
    const command = output.textContent.trim();

    if (!command || output.dataset.state !== 'ready') {
        button.textContent = 'Nothing to copy';
        setTimeout(() => button.textContent = 'Copy Command', 2000);
        return;
    }

    const copied = await writeClipboard(command);
    button.textContent = copied ? 'Copied!' : 'Copy failed';
    setTimeout(() => button.textContent = 'Copy Command', 2000);
}

async function writeClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fall back to execCommand below (older browsers, insecure contexts).
        }
    }

    try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const copied = document.execCommand('copy');
        area.remove();
        return copied;
    } catch {
        return false;
    }
}
