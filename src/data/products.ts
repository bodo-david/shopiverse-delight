
export type ProductAttribute = {
  name: string;
  value: string;
};

export type ProductCharacteristic = {
  name: string;
  value: string;
};

export type ProductPrice = {
  amount: number;
  currency: string;
  vatIncluded: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  image: string;
  attributes: ProductAttribute[];
  characteristics: ProductCharacteristic[];
  prices: {
    RON: number;
    EUR: number;
    USD: number;
  };
  vatRate: number;
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
  relatedProductIds: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  description: string;
};

export const CURRENCY_SYMBOLS = {
  RON: "Lei",
  EUR: "€",
  USD: "$"
};

export const EXCHANGE_RATES = {
  RON: 1,
  EUR: 4.92,
  USD: 4.50
};

// BRANDS DATA
export const brands: Brand[] = [
  {
    id: "brand-1",
    name: "TechNova",
    logo: "https://placeholder.pics/svg/300/DEDEDE/555555/TechNova",
    description: "Innovative technology solutions for modern needs"
  },
  {
    id: "brand-2",
    name: "EcoLiving",
    logo: "https://placeholder.pics/svg/300/DEDEDE/555555/EcoLiving",
    description: "Sustainable and eco-friendly home products"
  },
  {
    id: "brand-3",
    name: "LuxStyle",
    logo: "https://placeholder.pics/svg/300/DEDEDE/555555/LuxStyle",
    description: "Premium fashion and accessories for the discerning customer"
  }
];

