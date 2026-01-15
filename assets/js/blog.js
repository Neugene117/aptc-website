// Hide current page link from navigation
function hideCurrentPageLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.php';

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref) return;

        // Extract filename from href
        let linkPage = linkHref.split('/').pop();

        // Handle different link formats
        if (linkHref === '../' || linkHref === '../index.php' || linkHref === 'index.php') {
            linkPage = 'index.php';
        }

        // Handle root path
        if (currentPath === '/' || currentPath.endsWith('/index.php') || currentPage === 'index.php') {
            if (linkPage === 'index.php' || linkHref === '../' || linkHref === 'index.php') {
                link.style.display = 'none';
            }
        }
        // Handle other pages
        else if (linkPage === currentPage) {
            link.style.display = 'none';
        }
    });
}

// Initialize blog page with centralized data
function initializeBlogPage() {
    if (typeof BlogDataManager === 'undefined') {
        console.error('BlogDataManager not found. Make sure blogData.js is loaded.');
        return;
    }

    loadFeaturedArticle();
    loadAllArticles();
    setupSearchFunctionality();
}

function loadFeaturedArticle() {
    const featuredContainer = document.getElementById('featured-article-container');
    if (!featuredContainer) return;

    // Get the most recent article as featured
    const recentBlogs = BlogDataManager.getRecentBlogs(1);
    if (recentBlogs.length === 0) return;

    const featured = recentBlogs[0];
    featuredContainer.innerHTML = `
        <article class="featured-article">
            <div class="featured-image">
                <img src="${featured.image}" alt="${featured.title}" />
                <span class="featured-tag">${featured.category}</span>
            </div>
            <div class="featured-content">
                <h3>${featured.title}</h3>
                <p>${featured.summary}</p>
                <div class="featured-meta">
                    <span><i class="fas fa-calendar"></i> ${BlogDataManager.formatDate(featured.date)}</span>
                    <span><i class="fas fa-clock"></i> 5 min read</span>
                </div>
                <a href="./blogdetails.php?id=${featured.id}" class="read-more">
                    Read Full Article <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

function loadAllArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    const articlesCount = document.getElementById('articles-count');
    if (!articlesGrid) return;

    const allBlogs = BlogDataManager.getAllBlogs();

    // Update articles count
    if (articlesCount) {
        articlesCount.textContent = `Latest Articles (${allBlogs.length})`;
    }

    // Generate article cards
    articlesGrid.innerHTML = allBlogs.map(blog => `
        <article class="article-card">
            <div class="article-image">
                <img src="${blog.image}" alt="${blog.title}" />
                <span class="article-tag">${blog.category}</span>
            </div>
            <div class="article-content">
                <h3>${blog.title}</h3>
                <p>${blog.summary}</p>
                <div class="article-meta">
                    <span class="article-date">
                        <i class="fas fa-calendar"></i> ${BlogDataManager.formatDate(blog.date)}
                    </span>
                    <span class="article-read-time">
                        <i class="fas fa-clock"></i> 5 min read
                    </span>
                </div>
                <a href="./blogdetails.php?id=${blog.id}" class="article-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');

    // Hide load more button since we're showing all articles
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const articleCards = document.querySelectorAll('.article-card');

        articleCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    hideCurrentPageLink();
    initializeBlogPage();
});


