# BFHL REST API - VIT Full Stack Assignment

A REST API built with Node.js and Express that processes arrays and categorizes data into numbers, alphabets, and special characters.

## 🚀 Features

- Processes input arrays and categorizes elements
- Separates odd and even numbers
- Identifies alphabetic characters and converts to uppercase
- Detects special characters
- Calculates sum of all numbers
- Creates concatenated string with alternating caps in reverse order
- Handles errors gracefully
- CORS enabled for cross-origin requests

## 📋 Requirements

- Node.js (>=14.0.0)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bfhl-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### POST /bfhl

Processes the input array and returns categorized data.

**Request Body:**
```json
{
  "data": ["a","1","334","4","R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "your_name_ddmmyyyy",
  "email": "your.email@example.com",
  "roll_number": "YOUR123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl

Returns operation code for testing.

**Response:**
```json
{
  "operation_code": 1
}
```

## 🔧 Configuration

Before deployment, update the following in `app.js`:

```javascript
user_id: "your_name_ddmmyyyy", // Replace with your actual name and DOB
email: "your.email@example.com", // Replace with your actual email
roll_number: "YOUR123", // Replace with your actual roll number
```

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Set environment variables if needed
3. Deploy automatically on push

### Render Deployment

1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`

## 📝 Testing

Run the test file to verify logic:
```bash
node test.js
```

## 🧪 Example Usage

```bash
# Test with curl
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R", "$"]}'
```

## 📂 Project Structure

```
bfhl-api/
├── app.js          # Main server file
├── package.json    # Dependencies and scripts
├── test.js         # Test cases
├── README.md       # Documentation
└── vercel.json     # Vercel configuration (optional)
```

## 🔍 Logic Explanation

1. **Number Processing**: Identifies numeric strings, separates odd/even, calculates sum
2. **Alphabet Processing**: Identifies alphabetic strings, converts to uppercase
3. **Special Character Processing**: Identifies non-alphanumeric characters
4. **String Concatenation**: Reverses alphabet order, applies alternating caps

## 🐛 Error Handling

- Validates input array
- Returns appropriate error messages
- Handles server errors gracefully
- Returns proper HTTP status codes

## 📄 License

MIT License - feel free to use this code for your assignment!