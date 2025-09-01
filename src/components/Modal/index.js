import Stepper from "../Stepper";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.scss";
import { Modal as BootstrapModal } from "bootstrap";
import getStep1Content from "./partials/Step1";
import getStep2Content, { initializeStep2 } from "./partials/Step2";

// Global error handler to catch Bootstrap focus errors
let errorHandlerAdded = false;
if (!errorHandlerAdded) {
  window.addEventListener("error", (e) => {
    // Catch Bootstrap focus errors and prevent them from breaking the app
    if (
      e.message &&
      (e.message.includes("Cannot read properties of null (reading 'focus')") ||
        e.message.includes("Cannot read property 'focus' of null") ||
        (e.filename && e.filename.includes("bootstrap")))
    ) {
      console.warn("Bootstrap focus error caught and prevented:", e.message);
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
      totalSteps = 2,
      infoText = "You can 1 Enterprice Framework license available.",
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
    this.formData = {};
  }

  getStepContent(stepNumber) {
    switch (stepNumber) {
      case 1:
        return getStep1Content(this.infoText);
      case 2:
        return getStep2Content();
      default:
        return "";
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
                  <span class="step-badge">${stepNumber}/${
      this.totalSteps
    }</span>
                </div>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">
                  <i data-lucide="x"></i>
                </button>
              </div>
              <div class="modal-subtitle">
                ${
                  stepNumber === 1
                    ? this.subtitle
                    : "Select the control items for your framework"
                }
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
              <button type="button" class="custom-btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
              ${
                stepNumber > 1
                  ? `<button type="button" class="custom-btn btn-back">Previous Step</button>
                  <button type="button" class="custom-btn btn-add-controls" ><img src="/assets/images/icon-plus.svg" alt="Plus" /> Add Control Items</button>`
                  : ""
              }
              <button type="button" class="custom-btn btn-next">${
                stepNumber === this.totalSteps
                  ? "Save"
                  : stepNumber === 1
                  ? "Next > Control Items"
                  : "Next"
              }</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const modalElement = document.getElementById("addFrameworkModal");
    const { onClose, onFileSelect, onFormChange } = this.callbacks;

    // Store callbacks for re-binding after updates
    modalElement._callbacks = this.callbacks;

    // Bootstrap modal events
    const closeHandler = () => {
      if (onClose) {
        onClose();
      }
      // Clean up the modal element after it's hidden
      this.destroy();
    };

    // Store the close handler for future reference
    modalElement._closeHandler = closeHandler;
    modalElement.addEventListener("hidden.bs.modal", closeHandler);

    // Back button
    const backBtn = modalElement.querySelector(".custom-btn.btn-back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        console.log('this.formData :>> ', this.formData);
        this.updateStep(this.currentStep - 1);
      });
    }

    // Next button
    const nextBtn = modalElement.querySelector(".custom-btn.btn-next");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const isValid = this.validateForm(modalElement);
        if (isValid) {
          this.updateStep(this.currentStep + 1);
        }
      });
    }

    // File upload
    const fileSelectBtn = modalElement.querySelector(
      ".custom-btn.btn-file-select"
    );
    const fileInput = modalElement.querySelector(".file-input-hidden");
    const filePlaceholder = modalElement.querySelector(".file-placeholder");

    if (fileSelectBtn && fileInput) {
      fileSelectBtn.addEventListener("click", () => {
        fileInput.click();
      });

      fileInput.addEventListener("change", (e) => {
        const fileName = e.target.files[0] ? e.target.files[0].name : "";
        filePlaceholder.textContent = fileName || "No file selected";

        if (onFileSelect) {
          onFileSelect(e.target.files[0]);
        }
      });
    }

    // Select All functionality for Step 2
    const selectAllCheckbox = modalElement.querySelector(
      "#select-all-controls"
    );
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", (e) => {
        const controlCheckboxes = modalElement.querySelectorAll(
          'input[name="controls"]'
        );
        controlCheckboxes.forEach((checkbox) => {
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
    const formControls = modalElement.querySelectorAll(".form-control-custom");
    formControls.forEach((control) => {
      control.addEventListener("focus", () => {
        control.closest(".form-group-custom").classList.add("field-focused");
      });

      control.addEventListener("blur", () => {
        control.closest(".form-group-custom").classList.remove("field-focused");
      });

      control.addEventListener("input", () => {
        if (control.classList.contains("is-invalid") && control.value.trim()) {
          control.classList.remove("is-invalid");
        }

        if (onFormChange) {
          onFormChange(this.getFormData(modalElement));
        }
      });
    });

    // Checkbox interaction
    const logoCheck = modalElement.querySelector("#logoCheck");
    if (logoCheck) {
      logoCheck.addEventListener("change", () => {
        if (onFormChange) {
          onFormChange(this.getFormData(modalElement));
        }
      });
    }
  }

  bindControlItemEvents(element, onFormChange) {
    const controlCheckboxes = element.querySelectorAll(
      'input[name="controls"]'
    );
    controlCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        // Update select all checkbox state
        const selectAllCheckbox = element.querySelector("#select-all-controls");
        if (selectAllCheckbox) {
          const allChecked = Array.from(controlCheckboxes).every(
            (checkbox) => checkbox.checked
          );
          const someChecked = Array.from(controlCheckboxes).some(
            (checkbox) => checkbox.checked
          );
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
    const inputs = element.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        if (input.name === "controls") {
          if (!formData.controls) formData.controls = [];
          if (input.checked) {
            formData.controls.push(input.value);
          }
        } else {
          formData[input.name] = input.checked;
        }
      } else if (input.type === "file") {
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
      const selectedControls = element.querySelectorAll(
        'input[name="controls"]:checked'
      );
      return selectedControls.length > 0;
    }

    const requiredFields = element.querySelectorAll(
      ".form-control-custom[required]"
    );

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("is-invalid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

  

    return isValid;
  }

  updateStep(newStep) {
    const previousStep = this.currentStep;
    this.currentStep = newStep;

    // Store current form data before destroying and merge with persistent data
    const currentFormData = this.getCurrentFormData();
    this.formData = { ...this.formData, ...currentFormData };


    if (this.bootstrapModal) {
      const modalElement = document.getElementById("addFrameworkModal");

      if (modalElement) {
        // Remove the existing hidden.bs.modal event listener to prevent auto-destruction
        const oldListeners = modalElement._listeners || [];
        oldListeners.forEach((listener) => {
          modalElement.removeEventListener("hidden.bs.modal", listener);
        });

        // Set up one-time listener for step update
        const handleModalHidden = () => {
          // Clean up the old modal
          modalElement.remove();

          // Create new modal with updated step
          this.render(this.container, this.callbacks);

          // Always restore persistent form data when navigating between steps
          if (Object.keys(this.formData).length > 0) {
            // Increased delay to ensure modal is fully rendered
            setTimeout(() => {
              console.log('About to restore form data for step:', newStep);
              this.setFormData(this.formData);

              // Update stepper to reflect the current step
              if (this.stepperInstance) {
                this.stepperInstance?.updateStep(newStep);
              }
            }, 200);
          } else {
            console.log('No form data to restore');
          }
        };

        // Store the listener for future cleanup
        modalElement._listeners = modalElement._listeners || [];
        modalElement._listeners.push(handleModalHidden);

        // Add event listener
        modalElement.addEventListener("hidden.bs.modal", handleModalHidden, {
          once: true,
        });

        // Hide the modal (this will trigger the hidden.bs.modal event)
        this.bootstrapModal.hide();
      }
    } else {
      // Fallback if no bootstrap modal exists
      this.render(this.container, this.callbacks);
      
      // Restore form data in fallback case too
      if (Object.keys(this.formData).length > 0) {
        setTimeout(() => {
          console.log('Fallback: About to restore form data for step:', newStep);
          this.setFormData(this.formData);
        }, 200);
      }
    }
  }

  createStepper(element, step = this.currentStep) {
    const stepperContainer = element.querySelector(".stepper-container");
    if (stepperContainer) {
      // Clear existing stepper
      stepperContainer.innerHTML = "";

      // Create new stepper instance
      this.stepperInstance = Stepper({
        currentStep: step,
        totalSteps: this.totalSteps,
        steps: [
          { number: "01", label: "Framework Details" },
          { number: "02", label: "Control Items" },
        ],
      });

      this.stepperInstance?.render(stepperContainer);
    }
  }

  setFormData(data) {
    const element = document.getElementById("addFrameworkModal");
    if (!element) {
      console.log('Modal element not found when trying to set form data');
      return;
    }

    console.log('Setting form data:', data);
    console.log('Available inputs:', element.querySelectorAll('input, textarea'));

    Object.keys(data).forEach((key) => {
      const input = element.querySelector(`[name="${key}"]`);
      console.log(`Looking for input with name="${key}":`, input);
      
      if (input) {
        if (input.type === "checkbox") {
          input.checked = data[key];
          console.log(`Set checkbox ${key} to:`, data[key]);
        } else if (input.type !== "file") {
          input.value = data[key];
          console.log(`Set input ${key} to:`, data[key]);
        }
      } else {
        console.log(`Input with name="${key}" not found`);
      }
    });
  }

  render(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    // Create modal HTML
    const modalHTML = this.getTemplate(this.currentStep);

    // Add modal to document body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modalElement = document.getElementById("addFrameworkModal");

    // Initialize Bootstrap Modal
    this.bootstrapModal = new BootstrapModal(modalElement, {
      backdrop: "static",
      keyboard: true,
      focus: false, // Disable automatic focus management to prevent errors
    });

    // Setup events
    this.setupEventListeners();

    // Create stepper
    this.createStepper(modalElement, this.currentStep);

    // Initialize Step 2 if it's the current step
    if (this.currentStep === 2) {
      initializeStep2(modalElement);
    }

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
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

    const modalElement = document.getElementById("addFrameworkModal");
    if (modalElement) {
      modalElement.remove();
    }
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getCurrentFormData() {
    const element = document.getElementById("addFrameworkModal");
    if (!element) return {};
    return this.getFormData(element);
  }

  validateCurrentForm() {
    const element = document.getElementById("addFrameworkModal");
    if (!element) return false;
    return this.validateForm(element);
  }
}

export default AddFrameworkModal;
