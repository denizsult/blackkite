import './styles/main.scss';
import { Modal } from './components/modal.js';
import DataTable from './components/Datatable/Datatable.js';
import FrameworkCard from '../src/components/FrameworkCard/index.js';

// Mock framework control data
const frameworkControlsData = {
  1: {
    data: [
      { controlId: "ECF-001", category: "Access Control", description: "Implement strong password policies" },
      { controlId: "ECF-002", category: "Data Protection", description: "Encrypt sensitive data at rest" },
      { controlId: "ECF-003", category: "Network Security", description: "Configure firewall rules" },
      { controlId: "ECF-004", category: "Monitoring", description: "Set up security event logging" },
      { controlId: "ECF-005", category: "Incident Response", description: "Develop incident response plan" }
    ]
  },
  2: {
    data: [
      { controlId: "CSH-001", category: "Authentication", description: "Multi-factor authentication" },
      { controlId: "CSH-002", category: "Authorization", description: "Role-based access control" },
      { controlId: "CSH-003", category: "Data Security", description: "Data classification system" }
    ]
  },
  3: {
    data: [
      { controlId: "DCF-001", category: "Physical Security", description: "Secure facility access" },
      { controlId: "DCF-002", category: "Asset Management", description: "Asset inventory system" },
      { controlId: "DCF-003", category: "Business Continuity", description: "Disaster recovery plan" }
    ]
  }
};

// Framework data
const frameworksData = [
  {
    id: 1,
    type: "Custom Framework",
    title: "ECF 2023",
    description: "Example Custom Framework",
    image: "/rectangle-219.png",
    status: {
      text: "Ready to Map",
      variant: "ready",
      icon: "/icon-info.svg",
    },
  },
  {
    id: 2,
    type: "Custom Framework",
    title: "CSHRTN",
    description: "Custom Framework",
    image: "/rectangle-219-1.png",
    status: {
      text: "Mapping in Progress",
      variant: "progress",
      icon: "/icon-setings.svg",
    },
  },
  {
    id: 3,
    type: "Custom Framework",
    title: "DCF 2023",
    description: "Demo Custom Framework",
    image: "/rectangle-219-2.png",
    status: {
      text: "Ready to Publish",
      variant: "publish",
      icon: "/icon-playlist-check.svg",
    },
  },
  {
    id: 4,
    type: "Custom Framework",
    title: "CF",
    description: "Cybersecurity Framework",
    image: "/rectangle-219-3.png",
    status: {
      text: "Mapping Failed",
      variant: "failed",
      icon: "/icon-close.svg",
    },
  },
  {
    id: 5,
    type: "Custom Framework",
    title: "ISCF",
    description: "Internet Security Custom Framework",
    image: "/rectangle-219-4.png",
    status: {
      text: "Published",
      variant: "published",
      icon: "/icon-check.svg",
    },
  },
  {
    id: 6,
    type: "Custom Framework",
    title: "CSHRTN 2",
    description: "Custom Framework",
    image: "/rectangle-219-5.png",
    status: {
      text: "Deactivated",
      variant: "deactivated",
      icon: "/icon-archive-lock.svg",
    },
  },
  {
    id: 7,
    type: "System Framework",
    title: "GDPR",
    description: "General Data Protection Regulation",
    image: "/rectangle-219-8.svg",
    status: null,
  },
  {
    id: 8,
    type: "System Framework",
    title: "NIST CSF",
    description: "NIST Cybersecurity Framework",
    image: "/rectangle-219-6.png",
    status: null,
  },
  {
    id: 9,
    type: "System Framework",
    title: "ISO27001",
    description: "Internet Security Management",
    image: "/rectangle-219-7.png",
    status: null,
  },
];

// Create framework card element using the FrameworkCard component
function createFrameworkCard(framework) {
  const frameworkCard = FrameworkCard(framework);
  return frameworkCard.render(null, selectFramework);
}

