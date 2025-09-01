export const Header = () => {
  return ` <div class="main-header">
          <div class="header-left">
            <img class="avatar" src="/assets/images/info-avatars.svg" alt="Info avatars" />
            <div class="header-content">
              <h1 class="page-title">Compliance Frameworks</h1>
              <nav class="breadcrumb">
                <a href="#" class="breadcrumb-link">Admin</a>
                <span class="breadcrumb-separator">></span>
                <span class="breadcrumb-current">Compliance Frameworks</span>
              </nav>
            </div>
          </div>

          <div class="header-actions">
            <button class="custom-btn btn-help">
              <img class="btn-icon" src="/assets/images/frame-1013-1.svg" alt="Help icon" />
              <span>Help</span>
            </button>
            <button class="custom-btn btn-primary open-create-framework-modal">
              <img class="custom-btn-icon" src="/assets/images/frame-1013.svg" alt="Add icon" />
              <span>New Custom Framework</span>
              <div class="custom-btn-badge">1/3</div>
            </button>
          </div>
        </div>
    `;
};
