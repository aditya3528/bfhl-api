const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>BFHL API</h1>
    <p>Send a POST to <code>/bfhl</code> with JSON body <code>{"data": [...]}</code></p>
  `);
});

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to check if a string is a number
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Helper function to check if a character is alphabetic
function isAlpha(char) {
    return /^[a-zA-Z]$/.test(char);
}

// Helper function to check if a character is special character
function isSpecialChar(char) {
    return !isAlpha(char) && !isNumber(char);
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

        // Initialize arrays and variables
        let oddNumbers = [];
        let evenNumbers = [];
        let alphabets = [];
        let specialCharacters = [];
        let sum = 0;
        let alphabetChars = []; // For concatenation logic

        // Process each item in the data array
        data.forEach(item => {
            const str = String(item);
            
            // Check if it's a number
            if (isNumber(str)) {
                const num = parseInt(str);
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
                sum += num;
            }
            // Check if it contains only alphabetic characters
            else if (str.split('').every(char => isAlpha(char))) {
                alphabets.push(str.toUpperCase());
                // Add each character to alphabetChars for concatenation
                str.split('').forEach(char => alphabetChars.push(char.toLowerCase()));
            }
            // Otherwise, it's a special character
            else {
                specialCharacters.push(str);
            }
        });

        // Create concatenation string with alternating caps in reverse order
        let concatString = '';
        alphabetChars.reverse();
        alphabetChars.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toUpperCase();
            } else {
                concatString += char.toLowerCase();
            }
        });

        // Response object
        const response = {
            is_success: true,
            user_id: "Aditya_Pratap_Singh_22052003", // Replace with actual user details
            email: "adityapratap.singh2022@vitstudent.ac.in", // Replace with actual email
            roll_number: "22BEE0333", // Replace with actual roll number
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
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

// GET route for testing
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
