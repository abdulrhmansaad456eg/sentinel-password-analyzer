import { analyzePassword, checkBreach } from './analyzer.js';

const input = document.getElementById('passwordInput');
const dashboard = document.getElementById('resultsDashboard');
const toggleBtn = document.getElementById('toggleVisibility');

let debounceTimer;


function updateUI(analysis, breachData) {
    dashboard.classList.remove('hidden');

    
    const scoreEl = document.getElementById('scoreDisplay');
    scoreEl.className = `score-${analysis.zxcvbn.score}`;
    scoreEl.innerText = `${analysis.zxcvbn.score} / 4`;

    
    document.getElementById('crackTimeDisplay').innerText = 
        `Crack Time: ${analysis.zxcvbn.crack_times_display.offline_slow_hashing_1e4_per_second}`;

    
    document.getElementById('entropyDisplay').innerText = `${analysis.entropy} bits`;

    
    const breachEl = document.getElementById('breachResult');
    if (breachData.status === 'pwned') {
        breachEl.innerHTML = `<span style="color:var(--danger)">⚠️ Found in ${breachData.count.toLocaleString()} data breaches!</span>`;
        document.getElementById('rule-breach').className = 'fail';
        document.getElementById('rule-breach').innerText = "Found in known data breach";
    } else {
        breachEl.innerHTML = `<span style="color:var(--success)">✓ Not found in public databases</span>`;
        document.getElementById('rule-breach').className = 'pass';
        document.getElementById('rule-breach').innerText = "Not found in public databases";
    }

    
    document.getElementById('rule-length').className = analysis.nist.length ? 'pass' : 'fail';
    document.getElementById('rule-dict').className = analysis.nist.dictionary ? 'pass' : 'fail';
}


input.addEventListener('input', (e) => {
    const pwd = e.target.value;
    
    if(pwd.length === 0) {
        dashboard.classList.add('hidden');
        return;
    }

    
    clearTimeout(debounceTimer);

    
    debounceTimer = setTimeout(async () => {
        const analysis = await analyzePassword(pwd);
        const breachData = await checkBreach(pwd);
        updateUI(analysis, breachData);
    }, 500);
});

toggleBtn.addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
});