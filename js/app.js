// Main Application Logic

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('TravelMate Premium initializing...');

    // Initialize UI components
    initializePreferenceTags();
    initializeButtonGroups();
    setDefaultDate();
    setDefaultTime();

    // Set up form submission
    const tripForm = document.getElementById('tripForm');
    tripForm.addEventListener('submit', handleFormSubmit);

    console.log('Application initialized successfully');
});

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const departureDate = document.getElementById('departureDate').value;
    const departureTime = document.getElementById('departureTime').value;
    const duration = parseInt(document.getElementById('duration').value);

    // Validate inputs
    if (!origin || !destination) {
        showError('출발지와 도착지를 입력해주세요.');
        return;
    }

    if (!departureDate || !departureTime) {
        showError('출발 날짜와 시간을 선택해주세요.');
        return;
    }

    // Show loading
    showLoading(true);
    showEmptyState(false);

    try {
        // Geocode addresses
        console.log('Geocoding addresses...');
        const originLocation = await geocodeAddress(origin);
        const destinationLocation = await geocodeAddress(destination);

        console.log('Origin:', originLocation);
        console.log('Destination:', destinationLocation);

        // Store trip details
        AppState.tripDetails = {
            origin: originLocation,
            destination: destinationLocation,
            departureDate: departureDate,
            departureTime: departureTime,
            duration: duration
        };

        // Create departure time Date object
        const departureDateTime = new Date(`${departureDate}T${departureTime}`);

        // Get directions
        console.log('Getting directions...');
        const directionsResult = await getDirections(
            originLocation,
            destinationLocation,
            departureDateTime
        );

        console.log('Directions result:', directionsResult);

        // Display route on map
        displayRouteOnMap(directionsResult);

        // Parse and display routes
        const routes = parseDirectionsToRoutes(directionsResult);
        console.log('Parsed routes:', routes);
        renderRoutes(routes);

        // Get recommendations near destination
        console.log('Getting recommendations...');
        const recommendations = await getRecommendations(destinationLocation);
        console.log('Recommendations:', recommendations);
        renderRecommendations(recommendations);

        // Add markers for recommendations
        if (recommendations.length > 0) {
            addRecommendationMarkers(recommendations);
        }

        // Hide loading and show success
        showLoading(false);
        showSuccess('경로 검색 완료!');

    } catch (error) {
        console.error('Error:', error);
        showLoading(false);
        showError(error.message || '경로를 찾는 중 오류가 발생했습니다. 다시 시도해주세요.');
        showEmptyState(true);
    }
}

// Export functions for global access
window.initMap = initMap;
window.handleFormSubmit = handleFormSubmit;
