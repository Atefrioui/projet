// Sample travel destinations data
const travelDestinations = [
    {
        id: 1,
        name: "Paris, France",
        type: "city",
        description: "The city of love and lights",
        price: "From $899",
        image: "img/paris.jpg",
        rating: 4.8
    },
    {
        id: 2,
        name: "Bali, Indonesia",
        type: "island",
        description: "Tropical paradise with beautiful beaches",
        price: "From $1,299",
        image: "img/island.jpg",
        rating: 4.9
    },
    {
        id: 3,
        name: "Tokyo, Japan",
        type: "city",
        description: "Vibrant metropolis blending tradition and modernity",
        price: "From $1,499",
        image: "img/city.jpg",
        rating: 4.7
    },
    {
        id: 4,
        name: "Rome, Italy",
        type: "city",
        description: "Eternal city with ancient history",
        price: "From $1,099",
        image: "img/city2.jpg",
        rating: 4.6
    },
    {
        id: 5,
        name: "Maldives",
        type: "island",
        description: "Luxury overwater bungalows and crystal clear waters",
        price: "From $2,499",
        image: "img/island2.jpg",
        rating: 4.9
    },
    {
        id: 6,
        name: "New York, USA",
        type: "city",
        description: "The city that never sleeps",
        price: "From $799",
        image: "img/new_york.jpg",
        rating: 4.5
    }
];

// Sample travel services data
const travelServices = [
    {
        id: 1,
        name: "Flight Booking",
        type: "flight",
        description: "Book domestic and international flights"
    },
    {
        id: 2,
        name: "Hotel Reservations",
        type: "hotel",
        description: "Find the perfect accommodation"
    },
    {
        id: 3,
        name: "Guided Tours",
        type: "tour",
        description: "Explore with expert guides"
    },
    {
        id: 4,
        name: "Car Rentals",
        type: "car",
        description: "Get around at your own pace"
    },
    {
        id: 5,
        name: "Cruise Packages",
        type: "cruise",
        description: "Luxury cruise vacations"
    },
    {
        id: 6,
        name: "Vacation Packages",
        type: "package",
        description: "All-inclusive deals"
    }
];

// DOM Elements
const destinationsContainer = document.getElementById('destinations-container');
const searchForm = document.getElementById('travel-search-form');
const categoryCards = document.querySelectorAll('.category-card');

// Display all destinations on page load
function displayDestinations(destinations) {
    destinationsContainer.innerHTML = '';
    
    if (destinations.length === 0) {
        destinationsContainer.innerHTML = '<p class="no-destinations">No destinations found matching your criteria.</p>';
        return;
    }
    
    destinations.forEach(destination => {
        const destinationCard = document.createElement('div');
        destinationCard.className = 'destination-card';
        destinationCard.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}" class="destination-image">
            <div class="destination-overlay">
                <h3>${destination.name}</h3>
                <div class="destination-rating">
                    ${'★'.repeat(Math.floor(destination.rating))}${'☆'.repeat(5-Math.floor(destination.rating))}
                </div>
                <div class="destination-price">${destination.price}</div>
                <button class="book-btn" onclick="window.location.href='login.html'">Book Now</button>
            </div>
        `;
        destinationsContainer.appendChild(destinationCard);
    });
}

// Filter destinations based on search
function filterDestinations(tripType, destination) {
    // In a real app, this would filter from an API
    // For demo, we'll just return all destinations
    return travelDestinations;
}

// Filter by category
function filterByCategory(category) {
    // In a real app, this would filter services
    // For demo, we'll just show all destinations
    displayDestinations(travelDestinations);
    
    // Scroll to destinations section
    document.querySelector('.destinations-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayDestinations(travelDestinations);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tripType = document.getElementById('trip-type').value;
    const destination = document.getElementById('destination').value;
    const checkinDate = document.getElementById('checkin-date').value;
    const checkoutDate = document.getElementById('checkout-date').value;
    const travelers = document.getElementById('travelers').value;
    
    // In a real app, you would use these values to filter
    // For demo, we'll just show all destinations
    const filteredDestinations = filterDestinations(tripType, destination);
    displayDestinations(filteredDestinations);
});

// Add click event to category cards
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        filterByCategory(category);
    });
});