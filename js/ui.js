// UI Manipulation and Rendering

// Initialize preference tags
function initializePreferenceTags() {
    // Cuisine tags
    const cuisineContainer = document.getElementById('cuisineTags');
    CONFIG.cuisines.forEach(cuisine => {
        const tag = createTag(cuisine, 'cuisine');
        cuisineContainer.appendChild(tag);
    });

    // Activity tags
    const activityContainer = document.getElementById('activityTags');
    CONFIG.activities.forEach(activity => {
        const tag = createTag(activity, 'activity');
        activityContainer.appendChild(tag);
    });
}

// Create a tag element
function createTag(item, type) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `<i class="fas ${item.icon}"></i> ${item.label}`;
    tag.dataset.id = item.id;
    tag.dataset.type = type;

    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        updateSelectedPreferences(item.id, type, tag.classList.contains('active'));
    });

    return tag;
}

// Update selected preferences
function updateSelectedPreferences(id, type, isSelected) {
    if (type === 'cuisine') {
        if (isSelected) {
            if (!AppState.selectedCuisines.includes(id)) {
                AppState.selectedCuisines.push(id);
            }
        } else {
            AppState.selectedCuisines = AppState.selectedCuisines.filter(c => c !== id);
        }
    } else if (type === 'activity') {
        if (isSelected) {
            if (!AppState.selectedActivities.includes(id)) {
                AppState.selectedActivities.push(id);
            }
        } else {
            AppState.selectedActivities = AppState.selectedActivities.filter(a => a !== id);
        }
    }
}

// Initialize button groups
function initializeButtonGroups() {
    // Budget buttons
    const budgetContainer = document.getElementById('budgetButtons');
    CONFIG.budgets.forEach(budget => {
        const button = createButton(budget, 'budget');
        budgetContainer.appendChild(button);
        if (budget.id === 'moderate') {
            button.classList.add('active');
        }
    });

    // Pace buttons
    const paceContainer = document.getElementById('paceButtons');
    CONFIG.paces.forEach(pace => {
        const button = createButton(pace, 'pace');
        paceContainer.appendChild(button);
        if (pace.id === 'moderate') {
            button.classList.add('active');
        }
    });
}

// Create a button element
function createButton(item, type) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn';
    button.innerHTML = `<i class="fas ${item.icon}"></i> ${item.label}`;
    button.dataset.id = item.id;
    button.dataset.type = type;

    button.addEventListener('click', () => {
        // Remove active from siblings
        button.parentElement.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        if (type === 'budget') {
            AppState.selectedBudget = item.id;
        } else if (type === 'pace') {
            AppState.selectedPace = item.id;
        }
    });

    return button;
}

// Show loading state
function showLoading(show = true) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

// Show empty state
function showEmptyState(show = true) {
    const emptyState = document.getElementById('emptyState');
    const routesSection = document.getElementById('routesSection');
    const recommendationsSection = document.getElementById('recommendationsSection');

    if (show) {
        emptyState.style.display = 'block';
        routesSection.style.display = 'none';
        recommendationsSection.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        routesSection.style.display = 'block';
        recommendationsSection.style.display = 'block';
    }
}

// Render route cards
function renderRoutes(routes) {
    const routesList = document.getElementById('routesList');
    routesList.innerHTML = '';

    if (!routes || routes.length === 0) {
        routesList.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">경로 정보가 없습니다</p>';
        return;
    }

    routes.forEach((route, index) => {
        const card = createRouteCard(route, index + 1);
        routesList.appendChild(card);
    });
}

// Create a route card element
function createRouteCard(route, number) {
    const card = document.createElement('div');
    card.className = `route-card ${route.type}`;

    const typeInfo = CONFIG.transitTypes[route.type] || CONFIG.transitTypes.bus;

    card.innerHTML = `
        <div class="route-number">${number}</div>
        <div class="route-header">
            <div class="route-type">
                <i class="fas ${typeInfo.icon}"></i>
                ${typeInfo.label} ${route.line || ''}
            </div>
            <div class="route-duration">${route.duration}</div>
        </div>
        <div class="route-info">
            <strong>출발:</strong> ${route.departure}
            ${route.departureTime ? `(${route.departureTime})` : ''}
        </div>
        <div class="route-info">
            <strong>도착:</strong> ${route.arrival}
            ${route.arrivalTime ? `(${route.arrivalTime})` : ''}
        </div>
        ${route.stops ? `<div class="route-info"><strong>정류장:</strong> ${route.stops}개</div>` : ''}
        ${route.headsign ? `<div class="route-info"><strong>방면:</strong> ${route.headsign}</div>` : ''}
    `;

    return card;
}

// Render recommendations
function renderRecommendations(places) {
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';

    if (!places || places.length === 0) {
        recommendationsList.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">추천 장소가 없습니다</p>';
        return;
    }

    places.forEach(place => {
        const card = createRecommendationCard(place);
        recommendationsList.appendChild(card);
    });
}

// Create a recommendation card element
function createRecommendationCard(place) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';

    // Get photo URL if available
    let photoUrl = 'https://via.placeholder.com/400x150?text=No+Image';
    if (place.photos && place.photos.length > 0) {
        photoUrl = place.photos[0].getUrl({ maxWidth: 400, maxHeight: 150 });
    }

    // Price level indicator
    let priceLevel = '';
    if (place.price_level) {
        priceLevel = '💰'.repeat(place.price_level);
    }

    // Opening hours
    let openNow = '';
    if (place.opening_hours) {
        openNow = place.opening_hours.open_now ?
            '<span style="color: #10b981;">● 영업 중</span>' :
            '<span style="color: #ef4444;">● 영업 종료</span>';
    }

    card.innerHTML = `
        <img src="${photoUrl}" alt="${place.name}" class="recommendation-image" onerror="this.src='https://via.placeholder.com/400x150?text=No+Image'">
        <div class="recommendation-content">
            <div class="recommendation-header">
                <h3 class="recommendation-name">${place.name}</h3>
                <div class="recommendation-rating">
                    <i class="fas fa-star"></i>
                    <span>${place.rating ? place.rating.toFixed(1) : 'N/A'}</span>
                </div>
            </div>
            <p class="recommendation-description">
                ${place.vicinity || place.formatted_address || '주소 정보 없음'}
            </p>
            <div class="recommendation-footer">
                <span>${priceLevel || '가격 정보 없음'}</span>
                <span>${openNow}</span>
            </div>
        </div>
    `;

    // Add click event to show on map
    card.addEventListener('click', () => {
        if (AppState.map && place.geometry && place.geometry.location) {
            AppState.map.setCenter(place.geometry.location);
            AppState.map.setZoom(16);
        }
    });

    return card;
}

// Show error message
function showError(message) {
    alert(message);
}

// Show success message
function showSuccess(message) {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');
    loading.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
            <p style="color: #10b981; font-weight: 600;">${message}</p>
        </div>
    `;

    setTimeout(() => {
        loading.classList.add('hidden');
        loading.innerHTML = `
            <div class="spinner"></div>
            <p>경로를 검색하는 중...</p>
        `;
    }, 2000);
}

// Set today's date as default
function setDefaultDate() {
    const dateInput = document.getElementById('departureDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
}

// Set current time as default
function setDefaultTime() {
    const timeInput = document.getElementById('departureTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
}
