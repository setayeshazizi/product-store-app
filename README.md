# 💎 LUXSTORE —  Product Store App

A modern, high-performance React-based luxury e-commerce UI built with a scalable architecture, advanced state management, and premium UI/UX interactions.  
Designed to demonstrate real-world frontend engineering patterns including state separation, async data handling, and production-grade UI design systems.

---

##  Live Demo
🔗 [View Live Project](https://product-store-app-tau.vercel.app/)

---

##  Tech Stack

-  React (Vite)
- Material UI v9
-  Framer Motion
-  TanStack React Query v5
-  Redux Toolkit
-  Context API + useReducer
-  LocalStorage Persistence
-  DummyJSON API
-  Vercel Deployment

---

## Architecture Overview

This project is built using a 3-layer state management architecture:

### 1. Global UI State
Handled via Context API + useReducer
- Theme (Dark / Light Mode)
- Grid / List view toggle
- UI preferences

### 2. Server State
Managed by TanStack React Query
- Product fetching from DummyJSON API
- Smart caching (staleTime, gcTime)
- Retry handling with delay strategy
- Auto refetch on reconnect
- Skeleton loading system

### 3. Client State
Managed via Redux Toolkit
- Cart system (add/remove/update quantity)
- Total price & quantity calculations
- Persistent storage via localStorage

---

## Features

### UI/UX
- Dark / Light theme toggle
- Glassmorphism design system
- Fully responsive layout (mobile → 4K)
- Smooth Framer Motion animations
- Staggered product animations
- Skeleton loading states
- Premium alert & snackbar system

###  Shopping Experience
- Add / remove products from cart
- Quantity management (+ / -)
- Persistent cart (localStorage)
- Wishlist system
- Related products section

###  Product System
- Category filtering (9 categories)
- Grid / List view toggle
- Sorting functionality
- Product search bar
- Rating system with badges

###  Checkout Flow
- 3-step checkout process:
  1. Shipping details
  2. Payment details
  3. Order confirmation
- Order summary sidebar
- Final success animation screen

---

## Pages

-  Home (Hero + Filters + Product Grid)
- Product Details
-  Cart
- Checkout (Multi-step)
-  Success Page

---

## 🧩 Folder Structure
