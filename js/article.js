// News Drop Isle of Wight - Article Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    setupMobileMenu();
    
    // Get article ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        // Load the article content
        loadArticle(articleId);
    } else {
        // No article ID provided, show error
        displayError('Article not found. Please try again or return to the homepage.');
    }
    
    // Setup subscribe form
    setupSubscribeForm();
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
 * Load article content based on ID
 */
function loadArticle(articleId) {
    const articleContainer = document.getElementById('article-container');
    const relatedArticlesContainer = document.getElementById('related-articles');
    
    // Set page title based on article
    document.title = `Loading Article... - News Drop Isle of Wight`;
    
    // Simulate fetching article content from server
    setTimeout(() => {
        // In a real application, you would fetch this data from an API or server
        // The article ID format is: time-date-tag.html (e.g. 1030-2025-04-12-politics.html)
        
        // Parse article ID for its components
        const [time, date, tag] = articleId.split('-');
        
        // Find article in our dataset (in a real app, this would be fetched from a server)
        const articles = getArticlesData();
        const article = articles.find(a => a.id === articleId);
        
        if (article) {
            // Update page title
            document.title = `${article.headline} - News Drop Isle of Wight`;
            
            // Render article content
            articleContainer.innerHTML = `
                <div class="mb-4">
                    <span class="tag-pill tag-${article.tag}">${article.tag}</span>
                    <span class="text-sm text-gray-500 ml-2">${formatDate(article.date)} | ${article.time}</span>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-6">${article.headline}</h1>
                ${article.image ? `
                <div class="mb-6">
                    <img src="${article.image}" alt="${article.headline}" class="w-full h-64 object-cover rounded">
                    <p class="text-sm text-gray-500 mt-2">Image caption: View of ${article.tag === 'politics' ? 'Newport town center' : 
                                                                              article.tag === 'travel' ? 'the Isle of Wight ferry' :
                                                                              article.tag === 'health' ? 'St. Mary\'s Hospital' :
                                                                              article.tag === 'environment' ? 'coastal protection works' :
                                                                              article.tag === 'crime' ? 'Ryde Esplanade' :
                                                                              'Isle of Wight'}</p>
                </div>
                ` : ''}
                <div class="prose max-w-none">
                    ${generateFullArticleContent(article)}
                </div>
                <div class="flex items-center mt-8 pt-6 border-t border-gray-200">
                    <div class="mr-4">
                        <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <p class="font-medium">By News Drop Reporter</p>
                        <p class="text-sm text-gray-500">Local Journalist</p>
                    </div>
                </div>
                <div class="mt-6 flex space-x-4">
                    <button class="flex items-center text-gray-700 hover:text-blue-600">
                        <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                    </button>
                    <button class="flex items-center text-gray-700 hover:text-blue-600">
                        <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
                        </svg>
                        Report
                    </button>
                </div>
            `;
            
            // Find related articles (same tag or recent)
            const relatedArticles = articles
                .filter(a => a.id !== articleId && (a.tag === article.tag || new Date(a.date) >= new Date(article.date)))
                .slice(0, 2);
            
            // Render related articles
            if (relatedArticles.length > 0) {
                let relatedHTML = '';
                
                relatedArticles.forEach(relatedArticle => {
                    relatedHTML += `
                        <a href="article.html?id=${relatedArticle.id}" class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                            <span class="tag-pill tag-${relatedArticle.tag} mb-2">${relatedArticle.tag}</span>
                            <h3 class="font-bold text-gray-800 mb-2">${relatedArticle.headline}</h3>
                            <p class="text-sm text-gray-500">${formatDate(relatedArticle.date)}</p>
                        </a>
                    `;
                });
                
                relatedArticlesContainer.innerHTML = relatedHTML;
            } else {
                document.querySelector('.mt-8').classList.add('hidden');
            }
        } else {
            displayError('Article not found. Please try again or return to the homepage.');
        }
    }, 1000);
}

/**
 * Generate full article content
 */
