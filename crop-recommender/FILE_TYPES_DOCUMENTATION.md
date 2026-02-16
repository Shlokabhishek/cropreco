# 📁 File Types & Documentation Guide

## Complete Reference of All File Types Used in Crop Recommender Project

---

## 📋 Table of Contents

1. [Source Code Files](#source-code-files)
2. [Configuration Files](#configuration-files)
3. [Data Files](#data-files)
4. [Documentation Files](#documentation-files)
5. [Web Files](#web-files)
6. [Build & Deployment Files](#build--deployment-files)
7. [Testing Files](#testing-files)
8. [Utility Scripts](#utility-scripts)
9. [Media Files](#media-files)
10. [Research Materials](#research-materials)
11. [File Structure Overview](#file-structure-overview)

---

## 1. Source Code Files

### 1.1 TypeScript Files (`.ts`)

**Purpose:** TypeScript source files - JavaScript with static type checking  
**Why Used:** Type safety, better IDE support, catch errors at compile time  
**Compiled To:** JavaScript (`.js`)  

#### **Locations:**

##### Core Services
- `src/services/recommender.ts` - Main crop recommendation algorithms
- `src/services/preprocess.ts` - Data normalization and preprocessing
- `src/services/weather.ts` - Weather API integration
- `src/services/supabase.ts` - Supabase authentication service
- `src/services/api.ts` - API client for backend communication
- `src/services/constants.ts` - Application constants and configs
- `src/services/dataLoader.ts` - CSV data loading utilities

##### State Management
- `src/state/store.ts` - Redux store configuration
- `src/state/slices/cropSlice.ts` - Crop recommendations state
- `src/state/slices/userSlice.ts` - User profile state
- `src/state/slices/authSlice.ts` - Authentication state
- `src/state/slices/marketSlice.ts` - Market data state
- `src/state/slices/weatherSlice.ts` - Weather data state

##### Custom Hooks
- `src/hooks/useCropRecommendation.ts` - Crop recommendation logic
- `src/hooks/useMarketData.ts` - Market data fetching
- `src/hooks/useWeatherData.ts` - Weather data fetching

##### Internationalization
- `src/i18n/index.ts` - i18n setup
- `src/i18n/translations.ts` - Translation strings

##### Testing
- `src/test/setup.ts` - Test environment configuration

##### Backend (Server)
- `server/src/index.ts` - Express server entry point
- `server/src/config/database.ts` - SQLite database configuration
- `server/src/middleware/auth.ts` - JWT authentication middleware
- `server/src/middleware/errorHandler.ts` - Error handling middleware

---

### 1.2 TypeScript React Files (`.tsx`)

**Purpose:** TypeScript files with JSX/TSX syntax for React components  
**Why Used:** Type-safe React components with inline markup  

#### **Locations:**

##### Pages
- `src/pages/Home.tsx` - Landing page
- `src/pages/Dashboard.tsx` - Main dashboard
- `src/pages/Recommendations.tsx` - Recommendations display
- `src/pages/NotFound.tsx` - 404 error page

##### Main App
- `src/App.tsx` - Root application component
- `src/main.tsx` - Application entry point (renders to DOM)
- `src/index.tsx` - Alternative entry point

##### Components
**Authentication:**
- `src/components/Auth/Login.tsx`

**Farmer Profile:**
- `src/components/FarmerProfile/FarmerProfile.tsx`
- `src/components/FarmerProfile/index.tsx`

**Crop Recommendations:**
- `src/components/CropRecommendations/CropRecommendations.tsx`

**Crops to Avoid:**
- `src/components/CropsToAvoid/CropsToAvoid.tsx`
- `src/components/CropsToAvoid/index.tsx`

**Market & Price Analysis:**
- `src/components/MarketTrends/MarketTrends.tsx`
- `src/components/PriceAnalysis/PriceAnalysis.tsx`

**Soil & Weather:**
- `src/components/SoilSuitability/SoilSuitability.tsx`
- `src/components/WeatherTrends/WeatherTrends.tsx`

**Language:**
- `src/components/LanguageSelector/LanguageSelector.tsx`
- `src/components/LanguageSelector/index.tsx`
- `src/i18n/LanguageContext.tsx`

**Shared Components:**
- `src/components/shared/Button.tsx`
- `src/components/shared/Card.tsx`
- `src/components/shared/Input.tsx`

**Testing:**
- `src/components/shared/Button.test.tsx`
- `src/components/shared/Card.test.tsx`
- `src/components/shared/Input.test.tsx`
- `src/components/FarmerProfile/FarmerProfile.test.tsx`
- `src/components/MarketTrends/MarketTrends.test.tsx`
- `src/components/SoilSuitability/SoilSuitability.test.tsx`

---

### 1.3 TypeScript Declaration Files (`.d.ts`)

**Purpose:** Type definitions for external modules and ambient declarations  
**Why Used:** Provides type information for untyped libraries, custom type declarations  

#### **Locations:**
- `src/types/external-modules.d.ts` - Type declarations for external modules
- `src/react-app-env.d.ts` - React app environment types

**Example Use Cases:**
- Declaring types for libraries without TypeScript support
- Augmenting existing types
- Global type declarations

---

### 1.4 CSS Files (`.css`)

**Purpose:** Cascading Style Sheets for component styling  
**Why Used:** Visual styling, layout, responsiveness  

#### **Locations:**

##### Global Styles
- `src/styles.css` - Global application styles

##### Component-Specific Styles
- `src/components/Auth/Login.css`
- `src/components/FarmerProfile/FarmerProfile.css`
- `src/components/CropRecommendations/CropRecommendations.css`
- `src/components/CropsToAvoid/CropsToAvoid.css`
- `src/components/MarketTrends/MarketTrends.css`
- `src/components/PriceAnalysis/PriceAnalysis.css`
- `src/components/SoilSuitability/SoilSuitability.css`
- `src/components/WeatherTrends/WeatherTrends.css`
- `src/components/LanguageSelector/LanguageSelector.css`
- `src/components/shared/Button.css`
- `src/components/shared/Card.css`
- `src/components/shared/Input.css`

**Styling Approach:** Component-scoped CSS for modularity and maintainability

---

### 1.5 Backend Route Files (`.ts`)

**Purpose:** Express.js route handlers  
**Why Used:** REST API endpoint definitions  

#### **Locations:**
- `server/src/routes/authRoutes.ts` - User authentication endpoints
- `server/src/routes/userRoutes.ts` - User profile CRUD operations
- `server/src/routes/cropRoutes.ts` - Crop recommendation endpoints
- `server/src/routes/weatherRoutes.ts` - Weather data endpoints
- `server/src/routes/marketRoutes.ts` - Market price endpoints

---

## 2. Configuration Files

### 2.1 TypeScript Config (`.json`)

#### `tsconfig.json`
**Purpose:** TypeScript compiler configuration for main application  
**Location:** Root directory  
**Key Settings:**
- Target: ESNext
- Module: ESNext
- JSX: react-jsx
- Strict mode enabled
- Source: `src/` directory

**Why Used:** Defines how TypeScript code is compiled to JavaScript

#### `tsconfig.node.json`
**Purpose:** TypeScript configuration for Node.js tools (Vite config)  
**Location:** Root directory  
**Why Used:** Separate config for build tools

#### `server/tsconfig.json`
**Purpose:** TypeScript configuration for backend server  
**Location:** `server/` directory  
**Why Used:** Server-specific compilation settings

---

### 2.2 Package Management Files

#### `package.json`
**Purpose:** NPM package configuration, scripts, dependencies  
**Locations:**
- Root: `package.json` (frontend)
- Server: `server/package.json` (backend)

**Contains:**
- Project metadata
- Dependencies (runtime)
- DevDependencies (development only)
- Scripts (dev, build, test)

**Key Scripts:**
```json
"dev": "vite"              // Start dev server
"build": "vite build"      // Production build
"test": "vitest"           // Run tests
"dev:all": "..."          // Run frontend + backend
```

#### `package-lock.json`
**Purpose:** Locked dependency versions for reproducible installs  
**Locations:**
- Root: `package-lock.json`
- Server: `server/package-lock.json`

**Why Used:** Ensures exact same dependency versions across all environments

---

### 2.3 Build Tool Configuration

#### `vite.config.ts`
**Purpose:** Vite bundler configuration  
**Location:** Root directory  

**Features:**
- React plugin configuration
- Dev server settings
- Build optimization
- Path aliases
- Test configuration

**Why Used:** Modern, fast build tool replacing Webpack

---

### 2.4 Environment Configuration

#### `.env` files
**Purpose:** Environment variables (not in repository)  
**Expected Location:** Root directory  

**Contains:**
- API keys (Supabase, Weather API, etc.)
- Database credentials
- Secret tokens
- Environment-specific configs

#### `.env.example`
**Purpose:** Template for environment variables  
**Locations:**
- Root: `.env.example`
- Server: `server/.env.example`

**Why Used:** Shows required environment variables without exposing secrets

---

### 2.5 Git Configuration

#### `.gitignore`
**Purpose:** Specifies intentionally untracked files  
**Locations:**
- Root: `.gitignore`
- Server: `server/.gitignore`

**Typical Exclusions:**
- `node_modules/`
- `.env`
- `dist/` or `build/`
- IDE-specific files
- Log files

**Why Used:** Prevents committing sensitive data, build artifacts, dependencies

---

### 2.6 Deployment Configuration

#### `vercel.json`
**Purpose:** Vercel deployment configuration  
**Location:** Root directory  

**Contains:**
- Build commands
- Output directory
- Environment variables
- Routing rules
- Serverless functions config

**Why Used:** Configures cloud deployment on Vercel platform

---

## 3. Data Files

### 3.1 CSV Files (`.csv`)

**Purpose:** Comma/Tab-separated data files  
**Format:** Structured tabular data  

#### **Locations:**

##### Crop Dataset
- `public/data/crop_dataset.csv`
- `src/data/crop_dataset.csv`

**Structure:**
```
Crop,Season,State,Area,Production,Rainfall,Fertilizer,Pesticide,Yield,Price
Rice,Kharif,Maharashtra,1000,3000,800,200,50,3.0,2100
...
```

**Records:** 10,000+ entries  
**Purpose:** Historical crop performance data for recommendations

##### Soil Dataset
- `public/data/soil_dataset.csv`
- `src/data/soil_dataset.csv`

**Structure:**
```
Soil_Type,Soil_Quality,Suitable_Crops,Fertilizer_Range
Loamy,Good,"Rice,Wheat,Maize",200-400
...
```

**Purpose:** Soil-crop compatibility mapping

**Why CSV Used:**
- Easy to read/parse
- Portable across platforms
- Human-readable
- Standard format for tabular data

---

### 3.2 SQLite Database (`.db`, `.sqlite`)

**Purpose:** Relational database for backend  
**Location:** `server/data/` (generated at runtime)  

**Tables:**
- `users` - User accounts
- `profiles` - Farmer profiles
- `recommendations` - Historical recommendations
- `market_prices` - Cached price data

**Why SQLite Used:**
- File-based (no server needed)
- Lightweight
- Full SQL support
- Perfect for small to medium apps

---

## 4. Documentation Files

### 4.1 Markdown Files (`.md`)

**Purpose:** Human-readable documentation  
**Format:** Markdown markup language  

#### **Locations:**

##### Main Documentation
- `README.md` - Project overview and setup instructions
- `ARCHITECTURE.md` - System architecture documentation
- `ALGORITHM_LOCATIONS.md` - Algorithm implementation map
- `CHANGES.md` - Changelog of project modifications
- `TESTING.md` - Testing guide and strategy
- `QUICK_REFERENCE.md` - Quick command reference

##### Setup Guides
- `BACKEND_SETUP.md` - Backend installation guide
- `BACKEND_IMPLEMENTATION.md` - Backend implementation details
- `GOOGLE_AUTH_SETUP.md` - Supabase authentication setup
- `DEPLOY.md` - Deployment instructions

##### Component Documentation
- `src/assets/README.md` - Asset usage guide
- `src/data/README.md` - Data files documentation
- `server/README.md` - Server-specific documentation

**Why Markdown Used:**
- Simple syntax
- Renders nicely on GitHub
- Widely supported
- Easy to version control
- Converts to HTML easily

---

### 4.2 HTML Documentation (`.html`)

**Purpose:** Rich formatted documentation with styling  

#### **Locations:**

##### Algorithm Documentation
- `Algorithm_Documentation/00_Documentation_Index.html`
- `Algorithm_Documentation/01_Algorithm_Overview.html`
- `Algorithm_Documentation/02_Crop_Recommendation_Algorithms.html`
- `Algorithm_Documentation/03_Data_Processing_Techniques.html`
- `Algorithm_Documentation/04_Scoring_and_Farming_Types.html`
- `Algorithm_Documentation/05_API_Integration_Techniques.html`
- `Algorithm_Documentation/COMPLETE_SYSTEM_DOCUMENTATION.html`
- `Algorithm_Documentation/QUICK_REFERENCE_CARD.html`

##### Summary Documents
- `ALGORITHMS_SUMMARY.html` - Visual algorithm documentation
- `CROP_RECOMMENDER_PRESENTATION.html` - Project presentation

##### Research Papers
- `papers/RESEARCH_PAPER.html`
- `papers/RESEARCH_PAPERS_SUMMARY.html`
- `papers/LITERATURE_SURVEY.html`

**Why HTML Used:**
- Rich formatting (colors, tables, code blocks)
- Interactive elements
- Better for presentations
- Printable
- Embeddable styling

---

### 4.3 Word Documents (`.docx`)

**Purpose:** Editable formatted documents  
**Locations:**
- `papers/RESEARCH_PAPER.docx`
- `papers/RESEARCH_PAPERS_SUMMARY.docx`
- `papers/LITERATURE_SURVEY.docx`

**Why Used:**
- Easy editing
- Academic format
- Track changes
- Comments/reviews
- Standard format for submissions

---

### 4.4 PowerPoint Presentations (`.pptx`)

**Purpose:** Slide-based presentations  
**Locations:**
- `CROP_RECOMMENDER_PRESENTATION.pptx`
- `papers/RESEARCH_PAPER.pptx`
- `papers/RESEARCH_PAPERS_SUMMARY.pptx`

**Why Used:**
- Stakeholder presentations
- Project demos
- Academic presentations
- Visual communication

---

### 4.5 PDF Research Papers (`.pdf`)

**Purpose:** Academic research papers  
**Location:** `research papers/` directory  

**Files (10 papers):**
1. `Optimizing Crop Yield - An IoT and ML-based Soil Testing and Crop Recommendation System.pdf`
2. `Machine Learning-Based Crop Recommendation System for Mizoram.pdf`
3. `GCN-CRS Performance Evaluation of Crop Recommendation System using Graph Convolutional Neural Network.pdf`
4. `Enhancing Efficiency of Crop Recommendation using Incremental Rank-based Feature Selection Method.pdf`
5. `Enhancing Crop Recommendation Systems Using Deep Learning Techniques on Soil - Environmental Data.pdf`
6. `Development of a Machine Learning-Based System for Optimizing Crop Recommendations.pdf`
7. `Crop Recommendation System using Antlion Optimization and Decision Tree Algorithm.pdf`
8. `Crop Recommendation Based on Soil Properties A Comprehensive Analysis.pdf`
9. `AI-Powered Leaf Disease Detection and Crop Recommendation System.pdf`
10. `A Web-Based Agriculture Recommendation System using Deep Learning for Crops- Fertilizers- and Pesticides.pdf`

**Why Used:**
- Literature review
- Algorithm inspiration
- Academic references
- Best practices research

---

## 5. Web Files

### 5.1 HTML Entry Files

#### `index.html`
**Purpose:** Main HTML entry point  
**Locations:**
- Root: `index.html` (primary)
- Public: `public/index.html` (served by Vite)

**Contains:**
- Base HTML structure
- Meta tags
- Root div for React mounting
- Script tag for main.tsx

**Why Used:** Single Page Application (SPA) entry point

---

### 5.2 Static Assets

#### Text Files (`.txt`)
- `public/PLACE_IMAGE_HERE.txt` - Placeholder instruction
- `src/assets/image-placeholder.txt` - Asset instruction

#### Image Files (`.jpg`, `.png`, `.svg`)
- `src/assets/wheat-background.jpg` - Background image

**Location:** `src/assets/` and `public/`  
**Why Used:** Static resources served directly

---

## 6. Build & Deployment Files

### 6.1 Setup Scripts

#### `setup.bat`
**Purpose:** Windows setup automation script  
**Location:** Root directory  
**Runs:**
- `npm install`
- `npm run server:install`
- Environment setup checks

#### `setup.sh`
**Purpose:** Unix/Linux/Mac setup script  
**Location:** Root directory  
**Same functionality as `.bat` for Unix systems

**Why Used:** One-command project setup for developers

---

## 7. Testing Files

### 7.1 Test Files (`.test.tsx`, `.test.ts`)

**Purpose:** Unit and component tests  
**Framework:** Vitest + React Testing Library  

#### **Locations:**
- `src/components/shared/Button.test.tsx`
- `src/components/shared/Card.test.tsx`
- `src/components/shared/Input.test.tsx`
- `src/components/FarmerProfile/FarmerProfile.test.tsx`
- `src/components/MarketTrends/MarketTrends.test.tsx`
- `src/components/SoilSuitability/SoilSuitability.test.tsx`

**Test Setup:**
- `src/test/setup.ts` - Global test configuration

**Why Used:**
- Ensure code quality
- Catch bugs early
- Document expected behavior
- Regression prevention

---

## 8. Utility Scripts

### 8.1 Python Converters

#### `html_to_pptx_converter.py`
**Purpose:** Converts HTML documentation to PowerPoint  
**Location:** Root directory  
**Dependencies:** Listed in `requirements_converter.txt`

#### `html_to_word_converter.py`
**Purpose:** Converts HTML documentation to Word documents  
**Location:** Root directory  

#### `requirements_converter.txt`
**Purpose:** Python dependencies for converter scripts  
**Location:** Root directory  

**Why Used:**
- Generate presentation-ready documents
- Create editable Word docs from HTML
- Academic submission formats

---

## 9. Media Files

### 9.1 Images

**Formats:** `.jpg`, `.png`, `.svg`  
**Locations:**
- `src/assets/` - Application images
- `public/` - Publicly accessible images

**Purpose:**
- UI graphics
- Background images
- Icons
- Logos

---

## 10. Research Materials

### 10.1 Research Papers Directory

**Location:** `research papers/`  
**Contains:** 10 PDF research papers  

**Purpose:**
- Literature review
- Algorithm research
- Methodology inspiration
- Academic citations
- Best practices

---

## 11. File Structure Overview

### 11.1 Directory Tree

```
crop-recommender/
│
├── 📁 src/                          # Frontend source code
│   ├── 📁 assets/                   # Static assets (.jpg, .txt)
│   ├── 📁 components/               # React components (.tsx, .css)
│   │   ├── 📁 Auth/
│   │   ├── 📁 CropRecommendations/
│   │   ├── 📁 CropsToAvoid/
│   │   ├── 📁 FarmerProfile/
│   │   ├── 📁 LanguageSelector/
│   │   ├── 📁 MarketTrends/
│   │   ├── 📁 PriceAnalysis/
│   │   ├── 📁 SoilSuitability/
│   │   ├── 📁 WeatherTrends/
│   │   └── 📁 shared/               # Reusable components
│   ├── 📁 data/                     # CSV datasets
│   ├── 📁 hooks/                    # Custom React hooks (.ts)
│   ├── 📁 i18n/                     # Internationalization (.ts, .tsx)
│   ├── 📁 pages/                    # Page components (.tsx)
│   ├── 📁 services/                 # Business logic & APIs (.ts)
│   ├── 📁 state/                    # Redux store & slices (.ts)
│   │   └── 📁 slices/
│   ├── 📁 test/                     # Test setup
│   ├── 📁 types/                    # TypeScript definitions (.d.ts)
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Entry point
│   ├── index.tsx                    # Alternative entry
│   └── styles.css                   # Global styles
│
├── 📁 server/                       # Backend server
│   ├── 📁 src/                      # Server source code (.ts)
│   │   ├── 📁 config/               # Configuration
│   │   ├── 📁 middleware/           # Express middleware
│   │   └── 📁 routes/               # API routes
│   ├── 📁 server/data/              # SQLite database
│   ├── package.json                 # Server dependencies
│   └── tsconfig.json                # Server TS config
│
├── 📁 public/                       # Public static files
│   ├── 📁 data/                     # CSV data files
│   └── index.html                   # HTML template
│
├── 📁 Algorithm_Documentation/      # HTML documentation
│   ├── 00_Documentation_Index.html
│   ├── 01_Algorithm_Overview.html
│   ├── 02_Crop_Recommendation_Algorithms.html
│   ├── 03_Data_Processing_Techniques.html
│   ├── 04_Scoring_and_Farming_Types.html
│   ├── 05_API_Integration_Techniques.html
│   └── COMPLETE_SYSTEM_DOCUMENTATION.html
│
├── 📁 papers/                       # Research documents
│   ├── RESEARCH_PAPER.html/.docx/.pptx
│   ├── RESEARCH_PAPERS_SUMMARY.html/.docx/.pptx
│   └── LITERATURE_SURVEY.html/.docx
│
├── 📁 research papers/              # Academic PDFs (10 papers)
│
├── 📄 Configuration Files
│   ├── package.json                 # Frontend dependencies
│   ├── package-lock.json            # Locked versions
│   ├── tsconfig.json                # Main TS config
│   ├── tsconfig.node.json           # Node TS config
│   ├── vite.config.ts               # Vite configuration
│   ├── vercel.json                  # Deployment config
│   └── .gitignore                   # Git exclusions
│
├── 📄 Documentation Files (.md)
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── ALGORITHM_LOCATIONS.md
│   ├── BACKEND_IMPLEMENTATION.md
│   ├── BACKEND_SETUP.md
│   ├── CHANGES.md
│   ├── DEPLOY.md
│   ├── GOOGLE_AUTH_SETUP.md
│   ├── QUICK_REFERENCE.md
│   └── TESTING.md
│
├── 📄 HTML Documentation
│   ├── ALGORITHMS_SUMMARY.html
│   └── CROP_RECOMMENDER_PRESENTATION.html/.pptx
│
├── 📄 Utility Scripts
│   ├── setup.bat                    # Windows setup
│   ├── setup.sh                     # Unix/Linux setup
│   ├── html_to_pptx_converter.py    # Python converter
│   ├── html_to_word_converter.py    # Python converter
│   └── requirements_converter.txt   # Python deps
│
└── 📄 Entry Point
    └── index.html                   # Main HTML file
```

---

## 12. File Type Summary Table

| Extension | Type | Count | Primary Location | Purpose |
|-----------|------|-------|------------------|---------|
| `.ts` | TypeScript | 20+ | `src/services/`, `src/state/` | Business logic |
| `.tsx` | TypeScript+React | 25+ | `src/components/`, `src/pages/` | UI components |
| `.d.ts` | Type Definitions | 2 | `src/types/` | Type declarations |
| `.css` | Stylesheets | 15+ | `src/components/` | Styling |
| `.json` | JSON Config | 6 | Root, `server/` | Configuration |
| `.md` | Markdown | 12+ | Root | Documentation |
| `.html` | HTML | 15+ | Root, `Algorithm_Documentation/` | Documentation |
| `.csv` | Data | 2 | `public/data/`, `src/data/` | Datasets |
| `.pdf` | Research | 10 | `research papers/` | Academic papers |
| `.pptx` | Presentations | 3 | Root, `papers/` | Presentations |
| `.docx` | Documents | 3 | `papers/` | Editable docs |
| `.py` | Python Scripts | 2 | Root | Converters |
| `.txt` | Text | 3 | `public/`, `src/assets/` | Instructions |
| `.jpg` | Images | 1 | `src/assets/` | Graphics |
| `.sh` | Shell Script | 1 | Root | Unix setup |
| `.bat` | Batch Script | 1 | Root | Windows setup |

**Total Unique File Types:** 17

---

## 13. File Type Usage by Category

### Development Files
- **Source Code:** `.ts`, `.tsx`, `.d.ts`, `.css`
- **Configuration:** `.json`, `.env`
- **Testing:** `.test.tsx`, `.test.ts`

### Documentation Files
- **Technical Docs:** `.md`
- **Visual Docs:** `.html`, `.pptx`, `.docx`
- **Academic:** `.pdf`

### Data Files
- **Structured Data:** `.csv`
- **Database:** `.db`, `.sqlite` (generated)

### Build & Deployment
- **Configuration:** `.json`, `vercel.json`
- **Build Output:** `.js` (generated), `dist/` folder
- **Setup Scripts:** `.sh`, `.bat`, `.py`

### Static Assets
- **Web:** `.html`, `.css`
- **Media:** `.jpg`, `.png`, `.svg`
- **Text:** `.txt`

---

## 14. Key Takeaways

### Frontend Technology Stack
- **Language:** TypeScript (`.ts`, `.tsx`)
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS Modules
- **State:** Redux Toolkit
- **Testing:** Vitest + Testing Library

### Backend Technology Stack
- **Language:** TypeScript (`.ts`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (`.db`)
- **Testing:** Vitest

### Documentation Approach
- **Code Docs:** Markdown (`.md`) - Version controlled
- **Visual Docs:** HTML (`.html`) - Rich formatting
- **Presentations:** PowerPoint (`.pptx`)
- **Academic:** PDF (`.pdf`) + Word (`.docx`)

### Data Management
- **Storage:** CSV files for datasets
- **Processing:** DanfoJS (JavaScript DataFrames)
- **Caching:** In-memory + SQLite

### Development Workflow
1. Write code in `.ts`/`.tsx` files
2. Style with `.css` modules
3. Test with `.test.tsx` files
4. Configure with `.json` files
5. Document with `.md` files
6. Build with Vite (generates `.js`)
7. Deploy to Vercel

---

## 15. Quick Reference Commands

### View File Type Statistics
```bash
# Count TypeScript files
find src -name "*.ts" -o -name "*.tsx" | wc -l

# Count CSS files
find src -name "*.css" | wc -l

# List all file extensions
find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -nr
```

### Open Specific File Types
```bash
# Open all TypeScript files in services
code src/services/*.ts

# Open all documentation
code *.md

# View all configurations
cat *.json
```

---

## 16. File Naming Conventions

### TypeScript/React Components
- **Format:** `PascalCase.tsx` (e.g., `FarmerProfile.tsx`)
- **Tests:** `PascalCase.test.tsx`
- **Styles:** `PascalCase.css`
- **Index Files:** `index.tsx` (barrel exports)

### Services & Utilities
- **Format:** `camelCase.ts` (e.g., `recommender.ts`, `dataLoader.ts`)
- **Types:** `camelCase.d.ts`

### Configuration
- **Format:** `lowercase.json` or `kebab-case.json`
- **Examples:** `package.json`, `tsconfig.json`, `vite.config.ts`

### Documentation
- **Format:** `UPPERCASE.md` or `PascalCase.html`
- **Examples:** `README.md`, `ARCHITECTURE.md`

### Data Files
- **Format:** `snake_case.csv`
- **Examples:** `crop_dataset.csv`, `soil_dataset.csv`

---

## 17. Development Best Practices

### File Organization
✅ **Do:**
- Group related files in folders
- Keep components with their styles/tests
- Use index files for barrel exports
- Separate concerns (services, components, state)

❌ **Don't:**
- Mix unrelated files
- Create deeply nested structures
- Duplicate configuration
- Commit generated files (`dist/`, `node_modules/`)

### File Management
✅ **Do:**
- Use descriptive names
- Follow naming conventions
- Keep files focused (single responsibility)
- Document complex files

❌ **Don't:**
- Create god files (1000+ lines)
- Use ambiguous names
- Mix concerns in one file

---

## 18. File Dependencies

### Import Flow
```
index.html
  ↓
main.tsx
  ↓
App.tsx
  ↓
pages/*.tsx → components/*.tsx
  ↓
services/*.ts → state/slices/*.ts
  ↓
External libraries (React, Redux, DanfoJS)
```

### Configuration Hierarchy
```
package.json (root dependencies)
  ↓
tsconfig.json (TS settings)
  ↓
vite.config.ts (build settings)
  ↓
vercel.json (deployment)
```

---

**Last Updated:** February 9, 2026  
**Total File Types:** 17 different extensions  
**Primary Languages:** TypeScript (90%), CSS, HTML  
**Documentation Formats:** Markdown, HTML, PDF, PowerPoint, Word
