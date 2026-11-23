export interface ErrandItem {
  id: string;
  name: string;
  qty: string;
  partOrModel?: string;
  details?: string;
  warningOrTip?: string;
  completed: boolean;
}

export interface ErrandStop {
  id: string;
  stopNumber: number;
  name: string;
  category: string;
  address: string;
  badge: string;
  accentColor: string;
  items: ErrandItem[];
}

export const INITIAL_STOPS: ErrandStop[] = [
  {
    id: 'autozone',
    stopNumber: 1,
    name: 'AutoZone',
    category: 'Auto Parts & Boat Prep',
    address: '100 Daniel Webster Hwy, Nashua, NH 03060',
    badge: 'In-Store Pickup Cart Ready',
    accentColor: 'orange',
    items: [
      {
        id: 'az-1',
        name: 'Pennzoil 25W-40 Synthetic Blend Marine Oil',
        qty: '4 Quarts (1 Jug)',
        partOrModel: 'Part # 550063546',
        details: '$56.99 — In-store pickup already in cart',
        warningOrTip: 'Essential 25W-40 weight for Mercruiser 350 MAG MPI',
        completed: false
      },
      {
        id: 'az-2',
        name: 'STP Spin-On Oil Filter S5',
        qty: '1 Filter',
        partOrModel: 'Part # S5',
        details: '$6.99 — In-store pickup already in cart',
        warningOrTip: 'Standard GM small block 350 V8 spin-on filter',
        completed: false
      },
      {
        id: 'az-3',
        name: 'Sta-Bil 360 Marine Fuel Stabilizer (Blue Bottle)',
        qty: '1 Bottle (8 oz)',
        partOrModel: 'Part # 22239',
        details: '$15.99 — In-store pickup already in cart',
        warningOrTip: 'Fresh bottle for full winter storage protection',
        completed: false
      },
      {
        id: 'az-4',
        name: 'NGK Standard Copper Spark Plugs 3623',
        qty: '8 Plugs',
        partOrModel: 'Part # 3623 (BPR6EFS)',
        details: '$3.49/ea — Direct OEM match for ACDelco MR43LTS',
        warningOrTip: 'Keep in box for spring install; old plugs stay in for winter fogging',
        completed: false
      }
    ]
  },
  {
    id: 'homedepot',
    stopNumber: 2,
    name: 'The Home Depot',
    category: 'Plumbing, Freeze Protection & Gas Cans',
    address: '268 Daniel Webster Hwy, Nashua, NH 03060',
    badge: 'Cheapest for Gas Cans & Antifreeze',
    accentColor: 'amber',
    items: [
      {
        id: 'hd-batteries',
        name: 'Drop Off NiMH Batteries (Call2Recycle Bin)',
        qty: 'Recycle',
        details: 'Look for the Call2Recycle drop-off bin right inside the main entrance near Customer Service / Returns',
        warningOrTip: 'Free recycling drop-off for rechargeable batteries at Home Depot',
        completed: false
      },
      {
        id: 'hd-gas-cans',
        name: 'Red Plastic 5-Gallon Gasoline Jugs',
        qty: '2 Jugs (5-Gal each)',
        partOrModel: 'Scepter / Midwest 5-Gal Red Can (~$19.98 ea)',
        details: 'Cheapest here! (~$20 at Home Depot vs ~$32 at AutoZone). You save ~$25 buying both here.',
        warningOrTip: 'Check garden/seasonal aisle or tool corral for red gas cans',
        completed: false
      },
      {
        id: 'hd-1',
        name: 'Splash -75°F RV & Marine Antifreeze (Pink PG)',
        qty: '5 Gallons',
        partOrModel: 'Model # 619535-35 ($7.96/gal)',
        details: 'Located in seasonal / automotive aisle (161 in stock at South Nashua)',
        warningOrTip: 'DO NOT buy the cheap $3.98 alcohol/ethanol version! Must be -75°F marine PG',
        completed: false
      },
      {
        id: 'hd-2',
        name: '3/4" Female Garden Hose (FHT) x 3/8" Barb Adapter',
        qty: '1 Adapter (Brass or Plastic)',
        partOrModel: 'Plumbing / Garden Fitting Aisle (~$4.50)',
        details: 'Screws onto the threaded dipstick collar on the boat engine',
        warningOrTip: 'Push thick 0.322" Tempo pump hose directly onto the 3/8" barb',
        completed: false
      },
      {
        id: 'hd-3',
        name: 'Garden Hose Black Rubber Washers',
        qty: '1 Pack ($1.99)',
        partOrModel: 'Plumbing / Garden Hose Aisle',
        details: 'Goes inside the 3/4" female fitting to create airtight vacuum seal',
        warningOrTip: 'Essential for vacuum pump to pull 5 quarts of oil',
        completed: false
      }
    ]
  },
  {
    id: 'wholefoods',
    stopNumber: 3,
    name: 'Whole Foods Market',
    category: 'Amazon Return & Groceries',
    address: '255 Amherst St, Nashua, NH 03063',
    badge: 'Amazon Return Desk Inside',
    accentColor: 'emerald',
    items: [
      {
        id: 'wf-return',
        name: 'Amazon Return Drop-Off',
        qty: 'Bring return item(s) + QR code',
        details: 'Head to Customer Service / Amazon Return Counter inside entrance',
        warningOrTip: 'Have Amazon return QR code ready on your iPhone',
        completed: false
      },
      {
        id: 'wf-1',
        name: 'Market Groceries / Fresh Produce',
        qty: 'As needed',
        details: 'Tap "+ Add item" below if you want to jot down specific groceries',
        completed: false
      }
    ]
  },
  {
    id: 'gasstation',
    stopNumber: 4,
    name: 'Gas Station (Final Stop on Way Home)',
    category: 'Fuel Top-Off for Winter Storage',
    address: 'Gas Station on Route back to Dunstable',
    badge: 'Fill Your 3 Gas Cans Last!',
    accentColor: 'blue',
    items: [
      {
        id: 'gas-1',
        name: 'Fresh Gasoline (90-93 Octane or Ethanol-Free if available)',
        qty: '15 Gallons (3 Cans x 5 Gal)',
        partOrModel: 'Fill your existing can + the 2 new cans from Home Depot',
        details: 'Filled last so you don’t smell gasoline fumes while shopping at Whole Foods!',
        warningOrTip: 'Pour the 8 oz Sta-Bil Marine into boat tank BEFORE pouring gas in to agitate & mix',
        completed: false
      }
    ]
  }
];
