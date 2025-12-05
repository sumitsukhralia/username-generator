/* DATASET: Compressed for efficiency 
  ~800+ implied combinations via arrays 
*/
const data = {
    adj: {
        aesthetic: ["Soft", "Pale", "Velvet", "Lunar", "Honey", "Silk", "Ethereal", "Bloom", "Mist", "Cloud", "Vanilla", "Rose", "Divine", "Hollow", "Pure", "Fairy", "Angel", "Ghost", "Pearl", "Crystal", "Golden", "Quiet", "Secret", "Lost", "Dreamy", "Lush", "Nova", "Stellar", "Cosmic", "Petal"],
        gamer: ["Toxic", "Rapid", "Shadow", "Elite", "Pro", "Hyper", "Cyber", "Neon", "Rogue", "Savage", "Viper", "Ghost", "Sniper", "Dark", "Venom", "Iron", "Steel", "Alpha", "Omega", "Chaos", "Storm", "Void", "Pixel", "Glitch", "Turbo", "Sonic", "Fatal", "Reaper", "Strike", "Nitro"],
        cute: ["Smol", "Tiny", "Puff", "Mochi", "Boba", "Peach", "Bunny", "Kitty", "Puppy", "Sugar", "Candy", "Cookie", "Berry", "Daisy", "Fluffy", "Jelly", "Minty", "Star", "Heart", "Love", "Baby", "Cinnamon", "Cherry", "Lemon", "Melon", "Cocoa", "Milk", "Tea", "Sunny", "Happy"],
        edgy: ["Null", "Void", "X", "Zero", "Dead", "Sad", "Alone", "Cold", "Grey", "Broken", "Fade", "Numb", "End", "Cryptic", "Static", "Blank", "Abyss", "Grim", "Hate", "Pain", "Blood", "Rage", "Lost", "Anti", "Gone", "Fear", "Lies", "Ash", "Dust", "Rot"]
    },
    noun: {
        aesthetic: ["Soul", "Mind", "Vibe", "Aura", "Glow", "Light", "Night", "Sky", "Star", "Moon", "Sun", "Rain", "Snow", "Wind", "Sea", "Ocean", "River", "Flower", "Garden", "Forest", "Leaf", "Tree", "Bird", "Wing", "Dream", "Wish", "Hope", "Love", "Life", "Heart"],
        gamer: ["Slayer", "Hunter", "Killer", "Warrior", "Knight", "Lord", "King", "God", "Boss", "Master", "Legend", "Hero", "Villain", "Demon", "Beast", "Monster", "Dragon", "Wolf", "Tiger", "Lion", "Shark", "Snake", "Cobra", "Eagle", "Hawk", "Falcon", "Raven", "Crow", "Bear", "Fox"],
        cute: ["Bear", "Cat", "Dog", "Panda", "Koala", "Frog", "Duck", "Bee", "Bug", "Worm", "Fish", "Whale", "Seal", "Penguin", "Owl", "Mouse", "Hamster", "Rabbit", "Deer", "Sheep", "Goat", "Cow", "Pig", "Horse", "Unicorn", "Mermaid", "Elf", "Fairy", "Gnome", "Sprite"],
        edgy: ["Boy", "Girl", "Man", "Woman", "Kid", "Teen", "Soul", "Spirit", "Ghost", "Phantom", "Wraith", "Specter", "Shadow", "Shade", "Darkness", "Nightmare", "Terror", "Horror", "Fear", "Panic", "Anxiety", "Depression", "Misery", "Sorrow", "Grief", "Pain", "Agony", "Death", "Doom", "Fate"]
    },
    suffix: ["x", "xo", "z", "qt", "ly", "fy", "ism", "ist", "er", "or", "ia", "on", "yn", "ix", "ex", "ax", "ox", "ux", "az", "ez", "iz", "oz", "uz", "_", ".", "!", "?", "$", "*", "#"],
    prefix: ["iAm", "The", "Its", "Real", "Just", "Ur", "My", "Da", "Lil", "Big", "Dr", "Mr", "Ms", "Mrs", "Sir", "Lady", "Lord", "King", "Queen", "Prince", "Princess", "Duke", "Count", "Baron", "Saint", "Holy", "Dark", "Light", "Good", "Bad"]
};

