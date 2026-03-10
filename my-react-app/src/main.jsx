import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './AuthContext'
import './index.css'

function _RemoveUnwantedPhrases() {
  useEffect(() => {
    const phrases = [
      'Sin registros aún',
      'Sin registros aun',
      'Aún no hay productos registrados.',
    ];

    const removeMatches = () => {
      // Iterate over text-only nodes and clear matching phrases
      document.querySelectorAll('body *').forEach((el) => {
        if (!el) return;
        // Only consider leaf nodes
        if (el.children.length === 0 && el.textContent) {
          const text = el.textContent.trim();
          for (const p of phrases) {
            if (text.includes(p)) {
              el.textContent = '';
              break;
            }
          }
        }
      });
    };

    // Initial pass
    removeMatches();

    // Watch for DOM changes (in case components render later)
    const obs = new MutationObserver(removeMatches);
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <_RemoveUnwantedPhrases />
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
