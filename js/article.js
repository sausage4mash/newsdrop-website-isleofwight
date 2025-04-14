// News Drop Isle of Wight - Article Page JavaScript (HTML-based)

document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        loadArticle(articleId);
    } else {
        displayError('Article not found. Please try again or return to the homepage.');
    }

    setupSubscribeForm();
});

function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('open');
    });
}

function loadArticle(articleId) {
    const articleContainer = document.getElementById('article-container');
    const relatedArticlesContainer = document.getElementById('related-articles');

    document.title = `Loading Article... - News Drop Isle of Wight`;

    // Now loading HTML file instead of JSON
    fetch(`stories/${articleId}.html`)
        .then(response => {
            if (!response.ok) throw new Error('Article not found');
            return response.text(); // Get HTML content as text
        })
        .then(htmlContent => {
            // Insert the HTML content directly into the container
            articleContainer.innerHTML = htmlContent;
            
            // Extract title from HTML for page title
            const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
            const title = titleMatch ? titleMatch[1] : 'Article';
            document.title = `${title} - News Drop Isle of Wight`;
            
            // You could also load related articles here if needed
            loadRelatedArticles(articleId);
        })
        .catch(error => {
            console.error(error);
            displayError('Article not found. Please try again or return to the homepage.');
        });
}

function loadRelatedArticles(currentArticleId) {
    const relatedArticlesContainer = document.getElementById('related-articles');
    
    // Load index to find other articles
    fetch('stories/index.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load related articles');
            return response.json();
        })
        .then(fileList => {
            // Filter out current article and get up to 3 related articles
            const otherArticles = fileList
                .filter(filename => !filename.includes(currentArticleId))
                .slice(0, 3);
                
            if (otherArticles.length > 0) {
                relatedArticlesContainer.innerHTML = '<h3 class="text-xl font-bold mb-4">Related Stories</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>';
                const relatedGrid = relatedArticlesContainer.querySelector('.grid');
                
                otherArticles.forEach(filename => {
                    // Extract basic info from filename
                    const parts = filename.replace('.json', '').split('-');
                    const id = filename.replace('.json', '');
                    const date = `${parts[2]}-${parts[1]}-${parts[0].slice(0, 4)}`;
                    const tag = parts[3];
                    
                    // Create a placeholder card
                    const card = document.createElement('div');
                    card.className = 'bg-white rounded-lg shadow p-4';
                    card.innerHTML = `
                        <div class="mb-2">
                            <span class="tag-pill tag-${tag}">${tag}</span>
                        </div>
                        <h4 class="font-semibold mb-2">Related Story</h4>
                        <a href="${id}.html" class="text-blue-600 hover:underline">Read more →</a>
                    `;
                    relatedGrid.appendChild(card);
                });
            } else {
                relatedArticlesContainer.innerHTML = '<p class="text-sm text-gray-500">More local stories coming soon.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading related articles:', error);
            relatedArticlesContainer.innerHTML = '<p class="text-sm text-gray-500">More local stories coming soon.</p>';
        });
}

function displayError(message) {
    const articleContainer = document.getElementById('article-container');

    articleContainer.innerHTML = `
        <div class="text-center py-12">
            <svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="mt-4 text-xl font-bold text-gray-800">${message}</h2>
            <div class="mt-6">
                <a href="index.html" class="inline-block bg-red-800 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                    Return to Homepage
                </a>
            </div>
        </div>
    `;

    document.querySelector('.mt-8').classList.add('hidden');
    document.title = `Article Not Found - News Drop Isle of Wight`;
}

function setupSubscribeForm() {
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeMessage = document.getElementById('subscribe-message');

    subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
            showSubscribeMessage('Please enter a valid email address.', false);
            return;
        }

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

        setTimeout(() => {
            console.log('Email subscription:', email);
            subscribeForm.reset();
            subscribeButton.disabled = false;
            subscribeButton.textContent = originalButtonText;
            showSubscribeMessage('Thank you for subscribing! You will now receive our latest news updates.', true);
        }, 1500);
    });
}

function showSubscribeMessage(message, isSuccess) {
    const subscribeMessage = document.getElementById('subscribe-message');

    subscribeMessage.textContent = message;
    subscribeMessage.className = isSuccess ? 'mt-3 text-sm success-message' : 'mt-3 text-sm error-message';
    subscribeMessage.classList.remove('hidden');

    setTimeout(() => {
        subscribeMessage.classList.add('hidden');
    }, 5000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}