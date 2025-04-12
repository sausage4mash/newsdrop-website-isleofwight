// News Drop Isle of Wight - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    setupMobileMenu();
    
    // Load and display news articles
    loadNewsArticles();
    
    // Setup filter and sort functionality
    setupFiltersAndSort();
    
    // Setup subscribe form
    setupSubscribeForm();
    
    // Setup search functionality
    setupSearch();
});

/**
 * Setup mobile menu toggle functionality
 */
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('open');
    });
}

/**
 * Load news articles from simulated API
 */
function loadNewsArticles() {
    const newsContainer = document.getElementById('news-container');
    
    // Simulate loading state
    newsContainer.innerHTML = getLoadingPlaceholders();
    
    // Simulate API fetch delay
    setTimeout(() => {
        // In a real application, you would fetch this data from an API or server
        const articles = [
            {
                id: '1030-2025-04-12-politics',
                tag: 'politics',
                date: '2025-04-12',
                time: '10:30',
                headline: 'Isle of Wight Council Announces New Development Plans for Newport',
                excerpt: 'New plans revealed for the redevelopment of Newport town center, with focus on sustainable infrastructure and local businesses.',
                image: 'images/articles/newport-development.jpg'
            },
            {
                id: '0845-2025-04-12-travel',
                tag: 'travel',
                date: '2025-04-12',
                time: '08:45',
                headline: 'Ferry Companies Introduce New Summer Schedule with Additional Crossings',
                excerpt: 'Increased ferry services announced for the summer season, with new routes connecting the island to Portsmouth and Southampton.',
                image: 'images/articles/ferry-crossing.jpg'
            },
            {
                id: '1620-2025-04-11-environment',
                tag: 'environment',
                date: '2025-04-11',
                time: '16:20',
                headline: 'Coastal Erosion Protection Scheme Receives £2M Funding Boost',
                excerpt: 'Government announces additional funding for coastal protection works along vulnerable shorelines of the Isle of Wight.',
                image: null
            },
            {
                id: '0930-2025-04-11-health',
                tag: 'health',
                date: '2025-04-11',
                time: '09:30',
                headline: 'St. Mary\'s Hospital Opens New Specialized Treatment Wing',
                excerpt: 'The new specialized treatment center aims to reduce waiting times and improve healthcare services for island residents.',
                image: 'images/articles/hospital-wing.jpg'
            },
            {
                id: '1415-2025-04-10-crime',
                tag: 'crime',
                date: '2025-04-10',
                time: '14:15',
                headline: 'Police Appeal for Witnesses Following Incident in Ryde',
                excerpt: 'Isle of Wight Police are seeking information regarding an incident that occurred near Ryde Esplanade on Tuesday evening.',
                image: null
            },
            {
                id: '1130-2025-04-10-business',
                tag: 'business',
                date: '2025-04-10',
                time: '11:30',
                headline: 'Local Tech Startup Secures Major Investment for Expansion',
                excerpt: 'An Isle of Wight-based technology company has secured £1.5 million in funding to expand operations and create new jobs.',
                image: 'images/articles/tech-startup.jpg'
            }
        ];
        
        renderNewsArticles(articles);
        
        // Setup current filter and sort state
        window.newsState = {
            articles: articles,
            displayedArticles: articles,
            currentFilter: 'all',
            currentSort: 'newest'
        };
    }, 1000);
}

/**
 * Generate loading placeholders
 */
function getLoadingPlaceholders() {
    let placeholders = '';
    for (let i = 0; i < 3; i++) {
        placeholders += `
            <div class="animate-pulse bg-white rounded-lg shadow-md p-4">
                <div class="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div class="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div class="h-24 bg-gray-300 rounded mb-3"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        `;
    }
    return placeholders;
}

/**
 * Render news articles to the DOM
 */
