import iconFormatListImg from '../../../public/assets/images/icon-format-list.svg';

export const EmptyState = () => {
  return `
   <tr>
        <td colspan="3">
          <div class="table-empty-state">
            <img src="${iconFormatListImg}" alt="Empty table" class="empty-icon" />
            <h3>No Data Found</h3>
          </div>
        </td>
      </tr>
  `;
};