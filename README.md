# 🧶 Handmade Crochet Business Website

A complete, mobile-first website for a handmade crochet business. Built with **plain HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools. Just open the folder in VS Code and start editing!

---

## 📁 Folder Structure

```
sih/
├── index.html          ← Home page
├── category.html       ← Category/shop page (reusable via ?cat=... URL)
├── css/
│   └── style.css       ← All styles (2200+ lines, well-commented)
├── js/
│   ├── products.js     ← ALL products, offers, testimonials live here ⭐
│   └── main.js         ← All interactivity (WhatsApp, rendering, animations)
├── images/
│   ├── flowers/        ← Drop your flower product photos here
│   ├── bouquets/       ← Drop your bouquet product photos here
│   ├── keychains/      ← Drop your keychain product photos here
│   ├── softtoys/       ← Drop your soft toy photos here
│   ├── scarfs/         ← Drop your scarf photos here
│   ├── special/        ← Drop your special product photos here
│   └── banners/        ← Hero, about, og-image banners here
└── README.md           ← This file
```

---

## 🚀 How to Run the Site

### Option 1 — Open directly (simplest)
Just double-click `index.html`. It will open in your browser. ✅

### Option 2 — VS Code Live Server (recommended)
1. Install the **Live Server** extension in VS Code (by Ritwick Dey)
2. Right-click `index.html` → **"Open with Live Server"**
3. The browser auto-refreshes whenever you save a file 🔄

---

## ✏️ How to Add a Product

Open `js/products.js`. Scroll to the `products` array.

Copy any existing product block and paste it before the closing `]`. Then update the values:

```js
{
  id: 31,                           // ← Must be a unique number
  name: 'My New Crochet Flower',    // ← Product name
  category: 'flowers',              // ← One of: flowers, bouquets, keychains, softtoys, scarfs, special
  price: 349,                       // ← Price in ₹ (number only, no symbol)
  oldPrice: 449,                    // ← Optional: crossed-out old price (delete if no discount)
  image: 'images/flowers/my-new-flower.jpg',  // ← Put your photo in the right images/ subfolder
  description: 'A beautiful handmade crochet flower crafted with love.',
  badge: 'New'                      // ← Optional: 'Bestseller', 'New', 'Only 3 left!', 'Made to Order'
                                    //   Delete this line if you don't want a badge.
},
```

**That's it! No other code changes needed.**

> **Tip:** Drop your photo into the correct `images/` subfolder and use the exact filename in the `image` field.

---

## ❌ How to Remove a Product

1. Find the product object in the `products` array in `js/products.js`
2. Delete the entire block from `{` to `},`
3. Save the file

---

## ➕ How to Add an Offer / Sale Banner

Scroll to the `offers` array in `js/products.js`:

```js
{
  id: 'my-new-offer',
  title: 'Summer Flash Sale',
  description: 'Get 20% off on all flowers and bouquets this weekend!',
  discountText: 'FLAT 20% OFF',
  endDate: '2026-12-31T23:59:59Z',   // ← ISO date format: YYYY-MM-DDTHH:MM:SSZ (UTC)
  image: 'images/banners/my-offer.jpg',
  badgeColor: '#FF6B6B'
},
```

The countdown timer updates automatically every second. When the date passes, it shows "Offer ended".

---

## 📱 How to Change Your WhatsApp Number

Open `js/main.js`. The very first line you need is at the **top of the file**:

```js
const WHATSAPP_NUMBER = '919876543210';
//                       ^^^^^^^^^^^^
//  Replace with your number: country code + number, no spaces or dashes
//  Example: India +91 98765 43210 → '919876543210'
```

Change this one value and every "Buy on WhatsApp" button across the entire site updates automatically.

---

## 🎨 How to Change Colors

Open `css/style.css`. All colors are defined as CSS variables at the top (around line 51):

```css
:root {
  --color-accent-coral: #FF6B6B;    /* ← Main button/accent color */
  --color-blush: #FFB6C1;           /* ← Soft pink highlights */
  --color-peach: #FFDAB9;           /* ← Warm peach tones */
  --color-cream: #FFF8F0;           /* ← Background cream */
  --color-lavender: #E6E6FA;        /* ← Lavender accents */
  --color-whatsapp: #25D366;        /* ← WhatsApp green button */
  --color-text-brown: #4A3728;      /* ← Primary text color */
  /* ... and more */
}
```

Change any value and it updates everywhere on the site instantly.

---

## 🏷️ How to Change Your Business Name

Your business name is used as a placeholder `[YOUR BUSINESS NAME]` throughout the HTML files.

**In VS Code:** Press `Ctrl+Shift+H` (or `Cmd+Shift+H` on Mac) to open **Find & Replace across all files**.
- Find: `[YOUR BUSINESS NAME]`
- Replace: `Tanisha's Crochet Studio` *(or whatever your name is)*

Also update the meta description in `index.html` and `category.html`.

---

## 📸 How to Add Your Own Photos

1. Take your product photo (square format works best, e.g. 800×800 px)
2. Name it something simple: `red-rose.jpg`, `teddy-bear.jpg`, etc.
3. Drop it into the right `images/` subfolder (e.g. `images/flowers/`)
4. Update the `image` field in `js/products.js` to match the path

```js
image: 'images/flowers/red-rose.jpg',
```

> **Important:** Image paths are case-sensitive on Linux/Mac. Make sure the filename matches exactly.

---

## 🌐 How to Change Social Links

In both `index.html` and `category.html`, find these lines in the footer:

```html
<!-- Instagram: replace with your URL -->
<a href="https://instagram.com/yourbusinessname" ...>

<!-- Email: replace with your email -->
<a href="mailto:hello@yourbusiness.com" ...>
```

---

## 🚢 How to Push to GitHub from VS Code

### First time setup:
1. Create a free account at [github.com](https://github.com)
2. Create a new repository (click **+** → New repository)
3. Name it `crochet-shop` (or any name), set it to **Public**, click **Create**

### In VS Code:
1. Open the **Source Control** panel (the branch icon in the left sidebar, or `Ctrl+Shift+G`)
2. Click **"Initialize Repository"**
3. Type a commit message like `Initial website` in the message box
4. Click the **✓ Commit** button (you may need to stage all changes first)
5. Click the **...** menu → **Remote** → **Add Remote**
6. Paste your GitHub repository URL (e.g. `https://github.com/yourusername/crochet-shop.git`)
7. Click **Push**

---

## 🌍 How to Host for Free (GitHub Pages)

After pushing to GitHub:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Branch: main** and folder **/ (root)**
4. Click **Save**
5. Wait 1–2 minutes, then visit `https://yourusername.github.io/crochet-shop/`

Your site is live! 🎉 Share the link with customers.

---

## 💡 Tips

| Goal | What to do |
|------|-----------|
| Add a new category | Add a new key to `categoryInfo` in `products.js`, then set `category: 'newslug'` on products |
| Remove a category from nav | Delete its `<a>` tag from both `index.html` and `category.html` headers |
| Change fonts | Edit the Google Fonts `<link>` in the `<head>` and update `--font-heading` / `--font-body` in `:root` |
| Disable countdown timers | Remove `renderOffers()` and `startCountdownTimers()` from `main.js` |
| Hide the gift banner | Delete the `<div class="announcement-bar">` block from `index.html` |

---

Made with 💕 and 🧶 | Plain HTML/CSS/JS — no frameworks needed!
