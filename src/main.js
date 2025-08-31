import './scss/main.scss';
import App from './app';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const appContent = await App();
    rootElement.appendChild(appContent);
  } else {
    console.error('Root element not found. Make sure there is a div with id="root" in your HTML.');
  }
});
