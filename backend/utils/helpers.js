// Helper utilities for scraping

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
];

function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractPrice(priceText) {
  if (!priceText) return null;
  
  // Remove currency symbols and extract number
  const cleaned = priceText.replace(/[₹Rs.,\s]/gi, '');
  const price = parseFloat(cleaned);
  
  return isNaN(price) ? null : price;
}

function cleanProductName(name) {
  if (!name) return '';
  return name.trim().replace(/\s+/g, ' ');
}

module.exports = {
  getRandomUserAgent,
  delay,
  extractPrice,
  cleanProductName
};
