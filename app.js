const fonts = [
    {
        id: 'cartograph-cf',
        name: 'CartographCF',
        family: 'CartographCF, monospace',
        category: 'Monospace',
        styles: ['Light', 'Regular', 'DemiBold'],
        demoUrl: './fonts/nerdfont/cartographcf/demo-cartograph-cf.html',
        cssCode: `@font-face {
    font-family: 'CartographCF';
    src: url('./fonts/cartographcf/CartographCF-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}`
    },
    {
        id: 'cartograph-nerd',
        name: 'CartographCF Nerd Font',
        family: 'CartographCF Nerd Font, monospace',
        category: 'Monospace',
        styles: ['Light', 'Regular', 'DemiBold', 'Italic'],
        demoUrl: './fonts/nerdfont/cartographcf/cartography-font-demo.html',
        cssCode: `@font-face {
    font-family: 'CartographCF Nerd Font';
    src: url('./fonts/nerdfont/cartographcf/regular/cartograph-cf-nerd-font-complete-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}`
    },
    {
        id: 'dank-mono',
        name: 'Dank Mono',
        family: 'Dank Mono, monospace',
        category: 'Monospace',
        styles: ['Regular', 'Bold', 'Italic'],
        demoUrl: './fonts/dankmono/',
        cssCode: `@font-face {
    font-family: 'Dank Mono';
    src: url('./fonts/dankmono/dank-mono-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}`
    },
    {
        id: 'parity-sans',
        name: 'Parity Sans',
        family: 'Parity Sans, sans-serif',
        category: 'Sans-Serif',
        styles: ['Regular', 'Medium', 'ExtraBold'],
        demoUrl: './fonts/parity/',
        cssCode: `@font-face {
    font-family: 'Parity Sans';
    src: url('./fonts/parity/ParitySansRegular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}`
    },
    {
        id: 'josefin',
        name: 'Josefin Sans',
        family: 'Josefin Sans, sans-serif',
        category: 'Sans-Serif',
        styles: ['Light', 'Regular', 'SemiBold', 'Italic'],
        demoUrl: './fonts/josefin/',
        cssCode: `@font-face {
    font-family: 'Josefin Sans';
    src: url('./fonts/josefin/josefin400.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}`
    },
    {
        id: 'concourse',
        name: 'Concourse',
        family: 'Concourse, sans-serif',
        category: 'Sans-Serif',
        styles: ['Light', 'Regular', 'Heavy'],
        demoUrl: './fonts/conc-valk/conc-valk-collection.html',
        cssCode: `@font-face {
    font-family: 'Concourse';
    src: url('./fonts/conc-valk/concourse.css');
    font-weight: 400;
    font-style: normal;
}`
    },
    {
        id: 'valkyrie',
        name: 'Valkyrie',
        family: 'Valkyrie, serif',
        category: 'Serif',
        styles: ['Light', 'Regular'],
        demoUrl: './fonts/conc-valk/conc-valk-collection.html',
        cssCode: `@font-face {
    font-family: 'Valkyrie';
    src: url('./fonts/conc-valk/valkyrie-light.css');
    font-weight: 300;
    font-style: normal;
}`
    },
    {
        id: 'equity',
        name: 'Equity',
        family: 'Equity, serif',
        category: 'Serif',
        styles: ['Light', 'Regular', 'Heavy'],
        demoUrl: './fonts/conc-valk/conc-valk-collection.html',
        cssCode: `@font-face {
    font-family: 'Equity';
    src: url('./fonts/conc-valk/equity.css');
    font-weight: 400;
    font-style: normal;
}`
    },
    {
        id: 'concourse-index',
        name: 'Concourse Index',
        family: 'Concourse Index, sans-serif',
        category: 'Display',
        styles: ['Regular'],
        demoUrl: './fonts/concourse-index/concourse index-sample.html',
        cssCode: `@font-face {
    font-family: 'Concourse Index';
    src: url('./fonts/concourse-index/concourse_index_regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}`
    }
];

let favorites = JSON.parse(localStorage.getItem('fontFavorites')) || [];
let currentPreviewText = 'The quick brown fox jumps over the lazy dog';
let currentSize = 24;
let currentWeight = 400;

function init() {
    setupThemeToggle();
    setupTabs();
    setupControls();
    renderFonts();
    populateCompareSelects();
    updateFavCount();
}

function setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            
            if (tab.dataset.tab === 'favorites') {
                renderFavorites();
            }
        });
    });
}

