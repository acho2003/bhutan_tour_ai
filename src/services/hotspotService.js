// Comprehensive Bhutanese hotspots database
export const bhutaneseHotspots = [
  {
    id: 1,
    name: "Tiger's Nest Monastery (Paro Taktsang)",
    description: "Sacred monastery perched on a cliff face",
    location: "Paro Valley",
    category: "monastery",
    season: "March-May, September-November",
    tips: "Start early morning, wear comfortable hiking shoes, allow 3-4 hours",
    difficulty: "moderate",
    keywords: ["monastery", "cliff", "sacred", "hiking", "paro", "taktsang"],
    nearbyAttractions: ["Paro Dzong", "National Museum", "Kyichu Lhakhang"],
    culturalSignificance: "Where Guru Rinpoche meditated for 3 years, 3 months, 3 weeks, and 3 days",
    bestTime: "Early morning for fewer crowds and better lighting"
  },
  {
    id: 2,
    name: "Punakha Dzong",
    description: "Fortress at the confluence of two rivers",
    location: "Punakha",
    category: "dzong",
    season: "October-December",
    tips: "Visit during sunset for best photography, respect dress code",
    difficulty: "easy",
    keywords: ["dzong", "fortress", "rivers", "architecture", "punakha"],
    nearbyAttractions: ["Chimi Lhakhang", "Punakha Suspension Bridge", "Khamsum Yulley Namgyal Chorten"],
    culturalSignificance: "Former capital and winter residence of the Je Khenpo",
    bestTime: "Late afternoon for golden hour photography"
  },
  {
    id: 3,
    name: "Dochula Pass",
    description: "Mountain pass with 108 chortens and Himalayan views",
    location: "Between Thimphu and Punakha",
    category: "viewpoint",
    season: "October-February",
    tips: "Clear weather essential for mountain views, bring warm clothes",
    difficulty: "easy",
    keywords: ["pass", "chortens", "himalaya", "views", "mountains"],
    nearbyAttractions: ["Druk Wangyal Lhakhang", "Lamperi Botanical Park", "Thimphu"],
    culturalSignificance: "108 chortens built to honor Bhutanese soldiers",
    bestTime: "Early morning for clearest mountain views"
  },
  {
    id: 4,
    name: "Thimphu Weekend Market",
    description: "Vibrant local market with fresh produce and crafts",
    location: "Thimphu",
    category: "market",
    season: "Year-round",
    tips: "Visit Friday-Sunday, bring cash, try local chilies",
    difficulty: "easy",
    keywords: ["market", "local", "food", "crafts", "thimphu"],
    nearbyAttractions: ["Tashichho Dzong", "Buddha Dordenma", "Memorial Chorten"],
    culturalSignificance: "Heart of local commerce and social interaction",
    bestTime: "Saturday morning for the fullest experience"
  },
  {
    id: 5,
    name: "Phobjikha Valley",
    description: "Glacial valley and winter home of black-necked cranes",
    location: "Wangdue Phodrang",
    category: "nature",
    season: "November-March",
    tips: "Bring binoculars for bird watching, stay at local farmhouse",
    difficulty: "easy",
    keywords: ["valley", "cranes", "birds", "nature", "glacial"],
    nearbyAttractions: ["Gangtey Monastery", "Crane Information Centre", "Nature Trail"],
    culturalSignificance: "Sacred valley protected by local communities",
    bestTime: "Early morning and late afternoon for crane spotting"
  },
  {
    id: 6,
    name: "Bumthang Valley",
    description: "Spiritual heartland with ancient temples",
    location: "Bumthang",
    category: "valley",
    season: "March-May, September-November",
    tips: "Try local honey and cheese, visit multiple temples",
    difficulty: "easy",
    keywords: ["valley", "spiritual", "temples", "honey", "cheese"],
    nearbyAttractions: ["Jakar Dzong", "Jambay Lhakhang", "Kurjey Lhakhang"],
    culturalSignificance: "Where Buddhism first took root in Bhutan",
    bestTime: "Spring for rhododendrons, autumn for clear skies"
  },
  {
    id: 7,
    name: "Chimi Lhakhang",
    description: "Temple of fertility blessed by Divine Madman",
    location: "Punakha",
    category: "temple",
    season: "Year-round",
    tips: "Walk through rice fields, learn about Drukpa Kunley",
    difficulty: "easy",
    keywords: ["temple", "fertility", "madman", "rice", "fields"],
    nearbyAttractions: ["Punakha Dzong", "Suspension Bridge", "Wangdue Phodrang"],
    culturalSignificance: "Blessed by the unconventional saint Drukpa Kunley",
    bestTime: "Morning walk through the countryside"
  },
  {
    id: 8,
    name: "Haa Valley",
    description: "Hidden valley with pristine landscapes",
    location: "Haa",
    category: "valley",
    season: "April-October",
    tips: "Less crowded, perfect for hiking, visit local villages",
    difficulty: "moderate",
    keywords: ["hidden", "valley", "pristine", "hiking", "villages"],
    nearbyAttractions: ["Katsho Goemba", "Juneydrak Hermitage", "Chelela Pass"],
    culturalSignificance: "One of the most isolated and traditional valleys",
    bestTime: "Summer for accessibility and wildflowers"
  },
  {
    id: 9,
    name: "Buddha Dordenma",
    description: "Massive bronze Buddha statue overlooking Thimphu",
    location: "Thimphu",
    category: "statue",
    season: "Year-round",
    tips: "Visit at sunset, explore the temple inside the statue",
    difficulty: "easy",
    keywords: ["buddha", "statue", "bronze", "thimphu", "temple"],
    nearbyAttractions: ["Thimphu city", "BBS Tower", "Takin Preserve"],
    culturalSignificance: "Fulfills ancient prophecy and brings peace",
    bestTime: "Sunset for dramatic lighting and city views"
  },
  {
    id: 10,
    name: "Trongsa Dzong",
    description: "Largest dzong and ancestral home of royal family",
    location: "Trongsa",
    category: "dzong",
    season: "March-May, September-November",
    tips: "Visit the museum, learn about royal history",
    difficulty: "easy",
    keywords: ["dzong", "largest", "royal", "family", "museum"],
    nearbyAttractions: ["Ta Dzong Museum", "Kuenga Rabten Palace", "Chendebji Chorten"],
    culturalSignificance: "Traditional seat of power for Bhutanese royalty",
    bestTime: "Morning for museum visit and photography"
  }
];

