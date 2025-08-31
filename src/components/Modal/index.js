const Modal = () => {
  let overlay = null;
  let isOpen = false;
  let uploadedFile = null;
  let currentStep = 1;
  let totalSteps = 3;
  let formData = {};

  const template = `
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">New Custom Framework</h2>
          <button class="modal-close" type="button">
            <img src="/icon-close.svg" alt="Close" />
          </button>
        </div>
        
        <div class="steps-container">
          <div class="steps">
            <div class="step ${currentStep >= 1 ? 'active' : ''}" data-step="1">
              <div class="step-number">1</div>
              <span>Basic Info</span>
            </div>
            <div class="step-separator ${currentStep > 1 ? 'completed' : ''}"></div>
            <div class="step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}" data-step="2">
              <div class="step-number">2</div>
              <span>Configuration</span>
            </div>
            <div class="step-separator ${currentStep > 2 ? 'completed' : ''}"></div>
            <div class="step ${currentStep >= 3 ? 'active' : ''}" data-step="3">
              <div class="step-number">3</div>
              <span>Review</span>
            </div>
          </div>
        </div>
        
        <div class="modal-body">
          <form id="framework-form">
            <!-- Step 1: Basic Info -->
            <div class="step-content ${currentStep === 1 ? 'active' : ''}" data-step-content="1">
              <div class="form-group">
                <label class="form-label" for="framework-name">Framework Name *</label>
                <input 
                  type="text" 
                  id="framework-name" 
                  class="form-input" 
                  placeholder="Enter framework name"
                  required
                />
              </div>
              
              <div class="form-group">
                <label class="form-label" for="framework-description">Description</label>
                <textarea 
                  id="framework-description" 
                  class="form-input form-textarea" 
                  placeholder="Enter framework description"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <!-- Step 2: Configuration -->
            <div class="step-content ${currentStep === 2 ? 'active' : ''}" data-step-content="2">
              <div class="form-group">
                <label class="form-label" for="framework-type">Framework Type *</label>
                <select id="framework-type" class="form-input form-select" required>
                  <option value="">Select framework type</option>
                  <option value="Custom Framework">Custom Framework</option>
                  <option value="System Framework">System Framework</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">Framework Icon</label>
                <div class="file-upload" id="file-upload">
                  <div class="file-upload-icon">📁</div>
                  <div class="file-upload-text">Click to upload or drag and drop</div>
                  <div class="file-upload-hint">PNG, JPG, SVG up to 10MB</div>
                  <input type="file" class="file-input" id="framework-icon" accept="image/*" />
                </div>
                <div id="uploaded-file-display"></div>
              </div>
            </div>

            <!-- Step 3: Review -->
            <div class="step-content ${currentStep === 3 ? 'active' : ''}" data-step-content="3">
              <div class="form-group">
                <label class="form-label">Review Your Framework</label>
                <div id="review-content" style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; border: 1px solid #dee2e6;">
                  <p style="color: #6c757d; text-align: center;">Complete the previous steps to see the review</p>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-back" id="back-btn" style="display: none;">
            Back
          </button>
          <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
          <button type="button" class="btn btn-primary" id="next-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  `;

  const bindEvents = () => {
    // Close modal events
    overlay.querySelector('.modal-close').addEventListener('click', () => close());
    overlay.querySelector('#cancel-btn').addEventListener('click', () => close());
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        close();
      }
    });

    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    document.addEventListener('keydown', escapeHandler);

    // Step navigation
    overlay.querySelector('#next-btn').addEventListener('click', () => nextStep());
    overlay.querySelector('#back-btn').addEventListener('click', () => previousStep());

    // File upload functionality
    const fileUpload = overlay.querySelector('#file-upload');
    const fileInput = overlay.querySelector('#framework-icon');
    const uploadDisplay = overlay.querySelector('#uploaded-file-display');

    fileUpload.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileUpload(file, uploadDisplay);
      }
    });

    // Drag and drop
    fileUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUpload.classList.add('dragover');
    });

    fileUpload.addEventListener('dragleave', () => {
      fileUpload.classList.remove('dragover');
    });

    fileUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUpload.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFileUpload(file, uploadDisplay);
      }
    });

    // Form input handlers for real-time validation
    overlay.querySelector('#framework-name').addEventListener('input', () => updateNextButton());
    overlay.querySelector('#framework-type').addEventListener('change', () => updateNextButton());
  };

  const updateStepDisplay = () => {
    // Update step indicators
    overlay.querySelectorAll('.step').forEach((step, index) => {
      const stepNumber = index + 1;
      step.className = 'step';
      
      if (stepNumber < currentStep) {
        step.classList.add('completed');
      } else if (stepNumber === currentStep) {
        step.classList.add('active');
      }
    });

    // Update step separators
    overlay.querySelectorAll('.step-separator').forEach((separator, index) => {
      const stepNumber = index + 1;
      separator.className = 'step-separator';
      
      if (stepNumber < currentStep) {
        separator.classList.add('completed');
      }
    });

    // Update step content
    overlay.querySelectorAll('.step-content').forEach((content, index) => {
      const stepNumber = index + 1;
      content.className = 'step-content';
      
      if (stepNumber === currentStep) {
        content.classList.add('active');
      }
    });

    // Update navigation buttons
    const backBtn = overlay.querySelector('#back-btn');
    const nextBtn = overlay.querySelector('#next-btn');

    backBtn.style.display = currentStep > 1 ? 'block' : 'none';
    
    if (currentStep === totalSteps) {
      nextBtn.textContent = 'Create Framework';
      nextBtn.className = 'btn btn-primary';
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.className = 'btn btn-primary';
    }

    updateNextButton();
  };

  const updateNextButton = () => {
    const nextBtn = overlay.querySelector('#next-btn');
    
    if (currentStep === 1) {
      const name = overlay.querySelector('#framework-name').value.trim();
      nextBtn.disabled = !name;
    } else if (currentStep === 2) {
      const type = overlay.querySelector('#framework-type').value;
      nextBtn.disabled = !type;
    } else {
      nextBtn.disabled = false;
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      const name = overlay.querySelector('#framework-name').value.trim();
      if (!name) {
        alert('Please enter a framework name');
        return;
      }
      formData.name = name;
      formData.description = overlay.querySelector('#framework-description').value.trim();
    } else if (currentStep === 2) {
      // Validate step 2
      const type = overlay.querySelector('#framework-type').value;
      if (!type) {
        alert('Please select a framework type');
        return;
      }
      formData.type = type;
      formData.icon = uploadedFile;
      
      // Update review content
      updateReviewContent();
    } else if (currentStep === 3) {
      // Final step - create framework
      handleSubmit();
      return;
    }

    if (currentStep < totalSteps) {
      currentStep++;
      updateStepDisplay();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      currentStep--;
      updateStepDisplay();
    }
  };

  const updateReviewContent = () => {
    const reviewContent = overlay.querySelector('#review-content');
    const iconPreview = formData.icon ? 
      `<img src="${URL.createObjectURL(formData.icon)}" alt="Framework icon" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;" />` :
      `<div style="width: 60px; height: 60px; border-radius: 8px; background-color: #dee2e6; display: flex; align-items: center; justify-content: center; font-size: 24px;">📁</div>`;

    reviewContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        ${iconPreview}
        <div>
          <div style="font-weight: 600; font-size: 18px; color: #212529; margin-bottom: 4px;">
            ${formData.name}
          </div>
          <div style="color: #6c757d; font-size: 14px; margin-bottom: 4px;">
            ${formData.type}
          </div>
          <div style="color: #6c757d; font-size: 12px;">
            ${formData.description || 'No description provided'}
          </div>
        </div>
      </div>
      <div style="text-align: left; font-size: 14px; color: #495057;">
        <strong>Ready to create this framework?</strong><br>
        Click "Create Framework" to add it to your list.
      </div>
    `;
  };

  const handleFileUpload = (file, uploadDisplay) => {
    uploadedFile = file;
    
    uploadDisplay.innerHTML = `
      <div class="uploaded-file">
        <div class="uploaded-file-icon">🖼️</div>
        <div class="uploaded-file-info">
          <div class="uploaded-file-name">${file.name}</div>
          <div class="uploaded-file-size">${formatFileSize(file.size)}</div>
        </div>
        <button type="button" class="remove-file">
          <img src="/icon-close.svg" alt="Remove" />
        </button>
      </div>
    `;

    uploadDisplay.querySelector('.remove-file').addEventListener('click', () => {
      uploadedFile = null;
      uploadDisplay.innerHTML = '';
      overlay.querySelector('#framework-icon').value = '';
      updateNextButton();
    });

    updateNextButton();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = () => {
    // Create new framework object
    const newFramework = {
      id: Date.now(),
      type: formData.type,
      title: formData.name,
      description: formData.description || 'No description provided',
      image: formData.icon ? URL.createObjectURL(formData.icon) : '/rectangle-219.png',
      status: {
        text: "Ready to Map",
        variant: "ready",
        icon: "/icon-info.svg",
      },
    };

    // Dispatch custom event to add framework
    window.dispatchEvent(new CustomEvent('addFramework', { detail: newFramework }));
    
    close();
  };

  const open = () => {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.innerHTML = template;
      overlay = overlay.firstElementChild;
      document.body.appendChild(overlay);
      bindEvents();
    }
    
    currentStep = 1;
    formData = {};
    uploadedFile = null;
    
    isOpen = true;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    updateStepDisplay();
    
    // Focus first input
    setTimeout(() => {
      overlay.querySelector('#framework-name').focus();
    }, 100);
  };

  const close = () => {
    if (overlay) {
      isOpen = false;
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset form and state
      setTimeout(() => {
        currentStep = 1;
        formData = {};
        uploadedFile = null;
        overlay.querySelector('#framework-form').reset();
        overlay.querySelector('#uploaded-file-display').innerHTML = '';
        updateStepDisplay();
      }, 300);
    }
  };

  const destroy = () => {
    if (overlay) {
      overlay.remove();
      overlay = null;
      isOpen = false;
      document.body.style.overflow = '';
    }
  };

  return {
    open,
    close,
    destroy
  };
};

export default Modal;
