// Configuration and Constants
const CONFIG = {
    // Cuisine options
    cuisines: [
        { id: 'korean', label: '한식', icon: 'fa-bowl-rice' },
        { id: 'japanese', label: '일식', icon: 'fa-fish' },
        { id: 'chinese', label: '중식', icon: 'fa-dragon' },
        { id: 'western', label: '양식', icon: 'fa-utensils' },
        { id: 'italian', label: '이탈리안', icon: 'fa-pizza-slice' },
        { id: 'french', label: '프렌치', icon: 'fa-wine-glass' },
        { id: 'mexican', label: '멕시칸', icon: 'fa-pepper-hot' },
        { id: 'thai', label: '태국', icon: 'fa-leaf' },
        { id: 'vietnamese', label: '베트남', icon: 'fa-bowl-food' },
        { id: 'indian', label: '인도', icon: 'fa-fire' },
        { id: 'cafe', label: '카페', icon: 'fa-mug-hot' },
        { id: 'dessert', label: '디저트', icon: 'fa-ice-cream' }
    ],

    // Activity options
    activities: [
        { id: 'sightseeing', label: '관광', icon: 'fa-camera' },
        { id: 'shopping', label: '쇼핑', icon: 'fa-shopping-bag' },
        { id: 'nature', label: '자연', icon: 'fa-tree' },
        { id: 'history', label: '역사', icon: 'fa-landmark' },
        { id: 'culture', label: '문화', icon: 'fa-masks-theater' },
        { id: 'art', label: '예술', icon: 'fa-palette' },
        { id: 'sports', label: '스포츠', icon: 'fa-person-running' },
        { id: 'leisure', label: '레저', icon: 'fa-umbrella-beach' },
        { id: 'photo', label: '사진', icon: 'fa-camera-retro' },
        { id: 'food-tour', label: '맛집투어', icon: 'fa-utensils' },
        { id: 'nightview', label: '야경', icon: 'fa-moon' },
        { id: 'theme-park', label: '테마파크', icon: 'fa-ferris-wheel' }
    ],

    // Budget options
    budgets: [
        { id: 'budget', label: '절약형', icon: 'fa-piggy-bank' },
        { id: 'moderate', label: '보통', icon: 'fa-coins' },
        { id: 'luxury', label: '럭셔리', icon: 'fa-gem' }
    ],

    // Pace options
    paces: [
        { id: 'relaxed', label: '여유롭게', icon: 'fa-couch' },
        { id: 'moderate', label: '보통', icon: 'fa-person-walking' },
        { id: 'fast', label: '빠르게', icon: 'fa-person-running' }
    ],

    // Transit type colors and labels
    transitTypes: {
        bus: { color: '#10b981', label: '버스', icon: 'fa-bus' },
        train: { color: '#3b82f6', label: '기차', icon: 'fa-train' },
        subway: { color: '#8b5cf6', label: '지하철', icon: 'fa-train-subway' },
        walk: { color: '#6b7280', label: '도보', icon: 'fa-person-walking' },
        flight: { color: '#ef4444', label: '비행기', icon: 'fa-plane' }
    }
};

// Application State
const AppState = {
    map: null,
    directionsService: null,
    directionsRenderer: null,
    placesService: null,
    markers: [],
    selectedCuisines: [],
    selectedActivities: [],
    selectedBudget: 'moderate',
    selectedPace: 'moderate',
    tripDetails: {
        origin: null,
        destination: null,
        departureDate: null,
        departureTime: null,
        duration: 1
    }
};
