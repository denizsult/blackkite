export class Step1 {
    constructor(stepper) {
      this.stepper = stepper;
      this.data = {
        name: '',
        shortName: '',
        description: '',
        template: null
      };
    }
  
    render() {
      return `
        <div class="step-content" id="step-1">
          <div class="form-group">
            <label class="form-group__label" for="framework-name">Framework Name *</label>
            <input 
              type="text" 
              id="framework-name" 
              class="form-group__input" 
              placeholder="Enter framework name"
              value="${this.data.name}"
            />
            <div class="form-group__error" id="name-error">Framework name is required</div>
          </div>
  
          <div class="form-group">
            <label class="form-group__label" for="framework-short-name">Framework Short Name *</label>
            <input 
              type="text" 
              id="framework-short-name" 
              class="form-group__input" 
              placeholder="Enter short name"
              value="${this.data.shortName}"
            />
            <div class="form-group__error" id="short-name-error">Framework short name is required</div>
          </div>
  
          <div class="form-group">
            <label class="form-group__label" for="framework-description">Framework Description *</label>
            <textarea 
              id="framework-description" 
              class="form-group__textarea" 
              placeholder="Enter framework description"
            >${this.data.description}</textarea>
            <div class="form-group__error" id="description-error">Framework description is required</div>
          </div>
  
          <div class="form-group">
            <label class="form-group__label" for="framework-template">Framework Template</label>
            <div class="form-group__file">
              <button type="button" class="form-group__file-button" id="template-button">
                Choose File
              </button>
              <span class="form-group__file-text" id="template-text">
                ${this.data.template ? this.data.template.name : 'No file chosen'}
              </span>
            </div>
            <input type="file" id="framework-template" style="display: none;" accept=".zip,.tar,.gz">
          </div>
  
          <div class="alert">
            <img src="/public/data.svg" alt="Info" width="16" height="16">
            <span class="alert__text">
              Please fill in all required fields to continue to the next step.
            </span>
          </div>
        </div>
      `;
    }
  
    bindEvents() {
      // File upload handling
      $('#template-button').on('click', () => {
        $('#framework-template').click();
      });
  
      $('#framework-template').on('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.data.template = file;
          $('#template-text').text(file.name);
        } else {
          this.data.template = null;
          $('#template-text').text('No file chosen');
        }
      });
  
      // Input validation
      $('#framework-name').on('input', (e) => {
        this.data.name = e.target.value.trim();
        this.validateField('name', this.data.name, 'Framework name is required');
        this.updateNextButton();
      });
  
      $('#framework-short-name').on('input', (e) => {
        this.data.shortName = e.target.value.trim();
        this.validateField('shortName', this.data.shortName, 'Framework short name is required');
        this.updateNextButton();
      });
  
      $('#framework-description').on('input', (e) => {
        this.data.description = e.target.value.trim();
        this.validateField('description', this.data.description, 'Framework description is required');
        this.updateNextButton();
      });
    }
  
    validateField(fieldName, value, errorMessage) {
      const input = $(`#framework-${fieldName === 'shortName' ? 'short-name' : fieldName === 'name' ? 'name' : 'description'}`);
      const error = $(`#${fieldName === 'shortName' ? 'short-name' : fieldName === 'name' ? 'name' : 'description'}-error`);
  
      if (!value) {
        input.addClass('error');
        error.addClass('show');
        return false;
      } else {
        input.removeClass('error');
        error.removeClass('show');
        return true;
      }
    }
  
    isValid() {
      const nameValid = this.validateField('name', this.data.name, 'Framework name is required');
      const shortNameValid = this.validateField('shortName', this.data.shortName, 'Framework short name is required');
      const descriptionValid = this.validateField('description', this.data.description, 'Framework description is required');
      
      return nameValid && shortNameValid && descriptionValid;
    }
  
    updateNextButton() {
      const nextButton = $('#next-button');
      if (this.isValid()) {
        nextButton.prop('disabled', false).removeClass('btn--disabled');
      } else {
        nextButton.prop('disabled', true).addClass('btn--disabled');
      }
    }
  
    getData() {
      return this.data;
    }
  }