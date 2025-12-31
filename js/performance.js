/**
 * Performance Utility Functions
 * Add this script to improve loading performance across all admin pages
 */

// Simple in-memory cache with TTL
class SimpleCache {
    constructor() {
        this.cache = new Map();
    }
    
    set(key, value, ttl = 300000) { // 5 minutes default
        this.cache.set(key, {
            value,
            expiry: Date.now() + ttl
        });
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }
    
    clear(pattern = null) {
        if (!pattern) {
            this.cache.clear();
            return;
        }
        
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }
}

// Global cache instance
const apiCache = new SimpleCache();

// Cached fetch with loading indicator
async function cachedFetch(url, options = {}, cacheTTL = 300000) {
    const cacheKey = `${url}${JSON.stringify(options)}`;
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached) {
        console.log(`✅ Cache HIT: ${url}`);
        return cached;
    }
    
    console.log(`📥 Fetching: ${url}`);
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        // Cache successful responses
        if (response.ok) {
            apiCache.set(cacheKey, data, cacheTTL);
        }
        
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Debounce function for search inputs
function debounce(func, wait = 500) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show loading overlay
function showLoading(message = 'Loading...') {
    let overlay = document.getElementById('loadingOverlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        overlay.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 mb-0" style="font-size: 16px;">${message}</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
    } else {
        overlay.style.display = 'flex';
        overlay.querySelector('p').textContent = message;
    }
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance monitoring
function measurePerformance(name, fn) {
    return async function(...args) {
        const start = performance.now();
        try {
            const result = await fn(...args);
            const duration = performance.now() - start;
            console.log(`⏱️  ${name}: ${duration.toFixed(2)}ms`);
            return result;
        } catch (error) {
            const duration = performance.now() - start;
            console.error(`❌ ${name} failed after ${duration.toFixed(2)}ms:`, error);
            throw error;
        }
    };
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SimpleCache,
        apiCache,
        cachedFetch,
        debounce,
        showLoading,
        hideLoading,
        lazyLoadImages,
        measurePerformance
    };
}
