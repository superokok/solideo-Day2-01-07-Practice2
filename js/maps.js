// Google Maps Integration

// Initialize map when Google Maps API loads
function initMap() {
    // Initialize map centered on Seoul
    AppState.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5665, lng: 126.9780 },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true
    });

    // Initialize services
    AppState.directionsService = new google.maps.DirectionsService();
    AppState.directionsRenderer = new google.maps.DirectionsRenderer({
        map: AppState.map,
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: '#2563eb',
            strokeWeight: 5,
            strokeOpacity: 0.7
        }
    });
    AppState.placesService = new google.maps.places.PlacesService(AppState.map);

    console.log('Google Maps initialized successfully');
}

// Geocode an address to get coordinates
function geocodeAddress(address) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results[0]) {
                resolve({
                    address: results[0].formatted_address,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                });
            } else {
                reject(new Error(`주소를 찾을 수 없습니다: ${address}`));
            }
        });
    });
}

// Get directions between two locations
function getDirections(origin, destination, departureTime) {
    return new Promise((resolve, reject) => {
        const request = {
            origin: { lat: origin.lat, lng: origin.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            travelMode: google.maps.TravelMode.TRANSIT,
            transitOptions: {
                modes: ['BUS', 'TRAIN', 'SUBWAY'],
                routingPreference: 'FEWER_TRANSFERS'
            },
            provideRouteAlternatives: true
        };

        // Add departure time if provided
        if (departureTime) {
            request.transitOptions.departureTime = departureTime;
        }

        AppState.directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                resolve(result);
            } else {
                reject(new Error('경로를 찾을 수 없습니다. 다른 출발지나 도착지를 시도해보세요.'));
            }
        });
    });
}

// Parse directions result to route cards
function parseDirectionsToRoutes(directionsResult) {
    const routes = [];

    directionsResult.routes.forEach((route, index) => {
        route.legs.forEach(leg => {
            leg.steps.forEach((step, stepIndex) => {
                if (step.travel_mode === 'TRANSIT') {
                    const transit = step.transit;
                    let type = 'bus';

                    if (transit.line.vehicle.type === 'SUBWAY') {
                        type = 'subway';
                    } else if (transit.line.vehicle.type === 'HEAVY_RAIL' ||
                               transit.line.vehicle.type === 'COMMUTER_TRAIN') {
                        type = 'train';
                    }

                    routes.push({
                        id: `route-${index}-${stepIndex}`,
                        type: type,
                        line: transit.line.short_name || transit.line.name,
                        departure: transit.departure_stop.name,
                        arrival: transit.arrival_stop.name,
                        departureTime: transit.departure_time.text,
                        arrivalTime: transit.arrival_time.text,
                        duration: step.duration.text,
                        distance: step.distance.text,
                        stops: transit.num_stops,
                        headsign: transit.headsign
                    });
                }
            });
        });
    });

    return routes;
}

// Search for places near a location
function searchNearbyPlaces(location, type, keyword) {
    return new Promise((resolve, reject) => {
        const request = {
            location: new google.maps.LatLng(location.lat, location.lng),
            radius: 5000,
            type: [type],
            keyword: keyword
        };

        AppState.placesService.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            } else {
                resolve([]); // Return empty array if no results
            }
        });
    });
}

// Get place details
function getPlaceDetails(placeId) {
    return new Promise((resolve, reject) => {
        const request = {
            placeId: placeId,
            fields: ['name', 'rating', 'formatted_address', 'photos', 'price_level', 'opening_hours', 'user_ratings_total']
        };

        AppState.placesService.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(place);
            } else {
                reject(new Error('장소 정보를 가져올 수 없습니다'));
            }
        });
    });
}

// Get recommendations based on preferences
async function getRecommendations(location) {
    const recommendations = [];

    // Search for restaurants based on selected cuisines
    const cuisineKeywords = AppState.selectedCuisines.map(id => {
        const cuisine = CONFIG.cuisines.find(c => c.id === id);
        return cuisine ? cuisine.label : '';
    });

    // Search for activities based on selected activities
    const activityKeywords = AppState.selectedActivities.map(id => {
        const activity = CONFIG.activities.find(a => a.id === id);
        return activity ? activity.label : '';
    });

    // Combine searches
    const searchTerms = [...cuisineKeywords, ...activityKeywords];

    // If no preferences selected, use default searches
    if (searchTerms.length === 0) {
        searchTerms.push('맛집', '관광지', '카페');
    }

    // Search for each term
    for (const term of searchTerms.slice(0, 5)) { // Limit to 5 searches
        try {
            const results = await searchNearbyPlaces(location, 'restaurant', term);
            recommendations.push(...results.slice(0, 3)); // Take top 3 from each search
        } catch (error) {
            console.error('Search error:', error);
        }
    }

    // Remove duplicates based on place_id
    const uniqueRecommendations = recommendations.filter((place, index, self) =>
        index === self.findIndex(p => p.place_id === place.place_id)
    );

    return uniqueRecommendations.slice(0, 10); // Return max 10 recommendations
}

// Display route on map
function displayRouteOnMap(directionsResult) {
    AppState.directionsRenderer.setDirections(directionsResult);

    // Fit map bounds to show entire route
    const bounds = new google.maps.LatLngBounds();
    directionsResult.routes[0].legs.forEach(leg => {
        leg.steps.forEach(step => {
            if (step.path) {
                step.path.forEach(point => bounds.extend(point));
            }
        });
    });
    AppState.map.fitBounds(bounds);
}

// Clear all markers from map
function clearMarkers() {
    AppState.markers.forEach(marker => marker.setMap(null));
    AppState.markers = [];
}

// Add markers for recommendations
function addRecommendationMarkers(places) {
    clearMarkers();

    places.forEach((place, index) => {
        const marker = new google.maps.Marker({
            map: AppState.map,
            position: place.geometry.location,
            title: place.name,
            label: {
                text: String(index + 1),
                color: 'white',
                fontWeight: 'bold'
            },
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#ef4444',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2
            }
        });

        // Add info window on click
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 8px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${place.name}</h3>
                    <p style="margin: 0; font-size: 14px; color: #666;">
                        ${place.rating ? `⭐ ${place.rating} (${place.user_ratings_total || 0})` : '평점 없음'}
                    </p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(AppState.map, marker);
        });

        AppState.markers.push(marker);
    });
}
