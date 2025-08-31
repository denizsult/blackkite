const Datatable = (container) => {
  let currentData = null;
  let filteredData = null;
  let currentPage = 1;
  let pageSize = 10;
  let searchTerm = "";

  const template = `
    <div class="data-table-component" id="data-table-component">
      <div class="search-section">
        <label for="search-input">Search</label>
        <input type="text" id="search-input" class="search-input" placeholder="Search..." />
      </div>
      
      <div class="table-wrapper">
        <div id="loading-spinner" class="loading-spinner hidden">
          <div class="spinner"></div>
          <p>Loading framework data...</p>
        </div>
        
        <table id="data-table" class="data-table">
          <thead>
            <tr>
              <th>
                <div class="header-cell">
                  <span>Control ID</span>
                  <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </th>
              <th>
                <div class="header-cell">
                  <span>Control Category</span>
                  <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </th>
              <th>
                <div class="header-cell">
                  <span>Control Description</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody id="table-body">
            <!-- Table rows will be populated by JavaScript -->
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <div class="entries-info">
          <span>Show</span>
          <select id="entries-select" class="entries-select">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>
        
        <div class="pagination-info">
          <span id="pagination-text">Showing 0 to 0 of 0 entries</span>
        </div>
        
        <div class="pagination" id="pagination-container">
          <!-- Pagination buttons will be generated dynamically -->
        </div>
      </div>
    </div>
  `;

  const setupEventListeners = () => {
    // Search functionality
    const searchInput = container.querySelector("#search-input");
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      filterData();
    });

    // Entries per page
    const entriesSelect = container.querySelector("#entries-select");
    entriesSelect.addEventListener("change", (e) => {
      pageSize = parseInt(e.target.value);
      currentPage = 1;
      renderCurrentPage();
    });

    // Pagination clicks
    container.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("pagination-btn") &&
        e.target.dataset.page
      ) {
        currentPage = parseInt(e.target.dataset.page);
        renderCurrentPage();
      }

      if (e.target.id === "prev-btn") {
        if (currentPage > 1) {
          currentPage--;
          renderCurrentPage();
        }
      }

      if (e.target.id === "next-btn") {
        const totalPages = Math.ceil((filteredData?.length || 0) / pageSize);
        if (currentPage < totalPages) {
          currentPage++;
          renderCurrentPage();
        }
      }
    });
  };

  const loadData = async (frameworkData) => {
    showLoading();

    try {
      currentData = frameworkData.data;
      filteredData = [...currentData];
      currentPage = 1;
      renderCurrentPage();
      hideLoading();
    } catch (error) {
      console.error("Error loading table data:", error);
      showError("Failed to load data. Please try again.");
      hideLoading();
    }
  };

  const filterData = () => {
    if (!currentData) return;

    filteredData = currentData.filter(
      (row) =>
        row.controlId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    currentPage = 1;
    renderCurrentPage();
  };

  const renderCurrentPage = () => {
    if (!filteredData) return;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);

    renderTableRows(pageData);
    updatePaginationInfo();
    renderPagination();
  };

  const renderTableRows = (data) => {
    const tableBody = container.querySelector("#table-body");
    tableBody.innerHTML = "";

    data.forEach((row) => {
      const tr = document.createElement("tr");
      tr.className = row.isHighlighted ? "highlighted" : "";

      tr.innerHTML = `
        <td>${row.controlId}</td>
        <td>${row.category}</td>
        <td>${row.description}</td>
      `;

      tableBody.appendChild(tr);
    });
  };

  const renderPagination = () => {
    const totalPages = Math.ceil((filteredData?.length || 0) / pageSize);
    const paginationContainer = container.querySelector(
      "#pagination-container"
    );

    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let paginationHTML = `
      <button class="pagination-btn" id="prev-btn" ${
        currentPage === 1 ? "disabled" : ""
      }>Previous</button>
    `;

    // Show page numbers
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      paginationHTML += `
        <button class="pagination-btn ${
          i === currentPage ? "active" : ""
        }" data-page="${i}">${i}</button>
      `;
    }

    if (totalPages > 5) {
      paginationHTML += `
        <button class="pagination-btn">...</button>
        <button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>
      `;
    }

    paginationHTML += `
      <button class="pagination-btn" id="next-btn" ${
        currentPage === totalPages ? "disabled" : ""
      }>Next</button>
    `;

    paginationContainer.innerHTML = paginationHTML;
  };

  const updatePaginationInfo = () => {
    const paginationText = container.querySelector("#pagination-text");
    const total = filteredData?.length || 0;

    if (total === 0) {
      paginationText.textContent = "Showing 0 to 0 of 0 entries";
      return;
    }

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, total);

    paginationText.textContent = `Showing ${start} to ${end} of ${total} entries`;
  };

  const showLoading = () => {
    const loadingSpinner = container.querySelector("#loading-spinner");
    const dataTable = container.querySelector("#data-table");

    loadingSpinner.classList.remove("hidden");
    dataTable.classList.add("hidden");
  };

  const hideLoading = () => {
    const loadingSpinner = container.querySelector("#loading-spinner");
    const dataTable = container.querySelector("#data-table");

    loadingSpinner.classList.add("hidden");
    dataTable.classList.remove("hidden");
  };

  const showError = (message) => {
    const tableBody = container.querySelector("#table-body");
    tableBody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 40px; color: var(--dangerdanger);">
          ${message}
        </td>
      </tr>
    `;
  };

  const clear = () => {
    const tableBody = container.querySelector("#data-table-component");
    tableBody.innerHTML = "";
  };

  // Initialize component
  const init = () => {
    container.innerHTML = template;
    setupEventListeners();
  };

  // Return public API
  return {
    init,
    loadData,
    clear,
  };
};

export default Datatable;
