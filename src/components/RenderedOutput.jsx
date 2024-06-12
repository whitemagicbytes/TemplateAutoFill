import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/main.scss';

const RenderedOutput = () => {
  const location = useLocation();
  const { renderedTemplates } = location.state || {};

  const copyToClipboard = (templateContent) => {
    navigator.clipboard.writeText(templateContent).then(() => {
      alert('Template copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="page-container">
      <h2>Rendered Output</h2>
      {renderedTemplates && Object.keys(renderedTemplates).map(templateName => (
        <div key={templateName} className="template-box">
          <button onClick={() => copyToClipboard(renderedTemplates[templateName])}>Copy | {templateName}</button>
          <pre>{renderedTemplates[templateName]}</pre>
        </div>
      ))}
      <Link to="/form" className="button-link">Go back to Form</Link>
    </div>
  );
};

export default RenderedOutput;
