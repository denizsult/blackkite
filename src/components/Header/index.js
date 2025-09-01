import infoAvatarsImg from '../../../public/assets/images/info-avatars.svg';
import helpIconImg from '../../../public/assets/images/frame-1013-1.svg';
import addIconImg from '../../../public/assets/images/frame-1013.svg';

export const Header = () => {
  return ` <div class="main-header">
          <div class="header-left">
            <img class="avatar" src="${infoAvatarsImg}" alt="Info avatars" />
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
              <img class="btn-icon" src="${helpIconImg}" alt="Help icon" />
              <span>Help</span>
            </button>
            <button class="custom-btn btn-primary open-create-framework-modal">
              <img class="custom-btn-icon" src="${addIconImg}" alt="Add icon" />
              <span>New Custom Framework</span>
              <div class="custom-btn-badge">1/2</div>
            </button>
          </div>
        </div>
    `;
};
