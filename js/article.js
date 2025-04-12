// News Drop Isle of Wight - Article Page JavaScript (JSON-based)

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

    fetch(`stories/${articleId}.json`)
        .then(response => {
            if (!response.ok) throw new Error('Article not found');
            return response.json();
        })
        .then(article => {
            document.title = `${article.title} - News Drop Isle of Wight`;

            articleContainer.innerHTML = `
                <div class="mb-4">
                    <span class="tag-pill tag-${article.tag}">${article.tag}</span>
                    <span class="text-sm text-gray-500 ml-2">${formatDate(article.date)}</span>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-6">${article.title}</h1>
                ${article.image ? `
                    <div class="mb-6">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-64 object-cover rounded">
                        <p class="text-sm text-gray-500 mt-2">Image caption: View of ${article.tag}</p>
                    </div>` : ''}
                <div class="prose max-w-none">
                    ${article.content}
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
            `;

            relatedArticlesContainer.innerHTML = '<p class="text-sm text-gray-500">More local stories coming soon.</p>';
        })
        .catch(error => {
            console.error(error);
            displayError('Article not found. Please try again or return to the homepage.');
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
                <a href="index.html" class="inline-block bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                    Return to Homepage
                </a>
            </div>
        </div>
    `;

    document.querySelector('.mt-8').classList.add('hidden');
    document.title = `Article Not Found - News Drop Isle of Wight`;
}

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
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
