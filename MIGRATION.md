# Migration Guide

This document outlines the migration from legacy class-based components to the current template-based structure.

## Migration Overview

All components from the `legacy/` folder have been successfully migrated to the current structure using template-based patterns similar to `User.js`.

## Migrated Components

### 1. Datatable Component
- **Location**: `src/components/Datatable/`
- **Files**: 
  - `index.js` - Main component file
  - `datatable.scss` - Component styles
- **Changes**:
  - Converted from ES6 class to functional component
  - Uses template string for HTML structure
  - Returns object with public API methods
  - Maintains all original functionality (search, pagination, sorting)

### 2. Modal Component  
- **Location**: `src/components/Modal/`
- **Files**:
  - `index.js` - Main component file
  - `modal.scss` - Component styles
- **Changes**:
  - Converted from ES6 class to functional component
  - Multi-step form functionality preserved
  - File upload capabilities maintained
  - Event handling and validation intact

### 3. FrameworkCard Component
- **Location**: `src/components/FrameworkCard/`
- **Files**:
  - `index.js` - Main component file
  - `frameworkcard.scss` - Component styles
- **Changes**:
  - Created new component based on CSS patterns
  - Template-based rendering
  - Accessibility features added (keyboard navigation, ARIA labels)
  - Status badge system implemented

## SCSS Structure

### Reorganized SCSS Files
- **Location**: `src/scss/`
- **Files**:
  - `variables.scss` - Color and font variables
  - `components.scss` - Shared component styles
  - `main.scss` - Main stylesheet with imports
- **Integration**: Updated `src/scss/app.scss` to import new main styles

## Utilities

### RenderIf Utility
- **Location**: `src/utils/RenderIf.js`
- **Changes**: 
  - Adapted for template string usage
  - Supports conditional rendering with fallback options

## Usage Examples

See `src/examples/component-usage.js` for complete usage examples of all migrated components.

### Basic Component Usage Pattern

```javascript
// Import component
import ComponentName from './components/ComponentName/index.js';

// Create component instance
const component = ComponentName(data);

// Render to container
component.render(containerElement, options);
```

### Template-Based Structure

All components follow this pattern:
```javascript
const Component = (data) => {
  const template = `
    <div class="component-class">
      <!-- HTML template -->
    </div>
  `;

  const bindEvents = () => {
    // Event listeners
  };

  const render = (container) => {
    container.innerHTML = template;
    bindEvents();
  };

  return {
    render,
    // other public methods
  };
};
```

## File Structure

```
src/
├── components/
│   ├── Datatable/
│   │   ├── index.js
│   │   └── datatable.scss
│   ├── Modal/
│   │   ├── index.js
│   │   └── modal.scss
│   ├── FrameworkCard/
│   │   ├── index.js
│   │   └── frameworkcard.scss
│   ├── Header.js
│   └── User.js
├── scss/
│   ├── variables.scss
│   ├── components.scss
│   ├── main.scss
│   ├── app.scss
│   └── _card.scss
├── utils/
│   └── RenderIf.js
└── examples/
    └── component-usage.js
```

## Benefits of Migration

1. **Consistency**: All components now follow the same template-based pattern
2. **Maintainability**: Easier to understand and modify
3. **Modularity**: Components are self-contained with their styles
4. **Accessibility**: Enhanced keyboard navigation and ARIA support
5. **Modern Structure**: Organized folder structure with proper separation of concerns

## Breaking Changes

- Legacy class-based component APIs have been replaced
- Import paths have changed for migrated components
- Some component initialization patterns may need updating

## Next Steps

1. Update any existing code that imports legacy components
2. Test all component functionality in your application
3. Consider adding TypeScript definitions if needed
4. Implement any additional features or customizations

## Notes

- All SCSS files maintain original styling and behavior
- Component functionality is preserved during migration
- Legacy folder has been removed after successful migration
- CSS variables are used for theming consistency
