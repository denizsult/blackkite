import "./style.scss";
import iconFormatListImg from '../../../public/assets/images/icon-format-list.svg';

const EmptyFrameworkState = () => {
  return ` 
      <div class="empty-framework-state open-create-framework-modal">
            <img class="empty-framework-state-icon" src="${iconFormatListImg}" alt="Icon format list" />
            <div class="empty-framework-state-text">
              Please select framework from list in left side.
              <br />
              or <span class="empty-framework-state-highlight">click here</span> to add new framework
            </div>
          </div> `;
};

export default EmptyFrameworkState;