// CATEGORIES DATA
export const categories: Category[] = [
  {
    id: "category-1",
    name: "Electronics",
    description: "Cutting-edge technology devices and accessories",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  },
  {
    id: "category-2",
    name: "Home & Living",
    description: "Quality products to enhance your living space",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "category-3",
    name: "Fashion",
    description: "Stylish clothing and accessories for every occasion",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

// PRODUCTS DATA
export const products: Product[] = [
  // ELECTRONICS
  {
    id: "product-1",
    name: "Ultra Slim Laptop Pro",
    description: "Powerful and lightweight laptop with 16GB RAM, 512GB SSD, and a stunning 4K display.",
    brand: "TechNova",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    attributes: [
      { name: "Processor", value: "Intel Core i7" },
      { name: "RAM", value: "16GB" },
      { name: "Storage", value: "512GB SSD" },
      { name: "Display", value: "15.6\" 4K Ultra HD" },
      { name: "Graphics", value: "NVIDIA GeForce RTX 3060" }
    ],
    characteristics: [
      { name: "Weight", value: "1.6 kg" },
      { name: "Battery Life", value: "Up to 12 hours" },
      { name: "Operating System", value: "Windows 11 Pro" },
      { name: "Warranty", value: "2 Years" }
    ],
    prices: {
      RON: 4999.99,
      EUR: 999.99,
      USD: 1099.99
    },
    vatRate: 19,
    stock: 10,
    isNew: true,
    isBestSeller: true,
    relatedProductIds: ["product-2", "product-3"]
  },
  {
    id: "product-2",
    name: "Smart Wireless Earbuds",
    description: "Premium wireless earbuds with active noise cancellation and 24-hour battery life.",
    brand: "TechNova",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Connectivity", value: "Bluetooth 5.2" },
      { name: "Battery Life", value: "24 hours with case" },
      { name: "Noise Cancellation", value: "Active" },
      { name: "Water Resistance", value: "IPX4" }
    ],
    characteristics: [
      { name: "Weight", value: "5.4g per earbud" },
      { name: "Charging", value: "USB-C and Wireless" },
      { name: "Warranty", value: "1 Year" }
    ],
    prices: {
      RON: 799.99,
      EUR: 159.99,
      USD: 179.99
    },
    vatRate: 19,
    stock: 25,
    isNew: true,
    isBestSeller: false,
    relatedProductIds: ["product-1", "product-3"]
  },
  {
    id: "product-3",
    name: "4K Ultra HD Smart TV",
    description: "Immersive viewing experience with 4K resolution, HDR, and smart functionality.",
    brand: "TechNova",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Screen Size", value: "55 inches" },
      { name: "Resolution", value: "4K Ultra HD" },
      { name: "HDR", value: "Dolby Vision, HDR10+" },
      { name: "Smart Platform", value: "Smart TV OS" }
    ],
    characteristics: [
      { name: "Refresh Rate", value: "120Hz" },
      { name: "Connectivity", value: "4 HDMI, 3 USB, Wi-Fi, Bluetooth" },
      { name: "Audio", value: "2.1 Channel with Dolby Atmos" },
      { name: "Warranty", value: "2 Years" }
    ],
    prices: {
      RON: 2499.99,
      EUR: 499.99,
      USD: 549.99
    },
    vatRate: 19,
    stock: 8,
    isNew: false,
    isBestSeller: true,
    relatedProductIds: ["product-1", "product-2"]
  },
  
  // HOME & LIVING
  {
    id: "product-4",
    name: "Smart Home Thermostat",
    description: "Energy-efficient smart thermostat with remote control and learning capabilities.",
    brand: "EcoLiving",
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Compatibility", value: "Works with most HVAC systems" },
      { name: "Connectivity", value: "Wi-Fi, Bluetooth" },
      { name: "Display", value: "Touchscreen LCD" }
    ],
    characteristics: [
      { name: "Power Source", value: "Wired with battery backup" },
      { name: "Voice Control", value: "Compatible with Alexa and Google Assistant" },
      { name: "Warranty", value: "3 Years" }
    ],
    prices: {
      RON: 899.99,
      EUR: 179.99,
      USD: 199.99
    },
    vatRate: 19,
    stock: 15,
    isNew: true,
    isBestSeller: false,
    relatedProductIds: ["product-5", "product-6"]
  },
  {
    id: "product-5",
    name: "Premium Air Purifier",
    description: "Advanced air purifier that removes 99.97% of allergens, dust, and pollutants.",
    brand: "EcoLiving",
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Coverage Area", value: "Up to 500 sq. ft." },
      { name: "Filtration", value: "HEPA Filter" },
      { name: "Noise Level", value: "25-52 dB" }
    ],
    characteristics: [
      { name: "Power Consumption", value: "40W" },
      { name: "Filter Life", value: "12 months" },
      { name: "Warranty", value: "2 Years" }
    ],
    prices: {
      RON: 699.99,
      EUR: 139.99,
      USD: 159.99
    },
    vatRate: 19,
    stock: 20,
    isNew: false,
    isBestSeller: true,
    relatedProductIds: ["product-4", "product-6"]
  },
  {
    id: "product-6",
    name: "Ergonomic Office Chair",
    description: "Comfortable and supportive office chair with adjustable features for optimal posture.",
    brand: "EcoLiving",
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Material", value: "Mesh Back, Fabric Seat" },
      { name: "Adjustability", value: "Height, Armrests, Recline" },
      { name: "Weight Capacity", value: "300 lbs" }
    ],
    characteristics: [
      { name: "Dimensions", value: "26\"W x 26\"D x 38-42\"H" },
      { name: "Assembly", value: "Required, tools included" },
      { name: "Warranty", value: "5 Years" }
    ],
    prices: {
      RON: 999.99,
      EUR: 199.99,
      USD: 219.99
    },
    vatRate: 19,
    stock: 12,
    isNew: false,
    isBestSeller: false,
    relatedProductIds: ["product-4", "product-5"]
  },
  
  // FASHION
  {
    id: "product-7",
    name: "Designer Leather Wallet",
    description: "Handcrafted premium leather wallet with multiple card slots and RFID protection.",
    brand: "LuxStyle",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Material", value: "Full Grain Leather" },
      { name: "Color", value: "Black / Brown" },
      { name: "Card Slots", value: "8" }
    ],
    characteristics: [
      { name: "Dimensions", value: "4.5\" x 3.5\"" },
      { name: "Features", value: "RFID Blocking, ID Window" },
      { name: "Warranty", value: "Lifetime" }
    ],
    prices: {
      RON: 249.99,
      EUR: 49.99,
      USD: 54.99
    },
    vatRate: 19,
    stock: 30,
    isNew: true,
    isBestSeller: true,
    relatedProductIds: ["product-8", "product-9"]
  },
  {
    id: "product-8",
    name: "Premium Sunglasses",
    description: "Stylish polarized sunglasses with UV protection and durable frame.",
    brand: "LuxStyle",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Frame Material", value: "Acetate" },
      { name: "Lens", value: "Polarized" },
      { name: "Protection", value: "100% UV400" }
    ],
    characteristics: [
      { name: "Style", value: "Unisex" },
      { name: "Includes", value: "Protective Case, Cleaning Cloth" },
      { name: "Warranty", value: "2 Years" }
    ],
    prices: {
      RON: 399.99,
      EUR: 79.99,
      USD: 89.99
    },
    vatRate: 19,
    stock: 18,
    isNew: false,
    isBestSeller: true,
    relatedProductIds: ["product-7", "product-9"]
  },
  {
    id: "product-9",
    name: "Designer Watch",
    description: "Elegant timepiece with Swiss movement and sapphire crystal glass.",
    brand: "LuxStyle",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    attributes: [
      { name: "Movement", value: "Swiss Quartz" },
      { name: "Case Material", value: "Stainless Steel" },
      { name: "Band", value: "Genuine Leather" }
    ],
    characteristics: [
      { name: "Water Resistance", value: "50m" },
      { name: "Features", value: "Date Display, Luminous Hands" },
      { name: "Warranty", value: "3 Years" }
    ],
    prices: {
      RON: 1299.99,
      EUR: 259.99,
      USD: 289.99
    },
    vatRate: 19,
    stock: 5,
    isNew: true,
    isBestSeller: false,
    relatedProductIds: ["product-7", "product-8"]
  }
];

export const getCategoryProducts = (categoryId: string): Product[] => {
  const categoryName = categories.find(cat => cat.id === categoryId)?.name;
  return products.filter(product => product.category === categoryName);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return product.relatedProductIds
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

export const formatPrice = (price: number, currency: string): string => {
  const formatOptions = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  
  switch(currency) {
    case 'RON':
      return `${price.toLocaleString('ro-RO', formatOptions)} ${CURRENCY_SYMBOLS.RON}`;
    case 'EUR':
      return `${CURRENCY_SYMBOLS.EUR}${price.toLocaleString('de-DE', formatOptions)}`;
    case 'USD':
      return `${CURRENCY_SYMBOLS.USD}${price.toLocaleString('en-US', formatOptions)}`;
    default:
      return `${price.toLocaleString('ro-RO', formatOptions)} ${CURRENCY_SYMBOLS.RON}`;
  }
};

export const convertPrice = (price: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return price;
  
  // Convert to RON first (base currency)
  const inRON = fromCurrency === 'RON' ? price : price * EXCHANGE_RATES[fromCurrency as keyof typeof EXCHANGE_RATES];
  
  // Then convert from RON to target currency
  return toCurrency === 'RON' ? inRON : inRON / EXCHANGE_RATES[toCurrency as keyof typeof EXCHANGE_RATES];
};

export const calculatePriceWithVAT = (price: number, vatRate: number): number => {
  return price * (1 + vatRate / 100);
};
