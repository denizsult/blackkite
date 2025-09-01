import "./style.scss";
const EmptyFrameworkState = () => {
  return ` 
      <div class="empty-framework-state open-create-framework-modal">
            <img class="empty-framework-state-icon" src="/assets/images/icon-format-list.svg" alt="Icon format list" />
            <div class="empty-framework-state-text">
              Please select framework from list in left side.
              <br />
              or <span class="empty-framework-state-highlight">click here</span> to add new framework
            </div>
          </div> `;
};

export default EmptyFrameworkState;
