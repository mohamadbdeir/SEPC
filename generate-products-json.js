// Node.js script to generate products.json files for each brand folder
// Run with: node generate-products-json.js

const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'assets', 'products');

// Get all brand folders
const brandFolders = fs.readdirSync(productsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('Found brand folders:', brandFolders);

brandFolders.forEach(brandFolder => {
  const brandPath = path.join(productsDir, brandFolder);
  const files = fs.readdirSync(brandPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    })
    .sort();
  
  const productsJson = {
    brand: brandFolder,
    count: files.length,
    products: files
  };
  
  const jsonPath = path.join(brandPath, 'products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(productsJson, null, 2));
  
  console.log(`✓ Generated products.json for ${brandFolder} (${files.length} products)`);
});

console.log('\n✓ All products.json files generated successfully!');

