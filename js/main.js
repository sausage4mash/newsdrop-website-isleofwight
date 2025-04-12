
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
});
function renderNewsArticles(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // clear existing

    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'bg-white rounded-lg shadow-md p-6 article-card fade-in';

        articleCard.innerHTML = `
            <div class="mb-2">
                <span class="tag-pill tag-${article.tag}">${article.tag}</span>
                <span class="text-sm text-gray-500 ml-2">${article.date} ${article.time}</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">${article.title}</h2>
            <p class="text-gray-700 mb-4">${stripHTML(article.content).slice(0, 150)}...</p>
            <a href="article.html?id=${article.id}" class="text-blue-600 hover:underline font-medium">Read More →</a>
        `;

        newsContainer.appendChild(articleCard);
    });
}

function stripHTML(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}
