import Modal from "./components/Modal";
import DataTable from "./components/Datatable";
import FrameworkCard from "./components/FrameworkCard";
import { frameworksData, frameworkControlsData } from "./data/frameworks";

async function App() {
  const template = document.createElement("template");

  template.innerHTML = `
    <div class="app">
      <header class="header"></header>

      <main class="main">
        <div class="main-header">
          <div class="header-left">
            <img class="avatar" src="/assets/images/info-avatars.svg" alt="Info avatars" />
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
              <img class="btn-icon" src="/assets/images/frame-1013-1.svg" alt="Help icon" />
              <span>Help</span>
            </button>
            <button class="btn btn-primary">
              <img class="btn-icon" src="/assets/images/frame-1013.svg" alt="Add icon" />
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
            <img class="detail-icon" src="/assets/images/icon-format-list.svg" alt="Icon format list" />
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

  const node = template.content.cloneNode(true);

  // Initialize immediately since main.js already handles DOMContentLoaded
  initializeApp(node);
  
  return node;
}

function initializeApp(rootNode) {
  const frameworksGrid = rootNode.querySelector("#frameworks-grid");
  // Remove 'new' - just call the function
  const modal = Modal();
  let currentDataTable = null;
  

      // Render frameworks
   frameworksData.forEach((framework) => {
    const card = FrameworkCard(framework);
    const cardElement = card.render(null, selectFramework);
    frameworksGrid.appendChild(cardElement);
  });

  // Framework selection handler
  function selectFramework(framework) {

 
    // Remove active state from all cards
    frameworksGrid.querySelectorAll(".framework-card").forEach((card) => {
      card.classList.remove("selected");
    });

    // Add active state to selected card
    const selectedCard = frameworksGrid.querySelector(
      `[data-framework-id="${framework.id}"]`
    );

    console.log('selectedCard :>> ', selectedCard);

    if (selectedCard) {
      selectedCard.classList.add("selected");
    }

    // Update detail panel
    updateDetailPanel(framework, frameworksGrid);

    // Initialize or update DataTable
    const frameworkControls = frameworksGrid.querySelector("#framework-controls");

    if (currentDataTable) {
      currentDataTable.clear();
    }

    if (frameworkControlsData[framework.id]) {
      if (!currentDataTable) {
        currentDataTable = new DataTable(frameworkControls);
      }
      currentDataTable.loadData(frameworkControlsData[framework.id]);
    }
  }

  // Update detail panel
  function updateDetailPanel(framework, rootNode) {
    const detailPanel = rootNode.querySelector(".detail-panel");

    detailPanel.innerHTML = `
      <div id="framework-controls" class="framework-controls"></div>
    `;
  }

 
  rootNode.querySelector(".btn-primary").addEventListener("click", () => {
    modal.open();
  });

 

  // Listen for new framework events
  window.addEventListener("addFramework", (e) => {
    const newFramework = e.detail;
    frameworksData.push(newFramework);

    const card = FrameworkCard(newFramework);
    const cardElement = card.render(null, selectFramework);
    frameworksGrid.appendChild(cardElement);

    selectFramework(newFramework);
  });
}

export default App;
