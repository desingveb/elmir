// Search Bar Functionality
(function() {
    'use strict';

    // Page database for search
    const pages = [
        {
            name: 'haqqımda',
            keywords: ['haqqımda', 'about', 'təhsil', 'education', 'məlumat', 'info', 'şəxsi'],
            url: '../html/about.html',
            icon: '👤',
            title: 'Haqqımda',
            description: 'Təhsil və şəxsi məlumatlarım'
        },
        {
            name: 'bacarıqlar',
            keywords: ['bacarıq', 'skill', 'texniki', 'technical', 'html', 'css', 'dizayn', 'design'],
            url: '../html/skills.html',
            icon: '💻',
            title: 'Bacarıqlarım',
            description: 'Texniki qabiliyyətlərim'
        },
        {
            name: 'hobbi',
            keywords: ['hobbi', 'hobby', 'maraq', 'interest', 'əyləncə', 'fun', 'oyun', 'game'],
            url: '../html/hobbies.html',
            icon: '🎮',
            title: 'Hobbilər',
            description: 'Maraqlarım və həvəslərim'
        },
        {
            name: 'əlaqə',
            keywords: ['əlaqə', 'contact', 'telefon', 'phone', 'email', 'instagram', 'mesaj'],
            url: '../html/contact.html',
            icon: '📧',
            title: 'Əlaqə',
            description: 'Mənimlə əlaqə saxlayın'
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const searchSuggestions = document.getElementById('searchSuggestions');

        if (!searchInput || !searchBtn || !searchSuggestions) return;

        // Search function
        function searchPages(query) {
            if (!query || query.trim() === '') {
                return [];
            }

            query = query.toLowerCase().trim();
            
            return pages.filter(page => {
                return page.keywords.some(keyword => 
                    keyword.includes(query) || query.includes(keyword)
                );
            });
        }

        // Display search results
        function displayResults(results) {
            searchSuggestions.innerHTML = '';

            if (results.length === 0) {
                searchSuggestions.innerHTML = `
                    <div class="no-results">
                        <p>Nəticə tapılmadı 😔</p>
                    </div>
                `;
            } else {
                results.forEach(result => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.innerHTML = `
                        <span class="suggestion-icon">${result.icon}</span>
                        <div class="suggestion-content">
                            <div class="suggestion-title">${result.title}</div>
                            <div class="suggestion-desc">${result.description}</div>
                        </div>
                    `;
                    
                    item.addEventListener('click', function() {
                        navigateToPage(result.url);
                    });
                    
                    searchSuggestions.appendChild(item);
                });
            }

            searchSuggestions.classList.add('active');
        }

        // Navigate to page
        function navigateToPage(url) {
            // Add transition effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(function() {
                window.location.href = url;
            }, 300);
        }

        // Input event listener
        searchInput.addEventListener('input', function() {
            const query = this.value;
            
            if (query.trim() === '') {
                searchSuggestions.classList.remove('active');
                return;
            }

            const results = searchPages(query);
            displayResults(results);
        });

        // Search button click
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            
            if (query.trim() === '') return;

            const results = searchPages(query);
            
            if (results.length > 0) {
                navigateToPage(results[0].url);
            } else {
                displayResults(results);
            }
        });

        // Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBtn.click();
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && 
                !searchSuggestions.contains(e.target) &&
                !searchBtn.contains(e.target)) {
                searchSuggestions.classList.remove('active');
            }
        });

        // Focus search with Ctrl+K or Cmd+K
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    });
})();