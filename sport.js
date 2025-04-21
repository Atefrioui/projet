// Sample sports events data
const sportsEvents = [
    {
        id: 1,
        title: "Football Championship",
        sport: "football",
        description: "Final match of the regional football championship",
        date: "2025-06-15",
        time: "19:00",
        location: "City Stadium, Riyadh",
        price: "75$",
        image: "img/football.jpg",
        type: "match"
    },
    {
        id: 2,
        title: "Basketball Tournament",
        sport: "basketball",
        description: "Annual inter-city basketball tournament",
        date: "2025-07-10",
        time: "18:30",
        location: "Sports Hall, Jeddah",
        price: "50$",
        image: "img/basketball.jpg",
        type: "tournament"
    },
    {
        id: 3,
        title: "Tennis Open",
        sport: "tennis",
        description: "Professional tennis matches with international players",
        date: "2025-08-05",
        time: "14:00",
        location: "Tennis Club, Dammam",
        price: "100$",
        image: "img/tennis.jpg",
        type: "match"
    },
    {
        id: 4,
        title: "Volleyball League",
        sport: "volleyball",
        description: "National volleyball league matches",
        date: "2025-06-22",
        time: "20:00",
        location: "Indoor Arena, Khobar",
        price: "40$",
        image: "img/volleyball.jpg",
        type: "match"
    },
    {
        id: 5,
        title: "Swimming Competition",
        sport: "swimming",
        description: "Regional swimming championship for all ages",
        date: "2025-09-12",
        time: "09:00",
        location: "Olympic Pool, Riyadh",
        price: "60$",
        image: "img/swimming.jpg",
        type: "competition"
    },
    {
        id: 6,
        title: "Table Tennis Open",
        sport: "table-tennis",
        description: "Open tournament for table tennis enthusiasts",
        date: "2025-07-25",
        time: "16:00",
        location: "Sports Center, Jeddah",
        price: "30$",
        image: "img/table-tennis.jpg",
        type: "tournament"
    }
];

// DOM Elements
const eventsContainer = document.getElementById('events-container');
const searchForm = document.getElementById('sports-search-form');
const categoryCards = document.querySelectorAll('.category-card');

// Display all events on page load
function displayEvents(events) {
    eventsContainer.innerHTML = '';
    
    if (events.length === 0) {
        eventsContainer.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
        return;
    }
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <span class="event-sport">${event.sport}</span>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-calendar-alt"></i>
                        ${event.date} at ${event.time}
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </div>
                </div>
                
                <div class="event-price">${event.price}</div>
                <button class="book-btn" onclick="window.location.href='login.html'">Book Now</button>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Filter events based on search
function filterEvents(sportType, location) {
    return sportsEvents.filter(event => {
        const matchesSport = !sportType || event.sport === sportType;
        const matchesLocation = !location || 
            event.location.toLowerCase().includes(location.toLowerCase());
        return matchesSport && matchesLocation;
    });
}

// Filter by category
function filterByCategory(sport) {
    const filteredEvents = sportsEvents.filter(event => event.sport === sport);
    displayEvents(filteredEvents);
    
    // Scroll to events section
    document.querySelector('.events-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayEvents(sportsEvents);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const sportType = document.getElementById('sport-type').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('event-date').value;
    
    let filteredEvents = filterEvents(sportType, location);
    
    if (date) {
        filteredEvents = filteredEvents.filter(event => event.date === date);
    }
    
    displayEvents(filteredEvents);
});

// Add click event to category cards
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const sport = card.getAttribute('data-sport');
        filterByCategory(sport);
    });
});