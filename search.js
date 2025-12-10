// Search functionality for index.html

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Səhifə məlumatları - index.html root-dadır
    const pages = [
        {
            title: 'Haqqımda',
            url: 'pages/about.html',
            icon: '👤',
            description: 'Təhsil və şəxsi məlumatlarım',
            keywords: ['haqqımda', 'təhsil', 'məlumat', 'about', 'education']
        },
        {
            title: 'Bacarıqlarım',
            url: 'pages/skills.html',
            icon: '💻',
            description: 'Texniki bacarıqlar və alətlər',
            keywords: ['bacarıq', 'skill', 'html', 'css', 'dizayn', 'texniki']
        },
        {
            title: 'Layihələr',
            url: 'pages/projects.html',
            icon: '🚀',
            description: 'Gördüyüm işlər və portfolio',
            keywords: ['layihə', 'project', 'portfolio', 'iş', 'work', 'demo']
        },
        {
            title: 'Hobbilər',
            url: 'pages/hobbies.html',
            icon: '🎮',
            description: 'Maraqlarım və həvəslərim',
            keywords: ['hobbi', 'hobby', 'maraq', 'idman', 'oyun', 'musiqi']
        },
        {
            title: 'Əlaqə',
            url: 'pages/contact.html',
            icon: '📧',
            description: 'Mənimlə əlaqə saxlayın',
            keywords: ['əlaqə', 'contact', 'telefon', 'email', 'instagram']
        }
    ];
    
    // Axtarış inputuna event listener
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length === 0) {
            searchSuggestions.classList.remove('active');
            return;
        }
        
        // Nəticələri filtrələ
        const results = pages.filter(page => {
            return page.title.toLowerCase().includes(query) ||
                   page.description.toLowerCase().includes(query) ||
                   page.keywords.some(keyword => keyword.includes(query));
        });
        
        displayResults(results, query);
    });
    
    // Axtarış düyməsinə click
    searchBtn.addEventListener('click', function() {
        searchInput.focus();
    });
    
    // Enter key ilə axtarış
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const firstResult = searchSuggestions.querySelector('.suggestion-item');
            if (firstResult) {
                firstResult.click();
            }
        }
        
        // Escape key ilə bağla
        if (e.key === 'Escape') {
            searchSuggestions.classList.remove('active');
            searchInput.blur();
        }
    });
    
    // Kənarda click edəndə bağla
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && 
            !searchSuggestions.contains(e.target) && 
            !searchBtn.contains(e.target)) {
            searchSuggestions.classList.remove('active');
        }
    });
    
    // Ctrl+K ilə axtarışı aç
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // Nəticələri göstər
    function displayResults(results, query) {
        if (results.length === 0) {
            searchSuggestions.innerHTML = `
                <div class="no-results">
                    <p>Heç bir nəticə tapılmadı</p>
                </div>
            `;
            searchSuggestions.classList.add('active');
            return;
        }
        
        searchSuggestions.innerHTML = '';
        
        results.forEach((result, index) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.style.animationDelay = `${index * 0.05}s`;
            
            const highlightedTitle = highlightText(result.title, query);
            const highlightedDesc = highlightText(result.description, query);
            
            item.innerHTML = `
                <span class="suggestion-icon">${result.icon}</span>
                <div class="suggestion-content">
                    <div class="suggestion-title">${highlightedTitle}</div>
                    <div class="suggestion-desc">${highlightedDesc}</div>
                </div>
            `;
            
            item.addEventListener('click', function() {
                window.location.href = result.url;
            });
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
            
            searchSuggestions.appendChild(item);
        });
        
        searchSuggestions.classList.add('active');
    }
    
    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: rgba(0, 255, 65, 0.3); color: var(--color-primary); padding: 0 2px; border-radius: 2px;">$1</mark>');
    }
});