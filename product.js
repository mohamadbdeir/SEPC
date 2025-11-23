// Brand name mapping: URL parameter -> folder name
const brandMapping = {
  'cledor': 'CLE D\'OR',
  'emtop': 'EMTOP',
  'force': 'FORCE',
  'germaflex': 'GERMAFLEX',
  'griffe': 'GRIFFE',
  'ifan': 'IFAN',
  'legrand': 'LEGRAND',
  'megalec': 'MEGALEC',
  'midea': 'MIDEA',
  'schneider': 'SCHNEIDER',
  'somafix': 'SOMAFIX',
  'soma-kimya': 'SOMA KIMYA'
};

// Brand display names
const brandDisplayNames = {
  'cledor': 'CLE D\'OR',
  'emtop': 'EMTOP',
  'force': 'FORCE',
  'germaflex': 'GERMAFLEX',
  'griffe': 'GRIFFE',
  'ifan': 'IFAN',
  'legrand': 'Legrand',
  'megalec': 'Megalec',
  'midea': 'Midea',
  'schneider': 'Schneider',
  'somafix': 'Soma Fix',
  'soma-kimya': 'Soma Kimya'
};

// Get brand parameter from URL
function getBrandFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('brand') || '';
}

// Get all product images for a brand
async function getProductImages(brandFolder) {
  try {
    // Since we can't directly list directory contents via JavaScript in a static site,
    // we'll need to use a different approach. For now, we'll try to fetch a known list
    // or use a server-side solution. However, for a static site, we can:
    // 1. Create a JSON file with product lists (best for production)
    // 2. Use a simple approach where we try common image names
    // 3. For this implementation, we'll create a products.json file
    
    // Try to fetch products.json first
    const response = await fetch(`./assets/products/${brandFolder}/products.json`);
    if (response.ok) {
      const data = await response.json();
      return data.products || [];
    }
    
    // Fallback: return empty array (products.json doesn't exist yet)
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Alternative: Get products by scanning common image extensions
// This is a workaround for static sites without server-side listing
async function scanProductImages(brandFolder) {
  const products = [];
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
  
  // This approach requires a products.json file or server-side API
  // For now, we'll return empty and suggest creating products.json
  return products;
}

// Display products in the grid
function displayProducts(products, brandFolder) {
  const grid = document.getElementById('products-grid');
  const loading = document.getElementById('loading');
  const emptyState = document.getElementById('empty-state');
  
  if (products.length === 0) {
    loading.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }
  
  loading.classList.add('hidden');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  
  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-item group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#e79c1d]/50 hover:bg-white/10 hover:shadow-lg hover:shadow-[#e79c1d]/20 hover:-translate-y-1 cursor-pointer';
    
    const imagePath = `./assets/products/${brandFolder}/${product}`;
    
    productCard.innerHTML = `
      <div class="aspect-square relative overflow-hidden bg-white/5">
        <img
          src="${imagePath}"
          alt="${product.replace(/\.(jpg|jpeg|png|webp)$/i, '')}"
          class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23333\' width=\'200\' height=\'200\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'14\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\'%3EImage%3C/text%3E%3C/svg%3E'"
        />
      </div>
      <div class="p-3">
        <p class="text-xs text-white/70 truncate">${product.replace(/\.(jpg|jpeg|png|webp)$/i, '')}</p>
      </div>
    `;
    
    // Add click handler for lightbox/modal (optional)
    productCard.addEventListener('click', () => {
      openProductModal(imagePath, product);
    });
    
    grid.appendChild(productCard);
  });
}

// Open product modal/lightbox
function openProductModal(imagePath, productName) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'absolute -top-12 right-0 text-white hover:text-[#e79c1d] transition text-2xl font-bold';
  closeButton.textContent = '✕';
  closeButton.addEventListener('click', () => modal.remove());
  
  const modalContent = document.createElement('div');
  modalContent.className = 'relative max-w-4xl w-full';
  
  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = productName;
  img.className = 'w-full h-auto rounded-lg max-h-[90vh] object-contain';
  
  const productNameText = document.createElement('p');
  productNameText.className = 'text-white text-center mt-4';
  productNameText.textContent = productName.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  
  modalContent.appendChild(closeButton);
  modalContent.appendChild(img);
  modalContent.appendChild(productNameText);
  modal.appendChild(modalContent);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Close on Escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
  
  document.body.appendChild(modal);
}

// Initialize page
async function init() {
  const brandParam = getBrandFromURL();
  
  if (!brandParam) {
    document.getElementById('brand-title').textContent = 'Marque non spécifiée';
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('empty-state').classList.remove('hidden');
    return;
  }
  
  const brandFolder = brandMapping[brandParam.toLowerCase()];
  const brandDisplayName = brandDisplayNames[brandParam.toLowerCase()] || brandParam;
  
  if (!brandFolder) {
    document.getElementById('brand-title').textContent = 'Marque introuvable';
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('empty-state').classList.remove('hidden');
    return;
  }
  
  document.getElementById('brand-title').textContent = brandDisplayName;
  
  // Try to get products
  const products = await getProductImages(brandFolder);
  
  if (products.length === 0) {
    // If no products.json exists, we need to create one or use an alternative method
    // For now, show a message
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('empty-state').classList.remove('hidden');
    document.getElementById('empty-state').innerHTML = `
      <p class="text-white/70 text-lg mb-4">Aucun produit trouvé.</p>
      <p class="text-white/50 text-sm">Veuillez créer un fichier products.json dans le dossier de la marque.</p>
    `;
    return;
  }
  
  displayProducts(products, brandFolder);
}

// Run on page load
document.addEventListener('DOMContentLoaded', init);

