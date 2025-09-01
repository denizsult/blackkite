const getStep2Content = () => {
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
};

export default getStep2Content;
