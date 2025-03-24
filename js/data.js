
// Product Data
const products = [
    // Electronics Category
    {
        id: 'electronics-1',
        name: 'Smart 4K TV',
        category: 'electronics',
        brand: 'TechPro',
        description: 'Ultra HD Smart TV with AI picture quality and premium sound.',
        fullDescription: 'Experience stunning visuals and immersive sound with this premium 4K Smart TV. Featuring AI-powered picture quality enhancement, HDR technology for vibrant colors, and a sleek design that will complement any living space. The built-in smart platform gives you access to all your favorite streaming services.',
        price: 2499.99,
        currency: 'RON',
        images: [
            'images/products/electronics/tv-1.jpg',
            'images/products/electronics/tv-2.jpg',
            'images/products/electronics/tv-3.jpg'
        ],
        thumbnail: 'images/products/electronics/tv-thumb.jpg',
        attributes: {
            'Screen Size': '55 inches',
            'Resolution': '4K Ultra HD',
            'Smart Features': 'Yes, with Voice Control',
            'Connectivity': 'Wi-Fi, Bluetooth, HDMI x4, USB x3'
        },
        specifications: {
            'Display Type': 'LED',
            'Resolution': '3840 x 2160 pixels',
            'Refresh Rate': '120Hz',
            'HDR': 'Yes, HDR10+',
            'Smart TV Platform': 'TechPro OS',
            'Voice Assistant': 'Built-in Alexa and Google Assistant',
            'Dimensions': '122.8 x 71.1 x 5.4 cm (without stand)',
            'Weight': '16.5 kg',
            'Audio': '40W, 2.1 channel sound system',
            'Energy Rating': 'A++',
            'Model Year': '2023'
        },
        stock: 15,
        isNew: true,
        isBestseller: false,
        onSale: false,
        rating: 4.7,
        reviewCount: 48
    },
    {
        id: 'electronics-2',
        name: 'Wireless Noise-Cancelling Headphones',
        category: 'electronics',
        brand: 'TechPro',
        description: 'Premium wireless headphones with advanced noise cancellation and 30-hour battery life.',
        fullDescription: 'Immerse yourself in your music with these premium wireless headphones featuring advanced noise cancellation technology. With a remarkable 30-hour battery life, plush comfort padding, and studio-quality sound, these headphones are perfect for travel, work, or just enjoying your favorite music without distractions.',
        price: 899.99,
        currency: 'RON',
        images: [
            'images/products/electronics/headphones-1.jpg',
            'images/products/electronics/headphones-2.jpg',
            'images/products/electronics/headphones-3.jpg'
        ],
        thumbnail: 'images/products/electronics/headphones-thumb.jpg',
        attributes: {
            'Color': ['Black', 'Silver', 'Blue'],
            'Noise Cancellation': 'Active, Adjustable',
            'Battery Life': '30 hours',
            'Connectivity': 'Bluetooth 5.0, 3.5mm jack'
        },
        specifications: {
            'Type': 'Over-ear',
            'Driver Size': '40mm',
            'Frequency Response': '4Hz-40,000Hz',
            'Impedance': '32 ohms',
            'Sensitivity': '105 dB/mW',
            'Bluetooth Version': '5.0',
            'Bluetooth Range': 'Up to 10m',
            'Battery Capacity': '700mAh',
            'Charging Time': '3 hours',
            'Weight': '254g',
            'Warranty': '2 years'
        },
        stock: 42,
        isNew: false,
        isBestseller: true,
        onSale: false,
        rating: 4.8,
        reviewCount: 124
    },
    {
        id: 'electronics-3',
        name: 'Professional DSLR Camera',
        category: 'electronics',
        brand: 'TechPro',
        description: 'High-performance DSLR camera with 24.2MP sensor and 4K video recording.',
        fullDescription: 'Capture breathtaking photos and videos with this professional-grade DSLR camera. Featuring a high-resolution 24.2MP sensor, 4K video recording capabilities, and advanced autofocus system, this camera delivers exceptional image quality in any shooting condition. Perfect for photography enthusiasts and professionals alike.',
        price: 3599.99,
        currency: 'RON',
        originalPrice: 3999.99,
        images: [
            'images/products/electronics/camera-1.jpg',
            'images/products/electronics/camera-2.jpg',
            'images/products/electronics/camera-3.jpg'
        ],
        thumbnail: 'images/products/electronics/camera-thumb.jpg',
        attributes: {
            'Sensor Type': 'CMOS',
            'Video Quality': '4K UHD',
            'Kit Lens': '18-55mm',
            'Connectivity': 'Wi-Fi, Bluetooth, USB-C'
        },
        specifications: {
            'Camera Type': 'DSLR',
            'Sensor Resolution': '24.2 Megapixels',
            'Sensor Size': 'APS-C',
            'ISO Range': '100-51200 (expandable to 204800)',
            'Shutter Speed': '1/8000 to 30s',
            'Continuous Shooting': 'Up to 10 fps',
            'Autofocus Points': '51',
            'Video Resolution': '4K UHD (3840 x 2160) at 30p',
            'Storage Media': 'Dual SD card slots (UHS-II)',
            'Battery Life': 'Approx. 1200 shots',
            'Dimensions': '140.5 x 104 x 78.5 mm',
            'Weight': '675g (body only)'
        },
        stock: 8,
        isNew: false,
        isBestseller: false,
        onSale: true,
        rating: 4.9,
        reviewCount: 87
    },
    
    // Fashion Category
    {
        id: 'fashion-1',
        name: 'Premium Leather Jacket',
        category: 'fashion',
        brand: 'Fashionista',
        description: 'Genuine leather jacket with modern design and comfortable fit.',
        fullDescription: 'This premium leather jacket combines classic style with modern details for a timeless addition to your wardrobe. Made from high-quality genuine leather, it features a comfortable fit, durable construction, and subtle details that elevate its design. Versatile and stylish, this jacket works well for both casual and semi-formal occasions.',
        price: 1299.99,
        currency: 'RON',
        images: [
            'images/products/fashion/leather-jacket-1.jpg',
            'images/products/fashion/leather-jacket-2.jpg',
            'images/products/fashion/leather-jacket-3.jpg'
        ],
        thumbnail: 'images/products/fashion/leather-jacket-thumb.jpg',
        attributes: {
            'Size': ['S', 'M', 'L', 'XL', 'XXL'],
            'Color': ['Black', 'Brown', 'Burgundy'],
            'Material': 'Genuine Leather',
            'Style': 'Regular Fit'
        },
        specifications: {
            'Outer Material': '100% Genuine Leather',
            'Lining': '100% Polyester',
            'Closure': 'YKK Zipper Front',
            'Pockets': '4 Exterior, 2 Interior',
            'Care Instructions': 'Professional Leather Clean Only',
            'Origin': 'Handcrafted in Italy',
            'Season': 'All Season',
            'Water Resistant': 'Yes',
            'Thickness': 'Medium',
            'Warranty': '1 Year Manufacturing Defects'
        },
        stock: 25,
        isNew: true,
        isBestseller: true,
        onSale: false,
        rating: 4.6,
        reviewCount: 74
    },
    {
        id: 'fashion-2',
        name: 'Designer Silk Scarf',
        category: 'fashion',
        brand: 'Fashionista',
        description: '100% silk scarf with exclusive print design and premium finish.',
        fullDescription: 'Add a touch of elegance to any outfit with this luxurious silk scarf featuring an exclusive print design. Made from 100% natural silk, this versatile accessory drapes beautifully and provides a soft, premium feel against your skin. The vibrant colors and patterns make it perfect for elevating both casual and formal looks.',
        price: 399.99,
        currency: 'RON',
        images: [
            'images/products/fashion/scarf-1.jpg',
            'images/products/fashion/scarf-2.jpg',
            'images/products/fashion/scarf-3.jpg'
        ],
        thumbnail: 'images/products/fashion/scarf-thumb.jpg',
        attributes: {
            'Size': '90cm x 90cm',
            'Pattern': ['Floral', 'Abstract', 'Geometric'],
            'Material': '100% Silk',
            'Finish': 'Hand-rolled edges'
        },
        specifications: {
            'Material': '100% Mulberry Silk',
            'Dimensions': '90cm x 90cm',
            'Weight': '50g',
            'Hem': 'Hand Rolled',
            'Print Technique': 'Digital Print',
            'Color Fastness': 'Excellent',
            'Care Instructions': 'Dry Clean Only or Hand Wash Cold',
            'Origin': 'Made in Italy',
            'Package Includes': 'Scarf, Gift Box, Authenticity Card',
            'Season': 'All Seasons'
        },
        stock: 37,
        isNew: false,
        isBestseller: false,
        onSale: false,
        rating: 4.7,
        reviewCount: 52
    },
    {
        id: 'fashion-3',
        name: 'Luxury Automatic Watch',
        category: 'fashion',
        brand: 'Fashionista',
        description: 'Swiss-made automatic watch with sapphire crystal and premium leather strap.',
        fullDescription: 'This luxury automatic watch combines timeless design with superior craftsmanship. Featuring a precision Swiss movement, sapphire crystal, and genuine leather strap, this timepiece is as durable as it is elegant. The sophisticated dial design and exhibition caseback make this watch a perfect addition to any collection or an impressive gift for someone special.',
        price: 4999.99,
        currency: 'RON',
        originalPrice: 5999.99,
        images: [
            'images/products/fashion/watch-1.jpg',
            'images/products/fashion/watch-2.jpg',
            'images/products/fashion/watch-3.jpg'
        ],
        thumbnail: 'images/products/fashion/watch-thumb.jpg',
        attributes: {
            'Case Material': 'Stainless Steel',
            'Strap Material': 'Genuine Leather',
            'Movement': 'Automatic Self-winding',
            'Water Resistance': '100m'
        },
        specifications: {
            'Movement': 'Swiss Automatic (25 jewels)',
            'Case Diameter': '40mm',
            'Case Thickness': '11mm',
            'Case Material': '316L Stainless Steel',
            'Crystal': 'Scratch-resistant Sapphire with Anti-reflective Coating',
            'Dial': 'Sunburst Blue',
            'Hands': 'Luminous Hour, Minute, and Second Hands',
            'Water Resistance': '10 ATM (100 meters)',
            'Strap Width': '20mm',
            'Strap Material': 'Genuine Calfskin Leather',
            'Clasp': 'Stainless Steel Deployment Buckle',
            'Power Reserve': 'Approximately 42 hours',
            'Functions': 'Hours, Minutes, Seconds, Date',
            'Warranty': '2 Years International'
        },
        stock: 12,
        isNew: false,
        isBestseller: true,
        onSale: true,
        rating: 4.9,
        reviewCount: 38
    },
    
    // Home & Garden Category
    {
        id: 'home-1',
        name: 'Ergonomic Office Chair',
        category: 'home',
        brand: 'HomeEssentials',
        description: 'Premium ergonomic chair with adjustable features and breathable mesh design.',
        fullDescription: 'Upgrade your home office with this premium ergonomic chair designed for maximum comfort during long working hours. Featuring a breathable mesh back, adjustable lumbar support, and customizable armrests, this chair adapts to your body and working style. The durable construction and premium materials ensure this chair will provide comfort and support for years to come.',
        price: 1199.99,
        currency: 'RON',
        images: [
            'images/products/home/chair-1.jpg',
            'images/products/home/chair-2.jpg',
            'images/products/home/chair-3.jpg'
        ],
        thumbnail: 'images/products/home/chair-thumb.jpg',
        attributes: {
            'Color': ['Black', 'Gray', 'Blue'],
            'Material': 'Mesh Back, Fabric Seat',
            'Adjustability': 'Height, Armrest, Tilt, Lumbar Support',
            'Base Type': '5-Wheel Aluminum Base'
        },
        specifications: {
            'Maximum Weight Capacity': '150 kg',
            'Seat Height Range': '45-55 cm',
            'Seat Width': '52 cm',
            'Seat Depth': '50 cm',
            'Backrest Height': '74 cm',
            'Armrest Height Range': '18-26 cm',
            'Tilt Range': '90° to 135°',
            'Tilt Lock Positions': '5',
            'Lumbar Support': 'Adjustable (Height and Depth)',
            'Headrest': 'Adjustable Height and Angle',
            'Base Diameter': '70 cm',
            'Casters': 'Dual-wheel Polyurethane',
            'Assembly Required': 'Yes, Tools Included',
            'Warranty': '5 Years on Parts'
        },
        stock: 20,
        isNew: true,
        isBestseller: false,
        onSale: false,
        rating: 4.8,
        reviewCount: 64
    },
    {
        id: 'home-2',
        name: 'Smart Home Lighting System',
        category: 'home',
        brand: 'HomeEssentials',
        description: 'Complete smart lighting system with voice control and app connectivity.',
        fullDescription: 'Transform your home with this comprehensive smart lighting system that offers unprecedented control and customization. With voice control compatibility, smartphone app connectivity, and automated scheduling, you can create the perfect ambiance for any occasion. The energy-efficient LED bulbs provide warm, adjustable lighting while saving on electricity costs.',
        price: 599.99,
        currency: 'RON',
        images: [
            'images/products/home/lighting-1.jpg',
            'images/products/home/lighting-2.jpg',
            'images/products/home/lighting-3.jpg'
        ],
        thumbnail: 'images/products/home/lighting-thumb.jpg',
        attributes: {
            'Compatibility': 'Alexa, Google Home, HomeKit',
            'Connectivity': 'Wi-Fi, Bluetooth',
            'Brightness': 'Adjustable (800 lumens max)',
            'Color Temperature': 'Warm to Cool White (2700K-6500K)'
        },
        specifications: {
            'Package Contents': '4 Smart Bulbs, 1 Bridge, 1 Dimmer Switch',
            'Bulb Type': 'A19 E27 LED',
            'Wattage': '9W (60W Equivalent)',
            'Lumens': '800',
            'Color': 'Full RGB + Tunable White',
            'Color Temperature Range': '2700K (Warm) to 6500K (Cool)',
            'Dimming Range': '1% to 100%',
            'Wireless Protocol': 'Zigbee 3.0, Bluetooth',
            'Hub Required': 'Yes (Included)',
            'Compatible Platforms': 'Amazon Alexa, Google Assistant, Apple HomeKit, Samsung SmartThings',
            'App Support': 'iOS 12+ and Android 8.0+',
            'Features': 'Scheduling, Scenes, Away Mode, Timer, Energy Monitoring',
            'Lifespan': '25,000 hours',
            'Warranty': '2 Years'
        },
        stock: 30,
        isNew: true,
        isBestseller: true,
        onSale: false,
        rating: 4.7,
        reviewCount: 93
    },
    {
        id: 'home-3',
        name: 'Luxury Bed Linen Set',
        category: 'home',
        brand: 'HomeEssentials',
        description: '100% Egyptian cotton bed linen set with 800 thread count for premium comfort.',
        fullDescription: 'Experience hotel-quality comfort at home with this luxury bed linen set made from 100% long-staple Egyptian cotton. With an impressive 800 thread count, these sheets offer exceptional softness, breathability, and durability. The set includes fitted and flat sheets along with matching pillowcases, all crafted with meticulous attention to detail for a refined finishing touch to your bedroom.',
        price: 799.99,
        currency: 'RON',
        originalPrice: 999.99,
        images: [
            'images/products/home/bedding-1.jpg',
            'images/products/home/bedding-2.jpg',
            'images/products/home/bedding-3.jpg'
        ],
        thumbnail: 'images/products/home/bedding-thumb.jpg',
        attributes: {
            'Size': ['Single', 'Double', 'Queen', 'King'],
            'Color': ['White', 'Ivory', 'Gray', 'Navy Blue'],
            'Material': '100% Egyptian Cotton',
            'Thread Count': '800'
        },
        specifications: {
            'Set Includes': '1 Fitted Sheet, 1 Flat Sheet, 2 Pillowcases (1 for Single)',
            'Material': '100% Long-staple Egyptian Cotton',
            'Thread Count': '800',
            'Weave': 'Sateen',
            'GSM (Weight)': '120',
            'Fitted Sheet Pocket Depth': '40 cm (16")',
            'Pillowcase Closure': 'Envelope Style',
            'Wash Care': 'Machine Washable at 40°C, Tumble Dry Low',
            'Certifications': 'OEKO-TEX® Standard 100',
            'Country of Origin': 'Made in Portugal',
            'Pre-washed': 'Yes, for extra softness',
            'Package': 'Reusable Cotton Storage Bag',
            'Warranty': '5 Years'
        },
        stock: 15,
        isNew: false,
        isBestseller: false,
        onSale: true,
        rating: 4.9,
        reviewCount: 42
    }
];

