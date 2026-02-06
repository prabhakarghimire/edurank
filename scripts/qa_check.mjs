
const BASE_URL = 'http://localhost:3000';

async function runQA() {
    console.log('🤖 AI QA Agent starting verification on ' + BASE_URL);
    let passed = 0;
    let failed = 0;

    async function check(name, url, expectedText) {
        try {
            console.log(`\nTesting: ${name}`);
            const res = await fetch(url);
            if (res.status !== 200) throw new Error(`Status ${res.status}`);
            const text = await res.text();

            if (text.includes(expectedText)) {
                console.log(`✅ PASS: Found "${expectedText}"`);
                passed++;
            } else {
                console.log(`❌ FAIL: Text "${expectedText}" not found in ${url}`);
                failed++;
            }
        } catch (e) {
            console.log(`❌ FAIL: ${e.message}`);
            failed++;
        }
    }

    try {
        // 1. Check Homepage
        await check('Homepage Load', `${BASE_URL}/`, 'Find the Best Institutions');

        // 2. Check Consultancy Search
        await check('Consultancy Page', `${BASE_URL}/search?type=CONSULTANCY`, 'Alpha Education Consultancy');
        await check('Consultancy Destinations', `${BASE_URL}/search?type=CONSULTANCY`, 'USA');

        // 3. Check Training Centers
        await check('Training Center Page', `${BASE_URL}/search?type=TRAINING_CENTER`, 'Broadway Infosys');
        await check('Training Programs', `${BASE_URL}/search?type=TRAINING_CENTER`, 'Python');

        console.log(`\n\n🎯 QA Summary: ${passed} Passed, ${failed} Failed.`);
        if (failed === 0) console.log('✅ Application is ready for Deployment!');
        else console.log('⚠️  Issues found.');
    } catch (error) {
        console.error("Critical Runtime Error:", error);
    }
}

runQA();
