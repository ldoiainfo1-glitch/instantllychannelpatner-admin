// Admin Panel Configuration
const ADMIN_CONFIG = {
    // Backend API Configuration
    API: {
        // Local development
        LOCAL: 'http://localhost:5001/api',
        
        // Production backend (Render.com deployment)
        PRODUCTION: 'https://instantlly-cards-backend-6ki0.onrender.com/api',
        
        // Dedicated admin backend (same as production)
        ADMIN_BACKEND: 'https://instantlly-cards-backend-6ki0.onrender.com/api'
    },
    
    // Determine which API to use
    getApiBaseUrl() {
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return this.API.LOCAL;
        } else if (hostname.includes('vercel.app') || hostname.includes('netlify.app')) {
            // For deployed admin panel, use production backend
            return this.API.PRODUCTION;
        } else {
            // Default to production
            return this.API.PRODUCTION;
        }
    },
    
    // Admin credentials
    DEFAULT_CREDENTIALS: {
        username: 'admin',
        password: 'admin123'
    },
    
    // App settings
    APP: {
        name: 'InstantllyCards Admin',
        version: '1.0.0',
        tokenExpiry: '30d',
        localStorageKeys: {
            token: 'channelPartnerToken',
            username: 'adminUsername',
            rememberMe: 'rememberAdmin'
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADMIN_CONFIG;
} else {
    // Browser environment
    window.ADMIN_CONFIG = ADMIN_CONFIG;
    // Also set API_BASE_URL for backward compatibility
    window.API_BASE_URL = ADMIN_CONFIG.getApiBaseUrl();
    console.log('🔧 Config loaded - API_BASE_URL:', window.API_BASE_URL);
}