// Intelligent suggestion algorithm
export const generateSmartSuggestions = (userQuery, currentLocation = null, userInterests = []) => {
  const query = userQuery.toLowerCase();
  const suggestions = [];
  
  // Score each hotspot based on relevance
  const scoredHotspots = bhutaneseHotspots.map(hotspot => {
    let score = 0;
    
    // Keyword matching
    hotspot.keywords.forEach(keyword => {
      if (query.includes(keyword)) {
        score += 3;
      }
    });
    
    // Category matching
    if (query.includes(hotspot.category)) {
      score += 2;
    }
    
    // Location matching
    if (query.includes(hotspot.location.toLowerCase())) {
      score += 2;
    }
    
    // Name matching
    if (query.includes(hotspot.name.toLowerCase())) {
      score += 5;
    }
    
    // Interest-based scoring
    userInterests.forEach(interest => {
      if (hotspot.keywords.includes(interest) || hotspot.category === interest) {
        score += 1;
      }
    });
    
    return { ...hotspot, relevanceScore: score };
  });
  
  // Sort by relevance and get top suggestions
  const topSuggestions = scoredHotspots
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3);
  
  // If no relevant matches, provide diverse suggestions
  if (topSuggestions.every(s => s.relevanceScore === 0)) {
    const categories = ['monastery', 'dzong', 'nature'];
    categories.forEach(category => {
      const categoryMatch = bhutaneseHotspots.find(h => h.category === category);
      if (categoryMatch && !suggestions.find(s => s.id === categoryMatch.id)) {
        suggestions.push(categoryMatch);
      }
    });
  } else {
    suggestions.push(...topSuggestions);
  }
  
  return suggestions.slice(0, 3);
};

// Get nearby attractions for a specific hotspot
export const getNearbyAttractions = (hotspotName) => {
  const hotspot = bhutaneseHotspots.find(h => 
    h.name.toLowerCase().includes(hotspotName.toLowerCase())
  );
  
  if (!hotspot) return [];
  
  return hotspot.nearbyAttractions.map(attraction => {
    const nearbyHotspot = bhutaneseHotspots.find(h => 
      h.name.toLowerCase().includes(attraction.toLowerCase())
    );
    return nearbyHotspot || {
      name: attraction,
      description: "Nearby attraction worth visiting",
      category: "attraction"
    };
  }).slice(0, 3);
};

// Get seasonal recommendations
export const getSeasonalRecommendations = (month) => {
  const seasonalMap = {
    'spring': [3, 4, 5], // March, April, May
    'summer': [6, 7, 8], // June, July, August
    'autumn': [9, 10, 11], // September, October, November
    'winter': [12, 1, 2] // December, January, February
  };
  
  let currentSeason = 'spring';
  for (const [season, months] of Object.entries(seasonalMap)) {
    if (months.includes(month)) {
      currentSeason = season;
      break;
    }
  }
  
  return bhutaneseHotspots.filter(hotspot => {
    const seasonText = hotspot.season.toLowerCase();
    switch (currentSeason) {
      case 'spring':
        return seasonText.includes('march') || seasonText.includes('april') || seasonText.includes('may');
      case 'summer':
        return seasonText.includes('june') || seasonText.includes('july') || seasonText.includes('august');
      case 'autumn':
        return seasonText.includes('september') || seasonText.includes('october') || seasonText.includes('november');
      case 'winter':
        return seasonText.includes('december') || seasonText.includes('january') || seasonText.includes('february');
      default:
        return true;
    }
  }).slice(0, 3);
};

// Get recommendations by difficulty level
export const getRecommendationsByDifficulty = (difficulty = 'easy') => {
  return bhutaneseHotspots
    .filter(hotspot => hotspot.difficulty === difficulty)
    .slice(0, 3);
};

// Get recommendations by category
export const getRecommendationsByCategory = (category) => {
  return bhutaneseHotspots
    .filter(hotspot => hotspot.category === category)
    .slice(0, 3);
};
