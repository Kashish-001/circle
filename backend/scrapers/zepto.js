const { extractPrice, cleanProductName, delay } = require('../utils/helpers');

async function scrapeZepto(page, searchQuery) {
  try {
    console.log('Scraping Zepto...');
    
    // Navigate to Zepto
    await page.goto('https://www.zepto.com/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await delay(2000);
    
    // Try to find search input
    const searchSelector = 'input[type="text"], input[placeholder*="Search"]';
    await page.waitForSelector(searchSelector, { timeout: 10000 });
    await page.click(searchSelector);
    await delay(500);
    
    // Type search query
    await page.type(searchSelector, searchQuery);
    await delay(1000);
    
    // Press Enter
    await page.keyboard.press('Enter');
    await delay(3000);
    
    // Wait for results
    await page.waitForSelector('[class*="product"], [class*="Product"], [class*="card"]', { timeout: 10000 });
    
    // Extract product data
    const products = await page.evaluate(() => {
      const items = [];
      const productElements = document.querySelectorAll('[class*="product"], [class*="Product"], [class*="card"]');
      
      for (let i = 0; i < Math.min(5, productElements.length); i++) {
        const element = productElements[i];
        
        const nameEl = element.querySelector('[class*="name"], [class*="title"], h3, h4, p[class*="Name"]');
        const priceEl = element.querySelector('[class*="price"], [class*="Price"], span[class*="amount"]');
        const imgEl = element.querySelector('img');
        const linkEl = element.querySelector('a');
        
        if (nameEl && priceEl) {
          items.push({
            name: nameEl.textContent?.trim() || '',
            price: priceEl.textContent?.trim() || '',
            image: imgEl?.src || '',
            link: linkEl?.href || 'https://www.zepto.com'
          });
        }
      }
      
      return items;
    });
    
    // Process and return results
    return products.map(product => ({
      name: cleanProductName(product.name),
      price: extractPrice(product.price),
      priceText: product.price,
      image: product.image,
      link: product.link,
      source: 'Zepto'
    })).filter(p => p.price !== null);
    
  } catch (error) {
    console.error('Zepto scraping error:', error.message);
    return [];
  }
}

module.exports = scrapeZepto;
