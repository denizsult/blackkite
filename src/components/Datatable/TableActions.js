export const TableActions = (row) => {
  return `
    <div class="table-actions">
      ${
        row.isCompleted
          ? `  <button class="table-action-button complete-action" data-action="complete" data-id="${row.controlId}">
      <img src="/assets/images/check.svg" alt="Complete" />
      </button>`
          : `
      <button class="table-action-button edit-action" data-action="edit" data-id="${row.controlId}">
      <img src="/assets/images/edit.svg" alt="Edit" />
      </button>
      `
      }
      <button class="table-action-button delete-action" data-action="delete" data-id="${
        row.controlId
      }">
      <img src="/assets/images/delete.svg" alt="Delete" />
      </button>
    </div>
  `;
};
