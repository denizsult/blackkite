const getStep1Content = (infoText) => {
  return `
    <!-- Info Alert -->
    <div class="alert alert-info-custom">
      <div class="alert-text">
        ${infoText}
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
};

export default getStep1Content;
