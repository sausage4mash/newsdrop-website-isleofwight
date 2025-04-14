function getLoadingPlaceholders() {
    return `
        <div class="animate-pulse">
            <div class="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div class="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div class="h-24 bg-gray-300 rounded mb-3"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div class="animate-pulse">
            <div class="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div class="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div class="h-24 bg-gray-300 rounded mb-3"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    `;
}

function loadNewsArticles() {
    console.log("📰 loadNewsArticles() called");

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = getLoadingPlaceholders();

    fetch('stories/index.json')
        .then(response => {
            console.log("📄 index.json response:", response);
            if (!response.ok) throw new Error('Failed to load index.json');
            return response.json();
        })
        .then(fileList => {
            console.log("📁 Article file list loaded:", fileList);

            const articlePromises = fileList.map(filename =>
                fetch(`stories/${filename}`)
                    .then(res => {
                        console.log(`📦 Fetching ${filename}:`, res);
                        if (!res.ok) throw new Error(`Failed to load ${filename}`);
                        return res.json();
                    })
                    .then(data => {
                        console.log(`✅ Parsed JSON from ${filename}`, data);
                        return { ...data, id: filename.replace('.json', '') };
                    })
            );

            return Promise.all(articlePromises);
        })
        .then(articles => {
            console.log("✅ All articles loaded and parsed:", articles);

            // Sort newest to oldest
            articles.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));

            renderNewsArticles(articles);

            window.newsState = {
                articles: articles,
                displayedArticles: articles,
                currentFilter: 'all',
                currentSort: 'newest'
            };
            
            // Setup filter and sort handlers
            setupFilterAndSort();
        })
        .catch(error => {
            console.error('❌ Error loading articles:', error);
            newsContainer.innerHTML = `
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 class="text-lg font-medium text-red-600">Failed to load articles</h3>
                    <p class="text-gray-500 mt-2">${error.message}</p>
                </div>
            `;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNewsArticles();
    setupMobileMenu();
    setupSubscribeForm();
});

function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
        });
    }
}

function setupFilterAndSort() {
    const filterSelect = document.getElementById('filter-select');
    const sortSelect = document.getElementById('sort-select');
    
    if (filterSelect && sortSelect) {
        filterSelect.addEventListener('change', updateArticleDisplay);
        sortSelect.addEventListener('change', updateArticleDisplay);
    }
}

function updateArticleDisplay() {
    const { articles } = window.newsState;
    if (!articles) return;
    
    const filterValue = document.getElementById('filter-select').value;
    const sortValue = document.getElementById('sort-select').value;
    
    // Filter articles
    let filteredArticles = articles;
    if (filterValue !== 'all') {
        filteredArticles = articles.filter(article => article.tag === filterValue);
    }
    
    // Sort articles
    filteredArticles.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    // Update state and render
    window.newsState.displayedArticles = filteredArticles;
    window.newsState.currentFilter = filterValue;
    window.newsState.currentSort = sortValue;
    
    renderNewsArticles(filteredArticles);
}

function renderNewsArticles(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // clear existing
    
    if (articles.length === 0) {
        newsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
                <p class="text-gray-700">No articles found with the selected filter.</p>
            </div>
        `;
        return;
    }

    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'bg-white rounded-lg shadow-md p-6 article-card fade-in';

        // Extract the HTML filename from the article id
        const htmlFilename = `${article.id}.html`;

        articleCard.innerHTML = `
            <div class="mb-2">
                <span class="tag-pill tag-${article.tag}">${article.tag}</span>
                <span class="text-sm text-gray-500 ml-2">${article.date} ${article.time}</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">${article.title}</h2>
            <p class="text-gray-700 mb-4">${stripHTML(article.content).slice(0, 150)}...</p>
            <a href="stories/${htmlFilename}" class="text-blue-600 hover:underline font-medium">Read More →</a>
        `;

        newsContainer.appendChild(articleCard);
    });
}

function setupSubscribeForm() {
    const subscribeForm = document.getElementById('subscribe-form');
    if (!subscribeForm) return;
    
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
    if (!subscribeMessage) return;

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

function stripHTML(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}