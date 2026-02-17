import { sha1 } from './crypto-utils.js';



function calculateEntropy(password) {
    const charsetSize = getCharsetSize(password);
    return Math.round(password.length * Math.log2(charsetSize));
}

function getCharsetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/[0-9]/.test(password)) size += 10;
    if (/[^a-zA-Z0-9]/.test(password)) size += 32; 
    return Math.max(size, 1); 
}


async function checkBreach(password) {
    if (!password) return { count: 0, status: 'neutral' };

    const hash = await sha1(password);
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    try {
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();
        
        
        const lines = data.split('\n');
        const match = lines.find(line => line.startsWith(suffix));
        
        if (match) {
            const count = parseInt(match.split(':')[1]);
            return { count: count, status: 'pwned' };
        }
        return { count: 0, status: 'clean' };
    } catch (e) {
        console.error("API Breach Check Failed", e);
        return { count: 0, status: 'error' };
    }
}

export async function analyzePassword(password) {
    
    const zxcvbnResult = window.zxcvbn ? window.zxcvbn(password) : { score: 0, crack_time_display: { offline_slow_hashing_1e4_per_second: "..." } };
    
    
    const entropy = calculateEntropy(password);

    
    const nistChecks = {
        length: password.length >= 8,
        dictionary: zxcvbnResult.score > 1, 
    };

    return {
        zxcvbn: zxcvbnResult,
        entropy: entropy,
        nist: nistChecks
    };
}

export { checkBreach };