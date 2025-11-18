# 🛒 Grocery Price Comparison App

A full-stack web application that compares grocery prices across **Blinkit**, **Instamart**, **Zepto**, and **DMart Ready** using web scraping with Puppeteer.

## 🌟 Features

- **Real-time Price Comparison**: Search for any grocery item and get prices from 4 major platforms
- **Smart Sorting**: Results automatically sorted by lowest price first
- **Best Price Highlighting**: The cheapest option is highlighted with a "Best Price 💰" badge
- **Modern UI**: Clean, responsive design built with React and TailwindCSS
- **Loading States**: Beautiful skeleton loaders while fetching data
- **Error Handling**: Graceful error messages if platforms fail to respond
- **Refresh Functionality**: Update prices with a single click

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express**: RESTful API server
- **Puppeteer**: Headless browser automation for web scraping
- **Puppeteer Stealth Plugin**: Avoid detection and blocks
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Responsive Design**: Works on mobile, tablet, and desktop

## 📁 Project Structure

```
/vercel/sandbox/
├── backend/
│   ├── server.js              # Express API server
│   ├── scrapers/
│   │   ├── blinkit.js         # Blinkit scraper
│   │   ├── instamart.js       # Instamart scraper
│   │   ├── zepto.js           # Zepto scraper
│   │   └── dmart.js           # DMart Ready scraper
│   ├── utils/
│   │   └── helpers.js         # Helper functions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── components/
│   │   │   ├── SearchBar.jsx  # Search input component
│   │   │   ├── ProductCard.jsx # Product display card
│   │   │   └── LoadingSkeleton.jsx # Loading animation
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### Running the Application

You need to run both backend and frontend servers:

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm start
```
Backend will run on: `http://localhost:5000`

#### Terminal 2 - Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a grocery item in the search bar (e.g., "Amul Milk 1L", "Bread", "Rice 5kg")
3. Click "Search" or press Enter
4. Wait 30-60 seconds while the app scrapes all platforms
5. View results sorted by price, with the cheapest option highlighted
6. Click "View Product" to open the product page on the respective platform
7. Use "Refresh Prices" to update the results

## 🔧 API Endpoints

### GET /api/search
Search for products across all platforms

**Query Parameters:**
- `q` (required): Search query string

**Example:**
```bash
curl "http://localhost:5000/api/search?q=amul+milk"
```

**Response:**
```json
{
  "query": "amul milk",
  "totalResults": 12,
  "products": [
    {
      "name": "Amul Gold Full Cream Milk 1L",
      "price": 68,
      "priceText": "₹68",
      "image": "https://...",
      "link": "https://...",
      "source": "Blinkit"
    }
  ],
  "timestamp": "2025-11-18T13:30:00.000Z"
}
```

## ⚙️ How It Works

1. **User Search**: User enters a product name in the search bar
2. **API Request**: Frontend sends GET request to backend `/api/search` endpoint
3. **Browser Launch**: Backend launches a headless Chrome browser using Puppeteer
4. **Concurrent Scraping**: All 4 platforms are scraped simultaneously using Promise.all()
5. **Data Extraction**: Each scraper:
   - Navigates to the platform's website
   - Searches for the product
   - Extracts product name, price, image, and link
   - Returns top 5 results
6. **Price Parsing**: Prices are extracted and normalized (₹, Rs., etc.)
7. **Sorting**: Results are sorted by price (lowest first)
8. **Response**: Backend sends JSON response to frontend
9. **Display**: Frontend renders product cards with the cheapest highlighted

## 🛡️ Anti-Detection Features

- **Stealth Plugin**: Puppeteer-extra-plugin-stealth to avoid bot detection
- **Random User Agents**: Rotates between different browser user agents
- **Delays**: Strategic delays between actions to mimic human behavior
- **Timeout Protection**: 30-second timeout per platform to prevent hanging

## 🎨 UI Features

- **Gradient Background**: Modern blue-purple gradient
- **Platform Badges**: Color-coded badges for each platform
- **Best Price Badge**: Green badge highlighting the cheapest option
- **Responsive Grid**: Adapts to screen size (1-4 columns)
- **Loading Skeletons**: Animated placeholders during loading
- **Error Messages**: User-friendly error notifications
- **Quick Search Buttons**: Pre-filled search suggestions

## 🐛 Troubleshooting

### Backend Issues

**Error: "Failed to launch browser"**
- Install Chromium dependencies: `sudo yum install -y chromium`
- Or use `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` and install Chrome manually

**Error: "Timeout waiting for selector"**
- The website structure may have changed
- Check the scraper selectors in `backend/scrapers/`
- Increase timeout values if needed

### Frontend Issues

**Error: "Failed to fetch"**
- Make sure backend server is running on port 5000
- Check CORS settings in `backend/server.js`
- Verify API_URL in `frontend/src/App.jsx`

**No products found**
- Try different search terms
- Some platforms may be blocking requests
- Check backend console for scraping errors

## 📝 Notes

- **Scraping Time**: Each search takes 30-60 seconds as it scrapes 4 platforms
- **Rate Limiting**: Avoid making too many requests in quick succession
- **Website Changes**: Scrapers may break if platforms update their HTML structure
- **Legal**: This is for educational purposes. Respect websites' Terms of Service
- **Production**: For production use, consider using official APIs if available

## 🔮 Future Enhancements

- [ ] Add more grocery platforms (BigBasket, Amazon Fresh, etc.)
- [ ] Implement caching to reduce scraping frequency
- [ ] Add price history tracking
- [ ] Create price drop alerts
- [ ] Add product categories and filters
- [ ] Implement user accounts and favorites
- [ ] Add price comparison charts
- [ ] Mobile app version

## 📄 License

MIT License - Feel free to use this project for learning and development!

## 👨‍💻 Author

Built with ❤️ for comparing grocery prices and saving money!

---

**Happy Shopping! 🛍️💰**
