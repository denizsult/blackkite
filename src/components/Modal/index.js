import Stepper from '../Stepper';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal as BootstrapModal } from 'bootstrap';

// Global error handler to catch Bootstrap focus errors
let errorHandlerAdded = false;
if (!errorHandlerAdded) {
  window.addEventListener('error', (e) => {
    // Catch Bootstrap focus errors and prevent them from breaking the app
    if (e.message && (
      e.message.includes("Cannot read properties of null (reading 'focus')") ||
      e.message.includes("Cannot read property 'focus' of null") ||
      e.filename && e.filename.includes('bootstrap')
    )) {
      console.warn('Bootstrap focus error caught and prevented:', e.message);
      e.preventDefault();
      return false;
    }
  });
  errorHandlerAdded = true;
}

// Modal component for adding new frameworks using Bootstrap
class AddFrameworkModal {
  constructor(modalData = {}) {
    const { 
      title = "Add New Framework",
      subtitle = "Please fill in the details of he new framework.",
      step = "1/3",
      currentStep = 1,
      totalSteps = 3,
      infoText = "You can 1 Enterprice Framework license available."
    } = modalData;

    this.title = title;
    this.subtitle = subtitle;
    this.step = step;
    this.currentStep = currentStep;
    this.totalSteps = totalSteps;
    this.infoText = infoText;
    this.modalData = modalData;
    this.stepperInstance = null;
    this.container = null;
    this.callbacks = {};
    this.bootstrapModal = null;
  }

  getStepContent(stepNumber) {
    switch(stepNumber) {
      case 1:
        return `
          <!-- Info Alert -->
          <div class="alert alert-info-custom d-flex align-items-start">
            <div class="alert-text">
              ${this.infoText}
            </div>
          </div>

          <!-- Form Fields -->
          <div class="row g-2 mb-3">
            <div class="col-md-6">
              <div class="form-group-custom">
                <label class="form-label-custom">Name</label>
                <input type="text" class="form-control-custom" name="name" placeholder="Enter name" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group-custom">
                <label class="form-label-custom">Short Name</label>
                <input type="text" class="form-control-custom" name="shortName" placeholder="Enter short name" required>
              </div>
            </div>
          </div>

          <!-- Upload Logo -->
          <div class="form-group-custom mb-3">
            <div class="d-flex align-items-center justify-content-between">
              <label class="form-label-custom mb-0">Upload Framework Logo</label>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="logoCheck" name="logoRequired">
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="form-group-custom mb-3">
            <label class="form-label-custom">Description</label>
            <textarea class="form-control-custom textarea-custom" name="description" rows="3" placeholder="Please add description" required></textarea>
          </div>

          <!-- Upload Template -->
          <div class="form-group-custom mb-4">
            <label class="form-label-custom">Upload Template</label>
            <div class="file-upload-container">
              <button type="button" class="btn-file-select">Select File</button>
              <span class="file-placeholder">No file selected</span>
              <input type="file" class="file-input-hidden" accept=".zip,.rar,.tar.gz" style="display: none;">
            </div>
          </div>
        `;
      case 2:
        return `
          <!-- Control Items Section -->
          <div class="control-items-section">
            <div class="control-items-header mb-3">
              <h3 class="control-items-title">Control Items</h3>
              <p class="control-items-subtitle">Select the control items you want to include in your framework</p>
            </div>

            <!-- Control Items Grid -->
            <div class="control-items-grid">
              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="button-control" name="controls" value="button" checked>
                    <label class="form-check-label" for="button-control">
                      <div class="control-icon">
                        <i data-lucide="square"></i>
                      </div>
                      <span class="control-name">Button</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Interactive button component for user actions</div>
              </div>

              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="input-control" name="controls" value="input" checked>
                    <label class="form-check-label" for="input-control">
                      <div class="control-icon">
                        <i data-lucide="type"></i>
                      </div>
                      <span class="control-name">Input</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Text input field for user data entry</div>
              </div>

              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="dropdown-control" name="controls" value="dropdown">
                    <label class="form-check-label" for="dropdown-control">
                      <div class="control-icon">
                        <i data-lucide="chevron-down"></i>
                      </div>
                      <span class="control-name">Dropdown</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Dropdown menu for selecting options</div>
              </div>

              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkbox-control" name="controls" value="checkbox" checked>
                    <label class="form-check-label" for="checkbox-control">
                      <div class="control-icon">
                        <i data-lucide="check-square"></i>
                      </div>
                      <span class="control-name">Checkbox</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Checkbox for boolean selections</div>
              </div>

              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="radio-control" name="controls" value="radio">
                    <label class="form-check-label" for="radio-control">
                      <div class="control-icon">
                        <i data-lucide="circle"></i>
                      </div>
                      <span class="control-name">Radio Button</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Radio button for single selection</div>
              </div>

              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="textarea-control" name="controls" value="textarea">
                    <label class="form-check-label" for="textarea-control">
                      <div class="control-icon">
                        <i data-lucide="align-left"></i>
                      </div>
                      <span class="control-name">Textarea</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Multi-line text input for longer content</div>
              </div>

              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="table-control" name="controls" value="table">
                    <label class="form-check-label" for="table-control">
                      <div class="control-icon">
                        <i data-lucide="table"></i>
                      </div>
                      <span class="control-name">Table</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Data table for displaying structured information</div>
              </div>

              <div class="control-item">
                <div class="control-item-header">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="modal-control" name="controls" value="modal">
                    <label class="form-check-label" for="modal-control">
                      <div class="control-icon">
                        <i data-lucide="layers"></i>
                      </div>
                      <span class="control-name">Modal</span>
                    </label>
                  </div>
                </div>
                <div class="control-description">Modal dialog for focused interactions</div>
              </div>
            </div>

            <!-- Select All Option -->
            <div class="select-all-section mt-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="select-all-controls">
                <label class="form-check-label select-all-label" for="select-all-controls">
                  Select All Control Items
                </label>
              </div>
            </div>
          </div>
        `;
      default:
        return '';
    }
  }

