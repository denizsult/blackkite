import checkImg from '../../../public/assets/images/check.svg';
import editImg from '../../../public/assets/images/edit.svg';
import deleteImg from '../../../public/assets/images/delete.svg';

export const TableActions = (row) => {
  return `
    <div class="table-actions">
      ${
        row.isCompleted
          ? `  <button class="table-action-button complete-action" data-action="complete" data-id="${row.controlId}">
      <img src="${checkImg}" alt="Complete" />
      </button>`
          : `
      <button class="table-action-button edit-action" data-action="edit" data-id="${row.controlId}">
      <img src="${editImg}" alt="Edit" />
      </button>
      `
      }
      <button class="table-action-button delete-action" data-action="delete" data-id="${
        row.controlId
      }">
      <img src="${deleteImg}" alt="Delete" />
      </button>
    </div>
  `;
};