function renderNewsArticles(articles) {
    const newsContainer = document.getElementById('news-container');
    
    if (articles.length === 0) {
        newsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="mt-2 text-lg font-medium text-gray-900">No articles found</h3>
                <p class="mt-1 text-gray-500">Try changing your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    let articlesHTML = '';
    
    articles.forEach((article, index) => {
        articlesHTML += `
            <article class="bg-white rounded-lg shadow-md overflow-hidden article-card fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-3">
                        <span class="tag-pill tag-${article.tag}">${article.tag}</span>
                        <span class="text-sm text-gray-500">${formatDate(article.date)} | ${article.time}</span>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-3">
                        <a href="article.html?id=${article.id}" class="hover:text-blue-700">${article.headline}</a>
                    </h2>
                    ${article.image ? `
                    <div class="mb-4">
                        <img src="${article.image}" alt="${article.headline}" class="w-full h-48 object-cover rounded">
                    </div>
                    ` : ''}
                    <p class="text-gray-600 mb-4">${article.excerpt}</p>
                    <a href="article.html?id=${article.id}" class="inline-block text-blue-700 hover:text-blue-900 font-medium">
                        Read full story →
                    </a>
                </div>
            </article>
        `;
    });
    
    newsContainer.innerHTML = articlesHTML;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}

/**
 * Setup filter and sort functionality
 */
function setupFiltersAndSort() {
    const filterSelect = document.getElementById('filter-select');
    const sortSelect = document.getElementById('sort-select');
    
    filterSelect.addEventListener('change', function() {
        if (!window.newsState) return;
        
        window.newsState.currentFilter = this.value;
        applyFiltersAndSort();
    });
    
    sortSelect.addEventListener('change', function() {
        if (!window.newsState) return;
        
        window.newsState.currentSort = this.value;
        applyFiltersAndSort();
    });
}

/**
 * Apply current filters and sort to articles
 */
function applyFiltersAndSort() {
    const { articles, currentFilter, currentSort } = window.newsState;
    
    // Apply filter
    let filteredArticles = articles;
    if (currentFilter !== 'all') {
        filteredArticles = articles.filter(article => article.tag === currentFilter);
    }
    
    // Apply sort
    let sortedArticles = [...filteredArticles];
    if (currentSort === 'newest') {
        sortedArticles.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateB - dateA;
        });
    } else if (currentSort === 'oldest') {
        sortedArticles.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });
    }
    
    // Update displayed articles
    window.newsState.displayedArticles = sortedArticles;
    renderNewsArticles(sortedArticles);
}

/**
 * Setup subscribe form functionality
 */
function setupSubscribeForm() {
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeMessage = document.getElementById('subscribe-message');
    
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showSubscribeMessage('Please enter a valid email address.', false);
            return;
        }
        
        // Simulate form submission with loading state
        const subscribeButton = document.getElementById('subscribe-button');
        const originalButtonText = subscribeButton.textContent;
        
        subscribeButton.disabled = true;
        subscribeButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Subscribing...
        `;
        
        // Simulate API call
        setTimeout(() => {
            // In a real application, you would send this to a server
            console.log('Email subscription:', email);
            
            // Simulate saving to a text file (would require backend in reality)
            saveEmailToSimulatedFile(email);
            
            // Reset form and show success message
            subscribeForm.reset();
            subscribeButton.disabled = false;
            subscribeButton.textContent = originalButtonText;
            
            showSubscribeMessage('Thank you for subscribing! You will now receive our latest news updates.', true);
        }, 1500);
    });
}

/**
 * Simulate saving email to a text file
 * Note: This would require a backend in reality
 */
function saveEmailToSimulatedFile(email) {
    // In a real application, this would be handled by a server-side script
    // For demonstration purposes, we're just logging to console
    console.log(`Email ${email} would be saved to subscribers.txt in a real application`);
}

/**
 * Show subscribe form message
 */
function showSubscribeMessage(message, isSuccess) {
    const subscribeMessage = document.getElementById('subscribe-message');
    
    subscribeMessage.textContent = message;
    subscribeMessage.className = isSuccess ? 'mt-3 text-sm success-message' : 'mt-3 text-sm error-message';
    subscribeMessage.classList.remove('hidden');
    
    // Hide message after a delay
    setTimeout(() => {
        subscribeMessage.classList.add('hidden');
    }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        if (!window.newsState) return;
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // If search is empty, reset to current filter/sort
            applyFiltersAndSort();
            return;
        }
        
        // Search through articles based on current filter
        const { articles, currentFilter } = window.newsState;
        
        // First apply current category filter if any
        let filteredArticles = articles;
        if (currentFilter !== 'all') {
            filteredArticles = articles.filter(article => article.tag === currentFilter);
        }
        
        // Then apply search term
        const searchResults = filteredArticles.filter(article => {
            return (
                article.headline.toLowerCase().includes(searchTerm) || 
                article.excerpt.toLowerCase().includes(searchTerm) ||
                article.tag.toLowerCase().includes(searchTerm)
            );
        });
        
        // Update displayed articles with search results
        window.newsState.displayedArticles = searchResults;
        renderNewsArticles(searchResults);
    }
    
    // Search when button is clicked
    searchButton.addEventListener('click', performSearch);
    
    // Also search when Enter key is pressed in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}