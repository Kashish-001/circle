const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { getRandomUserAgent } = require('./utils/helpers');

// Import scrapers
const scrapeBlinkit = require('./scrapers/blinkit');
const scrapeInstamart = require('./scrapers/instamart');
const scrapeZepto = require('./scrapers/zepto');
const scrapeDmart = require('./scrapers/dmart');

// Use stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Grocery Price Comparison API',
    endpoints: {
      search: '/api/search?q=product_name'
    }
  });
});

// Main search endpoint
app.get('/api/search', async (req, res) => {
  const searchQuery = req.query.q;
  
  if (!searchQuery) {
    return res.status(400).json({ 
      error: 'Missing search query. Use ?q=product_name' 
    });
  }
  
  console.log(`\n🔍 Searching for: "${searchQuery}"\n`);
  
  let browser;
  
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
      ]
    });
    
    // Create a new page with random user agent
    const page = await browser.newPage();
    await page.setUserAgent(getRandomUserAgent());
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Scrape all platforms concurrently with timeout protection
    const scrapePromises = [
      Promise.race([
        scrapeBlinkit(page, searchQuery),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Blinkit timeout')), 30000)
        )
      ]).catch(err => {
        console.error('Blinkit failed:', err.message);
        return [];
      }),
      
      Promise.race([
        scrapeInstamart(page, searchQuery),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Instamart timeout')), 30000)
        )
      ]).catch(err => {
        console.error('Instamart failed:', err.message);
        return [];
      }),
      
      Promise.race([
        scrapeZepto(page, searchQuery),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Zepto timeout')), 30000)
        )
      ]).catch(err => {
        console.error('Zepto failed:', err.message);
        return [];
      }),
      
      Promise.race([
        scrapeDmart(page, searchQuery),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('DMart timeout')), 30000)
        )
      ]).catch(err => {
        console.error('DMart failed:', err.message);
        return [];
      })
    ];
    
    const results = await Promise.all(scrapePromises);
    
    // Flatten and sort results by price (lowest first)
    const allProducts = results.flat().sort((a, b) => a.price - b.price);
    
    console.log(`\n✅ Found ${allProducts.length} products\n`);
    
    // Return results
    res.json({
      query: searchQuery,
      totalResults: allProducts.length,
      products: allProducts,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Failed to scrape products',
      message: error.message 
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/search?q=product_name\n`);
});
