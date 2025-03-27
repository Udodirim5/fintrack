# FinTrack | Smart Financial Tracking

FinTrack is a simple and efficient financial tracking app built with **React**. It allows users to log and manage their **income** and **expenses** seamlessly. The app stores data in **Google Sheets** using the [Sheet Best API](https://sheet.best/), making it easy to access and manage financial records without needing a dedicated backend.

## Features

✅ Log **income** and **expenses** in real-time  
✅ View **detailed records** of financial transactions  
✅ Data stored securely in **Google Sheets**  
✅ **Fork and customize** with minor adjustments  
✅ Simple and easy-to-use UI

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fintrack.git
cd fintrack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Google Sheets
1. Create a **Google Sheet** and format it with necessary columns (e.g., Date, Type, Amount, Description).
2. Use [Sheet Best](https://sheet.best/) to generate an API endpoint for your sheet.
3. Update the API URL in the project’s **.env** file:
   ```env
   REACT_APP_SHEET_API_URL=https://sheet.best/api/sheets/your-sheet-id
   ```

### 4. Run the App
```bash
npm start
```
The app will be available at **http://localhost:3000/**.

## Deployment
You can deploy **FinTrack** on **Vercel**, **Netlify**, or any static hosting service:
```bash
npm run build
```
Then upload the `build/` folder to your preferred hosting service.

## Contributing
Interested in improving **FinTrack**? Feel free to **fork** the repo and make adjustments as needed!  
PRs are welcome. 😊

## License
This project is open-source and available under the **MIT License**.

---
🚀 *Easily track and manage your finances with FinTrack!*

