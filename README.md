# Compliance Frameworks Management App

A modern vanilla JavaScript application for managing compliance frameworks and security controls. Built with Parcel bundler, Sass, and component-based architecture.

## 🚀 Features

- **Framework Management**: View and manage custom and system compliance frameworks
- **Interactive Data Tables**: Browse security controls with filtering and actions
- **Modal Workflows**: Multi-step framework creation process
- **Responsive Design**: Modern UI with Bootstrap integration
- **Component Architecture**: Modular vanilla JS components
- **Asset Management**: Optimized image and icon handling

## 🛠️ Tech Stack

- **Vanilla JavaScript**: Component-based architecture without frameworks
- **Parcel**: Zero-configuration build tool
- **Sass**: CSS preprocessing with modular stylesheets
- **Bootstrap 5**: UI framework for responsive design
- **Babel**: JavaScript transpilation for browser compatibility

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Datatable/       # Data table with actions
│   ├── FrameworkCard/   # Framework display cards
│   ├── Header/          # Application header
│   ├── Modal/           # Multi-step modal dialogs
│   └── Stepper/         # Step navigation component
├── data/                # Mock data and configurations
├── scss/                # Sass stylesheets and variables
└── utils/               # Utility functions and helpers
```

## 🎯 Usage

### Development

Install dependencies:
```bash
npm install
```

Start development server at http://localhost:3000:
```bash
npm run dev
```

### Production

Build optimized assets for production:
```bash
npm run build
```

Clean development files:
```bash
npm run clean
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build in `dist/` folder
- `npm run clean` - Remove development cache and build files
- `npm run copy-assets` - Copy public assets to development folder

## 🎨 Features Overview

### Framework Cards
- Visual representation of compliance frameworks
- Status indicators (Ready to Map, In Progress, Published, etc.)
- Interactive selection and management

### Data Tables
- Sortable and filterable security controls
- Action buttons for edit/delete operations
- Empty state handling

### Modal System
- Multi-step workflow for creating frameworks
- Form validation and progress tracking
- Responsive design across devices
