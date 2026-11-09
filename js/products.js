/**
 * ==============================================================================
 * CROCHET CRAFTS - PRODUCT CATALOG & STORE DATA
 * ==============================================================================
 * Welcome! This file contains all the data for products, special offers,
 * customer testimonials, and category information for our handmade crochet shop.
 *
 * All variables here are declared globally using `const`, making them directly
 * accessible across all HTML pages and JavaScript files without needing any
 * import/export statements or bundlers.
 *
 * ------------------------------------------------------------------------------
 * STORE MANAGER GUIDE (NO OTHER CODE CHANGES NEEDED!):
 * ------------------------------------------------------------------------------
 *
 * 1. HOW TO ADD A NEW PRODUCT:
 *    - Scroll down to the `products` array below.
 *    - Copy an existing product block (everything from `{` to `},`).
 *    - Paste it at the end of the array (just before the closing `]`).
 *    - Update the properties:
 *        • id: A unique numeric identifier (e.g., 31).
 *        • name: Title of your crochet creation (e.g., 'Lavender Bunny Plush').
 *        • category: Choose one of: 'flowers', 'bouquets', 'keychains',
 *                    'softtoys', 'scarfs', or 'special'.
 *        • price: Price in INR (e.g., 499) without ₹ symbol.
 *        • oldPrice: (Optional) Original price for discount display (e.g., 599).
 *                    Remove this line if there is no discount.
 *        • image: Path to photo (e.g., 'images/flowers/my-flower.jpg').
 *                 Remember to place your image file in the corresponding folder!
 *        • description: A warm, descriptive sentence or two about the item.
 *        • badge: (Optional) Promo tag such as 'Bestseller', 'New',
 *                 'Only 3 left!', 'Made to Order', or 'Limited Edition'.
 *                 Remove this line if no badge is needed.
 *
 * 2. HOW TO REMOVE A PRODUCT:
 *    - Locate the product object in the `products` array.
 *    - Delete the entire block from the opening `{` to the closing `},`.
 *    - Ensure remaining items are cleanly separated by commas.
 *
 * 3. HOW TO ADD A NEW OFFER / BANNER:
 *    - Scroll down to the `offers` array.
 *    - Copy an existing offer object and paste it inside the `offers` array.
 *    - Update the id, title, description, discountText, endDate, image,
 *      and badgeColor.
 *    - Note: endDate must follow standard ISO string format: 'YYYY-MM-DDTHH:MM:SSZ'.
 *
 * 4. THAT'S ALL!
 *    - Simply save this file. The website's product grid, filters, badges,
 *      and offer banners will automatically update everywhere!
 * ==============================================================================
 */

/**
 * Information and metadata for each product category.
 * Used for category headers, page banners, and filter descriptions.
 */
const categoryInfo = {
  flowers: {
    name: 'Crochet Flowers',
    tagline: 'Everlasting Blooms Handcrafted with Love',
    description: 'Individual crochet flower stems that never wither. Perfect for gifting, desk decor, or creating your own custom arrangement.'
  },
  bouquets: {
    name: 'Bouquets & Arrangements',
    tagline: 'Hand-Tied Botanical Magic',
    description: 'Carefully curated handmade crochet bouquets wrapped in aesthetic kraft paper and ribbons, ready to brighten anyone\'s day.'
  },
  keychains: {
    name: 'Cute Keychains & Charms',
    tagline: 'Pocket-Sized Whimsy',
    description: 'Charming, lightweight crochet keychains and bag charms designed to add personality to your keys, backpacks, and totes.'
  },
  softtoys: {
    name: 'Amigurumi Soft Toys',
    tagline: 'Hug-Worthy Handmade Companions',
    description: 'Adorable amigurumi stuffed plushies crafted with ultra-soft baby yarn, safety eyes, and hypoallergenic polyfill filling.'
  },
  scarfs: {
    name: 'Warm Scarfs & Wearables',
    tagline: 'Cozy Stitches for Chilly Days',
    description: 'Luxurious handmade yarn scarves, cowls, and winter wearables woven for warmth, comfort, and timeless fashion.'
  },
  special: {
    name: 'Special Editions & Custom Gifts',
    tagline: 'One-of-a-Kind Keepsakes',
    description: 'Curated gift hampers, nursery mobiles, festive decor, wall hangings, and bespoke handmade treasures made to order.'
  }
};

/**
 * Main Product Catalog
 * 30 sample products (5 per category) across 6 categories.
 * All prices are in INR (₹).
 */
