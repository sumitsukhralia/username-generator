/* Username Generator Logic */

const data = {
    adj: {
        aesthetic: ["Soft", "Pale", "Velvet", "Lunar", "Honey", "Silk", "Ethereal", "Bloom", "Mist", "Cloud"],
        gamer: ["Toxic", "Rapid", "Shadow", "Elite", "Pro", "Hyper", "Cyber", "Neon", "Rogue", "Savage"],
        cute: ["Smol", "Tiny", "Puff", "Mochi", "Boba", "Peach", "Bunny", "Kitty", "Puppy", "Sugar"],
        edgy: ["Null", "Void", "X", "Zero", "Dead", "Sad", "Alone", "Cold", "Grey", "Broken"]
    },
    noun: {
        aesthetic: ["Soul", "Mind", "Vibe", "Aura", "Glow", "Light", "Night", "Sky", "Star", "Moon"],
        gamer: ["Slayer", "Hunter", "Killer", "Warrior", "Knight", "Lord", "King", "God", "Boss", "Master"],
        cute: ["Bear", "Cat", "Dog", "Panda", "Koala", "Frog", "Duck", "Bee", "Bug", "Worm"],
        edgy: ["Boy", "Girl", "Man", "Woman", "Soul", "Spirit", "Ghost", "Phantom", "Wraith", "Shadow"]
    }
};

// State
let cooldown = false;

// Elements
const generateBtn = document.getElementById('generateBtn');
const resultsArea = document.getElementById('resultsArea');

// Generate Function
generateBtn.onclick = () => {
    if (cooldown) return;

    // Start Cooldown
    cooldown = true;
    generateBtn.disabled = true;
    document.getElementById('cooldownMsg').classList.remove('hidden');

    // Get Inputs
    const cat = document.getElementById('category').value;
    const base = document.getElementById('baseWord').value.trim();
    const useNum = document.getElementById('useNumbers').checked;
    const useSpec = document.getElementById('useSpecials').checked;

    const results = [];

    // Generate 20 Names
    for (let i = 0; i < 20; i++) {
        let name = "";
        const style = data.adj[cat] || data.adj.aesthetic;
        const nouns = data.noun[cat] || data.noun.aesthetic;
        
        // Random Logic
        const randAdj = style[Math.floor(Math.random() * style.length)];
        const randNoun = nouns[Math.floor(Math.random() * nouns.length)];

        if (base) {
             // 50% chance: Adjective + Base OR Base + Noun
             if (Math.random() > 0.5) name = randAdj + base;
             else name = base + randNoun;
        } else {
             name = randAdj + randNoun;
        }

        // Add extras
        if (useNum && Math.random() > 0.6) name += Math.floor(Math.random() * 99);
        if (useSpec && Math.random() > 0.7) name = `.${name}.`;
        
        results.push(name);
    }

    renderResults(results);

    // Reset Cooldown after 3 seconds
    setTimeout(() => {
        cooldown = false;
        generateBtn.disabled = false;
        document.getElementById('cooldownMsg').classList.add('hidden');
    }, 3000);
};

function renderResults(names) {
    resultsArea.innerHTML = '';
    names.forEach(name => {
        const div = document.createElement('div');
        div.className = 'result-card';
        div.innerHTML = `
            <span class="username-text">${name}</span>
            <div class="card-actions">
                <button class="action-btn" onclick="navigator.clipboard.writeText('${name}')">Copy</button>
            </div>
        `;
        resultsArea.appendChild(div);
    });
}
