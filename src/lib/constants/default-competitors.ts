import { Competitor } from '@/types/intelligence';

export const DEFAULT_COMPETITORS: Competitor[] = [
  {
    id: 'dutch-bros',
    name: 'Dutch Bros Coffee',
    category: 'specialty_coffee',
    tier: 'national',
    keywords: ['Dutch Bros', 'Dutch Bros Coffee', 'drive-thru drinks', 'Rebel energy', 'cold brew'],
    website: 'https://www.dutchbros.com',
    isActive: true,
    threatLevel: 'high',
    description: 'Hyper-speed drive-thru beverage chain with explosive Sunbelt growth, heavily dominating afternoon cold/energy drink occasions.',
    primaryMarket: 'West, Southwest, Southeast US'
  },
  {
    id: 'dunkin',
    name: "Dunkin'",
    category: 'national_qsr',
    tier: 'national',
    keywords: ['Dunkin', 'Dunkin Donuts', 'Inspire Brands coffee', 'Dunkin iced coffee', 'Dunkin breakfast'],
    website: 'https://www.dunkindonuts.com',
    isActive: true,
    threatLevel: 'high',
    description: 'Scale leader in US morning daypart with aggressive value combos, refreshed cold foam platform, and expansive suburban presence.',
    primaryMarket: 'National (Northeast core)'
  },
  {
    id: 'mccafe-cosmcs',
    name: "McCafé & CosMc's",
    category: 'beverage_spinoff',
    tier: 'national',
    keywords: ['CosMcs', 'CosMc', 'McCafe', 'McDonalds coffee', 'McDonalds specialty drinks'],
    website: 'https://www.cosmcs.com',
    isActive: true,
    threatLevel: 'high',
    description: "McDonald's custom beverage spin-off testing drive-thru beverage customization (boba, cold foam, energy) directly challenging Starbucks 2-5 PM afternoon slump.",
    primaryMarket: 'National / Test Markets (Texas, Midwest)'
  },
  {
    id: 'blank-street',
    name: 'Blank Street Coffee',
    category: 'specialty_coffee',
    tier: 'regional',
    keywords: ['Blank Street Coffee', 'Blank Street matcha', 'Eversys automated coffee', 'cold brew Blank Street'],
    website: 'https://www.blankstreet.com',
    isActive: true,
    threatLevel: 'medium',
    description: 'High-tech, small-footprint automated espresso format delivering third-wave style drinks at lower price points and faster counter times.',
    primaryMarket: 'New York City, Boston, Washington D.C.'
  },
  {
    id: 'panera-bread',
    name: 'Panera Bread',
    category: 'fast_casual',
    tier: 'national',
    keywords: ['Panera Bread', 'Unlimited Sip Club', 'Panera coffee', 'Charged Lemonade', 'Panera breakfast'],
    website: 'https://www.panerabread.com',
    isActive: true,
    threatLevel: 'medium',
    description: 'Fast-casual giant competing heavily on subscription beverage models (Unlimited Sip Club) and midday dining occasions.',
    primaryMarket: 'National'
  },
  {
    id: 'peets-coffee',
    name: "Peet's Coffee",
    category: 'specialty_coffee',
    tier: 'national',
    keywords: ["Peet's Coffee", 'Peets cold craft', 'JAB Holding Peets'],
    website: 'https://www.peets.com',
    isActive: true,
    threatLevel: 'medium',
    description: 'Direct legacy roaster competitor with premium roast credentials, expanding drive-thru models, and RTD bottled coffee presence.',
    primaryMarket: 'West Coast, Mid-Atlantic, Grocery RTD'
  },
  {
    id: 'caribou-coffee',
    name: 'Caribou Coffee',
    category: 'regional_coffee',
    tier: 'regional',
    keywords: ['Caribou Coffee', 'Caribou Cabin', 'Caribou drive thru', 'Panera Brands Caribou'],
    website: 'https://www.cariboucoffee.com',
    isActive: true,
    threatLevel: 'medium',
    description: 'Midwest powerhouse rapidly scaling with compact drive-thru-only "Cabin" store formats with zero seating and low capex.',
    primaryMarket: 'Midwest, Southeast'
  },
  {
    id: 'tim-hortons-us',
    name: 'Tim Hortons US',
    category: 'national_qsr',
    tier: 'regional',
    keywords: ['Tim Hortons US', 'Tims iced capp', 'Tim Hortons breakfast', 'RBI coffee'],
    website: 'https://www.timhortons.com',
    isActive: true,
    threatLevel: 'low',
    description: 'Restaurant Brands International subsidiary targeting US northern expansion with value beverages, cold brew, and Timbits combos.',
    primaryMarket: 'Northeast, Midwest, Border States'
  },
  {
    id: 'wendys-breakfast',
    name: "Wendy's Breakfast & Frosty Cold Brew",
    category: 'national_qsr',
    tier: 'national',
    keywords: ["Wendy's breakfast", 'Frosty Cold Brew', 'Wendys morning coffee', 'Wendys English Muffin'],
    website: 'https://www.wendys.com',
    isActive: true,
    threatLevel: 'medium',
    description: 'Aggressive player in the QSR morning daypart leveraging iconic Frosty brand equity for cold coffee drinks and discounted value bundles.',
    primaryMarket: 'National'
  },
  {
    id: 'taco-bell-morning',
    name: 'Taco Bell Morning & Cantina',
    category: 'national_qsr',
    tier: 'national',
    keywords: ['Taco Bell breakfast', 'Cinnabon Delights coffee', 'Taco Bell iced coffee', 'Taco Bell beverage test'],
    website: 'https://www.tacobell.com',
    isActive: false,
    threatLevel: 'low',
    description: 'Yum! Brands testing innovative frozen coffee drinks, churro chillers, and budget morning burritos.',
    primaryMarket: 'National'
  },
  {
    id: 'gregorys-coffee',
    name: 'Gregorys Coffee',
    category: 'regional_coffee',
    tier: 'regional',
    keywords: ['Gregorys Coffee', 'Gregorys plant based', 'Gregorys oat milk'],
    website: 'https://www.gregoryscoffee.com',
    isActive: true,
    threatLevel: 'medium',
    description: 'Nimble East Coast specialty chain known for rapid product testing, plant-based pastries, and viral seasonal creations.',
    primaryMarket: 'New York Tri-State, DC, South Florida'
  },
  {
    id: 'blue-bottle',
    name: 'Blue Bottle Coffee',
    category: 'specialty_coffee',
    tier: 'national',
    keywords: ['Blue Bottle Coffee', 'Nola iced coffee', 'Nestle Blue Bottle'],
    website: 'https://www.bluebottlecoffee.com',
    isActive: true,
    threatLevel: 'medium',
    description: "Nestle's ultra-premium specialty brand setting flavor trends and capturing high-spending urban coffee connoisseurs.",
    primaryMarket: 'Metro Hubs (SF, NYC, LA, Chicago, Boston)'
  }
];
