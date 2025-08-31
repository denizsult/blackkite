 
import { Modal as BootstrapModal } from 'bootstrap';

const Modal = () => {
  let modalElement = null;

  const template = `
    <div class="modal fade" id="bootstrapModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">Modal Title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal content goes here...</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const initialize = () => {
    if (!modalElement) {
      modalElement = document.createElement('div');
      modalElement.innerHTML = template;
      modalElement = modalElement.firstElementChild;
      document.body.appendChild(modalElement);
    }
  };

  const open = () => {
    initialize();
    const bootstrapModal = new BootstrapModal(modalElement);
    bootstrapModal.show();
  };

  const close = () => {
    if (modalElement) {
      const bootstrapModal = BootstrapModal.getInstance(modalElement);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  };

  const destroy = () => {
    if (modalElement) {
      const bootstrapModal = BootstrapModal.getInstance(modalElement);
      if (bootstrapModal) {
        bootstrapModal.dispose();
      }
      modalElement.remove();
      modalElement = null;
    }
  };

  return {
    open,
    close,
    destroy
  };
};

export default Modal;
