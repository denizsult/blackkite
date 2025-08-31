const EmptyFrameworkState = (className) => {
  return ` 
      <div class="empty-framework-state ${className}">
            <img class="detail-icon" src="/assets/images/icon-format-list.svg" alt="Icon format list" />
            <div class="detail-text">
              Please select framework from list in left side.
              <br />
              or <span class="highlight">click here</span> to add new framework
            </div>
          </div> `;
};

export default EmptyFrameworkState;
