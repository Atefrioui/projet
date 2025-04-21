// Sample education programs data
const educationPrograms = [
    {
        id: 1,
        title: "Computer Science Degree",
        type: "degree",
        subject: "computer-science",
        description: "4-year bachelor's program in computer science with modern curriculum",
        institution: "King Saud University",
        location: "Riyadh",
        duration: "4 years",
        price: "8000$/year",
        image: "img/computer-science.jpg"
    },
    {
        id: 2,
        title: "Business Administration MBA",
        type: "degree",
        subject: "business",
        description: "Master of Business Administration program for professionals",
        institution: "King Fahd University",
        location: "Dhahran",
        duration: "2 years",
        price: "12000$/year",
        image: "img/business.jpg"
    },
    {
        id: 3,
        title: "Web Development Bootcamp",
        type: "course",
        subject: "computer-science",
        description: "Intensive 12-week full-stack web development program",
        institution: "Tech Academy",
        location: "Online",
        duration: "12 weeks",
        price: "2000$",
        image: "img/computer-science2.jpg"
    },
    {
        id: 4,
        title: "English Language Course",
        type: "course",
        subject: "languages",
        description: "Comprehensive English language program from beginner to advanced",
        institution: "Language Institute",
        location: "Jeddah",
        duration: "6 months",
        price: "800$",
        image: "img/languages.jpg"
    },
    {
        id: 5,
        title: "Data Science Workshop",
        type: "workshop",
        subject: "computer-science",
        description: "3-day intensive workshop on data analysis and visualization",
        institution: "Data Science Saudi",
        location: "Riyadh",
        duration: "3 days",
        price: "400$",
        image: "img/Data_Science_Workshop.jpg"
    },
    {
        id: 6,
        title: "Graphic Design Fundamentals",
        type: "course",
        subject: "arts",
        description: "Learn the principles of graphic design and digital tools",
        institution: "Creative Arts Center",
        location: "Online",
        duration: "8 weeks",
        price: "650$",
        image: "img/arts.jpg"
    }
];

// DOM Elements
const programsContainer = document.getElementById('programs-container');
const searchForm = document.getElementById('education-search-form');
const categoryCards = document.querySelectorAll('.category-card');

// Display all programs on page load
function displayPrograms(programs) {
    programsContainer.innerHTML = '';
    
    if (programs.length === 0) {
        programsContainer.innerHTML = '<p class="no-programs">No programs found matching your criteria.</p>';
        return;
    }
    
    programs.forEach(program => {
        const programCard = document.createElement('div');
        programCard.className = 'program-card';
        programCard.innerHTML = `
            <img src="${program.image}" alt="${program.title}" class="program-image">
            <div class="program-content">
                <span class="program-type">${program.type === 'degree' ? 'Degree' : 
                  program.type === 'course' ? 'Course' : 
                  program.type === 'workshop' ? 'Workshop' : 'Program'}</span>
                <h3>${program.title}</h3>
                <p>${program.description}</p>
                
                <div class="program-details">
                    <div class="program-detail">
                        <i class="fas fa-university"></i>
                        ${program.institution}
                    </div>
                    <div class="program-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        ${program.location}
                    </div>
                    <div class="program-detail">
                        <i class="fas fa-clock"></i>
                        <span class="program-duration">${program.duration}</span>
                    </div>
                    <div class="program-detail">
                        <i class="fas fa-tag"></i>
                        <span class="program-price">${program.price}</span>
                    </div>
                </div>
                
                <button class="enroll-btn" onclick="window.location.href='login.html'">Book Now</button>
            </div>
        `;
        programsContainer.appendChild(programCard);
    });
}

// Filter programs based on search
function filterPrograms(educationType, subject, location) {
    return educationPrograms.filter(program => {
        const matchesEducationType = !educationType || program.type === educationType;
        const matchesSubject = !subject || program.subject === subject;
        const matchesLocation = !location || 
            program.location.toLowerCase().includes(location.toLowerCase());
        return matchesEducationType && matchesSubject && matchesLocation;
    });
}

// Filter by category
function filterByCategory(subject) {
    const filteredPrograms = educationPrograms.filter(program => program.subject === subject);
    displayPrograms(filteredPrograms);
    
    // Scroll to programs section
    document.querySelector('.programs-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayPrograms(educationPrograms);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const educationType = document.getElementById('education-type').value;
    const subject = document.getElementById('subject').value;
    const location = document.getElementById('location').value;
    
    const filteredPrograms = filterPrograms(educationType, subject, location);
    displayPrograms(filteredPrograms);
});

// Add click event to category cards
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const subject = card.getAttribute('data-category');
        filterByCategory(subject);
    });
});