// DataTable component for displaying framework control data
class DataTable {
    constructor(container) {
      this.container = container;
      this.currentData = null;
      this.filteredData = null;
      this.currentPage = 1;
      this.pageSize = 10;
      this.searchTerm = '';
      
      this.init();
    }
  
    init() {
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      this.container.innerHTML = `
        <div class="data-table-component">
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
    }
  
    setupEventListeners() {
      // Search functionality
      const searchInput = this.container.querySelector('#search-input');
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value;
        this.filterData();
      });
  
      // Entries per page
      const entriesSelect = this.container.querySelector('#entries-select');
      entriesSelect.addEventListener('change', (e) => {
        this.pageSize = parseInt(e.target.value);
        this.currentPage = 1;
        this.renderCurrentPage();
      });
  
      // Pagination clicks
      this.container.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-btn') && e.target.dataset.page) {
          this.currentPage = parseInt(e.target.dataset.page);
          this.renderCurrentPage();
        }
        
        if (e.target.id === 'prev-btn') {
          if (this.currentPage > 1) {
            this.currentPage--;
            this.renderCurrentPage();
          }
        }
        
        if (e.target.id === 'next-btn') {
          const totalPages = Math.ceil((this.filteredData?.length || 0) / this.pageSize);
          if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderCurrentPage();
          }
        }
      });
    }
  
    async loadData(frameworkData) {
      this.showLoading();
      
      try {
        this.currentData = frameworkData.data;
        this.filteredData = [...this.currentData];
        this.currentPage = 1;
        this.renderCurrentPage();
        this.hideLoading();
      } catch (error) {
        console.error('Error loading table data:', error);
        this.showError('Failed to load data. Please try again.');
        this.hideLoading();
      }
    }
  
    filterData() {
      if (!this.currentData) return;
  
      this.filteredData = this.currentData.filter(row => 
        row.controlId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        row.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        row.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  
      this.currentPage = 1;
      this.renderCurrentPage();
    }
  
    renderCurrentPage() {
      if (!this.filteredData) return;
  
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const pageData = this.filteredData.slice(startIndex, endIndex);
  
      this.renderTableRows(pageData);
      this.updatePaginationInfo();
      this.renderPagination();
    }
  
    renderTableRows(data) {
      const tableBody = this.container.querySelector('#table-body');
      tableBody.innerHTML = '';
  
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.className = row.isHighlighted ? 'highlighted' : '';
        
        tr.innerHTML = `
          <td>${row.controlId}</td>
          <td>${row.category}</td>
          <td>${row.description}</td>
        `;
        
        tableBody.appendChild(tr);
      });
    }
  
    renderPagination() {
      const totalPages = Math.ceil((this.filteredData?.length || 0) / this.pageSize);
      const paginationContainer = this.container.querySelector('#pagination-container');
      
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
      }
  
      let paginationHTML = `
        <button class="pagination-btn" id="prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>Previous</button>
      `;
  
      // Show page numbers
      for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        paginationHTML += `
          <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
        `;
      }
  
      if (totalPages > 5) {
        paginationHTML += `
          <button class="pagination-btn">...</button>
          <button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>
        `;
      }
  
      paginationHTML += `
        <button class="pagination-btn" id="next-btn" ${this.currentPage === totalPages ? 'disabled' : ''}>Next</button>
      `;
  
      paginationContainer.innerHTML = paginationHTML;
    }
  
    updatePaginationInfo() {
      const paginationText = this.container.querySelector('#pagination-text');
      const total = this.filteredData?.length || 0;
      
      if (total === 0) {
        paginationText.textContent = 'Showing 0 to 0 of 0 entries';
        return;
      }
      
      const start = (this.currentPage - 1) * this.pageSize + 1;
      const end = Math.min(start + this.pageSize - 1, total);
      
      paginationText.textContent = `Showing ${start} to ${end} of ${total} entries`;
    }
  
    showLoading() {
      const loadingSpinner = this.container.querySelector('#loading-spinner');
      const dataTable = this.container.querySelector('#data-table');
      
      loadingSpinner.classList.remove('hidden');
      dataTable.classList.add('hidden');
    }
  
    hideLoading() {
      const loadingSpinner = this.container.querySelector('#loading-spinner');
      const dataTable = this.container.querySelector('#data-table');
      
      loadingSpinner.classList.add('hidden');
      dataTable.classList.remove('hidden');
    }
  
    showError(message) {
      const tableBody = this.container.querySelector('#table-body');
      tableBody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; padding: 40px; color: var(--dangerdanger);">
            ${message}
          </td>
        </tr>
      `;
    }
  
    clear() {
      const tableBody = this.container.querySelector('#table-body');
      tableBody.innerHTML = '';
      
      const paginationText = this.container.querySelector('#pagination-text');
      paginationText.textContent = 'Select a framework to view data';
    }
  }
  
  // Export for use in other files
  export default DataTable;