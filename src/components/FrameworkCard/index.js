const FrameworkCard = (frameworkData) => {
  const { type, title, description, image, status, isActive = false } = frameworkData;
  
  const statusBadge = status ? `
      <div class="status-badge status-${status.variant}">
        <img src="${status.icon}" alt="${status.text}" class="status-icon" />
        <span>${status.text}</span>
      </div>
    ` : '';

  const template = `
    <div class="framework-card ${isActive ? 'selected' : ''}" data-framework-id="${frameworkData.id}">
      <div class="framework-content">
        <img 
          src="${image}" 
          alt="${title}" 
          class="framework-image"
          onerror="this.src='/assets/images/rectangle-219.png'"
        />
        <div class="framework-info">
          <div class="framework-type">${type}</div>
          <div class="framework-details">
            <div class="framework-title">${title}</div>
            <div class="framework-description">${description}</div>
          </div>
        </div>
      </div>
      ${statusBadge}
      ${isActive ? '<div class="selection-indicator"></div>' : ''}
    </div>
  `;

  const bindEvents = (element, onClick) => {
    if (onClick && typeof onClick === 'function') {
      element.addEventListener('click', () => {
        onClick(frameworkData);
      });
    }

    // Handle keyboard navigation
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onClick && typeof onClick === 'function') {
          onClick(frameworkData);
        }
      }
    });

    // Make card focusable for accessibility
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', `Select ${title} framework`);
  };

  const render = (container, onClick) => {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = template;
    const card = cardElement.firstElementChild;
    
    bindEvents(card, onClick);
    
    if (container) {
      container.appendChild(card);
    }
    
    return card;
  };

  const updateStatus = (element, newStatus) => {
    const statusBadge = element.querySelector('.status-badge');
    statusBadge.className = `status-badge status-${newStatus.variant}`;
    statusBadge.innerHTML = `
      <img src="${newStatus.icon}" alt="${newStatus.text}" class="status-icon" />
      <span>${newStatus.text}</span>
    `;
  };

  const setActive = (element, active) => {
    if (active) {
      element.classList.add('selected');
    } else {
      element.classList.remove('selected');
    }
  };

  return {
    render,
    updateStatus,
    setActive,
    data: frameworkData
  };
};

export default FrameworkCard;
