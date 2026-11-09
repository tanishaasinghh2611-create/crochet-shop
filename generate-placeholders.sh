#!/bin/bash
# Generate SVG placeholder images for all product categories
# These will be replaced with actual product photos

create_placeholder() {
    local filepath="$1"
    local label="$2"
    local emoji="$3"
    local bg_color="$4"

    cat > "$filepath" << SVGEOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg_color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFF8F0;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)" rx="12"/>
  <text x="300" y="260" font-size="80" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  <text x="300" y="360" font-family="Georgia, serif" font-size="22" fill="#4A3728" text-anchor="middle" dominant-baseline="middle">${label}</text>
  <text x="300" y="395" font-family="Arial, sans-serif" font-size="14" fill="#8B7D6B" text-anchor="middle">Replace with your photo</text>
</svg>
SVGEOF
}

# Flowers
create_placeholder "images/flowers/red-rose-stem.jpg" "Red Rose Stem" "🌹" "#FFE4E1"
create_placeholder "images/flowers/sunflower-stem.jpg" "Sunflower Stem" "🌻" "#FFF8DC"
create_placeholder "images/flowers/tulip-bunch.jpg" "Tulip Bunch" "🌷" "#FFE4E1"
create_placeholder "images/flowers/lavender-sprig.jpg" "Lavender Sprig" "💜" "#E6E6FA"
create_placeholder "images/flowers/daisy-stem.jpg" "Daisy Stem" "🌼" "#FFFACD"
create_placeholder "images/flowers/lily-stem.jpg" "Lily Stem" "🌸" "#FFF0F5"

# Bouquets
create_placeholder "images/bouquets/spring-garden-bouquet.jpg" "Spring Garden Bouquet" "💐" "#FFE4E1"
create_placeholder "images/bouquets/romantic-rose-bouquet.jpg" "Romantic Rose Bouquet" "🌹" "#FFB6C1"
create_placeholder "images/bouquets/sunflower-delight.jpg" "Sunflower Delight" "🌻" "#FFF8DC"
create_placeholder "images/bouquets/wildflower-mix.jpg" "Wildflower Mix" "🌸" "#E6E6FA"
create_placeholder "images/bouquets/pastel-dream-bouquet.jpg" "Pastel Dream Bouquet" "🌺" "#FFDAB9"

# Keychains
create_placeholder "images/keychains/mini-bear-keychain.jpg" "Mini Bear Keychain" "🧸" "#FFDAB9"
create_placeholder "images/keychains/heart-keychain.jpg" "Heart Keychain" "❤️" "#FFB6C1"
create_placeholder "images/keychains/flower-keychain.jpg" "Flower Keychain" "🌸" "#FFE4E1"
create_placeholder "images/keychains/mushroom-keychain.jpg" "Mushroom Keychain" "🍄" "#FFEFD5"
create_placeholder "images/keychains/star-keychain.jpg" "Star Keychain" "⭐" "#FFF8DC"

# Soft Toys
create_placeholder "images/softtoys/teddy-bear.jpg" "Teddy Bear" "🧸" "#FFDAB9"
create_placeholder "images/softtoys/bunny.jpg" "Bunny" "🐰" "#FFF0F5"
create_placeholder "images/softtoys/elephant.jpg" "Elephant" "🐘" "#E6E6FA"
create_placeholder "images/softtoys/octopus.jpg" "Octopus" "🐙" "#FFE4E1"
create_placeholder "images/softtoys/cat.jpg" "Cat" "🐱" "#FFF8DC"
create_placeholder "images/softtoys/penguin.jpg" "Penguin" "🐧" "#E0FFFF"

# Scarfs
create_placeholder "images/scarfs/infinity-scarf.jpg" "Infinity Scarf" "🧣" "#FFE4E1"
create_placeholder "images/scarfs/chunky-scarf.jpg" "Chunky Scarf" "🧶" "#FFDAB9"
create_placeholder "images/scarfs/lace-scarf.jpg" "Lace Scarf" "✨" "#FFF0F5"
create_placeholder "images/scarfs/color-block-scarf.jpg" "Color Block Scarf" "🌈" "#E6E6FA"

# Special
create_placeholder "images/special/gift-hamper.jpg" "Gift Hamper" "🎁" "#FFE4E1"
create_placeholder "images/special/custom-name-bunting.jpg" "Custom Name Bunting" "🎀" "#FFDAB9"
create_placeholder "images/special/baby-mobile.jpg" "Baby Mobile" "👶" "#E6E6FA"
create_placeholder "images/special/wall-hanging.jpg" "Wall Hanging" "🏠" "#FFF8DC"
create_placeholder "images/special/coaster-set.jpg" "Coaster Set" "☕" "#FFEFD5"

# Banners
create_placeholder "images/banners/offer-diwali.jpg" "Diwali Special Sale" "🪔" "#FFF8DC"
create_placeholder "images/banners/offer-christmas.jpg" "Christmas Collection" "🎄" "#FFE4E1"
create_placeholder "images/banners/hero-banner.jpg" "Hero Banner" "🧶" "#FFDAB9"
create_placeholder "images/banners/about-photo.jpg" "About Photo" "📸" "#FFF0F5"
create_placeholder "images/banners/og-image.jpg" "Social Share Image" "🧶" "#FFDAB9"

echo "✅ Created $(find images -name '*.jpg' | wc -l | tr -d ' ') placeholder images!"
