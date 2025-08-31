// Modal functionality
export class Modal {
  constructor() {
    this.overlay = null;
    this.isOpen = false;
    this.uploadedFile = null;
    this.currentStep = 1;
    this.totalSteps = 3;
    this.formData = {};
  }

  create() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    this.overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">New Custom Framework</h2>
          <button class="modal-close" type="button">
            <img src="/icon-close.svg" alt="Close" />
          </button>
        </div>
        
        <div class="steps-container">
          <div class="steps">
            <div class="step ${this.currentStep >= 1 ? 'active' : ''}" data-step="1">
              <div class="step-number">1</div>
              <span>Basic Info</span>
            </div>
            <div class="step-separator ${this.currentStep > 1 ? 'completed' : ''}"></div>
            <div class="step ${this.currentStep >= 2 ? 'active' : ''} ${this.currentStep > 2 ? 'completed' : ''}" data-step="2">
              <div class="step-number">2</div>
              <span>Configuration</span>
            </div>
            <div class="step-separator ${this.currentStep > 2 ? 'completed' : ''}"></div>
            <div class="step ${this.currentStep >= 3 ? 'active' : ''}" data-step="3">
              <div class="step-number">3</div>
              <span>Review</span>
            </div>
          </div>
        </div>
        
        <div class="modal-body">
          <form id="framework-form">
            <!-- Step 1: Basic Info -->
            <div class="step-content ${this.currentStep === 1 ? 'active' : ''}" data-step-content="1">
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
            <div class="step-content ${this.currentStep === 2 ? 'active' : ''}" data-step-content="2">
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
            <div class="step-content ${this.currentStep === 3 ? 'active' : ''}" data-step-content="3">
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
    `;

    document.body.appendChild(this.overlay);
    this.bindEvents();
  }

  bindEvents() {
    // Close modal events
    this.overlay.querySelector('.modal-close').addEventListener('click', () => this.close());
    this.overlay.querySelector('#cancel-btn').addEventListener('click', () => this.close());
    
    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Close on Escape key
    this.escapeHandler = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);

    // Step navigation
    this.overlay.querySelector('#next-btn').addEventListener('click', () => this.nextStep());
    this.overlay.querySelector('#back-btn').addEventListener('click', () => this.previousStep());

    // File upload functionality
    const fileUpload = this.overlay.querySelector('#file-upload');
    const fileInput = this.overlay.querySelector('#framework-icon');
    const uploadDisplay = this.overlay.querySelector('#uploaded-file-display');

    fileUpload.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleFileUpload(file, uploadDisplay);
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
        this.handleFileUpload(file, uploadDisplay);
      }
    });

    // Form input handlers for real-time validation
    this.overlay.querySelector('#framework-name').addEventListener('input', () => this.updateNextButton());
    this.overlay.querySelector('#framework-type').addEventListener('change', () => this.updateNextButton());
  }

  updateStepDisplay() {
    // Update step indicators
    this.overlay.querySelectorAll('.step').forEach((step, index) => {
      const stepNumber = index + 1;
      step.className = 'step';
      
      if (stepNumber < this.currentStep) {
        step.classList.add('completed');
      } else if (stepNumber === this.currentStep) {
        step.classList.add('active');
      }
    });

    // Update step separators
    this.overlay.querySelectorAll('.step-separator').forEach((separator, index) => {
      const stepNumber = index + 1;
      separator.className = 'step-separator';
      
      if (stepNumber < this.currentStep) {
        separator.classList.add('completed');
      }
    });

    // Update step content
    this.overlay.querySelectorAll('.step-content').forEach((content, index) => {
      const stepNumber = index + 1;
      content.className = 'step-content';
      
      if (stepNumber === this.currentStep) {
        content.classList.add('active');
      }
    });

    // Update navigation buttons
    const backBtn = this.overlay.querySelector('#back-btn');
    const nextBtn = this.overlay.querySelector('#next-btn');

    backBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
    
    if (this.currentStep === this.totalSteps) {
      nextBtn.textContent = 'Create Framework';
      nextBtn.className = 'btn btn-primary';
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.className = 'btn btn-primary';
    }

    this.updateNextButton();
  }

  updateNextButton() {
    const nextBtn = this.overlay.querySelector('#next-btn');
    
    if (this.currentStep === 1) {
      const name = this.overlay.querySelector('#framework-name').value.trim();
      nextBtn.disabled = !name;
    } else if (this.currentStep === 2) {
      const type = this.overlay.querySelector('#framework-type').value;
      nextBtn.disabled = !type;
    } else {
      nextBtn.disabled = false;
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      // Validate step 1
      const name = this.overlay.querySelector('#framework-name').value.trim();
      if (!name) {
        alert('Please enter a framework name');
        return;
      }
      this.formData.name = name;
      this.formData.description = this.overlay.querySelector('#framework-description').value.trim();
    } else if (this.currentStep === 2) {
      // Validate step 2
      const type = this.overlay.querySelector('#framework-type').value;
      if (!type) {
        alert('Please select a framework type');
        return;
      }
      this.formData.type = type;
      this.formData.icon = this.uploadedFile;
      
      // Update review content
      this.updateReviewContent();
    } else if (this.currentStep === 3) {
      // Final step - create framework
      this.handleSubmit();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateStepDisplay();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepDisplay();
    }
  }

  updateReviewContent() {
    const reviewContent = this.overlay.querySelector('#review-content');
    const iconPreview = this.formData.icon ? 
      `<img src="${URL.createObjectURL(this.formData.icon)}" alt="Framework icon" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;" />` :
      `<div style="width: 60px; height: 60px; border-radius: 8px; background-color: #dee2e6; display: flex; align-items: center; justify-content: center; font-size: 24px;">📁</div>`;

    reviewContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        ${iconPreview}
        <div>
          <div style="font-weight: 600; font-size: 18px; color: #212529; margin-bottom: 4px;">
            ${this.formData.name}
          </div>
          <div style="color: #6c757d; font-size: 14px; margin-bottom: 4px;">
            ${this.formData.type}
          </div>
          <div style="color: #6c757d; font-size: 12px;">
            ${this.formData.description || 'No description provided'}
          </div>
        </div>
      </div>
      <div style="text-align: left; font-size: 14px; color: #495057;">
        <strong>Ready to create this framework?</strong><br>
        Click "Create Framework" to add it to your list.
      </div>
    `;
  }

  handleFileUpload(file, uploadDisplay) {
    this.uploadedFile = file;
    
    uploadDisplay.innerHTML = `
      <div class="uploaded-file">
        <div class="uploaded-file-icon">🖼️</div>
        <div class="uploaded-file-info">
          <div class="uploaded-file-name">${file.name}</div>
          <div class="uploaded-file-size">${this.formatFileSize(file.size)}</div>
        </div>
        <button type="button" class="remove-file">
          <img src="/icon-close.svg" alt="Remove" />
        </button>
      </div>
    `;

    uploadDisplay.querySelector('.remove-file').addEventListener('click', () => {
      this.uploadedFile = null;
      uploadDisplay.innerHTML = '';
      this.overlay.querySelector('#framework-icon').value = '';
      this.updateNextButton();
    });

    this.updateNextButton();
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  handleSubmit() {
    // Create new framework object
    const newFramework = {
      id: Date.now(),
      type: this.formData.type,
      title: this.formData.name,
      description: this.formData.description || 'No description provided',
      image: this.formData.icon ? URL.createObjectURL(this.formData.icon) : '/rectangle-219.png',
      status: {
        text: "Ready to Map",
        variant: "ready",
        icon: "/icon-info.svg",
      },
    };

    // Dispatch custom event to add framework
    window.dispatchEvent(new CustomEvent('addFramework', { detail: newFramework }));
    
    this.close();
  }

  open() {
    if (!this.overlay) {
      this.create();
    }
    
    this.currentStep = 1;
    this.formData = {};
    this.uploadedFile = null;
    
    this.isOpen = true;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    this.updateStepDisplay();
    
    // Focus first input
    setTimeout(() => {
      this.overlay.querySelector('#framework-name').focus();
    }, 100);
  }

  close() {
    if (this.overlay) {
      this.isOpen = false;
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset form and state
      setTimeout(() => {
        this.currentStep = 1;
        this.formData = {};
        this.uploadedFile = null;
        this.overlay.querySelector('#framework-form').reset();
        this.overlay.querySelector('#uploaded-file-display').innerHTML = '';
        this.updateStepDisplay();
      }, 300);
    }
  }

  destroy() {
    if (this.overlay) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.overlay.remove();
      this.overlay = null;
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  }
}