  getTemplate(stepNumber) {
    return `
      <!-- Bootstrap Modal Structure -->
      <div class="modal fade" id="addFrameworkModal" tabindex="-1" aria-labelledby="addFrameworkModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content modal-container">
            <!-- Modal Header -->
            <header class="modal-header-custom">
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center gap-2 flex-grow-1">
                  <h1 class="modal-title">${this.title}</h1>
                  <span class="step-badge">${stepNumber}/${this.totalSteps}</span>
                </div>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">
                  <i data-lucide="x"></i>
                </button>
              </div>
              <div class="modal-subtitle">
                ${stepNumber === 1 ? this.subtitle : 'Select the control items for your framework'}
              </div>
            </header>

            <!-- Stepper will be inserted here -->
            <div class="stepper-container"></div>

            <!-- Dynamic Step Content -->
            <div class="step-content">
              ${this.getStepContent(stepNumber)}
            </div>

            <!-- Action Buttons -->
            <div class="modal-actions">
              ${stepNumber > 1 ? '<button type="button" class="btn btn-back">< Back</button>' : ''}
              <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-next">${stepNumber === this.totalSteps ? 'Finish' : (stepNumber === 1 ? 'Next > Control Items' : 'Next')}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const modalElement = document.getElementById('addFrameworkModal');
    const { onCancel, onNext, onClose, onFileSelect, onFormChange, onBack } = this.callbacks;

    // Store callbacks for re-binding after updates
    modalElement._callbacks = this.callbacks;

    // Bootstrap modal events
    modalElement.addEventListener('hidden.bs.modal', () => {
      if (onClose) {
        onClose();
      }
      // Clean up the modal element after it's hidden
      this.destroy();
    });

    // Back button
    const backBtn = modalElement.querySelector('.btn-back');
    if (backBtn && onBack) {
      backBtn.addEventListener('click', () => {
        onBack(this.currentStep);
      });
    }

    // Next button
    const nextBtn = modalElement.querySelector('.btn-next');
    if (nextBtn && onNext) {
      nextBtn.addEventListener('click', () => {
        const formData = this.getFormData(modalElement);
        const isValid = this.validateForm(modalElement);
        if (isValid) {
          onNext(formData, this.currentStep);
        }
      });
    }

    // File upload
    const fileSelectBtn = modalElement.querySelector('.btn-file-select');
    const fileInput = modalElement.querySelector('.file-input-hidden');
    const filePlaceholder = modalElement.querySelector('.file-placeholder');

    if (fileSelectBtn && fileInput) {
      fileSelectBtn.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        const fileName = e.target.files[0] ? e.target.files[0].name : '';
        filePlaceholder.textContent = fileName || 'No file selected';
        
        if (onFileSelect) {
          onFileSelect(e.target.files[0]);
        }
      });
    }

    // Select All functionality for Step 2
    const selectAllCheckbox = modalElement.querySelector('#select-all-controls');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        const controlCheckboxes = modalElement.querySelectorAll('input[name="controls"]');
        controlCheckboxes.forEach(checkbox => {
          checkbox.checked = e.target.checked;
        });
        
        if (onFormChange) {
          onFormChange(this.getFormData(modalElement));
        }
      });
    }

    // Control item checkboxes
    this.bindControlItemEvents(modalElement, onFormChange);

    // Form field interactions
    const formControls = modalElement.querySelectorAll('.form-control-custom');
    formControls.forEach(control => {
      control.addEventListener('focus', () => {
        control.closest('.form-group-custom').classList.add('field-focused');
      });

      control.addEventListener('blur', () => {
        control.closest('.form-group-custom').classList.remove('field-focused');
      });

      control.addEventListener('input', () => {
        if (control.classList.contains('is-invalid') && control.value.trim()) {
          control.classList.remove('is-invalid');
        }
        
        if (onFormChange) {
          onFormChange(this.getFormData(modalElement));
        }
      });
    });

    // Checkbox interaction
    const logoCheck = modalElement.querySelector('#logoCheck');
    if (logoCheck) {
      logoCheck.addEventListener('change', () => {
        if (onFormChange) {
          onFormChange(this.getFormData(modalElement));
        }
      });
    }

    // Keyboard shortcuts
    const handleKeydown = (e) => {
      // ESC key is handled by Bootstrap
      
      // Enter key to proceed (when not in textarea)
      if (e.key === 'Enter' && !e.target.matches('textarea')) {
        e.preventDefault();
        e.stopPropagation();
        if (nextBtn && onNext) {
          const formData = this.getFormData(modalElement);
          const isValid = this.validateForm(modalElement);
          if (isValid) {
            onNext(formData);
          }
        }
      }
    };

    modalElement.addEventListener('keydown', handleKeydown);
  }

  bindControlItemEvents(element, onFormChange) {
    const controlCheckboxes = element.querySelectorAll('input[name="controls"]');
    controlCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        // Update select all checkbox state
        const selectAllCheckbox = element.querySelector('#select-all-controls');
        if (selectAllCheckbox) {
          const allChecked = Array.from(controlCheckboxes).every(cb => cb.checked);
          const someChecked = Array.from(controlCheckboxes).some(cb => cb.checked);
          selectAllCheckbox.checked = allChecked;
          selectAllCheckbox.indeterminate = someChecked && !allChecked;
        }
        
        if (onFormChange) {
          onFormChange(this.getFormData(element));
        }
      });
    });
  }

  getFormData(element) {
    const formData = {};
    const inputs = element.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        if (input.name === 'controls') {
          if (!formData.controls) formData.controls = [];
          if (input.checked) {
            formData.controls.push(input.value);
          }
        } else {
          formData[input.name] = input.checked;
        }
      } else if (input.type === 'file') {
        formData[input.name] = input.files[0] || null;
      } else {
        formData[input.name] = input.value;
      }
    });

    return formData;
  }

  validateForm(element) {
    let isValid = true;
    
    if (this.currentStep === 2) {
      // For step 2, just check if at least one control is selected
      const selectedControls = element.querySelectorAll('input[name="controls"]:checked');
      return selectedControls.length > 0;
    }
    
    const requiredFields = element.querySelectorAll('.form-control-custom[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('is-invalid');
        isValid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    return isValid;
  }

  updateStep(newStep) {
    this.currentStep = newStep;
    
    // Store current form data before destroying
    const currentFormData = this.getCurrentFormData();
    
    if (this.bootstrapModal) {
      const modalElement = document.getElementById('addFrameworkModal');
      if (modalElement) {
        // Set up one-time listener for when modal is fully hidden
        const handleModalHidden = () => {
          // Clean up the old modal
          modalElement.remove();
          
          // Create new modal with updated step
          this.render(this.container, this.callbacks);
          
          // Restore form data if going back to step 1
          if (newStep === 1 && Object.keys(currentFormData).length > 0) {
            // Small delay to ensure modal is fully rendered
            setTimeout(() => {
              this.setFormData(currentFormData);
            }, 50);
          }
        };
        
        // Add event listener
        modalElement.addEventListener('hidden.bs.modal', handleModalHidden, { once: true });
        
        // Hide the modal (this will trigger the hidden.bs.modal event)
        this.bootstrapModal.hide();
      }
    } else {
      // Fallback if no bootstrap modal exists
      this.render(this.container, this.callbacks);
    }
  }

  createStepper(element, step = this.currentStep) {
    const stepperContainer = element.querySelector('.stepper-container');
    if (stepperContainer) {
      // Clear existing stepper
      stepperContainer.innerHTML = '';
      
      // Create new stepper instance
      this.stepperInstance = Stepper({
        currentStep: step,
        totalSteps: this.totalSteps,
        steps: [
          { number: '01', label: 'Framework Details' },
          { number: '02', label: 'Control Items' }
        ]
      });
      
      this.stepperInstance.render(stepperContainer);
    }
  }

  setFormData(data) {
    const element = document.getElementById('addFrameworkModal');
    if (!element) return;
    
    Object.keys(data).forEach(key => {
      const input = element.querySelector(`[name="${key}"]`);
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = data[key];
        } else if (input.type !== 'file') {
          input.value = data[key];
        }
      }
    });
  }

  render(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    
    // Create modal HTML
    const modalHTML = this.getTemplate(this.currentStep);
    
    // Add modal to document body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modalElement = document.getElementById('addFrameworkModal');
    
    // Initialize Bootstrap Modal
    this.bootstrapModal = new BootstrapModal(modalElement, {
      backdrop: 'static',
      keyboard: true,
      focus: false  // Disable automatic focus management to prevent errors
    });
    
    // Setup events
    this.setupEventListeners();
    
    // Create stepper
    this.createStepper(modalElement, this.currentStep);
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Show the modal
    this.bootstrapModal.show();
    
    return modalElement;
  }

  destroy() {
    if (this.bootstrapModal) {
      this.bootstrapModal.dispose();
      this.bootstrapModal = null;
    }
    
    const modalElement = document.getElementById('addFrameworkModal');
    if (modalElement) {
      modalElement.remove();
    }
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getCurrentFormData() {
    const element = document.getElementById('addFrameworkModal');
    if (!element) return {};
    return this.getFormData(element);
  }

  validateCurrentForm() {
    const element = document.getElementById('addFrameworkModal');
    if (!element) return false;
    return this.validateForm(element);
  }
}

export default AddFrameworkModal;