# SimpleMart 🛍️

A clean, minimal, and beginner-friendly dummy e-commerce shopping website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Features

- **Home Page**: Clean welcome banner, category quick chips, and 8 featured products.
- **Products Catalog**: Full catalog of 12 dummy products with live search, category filtering (Electronics, Fashion, Home, Accessories), and price sorting.
- **Product Details Page**: High-resolution image, category badge, detailed description, quantity selector, and related items.
- **Shopping Cart**: Real-time quantity adjustments, price calculations, item removal, and subtotal breakdown with browser `localStorage` persistence.
- **Demo Checkout**: Instant confirmation with unique order IDs (no payment processing or credentials needed).
- **Orders History**: Tracks previous orders (`#SM1001`, `#SM1002`, `#SM1003`) along with any new demo orders placed during the session.
- **User Profile**: Clean customer details card for Janani Kumar with account activity metrics.
- **GitHub Pages Ready**: Configured with Hash routing and configurable Vite base path so every page and asset loads properly on GitHub Pages.

---

## 🚀 Quick Start Guide

### 1. How to Install
Clone this repository and install dependencies using `npm`:

```bash
# Clone the repository
git clone https://github.com/your-username/simplemart.git

# Move into the project directory
cd simplemart

# Install all dependencies
npm install
```

### 2. How to Run Locally
Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```
(or the port shown in your terminal, typically `http://localhost:5173` or `http://localhost:3000`).

---

## 📦 How to Build for Production

To create an optimized production build:

```bash
npm run build
```

This generates all production-ready HTML, CSS, and JavaScript files inside the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 How to Deploy to GitHub Pages

### Option A: Using the gh-pages Package (Recommended & Fastest)

1. **Install `gh-pages`** as a dev dependency (if not already installed):
   ```bash
   npm install -D gh-pages
   ```

2. **Verify repository base path in `vite.config.ts`**:
   If your GitHub repository is named `simplemart`, your site will be hosted at `https://<your-username>.github.io/simplemart/`.
   In `vite.config.ts`:
   ```ts
   base: '/simplemart/', // or relative './'
   ```

3. **Deploy with one command**:
   ```bash
   npm run build:gh-pages
   npx gh-pages -d dist
   ```

4. Go to your GitHub repository -> **Settings** -> **Pages** -> ensure the source is set to the `gh-pages` branch. Your website will be live in a couple of minutes!

---

### Option B: Using GitHub Actions (Automated Workflow)

1. In your repository, create the file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:gh-pages

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Go to **Settings** -> **Pages** -> Set Source to **GitHub Actions**.
3. Push to `main` branch to trigger an automatic deployment!

---

## 📁 Project Structure

```
simplemart/
├── index.html              # HTML entry point
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration with base path support
├── README.md               # Beginner guide & documentation
└── src/
    ├── main.tsx            # React application entry point
    ├── App.tsx             # Root component & Hash router
    ├── index.css           # Tailwind CSS styles
    ├── types.ts            # TypeScript interfaces (Product, Cart, Order, Profile)
    ├── components/
    │   ├── Navbar.tsx      # Responsive header with search & cart count badge
    │   ├── ProductCard.tsx # Clean product card with Add to Cart button
    │   └── Footer.tsx      # Minimal footer with customer assurance badges
    ├── pages/
    │   ├── Home.tsx        # Welcome banner & 8 featured items
    │   ├── Products.tsx    # Full 12-item catalog with search & category filters
    │   ├── ProductDetails.tsx # Detailed view, quantity counter & similar items
    │   ├── Cart.tsx        # Cart management & demo checkout popup
    │   ├── Orders.tsx      # Past order history with status pills
    │   └── Profile.tsx     # User profile card (Janani Kumar)
    ├── data/
    │   └── products.ts     # 12 static dummy products & initial order records
    └── context/
        └── CartContext.tsx # Global cart, orders & search state with localStorage
```

---

## 🛡️ License

This project is licensed under the MIT License. Created for demo, learning, and prototype purposes.
