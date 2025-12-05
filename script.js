// 1. Theme Logic
const themeBtn = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') enableDark();

window.toggleTheme = () => {
    if (body.classList.contains('dark-mode')) disableDark();
    else enableDark();
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
const trendingList = document.getElementById('trendingList');

generateBtn.onclick = () => {
    generateUsernames(true); // true = Main Area
};

// 3. Helper Functions
function generateUsernames(isMainArea) {
    const db = window.wordDatabase || { aesthetic: ["Error"], nouns: ["Error"] };
    
    // Get inputs (only for main area, otherwise random defaults)
    let cat = 'aesthetic';
    let base = '';
    let useNum = false;
    let useSpec = false;

    if (isMainArea) {
        cat = document.getElementById('category').value;
        base = document.getElementById('baseWord').value.trim();
        useNum = document.getElementById('useNumbers').checked;
        useSpec = document.getElementById('useSpecials').checked;
    } else {
        // Randomize category for trending list
        const cats = ['aesthetic', 'gamer', 'cute', 'premium'];
        cat = cats[Math.floor(Math.random() * cats.length)];
    }

    const styleWords = db[cat] || db.aesthetic; 
    const nounWords = db.nouns || ["User"];
    
    const results = [];
    const count = isMainArea ? 24 : 12; // Generate 24 for main, 12 for trending

    for (let i = 0; i < count; i++) {
        let name = "";
        const w1 = getRandom(styleWords);
        const w2 = getRandom(nounWords);

        if (base && isMainArea) {
            if (Math.random() > 0.5) name = w1 + base;
            else name = base + w2;
        } else {
            if (cat === 'premium') name = w1; 
            else name = w1 + w2;
        }

        if (useNum && Math.random() > 0.6) name += Math.floor(Math.random() * 99);
        if (useSpec && Math.random() > 0.8) name = `x${name}x`;

        results.push(name);
    }

    if (isMainArea) {
        renderResults(results);
    } else {
        renderTrending(results);
    }
}

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

// 4. New Trending Render Function
function renderTrending(names) {
    trendingList.innerHTML = '';
    names.forEach(name => {
        const span = document.createElement('span');
        span.className = 'trending-tag';
        span.innerText = name;
        trendingList.appendChild(span);
    });
}

window.copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
};

// 5. Initialize Trending on Load
window.onload = () => {
    generateUsernames(false); // False = fill the trending section
};
