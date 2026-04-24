# 💎LUXSTORE —  Product Store App

A modern, high-performance React e-commerce application built as a full assignment project to demonstrate advanced state management concepts using:

- Context API + useReducer
- Redux Toolkit
- React Query

This project simulates a real-world luxury digital store experience with a premium UI/UX, scalable architecture, and production-level state handling patterns.

---

## Live Demo

🌐 https://product-store-app-tau.vercel.app/

---

## Demo Video

📽️ *https://youtu.be/ago4MJG99HM?feature=shared*

---

## 📸 Screenshots

###  Home Page
![Home](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-2026-04-24-19_51_05.png)
![home withe light theme and list view](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-2026-04-24-19_52_07.png)

### Cart Page
![empty cart page](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-cart-2026-04-24-19_57_39.png)
![Cart](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-cart-2026-04-24-19_52_53.png)

### Product Details
![Details](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-product-4-2026-04-24-20_41_10.png)
![Details light theme](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-product-3-2026-04-24-19_53_30.png)

### Checkout Flow
![Checkout1](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-checkout-2026-04-24-19_54_56.png)
![Checkout2](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-checkout-2026-04-24-19_55_45.png)
![Checkout3](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-checkout-2026-04-24-19_56_10.png)
![Checkout4](https://github.com/setayeshazizi/product-store-app/blob/main/screenshots/screencapture-localhost-5173-checkout-2026-04-24-21_35_39%20(1).png)

---

##  Tech Stack

- React (Vite)
-  Material UI v9
-  Framer Motion
-  TanStack React Query v5
-  Redux Toolkit
-  Context API + useReducer
-  LocalStorage Persistence
-  DummyJSON API
-  Deployed on Vercel

---

## State Management Architecture

This project is intentionally designed to separate different types of state:

### 1.  Context API + useReducer (UI State)
Used for global UI preferences:
- Dark / Light Mode
- Grid / List View
- Category / Filter selection

✔ Implemented with:
- Context Provider
- useReducer with action-based state updates
- useContext consumption across components
- No prop drilling

---

### 2. Redux Toolkit (Client State)
Used for shopping cart logic:

Features:
- Add to cart
- Remove from cart
- Increase quantity
- Decrease quantity
- Clear cart
- Total quantity calculation
- Total price calculation
- Persistent cart (localStorage sync)

✔ Implemented with:
- cartSlice
- configureStore
- useSelector / useDispatch

---

### 3.  React Query (Server State)
Used for API data handling:

Features:
- Product fetching from DummyJSON API
- Loading state handling (Skeleton UI)
- Error handling with retry button
- Cached queries (queryKey-based)
- refetchOnReconnect enabled

✔ Extra feature:
- Product Details Page with dynamic routing

---

##  Features

###  Home Page
- Hero section with gradient title
- Search bar (glassmorphism)
- Category filter (chips)
- Sorting options
- Responsive product grid

###  Product System
- Product cards with animations
- Staggered grid loading
- Rating system
- Category badges
- Add to cart button

###  Product Details Page
- Animated image section
- Discount display
- Feature badges:
  - Free Shipping
  - 30-Day Returns
  - 2-Year Warranty
  - Secure Payment
- Wishlist system
- Share (Web Share API)
- Related products section

###  Cart System
- Quantity controls (+ / -)
- Remove item animation
- Sticky order summary
- Tax + subtotal calculation
- Clear cart option

### Checkout Flow
3-step checkout:
1. Shipping Details
2. Payment Information
3. Order Confirmation

Final success screen with animation.

---

##  Assignment Requirements Mapping

### Context API + useReducer
Used for:
- Theme (Dark / Light)
- Layout (Grid / List)
- Category filtering

✔ Implemented via:
- Context Provider
- Reducer actions
- Global UI state management

---

###  Redux Toolkit
Used for:
- Cart management system
- Quantity control
- Price calculations
- Persistent storage

✔ Implemented via:
- cartSlice
- Redux store
- useSelector / useDispatch

---

###  React Query
Used for:
- Product fetching
- API caching
- Loading states
- Error handling
- Refetching strategy

✔ Features:
- queryKey-based caching
- retry handling
- staleTime optimization

---

##  Requirements Checklist

- [x] Products fetched from API
- [x] Loading state implemented
- [x] Error state implemented
- [x] Redux Toolkit cart system
- [x] Context API + useReducer settings system
- [x] Fully responsive UI
- [x] State updates correctly across app
- [x] Clean architecture & reusable components

---

## Folder Structure
```
src/
│
├── api/
├── components/
├── context/
├── features/
│   └── cart/
├── hooks/
├── pages/
└── App.jsx
```

---

## Performance Highlights

- React Query caching strategy optimized
- Minimal re-renders using Redux selectors
- Smooth Framer Motion animations
- LocalStorage persistence
- Fully responsive layout

---

## How to Run Project

```
npm install
npm run dev
```

 ### Future Improvements
Authentication system
Real payment gateway (Stripe)
Admin dashboard
Backend integration (Node/Express)
Product reviews system

 ### License
This project is for educational purposes and assignment submission.
