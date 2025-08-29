const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// User personal details 
const USER_INFO = {
    user_id: "debarjita_bhattacharjee", 
    email: "debar.bhatt10@gmail.com",      
    roll_number: "22bce0949"        
};

// Helper function to check if a string is a number
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Helper function to check if a character is alphabetic
function isAlphabet(char) {
    return /^[a-zA-Z]$/.test(char);
}

// Helper function to check if a character is special
function isSpecialCharacter(char) {
    return /^[^a-zA-Z0-9]$/.test(char);
}

// Helper function to process concatenation string
function processConcatString(alphabets) {
    // Extract all individual characters from alphabet strings
    const allChars = [];
    
    alphabets.forEach(item => {
        for (let char of item) {
            if (isAlphabet(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    });
    
    // Reverse the order
    allChars.reverse();
    
    // Apply alternating caps (first char uppercase, second lowercase, etc.)
    let result = '';
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toUpperCase();
        } else {
            result += allChars[i].toLowerCase();
        }
    }
    
    return result;
}

// Main POST route
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }
        
        // Initialize arrays
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        
        // Process each item in the data array
        data.forEach(item => {
            const strItem = String(item);
            
            // Check if it's a number
            if (isNumber(strItem)) {
                const num = parseInt(strItem);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(strItem);
                } else {
                    oddNumbers.push(strItem);
                }
            }
            // Check if it contains only alphabets
            else if (/^[a-zA-Z]+$/.test(strItem)) {
                alphabets.push(strItem.toUpperCase());
            }
            // Check if it's a single special character
            else if (strItem.length === 1 && isSpecialCharacter(strItem)) {
                specialCharacters.push(strItem);
            }
            // For mixed strings, process character by character
            else {
                for (let char of strItem) {
                    if (isNumber(char)) {
                        const num = parseInt(char);
                        sum += num;
                        
                        if (num % 2 === 0) {
                            evenNumbers.push(char);
                        } else {
                            oddNumbers.push(char);
                        }
                    } else if (isAlphabet(char)) {
                        alphabets.push(char.toUpperCase());
                    } else if (isSpecialCharacter(char)) {
                        specialCharacters.push(char);
                    }
                }
            }
        });
        
        // Process concatenation string
        const concatString = processConcatString(alphabets);
        
        // Build response
        const response = {
            is_success: true,
            user_id: USER_INFO.user_id,
            email: USER_INFO.email,
            roll_number: USER_INFO.roll_number,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(), // Return sum as string as required
            concat_string: concatString
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET route for testing (optional)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: "API is running",
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
