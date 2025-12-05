// 1. Theme Logic
const themeBtn = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
    enableDark();
}

// Toggle Function
window.toggleTheme = () => {
    if (body.classList.contains('dark-mode')) {
        disableDark();
    } else {
        enableDark();
    }
};

function enableDark() {
    body.classList.add('dark-mode');
    themeBtn.innerText = "☀️ Light";
    localStorage.setItem('theme', 'dark');
}

function disableDark() {
    body.classList.remove('dark-mode');
    themeBtn.innerText = "🌙 Dark";
    localStorage.setItem('theme', 'light');
}

// 2. Generator Logic
const generateBtn = document.getElementById('generateBtn');
const resultsArea = document.getElementById('resultsArea');

generateBtn.onclick = () => {
    const cat = document.getElementById('category').value;
    const base = document.getElementById('baseWord').value.trim();
    const useNum = document.getElementById('useNumbers').checked;
    const useSpec = document.getElementById('useSpecials').checked;

    // Pull data from words.js (window.wordDatabase)
    // If words.js is missing, fall back to empty arrays to prevent crash
    const db = window.wordDatabase || { aesthetic: [], gamer: [], nouns: [] };

    const styleWords = db[cat] || db.aesthetic; 
    const nounWords = db.nouns;
    
    const results = [];

    for (let i = 0; i < 24; i++) {
        let name = "";
        
        // Pick random words
        const w1 = getRandom(styleWords);
        const w2 = getRandom(nounWords);
        const w3 = getRandom(styleWords);

        if (base) {
            // If user typed a word, mix it in
            if (Math.random() > 0.5) name = w1 + base;
            else name = base + w2;
        } else {
            // Random Combo
            if (cat === 'premium') name = w1; // Premium is usually one short word
            else name = w1 + w2;
        }

        // Add suffixes
        if (useNum && Math.random() > 0.6) name += Math.floor(Math.random() * 99);
        if (useSpec && Math.random() > 0.8) name = `x${name}x`;
        if (useSpec && Math.random() > 0.9) name = `_${name}_`;

        results.push(name);
    }

    renderResults(results);
};

function getRandom(arr) {
    if (!arr || arr.length === 0) return "User";
    return arr[Math.floor(Math.random() * arr.length)];
}

function renderResults(names) {
    resultsArea.innerHTML = '';
    names.forEach(name => {
        const div = document.createElement('div');
        div.className = 'result-card';
        div.innerHTML = `
            <span class="username-text">${name}</span>
            <button class="action-btn" onclick="copyText('${name}')">Copy</button>
        `;
        resultsArea.appendChild(div);
    });
}

window.copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
};