// Categories
const categories = [
    {
        id: 'electronics',
        name: 'Electronics',
        description: 'Gadgets & Devices',
        image: 'images/categories/electronics.jpg'
    },
    {
        id: 'fashion',
        name: 'Fashion',
        description: 'Clothing & Accessories',
        image: 'images/categories/fashion.jpg'
    },
    {
        id: 'home',
        name: 'Home & Garden',
        description: 'Furniture & Decor',
        image: 'images/categories/home.jpg'
    }
];

// Exchange rates
const EXCHANGE_RATES = {
    'RON': 1,
    'EUR': 0.2,  // 1 RON = 0.2 EUR
    'USD': 0.22  // 1 RON = 0.22 USD
};

// Shipping Methods
const SHIPPING_METHODS = [
    {
        id: 'postal',
        name: 'Postal Service',
        description: '1-3 business days',
        price: 15
    },
    {
        id: 'courier',
        name: 'Rapid Courier Service',
        description: 'Next business day',
        price: 30
    }
];

// Product Helper Functions

// Format price with currency
function formatPrice(price, currency) {
    if (typeof price !== 'number') {
        return 'N/A';
    }
    
    switch (currency) {
        case 'RON':
            return `${price.toFixed(2)} RON`;
        case 'EUR':
            return `€${price.toFixed(2)}`;
        case 'USD':
            return `$${price.toFixed(2)}`;
        default:
            return `${price.toFixed(2)}`;
    }
}