// Select framework function
function selectFramework(framework) {
  // Remove active state from all cards
  document.querySelectorAll('.framework-card').forEach(card => {
    card.classList.remove('active');
  });

  // Add active state to selected card
  const selectedCard = document.querySelector(`[data-framework-id="${framework.id}"]`);
  if (selectedCard) {
    selectedCard.classList.add('active');
  }

  // Update detail panel
  updateDetailPanel(framework);

  // Initialize or update DataTable
  const frameworkControls = document.getElementById('framework-controls');
  
  // Clear existing DataTable if it exists
  if (window.currentDataTable) {
    window.currentDataTable.clear();
  }

  // If framework has control data, initialize and load it
  if (frameworkControlsData[framework.id]) {
    if (!window.currentDataTable) {
      window.currentDataTable = new DataTable(frameworkControls);
    }
    window.currentDataTable.loadData(frameworkControlsData[framework.id]);
  }
}

// Update detail panel
function updateDetailPanel(framework) {
  const detailPanel = document.querySelector('.detail-panel');
  
  detailPanel.innerHTML = `
    <div class="detail-header">
      <img class="detail-icon" src="${framework.image}" alt="Framework icon" />
      <div class="detail-text">
        <div style="margin-bottom: 16px;">
          <strong>${framework.title}</strong>
        </div>
        <div style="font-size: 18px; color: var(--primarygray-700);">
          ${framework.description}
        </div>
        <div style="font-size: 14px; color: var(--primarygray-500); margin-top: 8px;">
          Type: ${framework.type}
        </div>
        ${framework.status ? `
          <div style="margin-top: 16px;">
            <div class="status-badge status-${framework.status.variant}" style="position: static; display: inline-flex;">
              <img class="status-icon" src="${framework.status.icon}" alt="Status icon" />
              <span>${framework.status.text}</span>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
    <div id="framework-controls" class="framework-controls"></div>
  `;
}

// Initialize the application
function initApp() {
  // Initialize modal
  const modal = new Modal();
  
  // Initialize DataTable
  let dataTable = null;

  // Change 'app' to 'root' here
  const app = document.getElementById('root');
  
  app.innerHTML = `
    <div class="app">
      <header class="header"></header>

      <main class="main">
        <div class="main-header">
          <div class="header-left">
            <img class="avatar" src="/info-avatars.svg" alt="Info avatars" />
            <div class="header-content">
              <h1 class="page-title">Compliance Frameworks</h1>
              <nav class="breadcrumb">
                <a href="#" class="breadcrumb-link">Admin</a>
                <span class="breadcrumb-separator">></span>
                <span class="breadcrumb-current">Compliance Frameworks</span>
              </nav>
            </div>
          </div>

          <div class="header-actions">
            <button class="btn btn-help">
              <img class="btn-icon" src="/frame-1013-1.svg" alt="Help icon" />
              <span>Help</span>
            </button>
            <button class="btn btn-primary">
              <img class="btn-icon" src="/frame-1013.svg" alt="Add icon" />
              <span>New Custom Framework</span>
              <div class="btn-badge">1/3</div>
            </button>
          </div>
        </div>

        <div class="content-area">
          <div class="frameworks-list">
            <div class="scroll-area">
              <div class="frameworks-grid" id="frameworks-grid"></div>
            </div>
          </div>

          <div class="detail-panel">
            <img class="detail-icon" src="/icon-format-list.svg" alt="Icon format list" />
            <div class="detail-text">
              Please select framework from list in left side.
              <br />
              or <span class="highlight">click here</span> to add new framework
            </div>
          </div>
        </div>
      </main>

      <footer class="footer"></footer>
    </div>
  `;

  // Render frameworks
  const frameworksGrid = document.getElementById('frameworks-grid');
  frameworksData.forEach(framework => {
    const card = createFrameworkCard(framework);
    frameworksGrid.appendChild(card);
  });

  // Add click handler for "New Custom Framework" button
  document.querySelector('.btn-primary').addEventListener('click', () => {
    modal.open();
  });

  // Add click handler for Help button
  document.querySelector('.btn-help').addEventListener('click', () => {
    alert('Help functionality would be implemented here');
  });

  // Listen for new framework events
  window.addEventListener('addFramework', (e) => {
    const newFramework = e.detail;
    frameworksData.push(newFramework);
    
    // Re-render frameworks grid
    const frameworksGrid = document.getElementById('frameworks-grid');
    const newCard = createFrameworkCard(newFramework);
    frameworksGrid.appendChild(newCard);
    
    // Auto-select the new framework
    selectFramework(newFramework);
  });
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);