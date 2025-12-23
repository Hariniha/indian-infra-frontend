# DPPassport - Blockchain Construction Management

A professional construction-tech landing page with Web3 wallet authentication and role-based routing system.

![React](https://img.shields.io/badge/React-18+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-cyan)
![Wagmi](https://img.shields.io/badge/Wagmi-Web3-purple)

## 🏗️ Overview

DPPassport is a blockchain-powered construction management platform providing digital product passports for the built environment. Track construction materials from procurement to installation with immutable, blockchain-verified records.

## ✨ Features

- **Professional Landing Page** with 8 sections (Navigation, Hero, Features, Timeline, Roles, Trust, CTA, Footer)
- **Web3 Wallet Authentication** (MetaMask, WalletConnect, Coinbase Wallet)
- **Role-Based Dashboards** for 6 stakeholder types
- **GSAP Scroll Animations** with smooth transitions
- **Responsive Design** (375px to 1920px+)
- **Industrial Construction Theme** with orange accents

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Color Palette

```
Primary White:    #FFFFFF
Background Gray:  #F8F9FA
Dark Text:        #1A1F2E
Accent Orange:    #E67E22
Steel Gray:       #6B7280
Success Green:    #10B981
```

## 🗂️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (Landing, Dashboards)
├── store/          # Zustand state management
├── config/         # Wagmi Web3 configuration
└── App.jsx         # Main app with routing
```

## 🔒 User Roles

1. **Owner/Developer** - Project oversight
2. **Contractor** - Product registration
3. **Installer/MEP** - Installation updates
4. **Supplier** - Data enrichment
5. **Inspector** - Compliance verification
6. **Regulator** - Public oversight

## 🛣️ Routes

```
/                      - Landing page
/dashboard/owner       - Owner dashboard (protected)
/dashboard/contractor  - Contractor dashboard (protected)
/dashboard/installer   - Installer dashboard (protected)
/dashboard/supplier    - Supplier dashboard (protected)
/dashboard/inspector   - Inspector dashboard (protected)
/dashboard/regulator   - Regulator dashboard (protected)
```

## 🔧 Configuration

Update WalletConnect project ID in `src/config/wagmi.js`:

```javascript
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';
```

Get your ID from: https://cloud.walletconnect.com/

## 📦 Tech Stack

- React 18 + Vite
- Tailwind CSS (CDN)
- React Router v6
- Wagmi + Ethers.js
- Zustand + React Query
- GSAP + Framer Motion
- Lucide React Icons

## 🌐 View Application

The dev server is running at: **http://localhost:5173/**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