// Convert price from one currency to another
function convertPrice(price, fromCurrency, toCurrency) {
    if (typeof price !== 'number' || !EXCHANGE_RATES[fromCurrency] || !EXCHANGE_RATES[toCurrency]) {
        return price;
    }
    
    // Convert to base currency (RON) first
    const inRon = fromCurrency === 'RON' ? price : price / EXCHANGE_RATES[fromCurrency];
    
    // Convert from RON to target currency
    return toCurrency === 'RON' ? inRon : inRon * EXCHANGE_RATES[toCurrency];
}

// Get product by ID
function getProductById(productId) {
    return products.find(product => product.id === productId);
}

// Get products by category
function getProductsByCategory(categoryId) {
    return products.filter(product => product.category === categoryId);
}

// Get new products
function getNewProducts() {
    return products.filter(product => product.isNew).slice(0, 6);
}

// Get bestsellers
function getBestSellers() {
    return products.filter(product => product.isBestseller).slice(0, 6);
}

// Get products on sale
function getProductsOnSale() {
    return products.filter(product => product.onSale).slice(0, 6);
}

// Get category by ID
function getCategoryById(categoryId) {
    return categories.find(category => category.id === categoryId);
}

// Get related products (same category, excluding the current product)
function getRelatedProducts(productId, limit = 3) {
    const currentProduct = getProductById(productId);
    if (!currentProduct) return [];
    
    return products
        .filter(product => product.category === currentProduct.category && product.id !== productId)
        .slice(0, limit);
}

// Calculate VAT (Value Added Tax - 19% in Romania)
function calculateVAT(price) {
    return price * 0.19;
}

// Get random products for recommendations
function getRandomProducts(limit = 3) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
}
