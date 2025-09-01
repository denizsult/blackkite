import DataTable from "../../Datatable";
import { controlItemsData } from "../../../data/controlItems";

const getStep2Content = () => {
  return `
    <!-- Control Items Section -->
    <div class="control-items-section">
      <!-- Control Items Grid -->
      <div class="control-items-table"> </div>
    </div>
  `;
};

export const initializeStep2 = (container) => {
  // Wait for DOM to be ready
  setTimeout(() => {
    const tableContainer = container.querySelector(".control-items-table");
    if (tableContainer) {
      const dataTable = new DataTable({
        container: tableContainer,
        showSearch: false,
        showPagination: false,
        insideModal: true,
        actionsColumn: true,
      });
      dataTable.loadData(controlItemsData);
    }
  }, 0);
};

export default getStep2Content;
