const Stepper = (stepperData = {}) => {
    const { 
      currentStep = 1,
      totalSteps = 2,
      steps = [
        { number: '01', label: 'Framework Details' },
        { number: '02', label: 'Control Items' }
      ]
    } = stepperData;
  
    const getTemplate = (activeStep) => `
      <div class="progress-steps">
        <div class="step-container">
          ${steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= activeStep;
            const isCompleted = stepNumber < activeStep;
            
            return `
              <div class="step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-step="${stepNumber}">
                <div class="step-circle">
                  <span class="step-number">${step.number}</span>
                </div>
                <div class="step-label">${step.label}</div>
              </div>
            `;
          }).join('')}
          <div class="progress-line ${currentStep > 1 ? 'progress-active' : ''}"></div>
        </div>
      </div>
    `;
  
    const updateStep = (element, newStep) => {
      const stepElements = element.querySelectorAll('.step');
      const progressLine = element.querySelector('.progress-line');
      
      stepElements.forEach((stepEl, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= newStep;
        const isCompleted = stepNumber < newStep;
        
        stepEl.classList.toggle('active', isActive);
        stepEl.classList.toggle('completed', isCompleted);
      });
  
      if (progressLine) {
        progressLine.classList.toggle('progress-active', newStep > 1);
      }
    };
  
    const render = (container) => {
      const stepperElement = document.createElement('div');
      stepperElement.innerHTML = getTemplate(currentStep);
      const stepper = stepperElement.firstElementChild;
      
      if (container) {
        container.appendChild(stepper);
      }
      
      return stepper;
    };
  
    const destroy = (element) => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  
    return {
      render,
      destroy,
      updateStep,
      getCurrentStep: () => currentStep,
      data: stepperData
    };
  };
  
  export default Stepper;