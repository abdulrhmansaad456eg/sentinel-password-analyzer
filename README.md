# Sentinel: Privacy-Preserving Credential Analyzer
**Developer:** Abdelrahman Mohamed Saad  
**Technical Focus:** NIST SP 800-63B Compliance & Client-Side Cryptography

##  Project Overview
Sentinel is a high-performance, security-focused web application designed to analyze password strength without compromising user privacy. Built for a competitive cybersecurity portfolio, it demonstrates the implementation of modern authentication standards and "Privacy-by-Design" principles.

##  Key Features
* **100% Client-Side Analysis:** No password data ever leaves the user's browser.
* **k-Anonymity Breach Check:** Uses the HaveIBeenPwned API via a partial-hash (5-character prefix) range search, ensuring the full hash is never transmitted.
* **NIST SP 800-63B Alignment:** Replaces outdated complexity rules with entropy-based strength detection and known-breach verification.
* **Information Theory Metrics:** Calculates Shannon Entropy to provide an objective measure of credential density.
* **Advanced Heuristics:** Integrated with the `zxcvbn` library for realistic resistance estimates against dictionary and brute-force attacks.

##  Technical Architecture
The project is built using **Modular ES6 JavaScript** to ensure a clean separation of concerns:
* `crypto-utils.js`: Manages SHA-1 hashing using the native Web Crypto API.
* `analyzer.js`: Core logic for entropy calculation and NIST guideline validation.
* `ui.js`: Handles DOM updates and responsive dashboard rendering.



##  Security & Threat Model
### Privacy Guarantee
We follow a **Zero-Knowledge** architecture. By utilizing the Web Crypto API, we generate a SHA-1 hash locally. We only transmit the first 5 hex characters of this hash to check for breaches. This prevents the service provider from ever reconstructing the user's password.

### Compliance
Aligns with **OWASP Password Storage Guidelines** and **NIST Digital Identity Guidelines**. It specifically targets the mitigation of:
1.  Credential Stuffing (via Breach Checking)
2.  Dictionary Attacks (via Heuristic Analysis)
3.  Brute-Force Attacks (via Entropy Calculation)

##  Deployment & DevOps
* **Hosting:** Google Firebase (Global CDN)
* **Version Control:** Git/GitHub
* **Security Headers:** Configured via `firebase.json` for enhanced transport security.

##  License
This project is licensed under the MIT License - see the LICENSE file for details.

