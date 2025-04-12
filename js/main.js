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
