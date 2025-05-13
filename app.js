const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Movie route
app.get('/download/:movie', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Scrape VegaMovies
    await page.goto(`https://vegamovies.bot/download-${req.params.movie}/`);
    
    // Get download links (customize selector)
    const links = await page.$$eval('.download-button', elements => 
      elements.map(el => el.href)
    );
    
    await browser.close();
    res.json({ links });
  } catch (error) {
    res.status
