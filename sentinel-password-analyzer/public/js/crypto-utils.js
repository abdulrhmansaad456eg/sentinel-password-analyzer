
 * Cryptographic Utility Module
 * Uses Native Web Crypto API for performance and security.
 */

export async function sha1(str) {
    const buffer = new TextEncoder("utf-8").encode(str);
    
    const hash = await crypto.subtle.digest("SHA-1", buffer);
    return hex(hash);
}

function hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        
        const padding = '00000000';
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("").toUpperCase();
}