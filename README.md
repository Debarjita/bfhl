# BFHL Challenge REST API

A Node.js REST API that processes arrays and categorizes data into numbers (odd/even), alphabets, and special characters with additional processing.

## Features

- ✅ Categorizes input data into odd numbers, even numbers, alphabets, and special characters
- ✅ Calculates sum of all numbers
- ✅ Creates concatenated string from alphabets in reverse order with alternating caps
- ✅ Proper error handling and validation
- ✅ CORS enabled for frontend integration

## API Specification

**Endpoint:** `POST /bfhl`  
**Status Code:** 200 (Success)

### Request Format
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

### Response Format
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com", 
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bfhl-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update your personal details**
   Edit `server.js` and update the `USER_INFO` object:
   ```javascript
   const USER_INFO = {
       user_id: "your_name_ddmmyyyy", // Format: firstname_lastname_ddmmyyyy
       email: "your.email@domain.com",
       roll_number: "YOUR_ROLL_NUMBER"
   };
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. **Test the API**
   ```bash
   npm test
   ```

The server will start on `http://localhost:3000`

### Testing with cURL

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

## Deployment Options

### Option 1: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/server.js"
       }
     ]
   }
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Option 2: Railway

1. Connect your GitHub repo to Railway
2. Railway will auto-detect Node.js and deploy
3. No additional configuration needed

### Option 3: Render

1. Connect your GitHub repo to Render
2. Use these settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Option 4: Heroku

1. Install Heroku CLI
2. Create app:
   ```bash
   heroku create your-app-name
   ```
3. Deploy:
   ```bash
   git push heroku main
   ```

## Project Structure

```
bfhl-api/
├── server.js          # Main API server
├── package.json       # Dependencies and scripts
├── test.js           # Test cases
├── README.md         # Documentation
└── vercel.json       # Vercel deployment config (if using Vercel)
```

## Algorithm Logic

1. **Data Processing:** Each item in the input array is processed to determine its type
2. **Number Classification:** Numbers are classified as odd or even and added to sum
3. **Alphabet Processing:** Alphabetic characters are converted to uppercase
4. **Special Characters:** Non-alphanumeric characters are collected
5. **Concatenation:** Alphabets are processed in reverse order with alternating case

## Error Handling

- Invalid input validation
- Graceful error responses
- Server error logging
- Proper HTTP status codes

## Environment Variables

- `PORT`: Server port (default: 3000)

## Important Notes

⚠️ **Before deployment, make sure to:**
1. Update `USER_INFO` with your actual details
2. Format user_id as: `firstname_lastname_ddmmyyyy` (all lowercase)
3. Test locally before deploying
4. Submit your deployed URL with `/bfhl` route to the form

## Example Deployment URLs

After deployment, your API will be accessible at:
- Vercel: `https://your-app.vercel.app/bfhl`
- Railway: `https://your-app.railway.app/bfhl` 
- Render: `https://your-app.onrender.com/bfhl`
- Heroku: `https://your-app.herokuapp.com/bfhl`