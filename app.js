const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>BFHL API Tester</title>
    </head>
    <body style="font-family: sans-serif; padding: 2rem;">
      <h1>BFHL API Tester</h1>
      <p>Enter a JSON array of mixed items and click “Send”:</p>
      <textarea id="input" rows="4" cols="50">{"data":["a","1","334","4","R","$"]}</textarea><br><br>
      <button onclick="callApi()">Send</button>
      <h2>Response:</h2>
      <pre id="output" style="background:#f0f0f0; padding:1rem;"></pre>
      <script>
        async function callApi() {
          try {
            const body = document.getElementById('input').value;
            const res = await fetch('/bfhl', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body
            });
            const data = await res.json();
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
          } catch (err) {
            document.getElementById('output').textContent = 'Error: ' + err;
          }
        }
      </script>
    </body>
    </html>
  `);
});


app.use(express.json());
app.use(cors());


function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}


function isAlpha(char) {
    return /^[a-zA-Z]$/.test(char);
}


function isSpecialChar(char) {
    return !isAlpha(char) && !isNumber(char);
}


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        
        let oddNumbers = [];
        let evenNumbers = [];
        let alphabets = [];
        let specialCharacters = [];
        let sum = 0;
        let alphabetChars = []; 

        
        data.forEach(item => {
            const str = String(item);
            
            
            if (isNumber(str)) {
                const num = parseInt(str);
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
                sum += num;
            }
            
            else if (str.split('').every(char => isAlpha(char))) {
                alphabets.push(str.toUpperCase());
                
                str.split('').forEach(char => alphabetChars.push(char.toLowerCase()));
            }
            
            else {
                specialCharacters.push(str);
            }
        });

        
        let concatString = '';
        alphabetChars.reverse();
        alphabetChars.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toUpperCase();
            } else {
                concatString += char.toLowerCase();
            }
        });

        
        const response = {
            is_success: true,
            user_id: "Aditya_Pratap_Singh_22052003", 
            email: "adityapratap.singh2022@vitstudent.ac.in", 
            roll_number: "22BEE0333", 
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


app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