const products = [
  // ============================================================================
  // 1. FLOWERS (Individual stems & mini bunches)
  // ============================================================================
  {
    id: 1,
    name: 'Velvet Rose Stem',
    category: 'flowers',
    price: 249,
    oldPrice: 299,
    image: 'images/flowers/red-rose-stem.jpg',
    description: 'Classic handcrafted red rose with leafy green stem, flexible wire core, and delicate petaled bloom.',
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Sunny Sunflower Stem',
    category: 'flowers',
    price: 299,
    image: 'images/flowers/sunflower-stem.jpg',
    description: 'Vibrant golden sunflower crocheted with intricate center disc detailing to bring sunshine into any room.',
    badge: 'New'
  },
  {
    id: 3,
    name: 'Pastel Tulip Bunch',
    category: 'flowers',
    price: 449,
    oldPrice: 499,
    image: 'images/flowers/tulip-bunch.jpg',
    description: 'Trio of tender pastel pink, lilac, and cream crochet tulips with bendable green stems.',
    badge: 'Only 3 left!'
  },
  {
    id: 4,
    name: 'Calming Lavender Sprig',
    category: 'flowers',
    price: 199,
    image: 'images/flowers/lavender-sprig.jpg',
    description: 'Delicate purple lavender sprig featuring textured French knots and subtle greenery.',
    badge: 'Made to Order'
  },
  {
    id: 5,
    name: 'Cheerful Daisy Stem',
    category: 'flowers',
    price: 219,
    image: 'images/flowers/daisy-stem.jpg',
    description: 'Fresh white petaled daisy with a bright sunny yellow pistil on a sturdy bendable crochet stem.'
  },

  // ============================================================================
  // 2. BOUQUETS (Arranged & wrapped gift bouquets)
  // ============================================================================
  {
    id: 6,
    name: 'Spring Garden Bouquet',
    category: 'bouquets',
    price: 999,
    oldPrice: 1199,
    image: 'images/bouquets/spring-garden-bouquet.jpg',
    description: 'A whimsical arrangement of daisies, tulips, lavender, and eucalyptus foliage tied in rustic Korean wrapping paper.',
    badge: 'Bestseller'
  },
  {
    id: 7,
    name: 'Romantic Crimson Rose Bouquet',
    category: 'bouquets',
    price: 1299,
    oldPrice: 1499,
    image: 'images/bouquets/romantic-rose-bouquet.jpg',
    description: 'A luxurious bunch of 7 ruby red crochet roses accented with baby\'s breath and satin ribbon.',
    badge: 'Limited Edition'
  },
  {
    id: 8,
    name: 'Sunflower Sunshine Delight',
    category: 'bouquets',
    price: 899,
    image: 'images/bouquets/sunflower-delight.jpg',
    description: 'Happy sunflower centerpiece surrounded by soft white daisies, green leaves, and vintage parchment wrap.',
    badge: 'New'
  },
  {
    id: 9,
    name: 'Enchanted Wildflower Mix',
    category: 'bouquets',
    price: 1099,
    image: 'images/bouquets/wildflower-mix.jpg',
    description: 'Earthy botanical bouquet featuring cornflowers, poppies, forget-me-nots, and decorative grasses.',
    badge: 'Made to Order'
  },
  {
    id: 10,
    name: 'Pastel Dream Marshmallow Bouquet',
    category: 'bouquets',
    price: 1199,
    oldPrice: 1399,
    image: 'images/bouquets/pastel-dream-bouquet.jpg',
    description: 'Soft ombre shades of blush pink, baby blue, and mint green flowers hand-tied with organza lace.',
    badge: 'Only 3 left!'
  },

  // ============================================================================
  // 3. KEYCHAINS (Bag charms, pocket buddies & keyrings)
  // ============================================================================
  {
    id: 11,
    name: 'Mini Honey Bear Keychain',
    category: 'keychains',
    price: 249,
    oldPrice: 299,
    image: 'images/keychains/mini-bear-keychain.jpg',
    description: 'Tiny amigurumi teddy bear with embroidered muzzle, rosy cheeks, and a secure gold clasp.',
    badge: 'Bestseller'
  },
  {
    id: 12,
    name: 'Pastel Puffy Heart Keychain',
    category: 'keychains',
    price: 199,
    image: 'images/keychains/heart-keychain.jpg',
    description: 'Chubby 3D crochet heart charm stuffed with soft cloud filling, finished with a matching tassel.'
  },
  {
    id: 13,
    name: 'Blooming Daisy Keychain',
    category: 'keychains',
    price: 219,
    image: 'images/keychains/flower-keychain.jpg',
    description: 'Two-tone smiling floral charm with dangling leaf bead, perfect for car keys or backpack zippers.',
    badge: 'New'
  },
  {
    id: 14,
    name: 'Toadstool Mushroom Keychain',
    category: 'keychains',
    price: 229,
    image: 'images/keychains/mushroom-keychain.jpg',
    description: 'Cottagecore red and white spotted mushroom cap crocheted with fine cotton thread.',
    badge: 'Only 3 left!'
  },
  {
    id: 15,
    name: 'Shooting Star Charm Keychain',
    category: 'keychains',
    price: 249,
    image: 'images/keychains/star-keychain.jpg',
    description: 'Golden yellow amigurumi smiling star with pastel rainbow tail accents and sturdy swivel clip.',
    badge: 'Made to Order'
  },

  // ============================================================================
  // 4. SOFT TOYS (Amigurumi plushies & stuffed companions)
  // ============================================================================
  {
    id: 16,
    name: 'Snuggle Buddy Teddy Bear',
    category: 'softtoys',
    price: 799,
    oldPrice: 899,
    image: 'images/softtoys/teddy-bear.jpg',
    description: 'Classic cuddly vintage-style amigurumi bear made with velvety plush yarn and a bow collar.',
    badge: 'Bestseller'
  },
  {
    id: 17,
    name: 'Floppy Eared Bunny Plush',
    category: 'softtoys',
    price: 849,
    oldPrice: 999,
    image: 'images/softtoys/bunny.jpg',
    description: 'Soft cream bunny rabbit with extra long floppy ears, pastel pink overalls, and safety eyes.',
    badge: 'New'
  },
  {
    id: 18,
    name: 'Peanut the Baby Elephant',
    category: 'softtoys',
    price: 899,
    image: 'images/softtoys/elephant.jpg',
    description: 'Gentle grey amigurumi elephant with oversized ears, curved trunk, and stitched blushing cheeks.',
    badge: 'Made to Order'
  },
  {
    id: 19,
    name: 'Ollie the Mood Octopus',
    category: 'softtoys',
    price: 599,
    image: 'images/softtoys/octopus.jpg',
    description: 'Squishy reversible octopus toy with cute spiral tentacles and cheerful smiling expression.',
    badge: 'Only 3 left!'
  },
  {
    id: 20,
    name: 'Pip the Chubby Penguin',
    category: 'softtoys',
    price: 699,
    oldPrice: 799,
    image: 'images/softtoys/penguin.jpg',
    description: 'Chubby winter penguin sporting a removable mini crochet winter beanie and scarf.'
  },

  // ============================================================================
  // 5. SCARFS (Wearables, cowls & winter accessories)
  // ============================================================================
  {
    id: 21,
    name: 'Cozy Cloud Infinity Scarf',
    category: 'scarfs',
    price: 899,
    oldPrice: 1099,
    image: 'images/scarfs/infinity-scarf.jpg',
    description: 'Continuous loop scarf stitched in ribbed waffle texture using super-soft acrylic-wool blend.',
    badge: 'Bestseller'
  },
  {
    id: 22,
    name: 'Chunky Oatmeal Cable Scarf',
    category: 'scarfs',
    price: 1199,
    oldPrice: 1399,
    image: 'images/scarfs/chunky-scarf.jpg',
    description: 'Extra warm, thick braided cable-knit design finished with dramatic oversized yarn fringe tassels.',
    badge: 'Limited Edition'
  },
  {
    id: 23,
    name: 'Victorian Lace Vintage Scarf',
    category: 'scarfs',
    price: 949,
    image: 'images/scarfs/lace-scarf.jpg',
    description: 'Airy openwork botanical lace pattern in antique ivory, perfect for light layering and formal wear.',
    badge: 'Made to Order'
  },
  {
    id: 24,
    name: 'Colorblock Sunset Scarf',
    category: 'scarfs',
    price: 1049,
    image: 'images/scarfs/color-block-scarf.jpg',
    description: 'Modern geometric color blocks of terracotta, blush pink, mustard, and cream in a warm rib stitch.',
    badge: 'New'
  },
  {
    id: 25,
    name: 'Nordic Forest Woodland Cowl',
    category: 'scarfs',
    price: 799,
    image: 'images/scarfs/infinity-scarf.jpg',  // No woodland-cowl placeholder; using closest available
    description: 'Snug neck-warmer cowl featuring rich pine green tones and wooden toggle button closures.',
    badge: 'Only 3 left!'
  },

  // ============================================================================
  // 6. SPECIAL (Hampers, mobiles, nursery & home decor)
  // ============================================================================
  {
    id: 26,
    name: 'Deluxe Crochet Gifting Hamper',
    category: 'special',
    price: 1499,
    oldPrice: 1799,
    image: 'images/special/gift-hamper.jpg',
    description: 'Curated gift basket containing 1 mini bouquet, 1 plush keychain, 2 floral coasters, and a handwritten card.',
    badge: 'Bestseller'
  },
  {
    id: 27,
    name: 'Personalized Name Bunting Banner',
    category: 'special',
    price: 699,
    image: 'images/special/custom-name-bunting.jpg',
    description: 'Customizable letter banner with delicate crochet bunting flags and floral spacers for nurseries and parties.',
    badge: 'Made to Order'
  },
  {
    id: 28,
    name: 'Celestial Dreams Baby Mobile',
    category: 'special',
    price: 1399,
    oldPrice: 1599,
    image: 'images/special/baby-mobile.jpg',
    description: 'Wooden hoop mobile adorned with hanging crochet clouds, crescent moon, golden stars, and woolen beads.',
    badge: 'Limited Edition'
  },
  {
    id: 29,
    name: 'Boho Macrame-Crochet Wall Hanging',
    category: 'special',
    price: 899,
    image: 'images/special/wall-hanging.jpg',
    description: 'Artisan tapestry suspended from a natural driftwood branch with textured popcorn stitches and fringe.',
    badge: 'New'
  },
  {
    id: 30,
    name: 'Botanical Coaster Set (Set of 4)',
    category: 'special',
    price: 499,
    oldPrice: 599,
    image: 'images/special/coaster-set.jpg',
    description: 'Four absorbent 100% cotton yarn flower coasters packaged in an eco-friendly gift box with twine.',
    badge: 'Only 3 left!'
  }
];