// Analytics Hook
window.trackEvent = (name, data) => {
    console.log(`[Analytics] ${name}`, data);
    // Integrate GA4 or Plausible here later
};

// State
let cooldown = false;

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const resultsArea = document.getElementById('resultsArea');
const consentModal = document.getElementById('consentModal');

// Init
window.onload = () => {
    if(!localStorage.getItem('consent')) {
        consentModal.classList.add('active');
    }
};

document.getElementById('acceptBtn').onclick = () => {
    localStorage.setItem('consent', 'true');
    consentModal.classList.remove('active');
};

// Core Logic
generateBtn.onclick = () => {
    if (cooldown) return;

    // Rate Limiter
    cooldown = true;
    generateBtn.disabled = true;
    document.getElementById('cooldownMsg').classList.remove('hidden');
    
    // Core Generation
    const cat = document.getElementById('category').value;
    const base = document.getElementById('baseWord').value.trim();
    const useNum = document.getElementById('useNumbers').checked;
    const useSpec = document.getElementById('useSpecials').checked;
    const lenVal = document.getElementById('lengthRange').value; // 1=short, 2=med, 3=long
    
    const results = [];
    
    for (let i = 0; i < 20; i++) {
        let name = "";
        const style = data.adj[cat] || data.adj.aesthetic;
        const nouns = data.noun[cat] || data.noun.aesthetic;
        
        // Mode Selection logic (randomized per iteration for variety)
        const mode = Math.random();
        
        if (base && mode > 0.5) {
            // Remix Mode with Base
            if (Math.random() > 0.5) name = getRandom(style) + base;
            else name = base + getRandom(nouns);
        } else {
            // Pure Random
            if (lenVal == 1) name = getRandom(style); 
            else if (lenVal == 3) name = getRandom(style) + getRandom(nouns) + getRandom(style);
            else name = getRandom(style) + getRandom(nouns);
        }

        // Modifiers
        if (useNum && Math.random() > 0.6) name += Math.floor(Math.random() * 99);
        if (useSpec && Math.random() > 0.7) name = `x_${name}_x`;
        if (useSpec && Math.random() > 0.8) name = `.${name}.`;

        results.push(name);
    }

    renderResults(results);

    // Reset Cooldown
    setTimeout(() => {
        cooldown = false;
        generateBtn.disabled = false;
        document.getElementById('cooldownMsg').classList.add('hidden');
    }, 3000);

    window.trackEvent('generated', { category: cat });
};

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function renderResults(names) {
    resultsArea.innerHTML = '';
    names.forEach(name => {
        const div = document.createElement('div');
        div.className = 'result-card';
        div.innerHTML = `
            <span class="username-text">${name}</span>
            <div class="card-actions">
                <button class="action-btn" onclick="copyName('${name}')">Copy</button>
                <button class="action-btn" onclick="savePng('${name}')">PNG</button>
            </div>
        `;
        resultsArea.appendChild(div);
    });
}

// Utils
window.copyName = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied: ' + text);
};

window.savePng = (text) => {
    // Pure JS Canvas Generation (No external libs)
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background (Palette Purple)
    ctx.fillStyle = "#855DAD"; 
    ctx.fillRect(0, 0, 600, 400);

    // Inner Card
    ctx.fillStyle = "#F6F2FF";
    ctx.fillRect(50, 50, 500, 300);

    // Text Attributes
    ctx.fillStyle = "#000000";
    ctx.font = "bold 40px 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw Text
    ctx.fillText(text, 300, 200);
    
    // Footer watermark
    ctx.font = "20px serif";
    ctx.fillStyle = "#5B3B79";
    ctx.fillText("username-gen.com", 300, 310);

    // Download
    const link = document.createElement('a');
    link.download = `${text}-card.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    window.trackEvent('saved_png', { name: text });
};
