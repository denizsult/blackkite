import Modal from "./components/Modal";
import DataTable from "./components/Datatable";
import FrameworkCard from "./components/FrameworkCard";
import { frameworksData, frameworkControlsData } from "./data/frameworks";
import EmptyFrameworkState from "./components/EmptyFrameworkState";
import { Header } from "./components/Header";

async function App() {
  const template = document.createElement("template");

  template.innerHTML = `
    <div class="app">
      <main class="main" id="main-container">
       ${Header()}
        <div class="content-area">
          <div class="frameworks-list">
            <div class="scroll-area">
              <div class="frameworks-grid" id="frameworks-grid"></div>
            </div>
          </div>

           ${EmptyFrameworkState()}
        </div>
      </main>
    </div>
  `;

  const node = template.content.cloneNode(true);

  // Initialize immediately since main.js already handles DOMContentLoaded
  initializeApp(node);

  return node;
}

function initializeApp(rootNode) {
  const mainContainerDOM = rootNode.querySelector("#main-container");
  const frameworksListDOM = rootNode.querySelector("#frameworks-grid");
  // Remove 'new' - just call the function
  const modal = Modal();
  let currentDataTable = null;

  // Render frameworks
  frameworksData.forEach((framework) => {
    const card = FrameworkCard(framework);
    const cardElement = card.render(null, selectFramework);
    frameworksListDOM.appendChild(cardElement);
  });

  // Framework selection handler
  function selectFramework(framework) {
    // Remove active state from all cards
    frameworksListDOM.querySelectorAll(".framework-card").forEach((card) => {
      card.classList.remove("selected");
    });

    // Add active state to selected card
    const selectedCard = frameworksListDOM.querySelector(
      `[data-framework-id="${framework.id}"]`
    );

    if (selectedCard) {
      selectedCard.classList.add("selected");
    }

    updateDetailPanel(framework, mainContainerDOM);

    // Initialize or update DataTable
    const frameworkControls = mainContainerDOM.querySelector(
      "#framework-controls"
    );

    if (!!currentDataTable) {
      currentDataTable.clear();
      currentDataTable = null;
    }

    if (frameworkControlsData[framework.id]) {
      if (!currentDataTable) {
        currentDataTable = DataTable(frameworkControls);
        currentDataTable.init();
        console.log("currentDataTable :>> ", currentDataTable);
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

  rootNode
    .querySelector("#open-create-framework-modal")
    .addEventListener("click", () => {
      modal.open();
    });

  // Listen for new framework events
  window.addEventListener("addFramework", (e) => {
    const newFramework = e.detail;
    frameworksData.push(newFramework);

    const card = FrameworkCard(newFramework);
    const cardElement = card.render(null, selectFramework);
    frameworksListDOM.appendChild(cardElement);

    selectFramework(newFramework);
  });
}

export default App;