/**
 * Special Offers & Promotional Campaigns
 * Used for hero countdown banners, discount popups, and seasonal promos.
 * Note: `endDate` strings are in standard ISO 8601 UTC format.
 */
const offers = [
  {
    id: 'festive-winter-2026',
    title: 'Winter Warmth & Holiday Cheer',
    description: 'Wrap yourself in handmade love! Enjoy an extra 15% discount on all cozy scarfs and gift hampers when you buy 2 or more items.',
    discountText: 'FLAT 15% OFF',
    endDate: '2026-11-20T23:59:59Z',
    image: 'images/banners/offer-christmas.jpg',
    badgeColor: '#e07a5f'
  },
  {
    id: 'blooming-bundle-special',
    title: 'Forever Bloom Bouquet Bundle',
    description: 'Pair any botanical crochet bouquet with a cute keychain and receive a free botanical coaster plus complimentary gift wrapping.',
    discountText: 'FREE GIFT WITH BOUQUET',
    endDate: '2026-11-30T23:59:59Z',
    image: 'images/banners/offer-diwali.jpg',
    badgeColor: '#81b29a'
  }
];

/**
 * Customer Testimonials & Reviews
 * Used for the social proof carousel and review section.
 */
const testimonials = [
  {
    name: 'Ananya Sharma',
    rating: 5,
    text: 'I ordered the Romantic Crimson Rose Bouquet for my anniversary. The craftsmanship is breathtaking! It looks even prettier than fresh flowers and will last forever.',
    avatar: 'AS'
  },
  {
    name: 'Pooja Iyer',
    rating: 5,
    text: 'The Snuggle Buddy Teddy Bear is unbelievably soft and well-made! Got it for my niece\'s birthday and she hasn\'t let go of it since. The stitch quality is outstanding.',
    avatar: 'PI'
  },
  {
    name: 'Rohan Mehta',
    rating: 5,
    text: 'Purchased the Toadstool Mushroom and Honey Bear keychains. The attention to detail is remarkable! Shipping was quick and the packaging was eco-friendly and thoughtful.',
    avatar: 'RM'
  },
  {
    name: 'Meera Nair',
    rating: 5,
    text: 'The Chunky Oatmeal Cable Scarf kept me so warm on my trip to Himachal. It\'s stylish, soft on sensitive skin, and feels like a warm hug. 10/10 recommend!',
    avatar: 'MN'
  },
  {
    name: 'Kavita Patel',
    rating: 4,
    text: 'Ordered the Botanical Coaster Set and Sunny Sunflower stem for my work desk. Gorgeous pastel tones and superb yarn quality. Will definitely order again soon!',
    avatar: 'KP'
  }
];
