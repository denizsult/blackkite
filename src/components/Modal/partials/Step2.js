export class Step2 {
    constructor(stepper) {
      this.stepper = stepper;
      this.step1Data = null;
    }
  
    setStep1Data(data) {
      this.step1Data = data;
    }
  
    render() {
      return `
        <div class="step-content" id="step-2">
          <div class="step2-summary">
            <h3 class="step2-summary__title">Framework Summary</h3>
            <p class="step2-summary__description">
              Review your framework details before creating it.
            </p>
          </div>
  
          <div class="summary-card">
            <div class="summary-item">
              <label class="summary-item__label">Framework Name</label>
              <div class="summary-item__value" id="summary-name">
                ${this.step1Data?.name || 'Not specified'}
              </div>
            </div>
  
            <div class="summary-item">
              <label class="summary-item__label">Short Name</label>
              <div class="summary-item__value" id="summary-short-name">
                ${this.step1Data?.shortName || 'Not specified'}
              </div>
            </div>
  
            <div class="summary-item">
              <label class="summary-item__label">Description</label>
              <div class="summary-item__value" id="summary-description">
                ${this.step1Data?.description || 'Not specified'}
              </div>
            </div>
  
            <div class="summary-item">
              <label class="summary-item__label">Template File</label>
              <div class="summary-item__value" id="summary-template">
                ${this.step1Data?.template ? this.step1Data.template.name : 'No file selected'}
              </div>
            </div>
          </div>
  
          <div class="alert alert--success">
            <img src="/public/data.svg" alt="Success" width="16" height="16">
            <span class="alert__text">
              Your framework is ready to be created. Click "Create Framework" to proceed.
            </span>
          </div>
        </div>
      `;
    }
  
    bindEvents() {
      // No specific events needed for Step 2 summary view
    }
  
    updateSummary(data) {
      this.step1Data = data;
      $('#summary-name').text(data.name || 'Not specified');
      $('#summary-short-name').text(data.shortName || 'Not specified');
      $('#summary-description').text(data.description || 'Not specified');
      $('#summary-template').text(data.template ? data.template.name : 'No file selected');
    }
  }