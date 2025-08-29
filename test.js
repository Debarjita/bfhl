const http = require('http');

const API_URL = 'http://localhost:3000/bfhl';

// Test cases from the examples
const testCases = [
    {
        name: "Example A",
        data: ["a", "1", "334", "4", "R", "$"]
    },
    {
        name: "Example B", 
        data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
    },
    {
        name: "Example C",
        data: ["A", "ABcD", "DOE"]
    }
];

function makeRequest(testCase) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({ data: testCase.data });
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        const req = http.request(API_URL, options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    resolve({ testCase: testCase.name, response, statusCode: res.statusCode });
                } catch (error) {
                    reject(error);
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.write(postData);
        req.end();
    });
}

async function runTests() {
    console.log(' Running API Tests...\n');
    
    for (const testCase of testCases) {
        try {
            const result = await makeRequest(testCase);
            console.log(` ${result.testCase}`);
            console.log(`Status Code: ${result.statusCode}`);
            console.log('Response:');
            console.log(JSON.stringify(result.response, null, 2));
            console.log('---\n');
        } catch (error) {
            console.log(` ${testCase.name} failed:`, error.message);
        }
    }
}

// Run tests if server is running
setTimeout(runTests, 1000);
