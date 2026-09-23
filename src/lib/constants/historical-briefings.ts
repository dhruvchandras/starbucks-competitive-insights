import { DailyBriefing } from '@/types/intelligence';

export const HISTORICAL_BRIEFINGS: DailyBriefing[] = [
  {
    id: 'briefing-2026-09-23',
    date: '2026-09-23',
    displayDate: 'Wednesday, September 23, 2026',
    volumeNumber: 142,
    headline: 'Dutch Bros Doubles Down on Express Drive-Thru Automation as McCafé Unveils Cold Foam Protein Platform',
    executiveSummary:
      'In today’s competitive intelligence sweep, competitor activity centers on two critical vulnerability vectors for Starbucks USA: speed of service during peak morning drive-thru windows, and afternoon functional cold beverage innovation. Dutch Bros has initiated rapid rollout of AI line-busting ordering pods across Sunbelt corridors, slashing window wait times to under 110 seconds. Simultaneously, McDonald’s has launched its nationwide McCafé Protein Cold Foam initiative priced at a 40% discount to Starbucks handcrafted beverages. On the policy front, Blank Street has updated barista compensation to a revenue-share model tied directly to peak automated machine throughput.',
    scannedCompetitorCount: 12,
    totalSourcesScanned: 84,
    keyTakeaway: 'Competitors are weaponizing drive-thru throughput and entry-level cold foam pricing to peel off both the rushed morning commuter and price-conscious Gen Z beverage buyers.',
    readTime: '4 min read',
    publishedAt: '2026-09-23T06:30:00Z',
    generatedBy: 'gemini-ai',
    insights: [
      {
        id: 'ins-20260923-1',
        rank: 1,
        title: 'Dutch Bros Deploys "Broista-Assist" AI Handheld Pods to Cut Peak Drive-Thru Times to Sub-2-Minutes',
        competitor: 'Dutch Bros Coffee',
        category: 'restaurant_tech',
        date: '2026-09-23',
        summary:
          'Dutch Bros has officially expanded its line-busting mobile handheld order and pay pods integrated with predictive queue routing across 200+ drive-thru locations. Field tests show average wait times dropping by 38 seconds per car, allowing an additional 18 cars per lane per hour during the critical 7:00 AM - 9:30 AM rush.',
        starbucksImpact:
          'Direct threat to Starbucks suburban drive-thru market share. SBUX stores currently average 3.8 to 4.5 minutes in peak drive-thru queues as Siren Craft System rollouts continue. Dutch Bros is actively converting frustrated Starbucks drive-thru drive-offs in overlapping Sunbelt and Western suburban nodes.',
        recommendedAction:
          'Accelerate Starbucks Siren Craft System equipment retrofits in overlapping trade zones. Deploy dedicated outside mobile order runners during 7-9 AM peak hours to hand off MOP orders at car windows before vehicles hit the speaker box.',
        threatLevel: 'Critical Threat',
        impactScore: 94,
        tags: ['Drive-Thru', 'AI Automation', 'Speed of Service', 'Sunbelt Expansion'],
        source: {
          name: "Nation's Restaurant News",
          url: 'https://www.nrn.com',
          publishedAt: '2026-09-23T05:15:00Z'
        },
        metrics: {
          estimatedMarketOverlap: '64% of suburban Sunbelt stores',
          affectedDaypart: 'Morning Peak (7-9:30 AM)'
        }
      },
      {
        id: 'ins-20260923-2',
        rank: 2,
        title: 'McCafé Launches "$3.49 Protein Cold Foam" Add-On Across 13,000 US Locations',
        competitor: "McCafé & CosMc's",
        category: 'product_launch',
        date: '2026-09-22',
        summary:
          'McDonald’s has expanded its cold coffee customization playbook by rolling out vanilla and salted caramel Protein Cold Foam (15g whey isolate per serving) as an add-on to iced espresso and iced coffee at an aggressive $1.29 upcharge ($3.49 total beverage base). The launch is backed by a national TV and TikTok campaign positioning McCafé as "custom coffee without the third-mortgage price tag".',
        starbucksImpact:
          'Undercuts Starbucks custom iced espresso and cold brew margins. Cold beverage customizations (cold foam, syrups) account for over 75% of Starbucks beverage revenue and represent high gross margin. A 40% cheaper protein-infused cold foam option provides everyday commuters a compelling budget substitute.',
        recommendedAction:
          'Counter with a limited-time Starbucks Rewards multiplier on iced cold foam beverages and test a tiered functional wellness add-on (collagen/plant protein cold foam) with premium flavor messaging highlighting authentic espresso quality.',
        threatLevel: 'Moderate Pressure',
        impactScore: 88,
        tags: ['Cold Foam', 'Functional Beverage', 'Value Pricing', 'QSR Menu Push'],
        source: {
          name: 'QSR Magazine',
          url: 'https://www.qsrmagazine.com',
          publishedAt: '2026-09-22T14:40:00Z'
        },
        metrics: {
          estimatedMarketOverlap: '92% of US metropolitan areas',
          affectedDaypart: 'Afternoon Slump (1-4 PM)'
        }
      },
      {
        id: 'ins-20260923-3',
        rank: 3,
        title: 'Blank Street Overhauls Store Model: Replaces Seating with High-Density Pickup Cubbies & 45-Second Milk Automation',
        competitor: 'Blank Street Coffee',
        category: 'store_design',
        date: '2026-09-22',
        summary:
          'Blank Street has begun converting its urban cafes into pure transit nodes, eliminating remaining interior seating in favor of illuminated app-pickup cubbies and dual Eversys automated espresso dispensers. The new footprint operates with only 2 employees during peak hours while achieving a 45-second order-to-cup turnaround.',
        starbucksImpact:
          'Pressures Starbucks urban core footprint (NYC, Boston, Chicago, DC). While Starbucks is revitalizing the "Third Place" lounge concept for select flagship stores, urban commuter foot traffic overwhelmingly prioritizes friction-free pickup speed where Blank Street is operating at significantly lower labor costs per transaction.',
        recommendedAction:
          'Benchmark Starbucks Mobile Order & Pay (MOP) designated pickup areas against cubby systems. Expand dedicated Siren pickup turnstiles in high-density commuter subway/financial district stores without sacrificing suburban lounge formats.',
        threatLevel: 'Strategic Opportunity',
        impactScore: 81,
        tags: ['Store Footprint', 'Urban Commuters', 'Automation', 'Labor Efficiency'],
        source: {
          name: 'Restaurant Business Online',
          url: 'https://www.restaurantbusinessonline.com',
          publishedAt: '2026-09-22T11:20:00Z'
        },
        metrics: {
          estimatedMarketOverlap: 'NYC & Boston High-Density Submarkets',
          affectedDaypart: 'Morning Commute (8-10 AM)'
        }
      }
    ]
  },
  {
    id: 'briefing-2026-09-22',
    date: '2026-09-22',
    displayDate: 'Tuesday, September 22, 2026',
    volumeNumber: 141,
    headline: 'Dunkin’ Revamps Rewards Tiering to Target Frequent Iced Sippers as Panera Faces Beverage Loyalty Churn',
    executiveSummary:
      'Yesterday’s competitive intelligence sweep highlighted strategic pivots in customer retention and beverage loyalty programs. Dunkin’ announced an unannounced update to Dunkin’ Rewards, offering double points specifically on cold beverage customizations between 12 PM and 5 PM. Meanwhile, Panera Bread reported a 14% drop in Unlimited Sip Club recurring active members following recent menu price restructuring, opening an immediate acquisition window for Starbucks iced coffee and refresher customers.',
    scannedCompetitorCount: 11,
    totalSourcesScanned: 79,
    keyTakeaway: 'Loyalty fatigue is setting in across fast-casual beverage clubs; targeted daypart incentives are outperforming flat monthly subscriptions.',
    readTime: '3 min read',
    publishedAt: '2026-09-22T06:30:00Z',
    generatedBy: 'gemini-ai',
    insights: [
      {
        id: 'ins-20260922-1',
        rank: 1,
        title: 'Dunkin\' Rewards Introduces "Afternoon Ice Club" 2x Points Engine Targeting 12 PM - 5 PM Refresher Occasions',
        competitor: "Dunkin'",
        category: 'policy_labor',
        date: '2026-09-22',
        summary:
          'Dunkin\' has updated its loyalty algorithm to dynamically target users who have not made an afternoon purchase in 14 days with an automatic 2x point bonus and a $2 iced refresher add-on offer with any bakery purchase after 12 PM.',
        starbucksImpact:
          'Directly aims at Starbucks afternoon slump. Starbucks Refreshers (Strawberry Açaí, Mango Dragonfruit) are the primary vehicle for sustaining post-noon store traffic among students and young adults. Dunkin’ is aggressively bridging the gap with low-barrier pricing.',
        recommendedAction:
          'Launch a proactive "Afternoon Spark" Starbucks Rewards challenge in the mobile app, granting 50 bonus Stars on Refresher or Iced Tea purchases between 1 PM and 4 PM on Tuesdays and Thursdays.',
        threatLevel: 'Moderate Pressure',
        impactScore: 86,
        tags: ['Loyalty Program', 'Afternoon Daypart', 'Refreshers', 'Dynamic Offers'],
        source: {
          name: 'Bloomberg Businessweek',
          url: 'https://www.bloomberg.com',
          publishedAt: '2026-09-22T08:10:00Z'
        }
      },
      {
        id: 'ins-20260922-2',
        rank: 2,
        title: 'Panera Bread Unlimited Sip Club Sees 14% Member Churn Following Energy Beverage Reformulation',
        competitor: 'Panera Bread',
        category: 'product_failure',
        date: '2026-09-21',
        summary:
          'Subsequent to menu changes and price increases to the Unlimited Sip Club tier ($14.99/mo), third-party transaction data shows a 14% net attrition in active subscriber count over Q3, with members citing reduced perceived value and fewer high-caffeine choices.',
        starbucksImpact:
          'Presents an exceptional customer acquisition opportunity. High-frequency beverage subscribers who churned from Panera are seeking a dependable daily cold beverage alternative within walking or short driving distance.',
        recommendedAction:
          'Target local digital search ads around Panera locations with "Upgrade your daily ritual" creative emphasizing Starbucks handcrafted iced tea and cold brew freshness, paired with a welcome offer for lapsed Starbucks Rewards members.',
        threatLevel: 'Strategic Opportunity',
        impactScore: 84,
        tags: ['Subscription Model', 'Customer Churn', 'Refresher Category', 'Acquisition'],
        source: {
          name: 'Restaurant Business Online',
          url: 'https://www.restaurantbusinessonline.com',
          publishedAt: '2026-09-21T16:20:00Z'
        }
      },
      {
        id: 'ins-20260922-3',
        rank: 3,
        title: 'Peet\'s Coffee Debuts Single-Origin Espresso Micro-Roast Pilot in 45 California Drive-Thrus',
        competitor: "Peet's Coffee",
        category: 'product_launch',
        date: '2026-09-21',
        summary:
          'Peet’s has begun testing rotated single-origin Ethiopia and Guatemala espresso shots in drive-thru locations with customized extraction dial-in, aiming to capture coffee purists who typically avoid drive-thru coffee due to perceived quality compromises.',
        starbucksImpact:
          'Challenges Starbucks Reserve & Blonde Roast positioning in core suburban West Coast markets where Peet\'s has strong legacy brand equity.',
        recommendedAction:
          'Increase promotional visibility of Starbucks Blonde Espresso in digital drive-thru menu boards and train baristas on quick tasting notes for customization prompts.',
        threatLevel: 'Watch Item',
        impactScore: 74,
        tags: ['Single Origin', 'Espresso Quality', 'Drive-Thru Experience', 'West Coast'],
        source: {
          name: 'Daily Coffee News',
          url: 'https://dailycoffeenews.com',
          publishedAt: '2026-09-21T10:00:00Z'
        }
      }
    ]
  },
  {
    id: 'briefing-2026-09-21',
    date: '2026-09-21',
    displayDate: 'Monday, September 21, 2026',
    volumeNumber: 140,
    headline: 'Wendy’s Expands $3 Morning Meal Deal Nationwide While Caribou Scales Seating-Free "Cabin" Drive-Thru Model',
    executiveSummary:
      'Beginning the week, QSR breakfast price wars escalated as Wendy’s introduced a nationwide $3 breakfast combo (Small Frosty Cold Brew + Breakfast Sandwich), applying direct margin pressure on Starbucks food-plus-beverage morning attachments. In real estate developments, Caribou Coffee announced 40 new "Cabin" locations featuring twin drive-thru lanes and zero seating, demonstrating superior site unit economics and faster capital payback.',
    scannedCompetitorCount: 10,
    totalSourcesScanned: 71,
    keyTakeaway: 'The battle for morning breakfast attachment is tightening; Starbucks must defend its morning food attach rate against sub-$4 combos with superior food quality messaging.',
    readTime: '4 min read',
    publishedAt: '2026-09-21T06:30:00Z',
    generatedBy: 'heuristic-engine',
    insights: [
      {
        id: 'ins-20260921-1',
        rank: 1,
        title: 'Wendy’s Rolls Out "$3 Wake-Up Combo": Small Frosty Cold Brew + English Muffin Sandwich',
        competitor: "Wendy's Breakfast & Frosty Cold Brew",
        category: 'pricing_value',
        date: '2026-09-21',
        summary:
          'Wendy’s launched a nationwide price-point campaign offering a small Frosty Cold Brew paired with a Bacon or Sausage Egg & Cheese English Muffin for $3.00, supported by prime-time NFL ad placements.',
        starbucksImpact:
          'Direct threat to Starbucks morning food attach rate. An average Starbucks morning order (Grande Latte + Bacon Gouda) exceeds $10.50. Value-sensitive commuters experiencing inflation pinch may trade down for convenience and price.',
        recommendedAction:
          'Promote the Starbucks "Pairing Menu" ($5 Butter Croissant + Coffee, $6 Breakfast Sandwich + Coffee) with prominent app banner placement and push notifications during weekday 6:30 AM wake-up windows.',
        threatLevel: 'Critical Threat',
        impactScore: 91,
        tags: ['Breakfast Wars', 'Value Meal', 'Food Attach', 'Morning Commute'],
        source: {
          name: 'CNBC Retail',
          url: 'https://www.cnbc.com',
          publishedAt: '2026-09-21T07:45:00Z'
        }
      },
      {
        id: 'ins-20260921-2',
        rank: 2,
        title: 'Caribou Coffee Signs 40-Unit Multi-State Expansion for Seating-Free "Cabin" Drive-Thru Format',
        competitor: 'Caribou Coffee',
        category: 'store_design',
        date: '2026-09-20',
        summary:
          'Caribou Coffee announced a major multi-unit franchise agreement to develop 40 "Caribou Cabin" locations across the Midwest and Southeast. The prefabricated 600 sq ft format features a drive-thru lane and walk-up window, reducing buildout costs by over 45% compared to traditional 2,000 sq ft cafes.',
        starbucksImpact:
          'Expands competitor footprint into mid-tier suburban and secondary highway corridors where standard Starbucks full-cafe builds are economically unviable or slow to permit.',
        recommendedAction:
          'Fast-track Starbucks prefabricated modular drive-thru-only store designs for secondary and tertiary US markets to capture real estate nodes before regional chains lock in optimal drive-thru parcels.',
        threatLevel: 'Moderate Pressure',
        impactScore: 82,
        tags: ['Modular Real Estate', 'Cabin Format', 'Suburban Expansion', 'Capex Efficiency'],
        source: {
          name: 'World Coffee Portal',
          url: 'https://www.worldcoffeeportal.com',
          publishedAt: '2026-09-20T13:10:00Z'
        }
      },
      {
        id: 'ins-20260921-3',
        rank: 3,
        title: 'CosMc’s Files New Trademarks for "Churro Cold Brew" and "Pretzel Bite Bites" Ahead of Multi-City Expansion',
        competitor: "McCafé & CosMc's",
        category: 'product_launch',
        date: '2026-09-20',
        summary:
          'Patent and trademark filings reveal McDonald\'s is preparing a wider rollout of CosMc\'s signature confectionery cold brews and snack bites, signaling that early unit economics in Dallas-Fort Worth tests have cleared expansion thresholds.',
        starbucksImpact:
          'Confirms McDonald’s intent to permanently contest Starbucks specialty beverage afternoon dominance with a playful, sugar-forward cold beverage portfolio that resonates with younger demographics.',
        recommendedAction:
          'Audit Starbucks cold beverage flavor pipeline for spring/summer, ensuring seasonal Frappuccino and cold foam innovations maintain distinctive craft appeal rather than conceding novelty beverage territory.',
        threatLevel: 'Moderate Pressure',
        impactScore: 85,
        tags: ['CosMcs', 'Trademark Filing', 'Cold Brew Innovation', 'Afternoon Snacks'],
        source: {
          name: "Nation's Restaurant News",
          url: 'https://www.nrn.com',
          publishedAt: '2026-09-20T17:30:00Z'
        }
      }
    ]
  }
];
