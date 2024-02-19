import React from 'react';

function DashboardScreen() {
  return (
    <div>
      <h2>Resultado de Elecciones</h2>
      <iframe
        title="Dashboard"
        width="800"
        height="600"
        src="https://lookerstudio.google.com/embed/reporting/4705ef62-2aec-4f04-82c4-9ea6c09473e1/page/JFgqD"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
}

export default DashboardScreen;
