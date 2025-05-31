import React from 'react';

export default function SwaggerDocsTab() {
  return (
    <div style={{ height: '90vh' }}>
      <iframe
        src="https://crm-backend-production-a717.up.railway.app/api-docs"
        title="Swagger UI"
        width="100%"
        height="100%"
        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
      ></iframe>
    </div>
  );
}
