// ============================================
// 🔧 CHANGE YOUR WHATSAPP NUMBER HERE
// Format: country code + number, no spaces or dashes
// Example: '919876543210' for Indian number +91 98765 43210
// ============================================
const WHATSAPP_NUMBER = '919876543210';

/**
 * ============================================
 * HANDMADE CROCHET BUSINESS - MAIN JAVASCRIPT
 * ============================================
 * Clean, modern vanilla JavaScript handling all interactivity:
 * - WhatsApp direct ordering & floating chat
 * - Dynamic product rendering with discount calculations
 * - Best sellers, categories, offers & testimonials rendering
 * - Live countdown timers with expiration handling
 * - Category page searching, filtering & sorting
 * - Mobile drawer menu toggle
 * - Sticky header shadow on scroll
 * - Viewport scroll animations via IntersectionObserver
 * - Smooth anchor scrolling
 */

// ============================================
// DATA ACCESS & UTILITY HELPERS
// ============================================

/**
 * Safe getters for global arrays defined in products.js.
 * These prevent runtime ReferenceErrors if products.js is loading or missing items.
 */
const getProducts = () => (typeof products !== 'undefined' ? products : (window.products || []));
const getOffers = () => (typeof offers !== 'undefined' ? offers : (window.offers || []));
const getTestimonials = () => (typeof testimonials !== 'undefined' ? testimonials : (window.testimonials || []));
const getCategoryInfo = () => (typeof categoryInfo !== 'undefined' ? categoryInfo : (window.categoryInfo || {}));

/**
 * Escapes special HTML characters to prevent XSS vulnerabilities.
 * @param {string} str - Raw string
 * @returns {string} Escaped string safe for HTML injection
 */
