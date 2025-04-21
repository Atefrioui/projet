// Sample health services data
const healthServices = [
    {
        id: 1,
        name: "Dr. Ahmed Mohammed",
        type: "doctor",
        specialty: "Cardiology",
        description: "Consultant Cardiologist with 15 years of experience",
        location: "Al Nahdi Medical Center, Riyadh",
        rating: 4.8,
        image: "img/photo2.png",
        available: "Mon-Fri, 9AM-5PM"
    },
    {
        id: 2,
        name: "Al Salam Hospital",
        type: "hospital",
        specialty: "Multi-specialty",
        description: "300-bed hospital with emergency services",
        location: "King Fahd Road, Jeddah",
        rating: 4.5,
        image: "img/Al_Salam_Hospital.jpg",
        available: "24/7"
    },
    {
        id: 3,
        name: "Al Dawaa Pharmacies",
        type: "pharmacy",
        specialty: "General",
        description: "Chain of pharmacies with delivery service",
        location: "Multiple branches",
        rating: 4.3,
        image: "img/Al_Dawaa_Pharmacie.png",
        available: "8AM-12AM"
    },
    {
        id: 4,
        name: "Dr. Sara Abdullah",
        type: "doctor",
        specialty: "Dermatology",
        description: "Specialist in cosmetic and medical dermatology",
        location: "Al Habib Clinic, Khobar",
        rating: 4.9,
        image: "img/photo5.png",
        available: "Sun-Thu, 10AM-7PM"
    },
    {
        id: 5,
        name: "Diagnostic Lab Center",
        type: "lab",
        specialty: "Pathology",
        description: "Complete diagnostic services with quick results",
        location: "Olaya Street, Riyadh",
        rating: 4.4,
        image: "img/Diagnostic_Lab_Center.png",
        available: "Sat-Thu, 7AM-10PM"
    },
    {
        id: 6,
        name: "Al Shifa Medical Complex",
        type: "clinic",
        specialty: "Multi-specialty",
        description: "Comprehensive outpatient services",
        location: "Prince Sultan Road, Dammam",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        available: "Sat-Thu, 8AM-11PM"
    }
];

// DOM Elements
const servicesContainer = document.getElementById('services-container');
const searchForm = document.getElementById('health-search-form');
const categoryCards = document.querySelectorAll('.category-card');

// Display all services on page load
function displayServices(services) {
    servicesContainer.innerHTML = '';
    
    if (services.length === 0) {
        servicesContainer.innerHTML = '<p class="no-services">No services found matching your criteria.</p>';
        return;
    }
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <img src="${service.image}" alt="${service.name}" class="service-image">
            <div class="service-content">
                <span class="service-type">${service.type === 'doctor' ? service.specialty : service.type}</span>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                
                <div class="service-details">
                    <div class="service-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        ${service.location}
                    </div>
                    <div class="service-detail">
                        <i class="fas fa-clock"></i>
                        ${service.available}
                    </div>
                    <div class="service-detail">
                        <div class="service-rating">
                            <i class="fas fa-star"></i>
                            ${service.rating}
                        </div>
                    </div>
                </div>
                
                <button class="book-btn" onclick="window.location.href='login.html'">Book Appointment</button>
            </div>
        `;
        servicesContainer.appendChild(serviceCard);
    });
}

// Filter services based on search
function filterServices(serviceType, specialty, location) {
    return healthServices.filter(service => {
        const matchesServiceType = !serviceType || service.type === serviceType;
        const matchesSpecialty = !specialty || 
            (service.specialty && service.specialty.toLowerCase() === specialty.toLowerCase());
        const matchesLocation = !location || 
            service.location.toLowerCase().includes(location.toLowerCase());
        return matchesServiceType && matchesSpecialty && matchesLocation;
    });
}

// Filter by category
function filterByCategory(serviceType) {
    const filteredServices = healthServices.filter(service => service.type === serviceType);
    displayServices(filteredServices);
    
    // Scroll to services section
    document.querySelector('.services-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayServices(healthServices);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const serviceType = document.getElementById('service-type').value;
    const specialty = document.getElementById('specialty').value;
    const location = document.getElementById('location').value;
    
    const filteredServices = filterServices(serviceType, specialty, location);
    displayServices(filteredServices);
});

// Add click event to category cards
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        filterByCategory(serviceType);
    });
});