function generateFullArticleContent(article) {
    // In a real application, this would be fetched from a CMS or database
    // Here we generate some placeholder content based on the article metadata
    
    const paragraphs = [];
    
    // Introduction paragraph
    paragraphs.push(`<p>${article.excerpt}</p>`);
    
    // Generate additional paragraphs based on the article tag
    if (article.tag === 'politics') {
        paragraphs.push(`
            <p>The Isle of Wight Council has unveiled ambitious new plans for the redevelopment of Newport town center, following months of consultation with local residents and businesses. The proposed changes aim to modernize the area while preserving its historic character.</p>
            <p>Council leader Sarah Johnson stated, "These plans represent a significant investment in the future of Newport as the island's commercial and cultural hub. We've carefully balanced the need for modern facilities with respect for our heritage."</p>
            <p>The development will focus on creating more pedestrianized areas, improving public transport connections, and supporting local businesses with dedicated retail zones. Environmental considerations have been central to the planning process, with new green spaces and sustainable building practices prioritized.</p>
            <p>Local business owners have responded positively to the initial proposals, although some concerns have been raised about disruption during the construction phase. The council has committed to a phased approach to minimize impact on daily life and commerce.</p>
            <p>Public exhibitions of the plans will be held at the Guildhall over the next two weeks, with council representatives available to answer questions and collect feedback before the final proposals are submitted for approval.</p>
        `);
    } else if (article.tag === 'travel') {
        paragraphs.push(`
            <p>Isle of Wight ferry operators have announced an expanded summer schedule for 2025, with additional crossings and new routes connecting the island to mainland ports. The changes come in response to growing visitor numbers and feedback from island residents.</p>
            <p>Red Funnel and Wightlink, the island's main ferry providers, have coordinated their expanded services to offer greater flexibility for travelers. The new schedule includes late-night crossings on weekends and additional early morning services for commuters.</p>
            <p>"We've seen consistent growth in passenger numbers over the past three years," explained James Porter, operations director at Wightlink. "This expanded schedule allows us to better serve both tourists and island residents, particularly during the peak summer months."</p>
            <p>A new high-speed service will also be trialed between Ryde and Portsmouth, reducing crossing times to under 15 minutes. If successful, this could become a permanent addition to the route options.</p>
            <p>The expanded services will run from May through September, with the possibility of extending some additional crossings year-round if demand proves sufficient.</p>
        `);
    } else if (article.tag === 'environment') {
        paragraphs.push(`
            <p>The Isle of Wight has secured an additional £2 million in funding for coastal erosion protection schemes, focusing on vulnerable areas along the island's southern and eastern shorelines. The announcement comes as part of a wider government initiative to address the impacts of climate change on coastal communities.</p>
            <p>Areas including Ventnor, Shanklin, and Bembridge will benefit from the funding, which will support the construction of new sea defenses and the reinforcement of existing structures. Environmental engineers have already begun surveying the most critical locations.</p>
            <p>"This is welcome news for communities that have lived with the threat of coastal erosion for years," said Dr. Emma Clarke, an environmental scientist at the Isle of Wight Council. "These funds will allow us to implement long-term protection measures rather than just emergency responses."</p>
            <p>The plans include nature-based solutions alongside traditional engineering approaches, with salt marshes and managed realignment schemes being considered for appropriate locations. These approaches aim to work with natural processes rather than against them.</p>
            <p>Work is expected to commence this autumn, with community consultations planned throughout the summer to ensure local knowledge informs the final designs.</p>
        `);
    } else if (article.tag === 'health') {
        paragraphs.push(`
            <p>St. Mary's Hospital in Newport has officially opened its new specialized treatment wing following two years of construction and a £12 million investment. The facility represents the largest expansion of healthcare services on the island in over a decade.</p>
            <p>The new wing houses departments for cardiology, oncology, and neurology, reducing the need for island residents to travel to mainland hospitals for specialized care. State-of-the-art equipment has been installed throughout the facility, including a new MRI scanner and dedicated treatment rooms.</p>
            <p>"This development transforms what we can offer to island residents," explained Dr. Robert Patel, medical director at St. Mary's. "Many patients who previously had to make difficult journeys to Southampton or Portsmouth can now receive their treatment here on the island."</p>
            <p>The expansion has created 45 new healthcare jobs and includes improved facilities for staff training and development. Additional parking and public transport connections have also been integrated into the design to improve accessibility.</p>
            <p>An open day is planned for this weekend, allowing members of the public to tour the new facilities and speak with healthcare professionals about the expanded services now available.</p>
        `);
    } else if (article.tag === 'crime') {
        paragraphs.push(`
            <p>Isle of Wight Police are appealing for witnesses following an incident near Ryde Esplanade on Tuesday evening. Officers were called to the scene at approximately 8:30 PM after reports of a disturbance involving several individuals.</p>
            <p>Detective Inspector Mark Williams said, "We're particularly interested in speaking with anyone who was in the vicinity of the Esplanade between 8:00 PM and 9:00 PM on Tuesday. Even small details could prove significant to our investigation."</p>
            <p>The area was temporarily cordoned off while forensic examinations took place, but has since reopened to the public. Police have increased patrols in the area to provide reassurance to local residents and businesses.</p>
            <p>Authorities have not released specific details about the nature of the incident but have confirmed that no serious injuries were reported. CCTV footage from surrounding businesses is being reviewed as part of the ongoing investigation.</p>
            <p>Anyone with information is urged to contact Isle of Wight Police on 101, quoting reference number IOW-20250410-284, or to call Crimestoppers anonymously on 0800 555 111.</p>
        `);
    } else if (article.tag === 'business') {
        paragraphs.push(`
            <p>TideLink Systems, an Isle of Wight-based technology company specializing in marine data systems, has secured £1.5 million in investment to expand its operations and create new jobs on the island. The funding comes from a consortium of tech investors and will support the development of new products and services.</p>
            <p>Founded in 2021 by island residents James Harper and Sophia Chen, TideLink has developed innovative monitoring systems that are already being used by maritime organizations across the UK and northern Europe. The company currently employs 15 people at its headquarters in East Cowes.</p>
            <p>"This investment allows us to accelerate our growth plans significantly," explained Harper. "We'll be expanding our research and development team and scaling up production to meet growing demand for our systems from international markets."</p>
            <p>The expansion is expected to create at least 20 new jobs over the next two years, ranging from highly specialized engineering roles to production and administrative positions. The company has committed to a "local first" hiring policy, working with Isle of Wight College to develop training programs for potential employees.</p>
            <p>Bob Thompson, economic development officer for the Isle of Wight Council, welcomed the news: "TideLink's success demonstrates the island's potential as a hub for innovative tech businesses. Their growth not only creates direct employment but strengthens our wider maritime and technology sectors."</p>
        `);
    } else {
        // Default content for other tags
        paragraphs.push(`
            <p>Further details about this story are developing, and our reporters are gathering additional information from local sources. The News Drop team is committed to providing accurate and timely updates on all matters affecting the Isle of Wight community.</p>
            <p>Local residents with knowledge of this situation are encouraged to contact our newsroom with any relevant information that might help inform our coverage.</p>
            <p>Stay tuned to News Drop Isle of Wight for the latest developments on this and other important local stories.</p>
        `);
    }
    
    // Return concatenated paragraphs
    return paragraphs.join('');
}

/**
 * Display error message
 */
function displayError(message) {
    const articleContainer = document.getElementById('article-container');
    
    articleContainer.innerHTML = `
        <div class="text-center py-12">
            <svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="mt-4 text-xl font-bold text-gray-800">${message}</h2>
            <div class="mt-6">
                <a href="index.html" class="inline-block bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                    Return to Homepage
                </a>
            </div>
        </div>
    `;
    
    // Hide related articles section
    document.querySelector('.mt-8').classList.add('hidden');
    
    // Update page title
    document.title = `Article Not Found - News Drop Isle of Wight`;
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
 * Get article data
 * In a real application, this would be fetched from a server
 */
function getArticlesData() {
    return [
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
}