const escapeHTML = (str) => {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

/**
 * Truncates text cleanly to a maximum length and adds an ellipsis.
 * @param {string} text - Input text
 * @param {number} maxLength - Character threshold
 * @returns {string} Truncated string
 */
const truncateText = (text, maxLength = 85) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generates initials from a customer's name for avatar display.
 * @param {string} name - Customer full name
 * @returns {string} 1-2 uppercase characters
 */
const getInitials = (name) => {
    if (!name) return '🧶';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// ============================================
// 1. WHATSAPP FUNCTIONS
// ============================================

/**
 * Opens WhatsApp with a pre-filled order message for a specific product.
 * Format: "Hi! I'd like to order *Product Name* (₹price). Is it available?"
 * @param {number|string} productId - The unique identifier of the product
 */
const openWhatsApp = (productId) => {
    const allProducts = getProducts();
    const product = allProducts.find(p => String(p.id) === String(productId));

    if (!product) {
        console.warn(`[WhatsApp] Product with ID "${productId}" not found.`);
        openWhatsAppChat();
        return;
    }

    const message = `Hi! I'd like to order *${product.name}* (₹${product.price}). Is it available?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
};

/**
 * Opens a general WhatsApp chat inquiry for the floating button and header links.
 * Message: "Hi! I'm interested in your handmade crochet products. 🧶"
 */
const openWhatsAppChat = () => {
    const message = "Hi! I'm interested in your handmade crochet products. 🧶";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
};

// Expose WhatsApp functions on window so inline onclick handlers work seamlessly
window.openWhatsApp = openWhatsApp;
window.openWhatsAppChat = openWhatsAppChat;

// ============================================
// 2. RENDER PRODUCTS
// ============================================

/**
 * Generates semantic product card HTML and injects it into the target container.
 * 
 * Uses CSS classes that match style.css:
 * - .product-card → card wrapper
 * - .product-image-container → image area with hover zoom
 * - .product-badge-corner → badge positioning
 * - .badge, .badge-bestseller, .badge-new, .badge-scarcity → badge styles
 * - .product-info → text info area
 * - .product-name → title
 * - .product-description → truncated description
 * - .product-price-section → price wrapper
 * - .price → current price
 * - .old-price → struck-through old price
 * - .discount-percent → discount tag
 * - .btn-whatsapp-buy → buy button
 * 
 * @param {string|HTMLElement} containerId - Target container ID or element
 * @param {Array} productList - Array of product objects to render
 */
const renderProducts = (containerId, productList) => {
    const container = typeof containerId === 'string'
        ? document.getElementById(containerId.replace(/^#/, ''))
        : containerId;

    if (!container) {
        console.warn(`[renderProducts] Container "${containerId}" not found in DOM.`);
        return;
    }

    // Handle empty product list edge case
    if (!productList || productList.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align:center; padding:3rem 1rem;">
                <div style="font-size:3rem; margin-bottom:1rem;">🧶</div>
                <h3>No products found</h3>
                <p>We couldn't find any products matching your criteria.</p>
            </div>
        `;
        return;
    }

    // Fallback SVG placeholder when product image fails to load
    const placeholderSvg = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23FFF3E0'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60'>🧶</text></svg>";

    const cardsHtml = productList.map(product => {
        // Badge mapping to CSS classes
        const badgeText = product.badge || '';
        const badgeLower = badgeText.toLowerCase();
        let badgeClass = 'badge-discount'; // default
        if (badgeLower.includes('bestseller')) badgeClass = 'badge-bestseller';
        else if (badgeLower.includes('new')) badgeClass = 'badge-new';
        else if (badgeLower.includes('only') || badgeLower.includes('left') || badgeLower.includes('limited')) badgeClass = 'badge-scarcity';
        else if (badgeLower.includes('made to order')) badgeClass = 'badge-new';

        const badgeHtml = badgeText
            ? `<div class="product-badge-corner"><span class="badge ${badgeClass}">${escapeHTML(badgeText)}</span></div>`
            : '';

        // Price, Old Price & Discount calculation
        let pricingHtml = `<span class="price">₹${product.price}</span>`;
        if (product.oldPrice && product.oldPrice > product.price) {
            const discountPercent = Math.round((1 - product.price / product.oldPrice) * 100);
            pricingHtml += `
                <span class="old-price">₹${product.oldPrice}</span>
                <span class="discount-percent">${discountPercent}% OFF</span>
            `;
        }

        const description = truncateText(product.description || '', 85);
        const imageSrc = product.image || placeholderSvg;

        return `
            <article class="product-card fade-in" data-id="${product.id}">
                <div class="product-image-container">
                    ${badgeHtml}
                    <img 
                        src="${imageSrc}" 
                        alt="${escapeHTML(product.name)}" 
                        loading="lazy" 
                        onerror="this.onerror=null; this.src='${placeholderSvg}';"
                    >
                </div>
                <div class="product-info">
                    <h3 class="product-name">${escapeHTML(product.name)}</h3>
                    ${description ? `<p class="product-description" style="font-size:0.8rem; color:var(--color-text-light); margin-bottom:0.5rem; line-height:1.4;">${escapeHTML(description)}</p>` : ''}
                    <div class="product-price-section">
                        <div class="price-wrapper">
                            ${pricingHtml}
                        </div>
                    </div>
                    <div class="product-card-actions">
                        <button 
                            type="button" 
                            class="btn-whatsapp-buy" 
                            onclick="openWhatsApp('${product.id}')"
                            aria-label="Order ${escapeHTML(product.name)} on WhatsApp"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display:inline; vertical-align:middle; margin-right:0.4rem;">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Buy on WhatsApp
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    container.innerHTML = cardsHtml;

    // Trigger scroll animation check for newly injected elements
    if (typeof observeFadeInElements === 'function') {
        observeFadeInElements();
    }
};

// ============================================
// 3. RENDER BEST SELLERS
// ============================================

/**
 * Filters products that have a 'Bestseller' badge and renders them in '#bestsellers-grid'.
 */
const renderBestSellers = () => {
    const allProducts = getProducts();
    const bestsellers = allProducts.filter(product =>
        product.badge && product.badge.toLowerCase().includes('bestseller')
    );

    // Fallback: if no specific bestsellers are tagged, show first 4 items
    const itemsToDisplay = bestsellers.length > 0 ? bestsellers : allProducts.slice(0, 4);
    renderProducts('bestsellers-grid', itemsToDisplay);
};

// ============================================
// 4. RENDER CATEGORY CARDS
// ============================================

/**
 * Fallback category metadata in case categoryInfo is not yet defined.
 */
const DEFAULT_CATEGORIES = [
    { slug: 'flowers', name: 'Flowers', icon: '🌸', description: 'Everlasting floral beauty' },
    { slug: 'bouquets', name: 'Bouquets', icon: '💐', description: 'Handcrafted floral arrangements' },
    { slug: 'keychains', name: 'Keychains', icon: '✨', description: 'Cute companions for your keys' },
    { slug: 'softtoys', name: 'Soft Toys', icon: '🧸', description: 'Adorable plushies made with love' },
    { slug: 'scarfs', name: 'Scarfs', icon: '🧣', description: 'Warm and cozy winter wear' },
    { slug: 'special', name: 'Special', icon: '🎀', description: 'Custom & seasonal creations' }
];

/**
 * Normalizes categoryInfo whether it's an array or an object map.
 * @returns {Array} List of categories with slug, name, icon, and description
 */
const getNormalizedCategories = () => {
    const rawCatInfo = getCategoryInfo();
    if (Array.isArray(rawCatInfo) && rawCatInfo.length > 0) {
        return rawCatInfo.map(cat => ({
            slug: cat.slug || cat.id || '',
            name: cat.name || cat.title || '',
            icon: cat.icon || '🧶',
            image: cat.image || '',
            description: cat.description || ''
        }));
    }
    if (rawCatInfo && typeof rawCatInfo === 'object' && Object.keys(rawCatInfo).length > 0) {
        return Object.entries(rawCatInfo).map(([slug, data]) => ({
            slug: slug,
            name: data.name || slug,
            icon: data.icon || '🧶',
            image: data.image || '',
            description: data.description || data.tagline || ''
        }));
    }
    return DEFAULT_CATEGORIES;
};

/**
 * Creates the 6 category cards linking to category.html?cat=slug.
 * Uses CSS classes: .category-card, .category-img-box, .category-info, .category-title, .category-count
 */
const renderCategories = () => {
    const container = document.getElementById('categories-grid');
    if (!container) return;

    const categories = getNormalizedCategories();
    const allProducts = getProducts();

    // Pastel gradient backgrounds for category cards (since we don't have real images)
    const gradients = [
        'linear-gradient(135deg, #FFE5EC, #FFDAB9)',
        'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
        'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
        'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
        'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
        'linear-gradient(135deg, #FFF8E1, #FFECB3)'
    ];

    const categoriesHtml = categories.map((cat, i) => {
        // Calculate dynamic product count for each category
        const count = allProducts.filter(p =>
            p.category && p.category.toLowerCase() === cat.slug.toLowerCase()
        ).length;
        const countLabel = `${count} ${count === 1 ? 'item' : 'items'}`;
        const gradient = gradients[i % gradients.length];

        return `
            <a href="category.html?cat=${encodeURIComponent(cat.slug)}" class="category-card card-hover fade-in" data-category="${cat.slug}">
                <div class="category-img-box" style="display:flex; align-items:center; justify-content:center; background:${gradient};">
                    <span style="font-size:3rem;" aria-hidden="true">${cat.icon || '🧶'}</span>
                </div>
                <div class="category-info">
                    <h3 class="category-title">${escapeHTML(cat.name)}</h3>
                    <p class="category-count">${countLabel}</p>
                </div>
            </a>
        `;
    }).join('');

    container.innerHTML = categoriesHtml;

    if (typeof observeFadeInElements === 'function') {
        observeFadeInElements();
    }
};

// ============================================
// 5. RENDER OFFERS & COUNTDOWN TIMERS
// ============================================

let countdownIntervalId = null;

/**
 * Generates ongoing offer cards from the offers array with countdown timer elements.
 * Uses CSS classes: .offer-card, .offer-card-tag, .offer-content,
 *   .countdown-box, .countdown-unit, .countdown-num, .countdown-label, .countdown-separator
 */
const renderOffers = () => {
    const container = document.getElementById('offers-container');
    if (!container) return;

    const offerList = getOffers();

    // Hide offers section if no offers are currently active
    if (!offerList || offerList.length === 0) {
        const offersSection = document.getElementById('offers');
        if (offersSection) offersSection.style.display = 'none';
        return;
    }

    const offersHtml = offerList.map((offer, index) => {
        const offerId = offer.id || `offer-${index + 1}`;
        const expiryDate = offer.endDate || offer.expiryDate || offer.validUntil || offer.endsAt || '';
        const badge = offer.discountText || offer.discount || offer.tagline || 'Special Offer';
        const title = offer.title || offer.name || 'Limited Time Deal';
        const description = offer.description || '';
        const codeHtml = offer.code
            ? `<div style="margin-top:0.5rem; font-size:0.85rem; color:var(--color-text-brown);"><strong>Use Code:</strong> ${escapeHTML(offer.code)}</div>`
            : '';

        return `
            <div class="offer-card fade-in" data-offer-id="${offerId}">
                <div class="offer-card-tag">${escapeHTML(badge)}</div>
                <div class="offer-content">
                    <h3>${escapeHTML(title)}</h3>
                    ${description ? `<p>${escapeHTML(description)}</p>` : ''}
                    ${codeHtml}
                </div>
                <div style="margin-top:auto;">
                    <span style="font-size:0.78rem; color:var(--color-text-light); font-weight:600;">⏳ Ends in:</span>
                    <div class="countdown-box" id="timer-${offerId}" data-expiry="${expiryDate}">
                        <div class="countdown-unit">
                            <span class="countdown-num" data-unit="days">00</span>
                            <span class="countdown-label">Days</span>
                        </div>
                        <span class="countdown-separator">:</span>
                        <div class="countdown-unit">
                            <span class="countdown-num" data-unit="hours">00</span>
                            <span class="countdown-label">Hours</span>
                        </div>
                        <span class="countdown-separator">:</span>
                        <div class="countdown-unit">
                            <span class="countdown-num" data-unit="minutes">00</span>
                            <span class="countdown-label">Mins</span>
                        </div>
                        <span class="countdown-separator">:</span>
                        <div class="countdown-unit">
                            <span class="countdown-num" data-unit="seconds">00</span>
                            <span class="countdown-label">Secs</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = offersHtml;

    if (typeof observeFadeInElements === 'function') {
        observeFadeInElements();
    }
};

/**
 * Updates all countdown timers every second showing days, hours, minutes, seconds.
 * Gracefully displays 'Offer ended' when an offer expires.
 */
const startCountdownTimers = () => {
    // Reset previous interval if already running
    if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
        countdownIntervalId = null;
    }

    const updateAllTimers = () => {
        const timerNodes = document.querySelectorAll('.countdown-box[data-expiry]');
        const now = Date.now();

        timerNodes.forEach(timerEl => {
            const expiryStr = timerEl.getAttribute('data-expiry');
            if (!expiryStr) {
                timerEl.innerHTML = '<span style="font-weight:600; color:var(--color-accent-coral);">Ongoing Deal</span>';
                return;
            }

            const expiryTime = new Date(expiryStr).getTime();
            if (isNaN(expiryTime)) {
                timerEl.innerHTML = '<span style="font-weight:600; color:var(--color-accent-coral);">Ongoing Deal</span>';
                return;
            }

            const timeLeft = expiryTime - now;

            // Handle expired offers gracefully
            if (timeLeft <= 0) {
                timerEl.innerHTML = '<span style="font-weight:600; color:var(--color-accent-coral);">Offer ended</span>';
                return;
            }

            // Calculate remaining units
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            const daysNode = timerEl.querySelector('[data-unit="days"]');
            const hoursNode = timerEl.querySelector('[data-unit="hours"]');
            const minsNode = timerEl.querySelector('[data-unit="minutes"]');
            const secsNode = timerEl.querySelector('[data-unit="seconds"]');

            if (daysNode && hoursNode && minsNode && secsNode) {
                daysNode.textContent = String(days).padStart(2, '0');
                hoursNode.textContent = String(hours).padStart(2, '0');
                minsNode.textContent = String(minutes).padStart(2, '0');
                secsNode.textContent = String(seconds).padStart(2, '0');
            }
        });
    };

    // Run immediately to populate digits right away
    updateAllTimers();
    // Update every second
    countdownIntervalId = setInterval(updateAllTimers, 1000);
};

// ============================================
// 6. RENDER TESTIMONIALS
// ============================================

/**
 * Creates testimonial cards with star ratings (★ and ☆), customer name, initials avatar, and review text.
 * Uses CSS classes: .testimonial-card, .testimonial-stars, .testimonial-text,
 *   .testimonial-customer, .customer-avatar, .customer-name, .customer-detail
 */
const renderTestimonials = () => {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;

    const testimonialList = getTestimonials();

    if (!testimonialList || testimonialList.length === 0) {
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) testimonialsSection.style.display = 'none';
        return;
    }

    const testimonialsHtml = testimonialList.map(item => {
        // Star rating: filled stars (★) and empty stars (☆)
        const rating = Math.min(5, Math.max(1, Math.round(Number(item.rating) || 5)));
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const initials = getInitials(item.name);
        const reviewText = item.review || item.text || item.comment || '';
        const locationText = item.location ? `<span> · ${escapeHTML(item.location)}</span>` : '';

        return `
            <article class="testimonial-card card-hover fade-in">
                <span class="testimonial-quote-icon">"</span>
                <div class="testimonial-stars" aria-label="${rating} out of 5 stars">
                    ${stars}
                </div>
                <p class="testimonial-text">"${escapeHTML(reviewText)}"</p>
                <div class="testimonial-customer">
                    <div class="customer-avatar" aria-hidden="true">${initials}</div>
                    <div>
                        <div class="customer-name">${escapeHTML(item.name)}</div>
                        <div class="customer-detail">
                            <span class="verified-badge">✓ Verified Buyer</span>
                            ${locationText}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    container.innerHTML = testimonialsHtml;

    if (typeof observeFadeInElements === 'function') {
        observeFadeInElements();
    }
};

// ============================================
// 7. CATEGORY PAGE LOGIC
// ============================================

/**
 * Handles category page interactivity:
 * - Reads URL parameter `cat` (e.g. ?cat=flowers)
 * - Filters products by category
 * - Search filter by product name or description
 * - Sort options: price low-high, high-low, newest (by id)
 * - Updates page title, header, and breadcrumb
 * - Graceful handling of empty results
 */
const initCategoryPage = () => {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return; // Only execute on pages with #product-grid

    const urlParams = new URLSearchParams(window.location.search);
    const catSlug = (urlParams.get('cat') || '').trim().toLowerCase();

    const categories = getNormalizedCategories();
    const allProducts = getProducts();

    // Find category info matching the slug
    const currentCategory = categories.find(c => c.slug.toLowerCase() === catSlug);

    // Dynamic Title & Breadcrumb updates
    const categoryTitleEl = document.getElementById('category-title');
    const categoryDescEl = document.getElementById('category-description');
    const breadcrumbCategoryEl = document.getElementById('breadcrumb-category');
    const categoryBannerIcon = document.getElementById('category-banner-icon');

    const displayName = currentCategory
        ? currentCategory.name
        : (catSlug && catSlug !== 'all' ? catSlug.charAt(0).toUpperCase() + catSlug.slice(1) : 'All Products');

    const displayDesc = currentCategory && currentCategory.description
        ? currentCategory.description
        : 'Explore our complete collection of handcrafted crochet pieces.';

    if (categoryTitleEl) categoryTitleEl.textContent = displayName;
    if (categoryDescEl) categoryDescEl.textContent = displayDesc;
    if (breadcrumbCategoryEl) breadcrumbCategoryEl.textContent = displayName;
    if (categoryBannerIcon && currentCategory && currentCategory.icon) {
        categoryBannerIcon.textContent = currentCategory.icon;
    }

    // Highlight active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.includes(`cat=${catSlug}`)) {
            link.classList.add('active');
        }
    });

    // Update browser tab document title
    document.title = `${displayName} — Handmade Crochet with Love 🧶`;

    // Filter products belonging to this category
    const baseProducts = (catSlug && catSlug !== 'all')
        ? allProducts.filter(p => p.category && p.category.toLowerCase() === catSlug)
        : allProducts;

    // State for filtering and sorting
    let searchQuery = '';
    let sortMethod = 'default';

    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const productCountEl = document.getElementById('product-count');

    /**
     * Filters, sorts, and renders the current product list
     */
    const applyFiltersAndRender = () => {
        let results = [...baseProducts];

        // 1. Search Filter by name or description
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(product => {
                const nameMatch = product.name && product.name.toLowerCase().includes(query);
                const descMatch = product.description && product.description.toLowerCase().includes(query);
                return nameMatch || descMatch;
            });
        }

        // 2. Sort functionality
        switch (sortMethod) {
            case 'price-low':
            case 'price-asc':
                results.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
                break;
            case 'price-high':
            case 'price-desc':
                results.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
                break;
            case 'newest':
                // Newest based on ID descending
                results.sort((a, b) => (Number(b.id) || 0) - (Number(a.id) || 0));
                break;
            case 'name-asc':
                results.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                break;
            case 'name-desc':
                results.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
                break;
            default:
                break;
        }

        // 3. Update product count label if available
        if (productCountEl) {
            productCountEl.textContent = `Showing ${results.length} ${results.length === 1 ? 'product' : 'products'}`;
        }

        // 4. Render results or handle empty state
        if (results.length === 0) {
            if (searchQuery) {
                productGrid.innerHTML = `
                    <div style="grid-column:1/-1; text-align:center; padding:3rem 1rem;">
                        <div style="font-size:3rem; margin-bottom:1rem;">🔍</div>
                        <h3>No matching products</h3>
                        <p>No products found matching "<strong>${escapeHTML(searchQuery)}</strong>".</p>
                        <button type="button" class="btn btn-secondary" id="clear-search-btn" style="margin-top:1rem;">Clear Search</button>
                    </div>
                `;
                const clearBtn = document.getElementById('clear-search-btn');
                if (clearBtn) {
                    clearBtn.addEventListener('click', () => {
                        if (searchInput) searchInput.value = '';
                        searchQuery = '';
                        applyFiltersAndRender();
                    });
                }
            } else {
                productGrid.innerHTML = `
                    <div style="grid-column:1/-1; text-align:center; padding:3rem 1rem;">
                        <div style="font-size:3rem; margin-bottom:1rem;">🧶</div>
                        <h3>No products yet</h3>
                        <p>No products found in this category right now. Check back soon!</p>
                        <a href="index.html#categories" class="btn btn-primary" style="margin-top:1rem;">Browse All Categories</a>
                    </div>
                `;
            }
        } else {
            renderProducts(productGrid, results);
        }
    };

    // Listen to Search Input changes
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            applyFiltersAndRender();
        });
    }

    // Listen to Sort Select changes
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortMethod = e.target.value;
            applyFiltersAndRender();
        });
    }

    // Perform initial render for category page
    applyFiltersAndRender();
};

// ============================================
// 8. MOBILE DRAWER MENU
// ============================================

/**
 * Handles mobile drawer menu (open/close) with overlay.
 * Uses: .hamburger-btn, .mobile-drawer, .drawer-overlay, .drawer-close-btn
 */
const initMobileMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const closeBtn = document.getElementById('drawer-close');

    if (!hamburger || !drawer) return;

    const openDrawer = () => {
        drawer.classList.add('is-open');
        if (overlay) overlay.classList.add('is-visible');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        drawer.classList.remove('is-open');
        if (overlay) overlay.classList.remove('is-visible');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (drawer.classList.contains('is-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }

    if (overlay) {
        overlay.addEventListener('click', closeDrawer);
    }

    // Close menu when a mobile navigation link is clicked
    const mobileLinks = drawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
};

// ============================================
// 9. SCROLL ANIMATIONS
// ============================================

let scrollObserver = null;

/**
 * Observes all '.fade-in' elements and applies the 'visible' class once in viewport.
 */
const observeFadeInElements = () => {
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');

    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    if (!scrollObserver) {
        scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });
    }

    fadeElements.forEach(el => scrollObserver.observe(el));
};

const initScrollAnimations = () => {
    observeFadeInElements();
};

// ============================================
// 10. STICKY HEADER
// ============================================

/**
 * Adds 'scrolled' class to header on scroll for box-shadow effect.
 */
const initStickyHeader = () => {
    const header = document.getElementById('header') || document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on load
    handleScroll();
};

// ============================================
// 11. SMOOTH SCROLL
// ============================================

/**
 * Enables smooth scrolling for on-page hash anchor links.
 */
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip empty links or script-handled anchors
            if (!targetId || targetId === '#' || this.hasAttribute('onclick')) {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL hash cleanly
                if (history.pushState) {
                    history.pushState(null, '', targetId);
                }
            }
        });
    });
};

// ============================================
// 12. DOMContentLoaded INIT
// ============================================

/**
 * Page initialization:
 * - Detects active page (index.html or category.html)
 * - Renders appropriate content
 * - Initializes mobile menu, sticky header, animations, and smooth scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UI components common to all pages
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();

    // 2. Detect page type
    const isCategoryPage = Boolean(
        document.getElementById('product-grid') ||
        window.location.pathname.includes('category.html') ||
        new URLSearchParams(window.location.search).has('cat')
    );

    if (isCategoryPage) {
        // Initialize Category Page Logic
        initCategoryPage();
    } else {
        // Initialize Home Page Sections
        renderOffers();
        startCountdownTimers();
        renderCategories();
        renderBestSellers();
        renderTestimonials();
    }

    // 3. Initialize scroll animations
    initScrollAnimations();
});