function setupControls() {
    const searchInput = document.getElementById('searchInput');
    const previewText = document.getElementById('previewText');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    const weightSelect = document.getElementById('weightSelect');
    
    searchInput.addEventListener('input', (e) => {
        filterFonts(e.target.value);
    });
    
    previewText.addEventListener('input', (e) => {
        currentPreviewText = e.target.value || 'The quick brown fox jumps over the lazy dog';
        updateAllPreviews();
    });
    
    sizeSlider.addEventListener('input', (e) => {
        currentSize = parseInt(e.target.value);
        sizeValue.textContent = currentSize;
        updateAllPreviews();
    });
    
    weightSelect.addEventListener('change', (e) => {
        currentWeight = parseInt(e.target.value);
        updateAllPreviews();
    });
}

function renderFonts(filteredFonts = fonts) {
    const grid = document.getElementById('fontGrid');
    grid.innerHTML = filteredFonts.map(font => createFontCard(font)).join('');
    attachCardListeners();
}

function createFontCard(font) {
    const isFavorited = favorites.includes(font.id);
    return `
        <div class="font-card" data-font-id="${font.id}">
            <div class="font-card-header">
                <div>
                    <div class="font-card-title">${font.name}</div>
                    <div class="font-card-meta">${font.category}</div>
                </div>
                <div class="font-card-actions">
                    <button class="action-btn favorite-btn ${isFavorited ? 'favorited' : ''}" 
                            data-font-id="${font.id}" 
                            title="Add to favorites">
                        ${isFavorited ? '❤️' : '🤍'}
                    </button>
                    <button class="action-btn copy-btn" 
                            data-css="${encodeURIComponent(font.cssCode)}" 
                            title="Copy CSS">
                        📋
                    </button>
                </div>
            </div>
            <div class="font-preview" style="font-family: ${font.family}; font-size: ${currentSize}px; font-weight: ${currentWeight};">
                ${currentPreviewText}
            </div>
            <div class="font-card-footer">
                <div class="font-styles">
                    ${font.styles.map(s => `<span class="style-tag">${s}</span>`).join('')}
                </div>
                <a href="${font.demoUrl}" class="demo-link" target="_blank">View Demo →</a>
            </div>
        </div>
    `;
}

function attachCardListeners() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(btn.dataset.fontId);
            btn.classList.add('pulse');
            setTimeout(() => btn.classList.remove('pulse'), 300);
        });
    });
    
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const css = decodeURIComponent(btn.dataset.css);
            copyToClipboard(css);
        });
    });
}

function toggleFavorite(fontId) {
    const index = favorites.indexOf(fontId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        favorites.push(fontId);
        showToast('Added to favorites!');
    }
    localStorage.setItem('fontFavorites', JSON.stringify(favorites));
    updateFavCount();
    renderFonts();
    
    const favoritesTab = document.getElementById('favorites');
    if (favoritesTab.classList.contains('active')) {
        renderFavorites();
    }
}

function updateFavCount() {
    document.getElementById('favCount').textContent = favorites.length;
}

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const favFonts = fonts.filter(f => favorites.includes(f.id));
    
    if (favFonts.length === 0) {
        grid.innerHTML = '<p class="empty-message">No favorites yet. Click the heart icon on any font to add it!</p>';
    } else {
        grid.innerHTML = favFonts.map(font => createFontCard(font)).join('');
        attachCardListeners();
    }
}

function filterFonts(query) {
    const q = query.toLowerCase();
    const filtered = fonts.filter(f => 
        f.name.toLowerCase().includes(q) || 
        f.category.toLowerCase().includes(q) ||
        f.styles.some(s => s.toLowerCase().includes(q))
    );
    renderFonts(filtered);
}

function updateAllPreviews() {
    document.querySelectorAll('.font-preview').forEach(preview => {
        preview.style.fontSize = `${currentSize}px`;
        preview.style.fontWeight = currentWeight;
        preview.textContent = currentPreviewText;
    });
    
    document.querySelectorAll('.compare-text').forEach(text => {
        text.style.fontSize = `${currentSize}px`;
        text.style.fontWeight = currentWeight;
        if (text.dataset.hasFont) {
            text.textContent = currentPreviewText;
        }
    });
}

function populateCompareSelects() {
    const select1 = document.getElementById('compareFont1');
    const select2 = document.getElementById('compareFont2');
    
    const options = fonts.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    select1.innerHTML = '<option value="">Select font...</option>' + options;
    select2.innerHTML = '<option value="">Select font...</option>' + options;
    
    select1.addEventListener('change', () => updateComparePreview(1));
    select2.addEventListener('change', () => updateComparePreview(2));
}

function updateComparePreview(panel) {
    const select = document.getElementById(`compareFont${panel}`);
    const preview = document.getElementById(`comparePreview${panel}`);
    const font = fonts.find(f => f.id === select.value);
    
    if (font) {
        preview.innerHTML = `<p class="compare-text" data-has-font="true" style="font-family: ${font.family}; font-size: ${currentSize}px; font-weight: ${currentWeight};">${currentPreviewText}</p>`;
    } else {
        preview.innerHTML = '<p class="compare-text">Select a font to preview</p>';
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('CSS copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', init);
