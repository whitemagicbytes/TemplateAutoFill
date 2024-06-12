import React from 'react';

const TemplateButtons = ({ currentOption, handleTemplateClick, handleSubmit, formConfigurations }) => (
  <div className="template-buttons">
    {Object.keys(formConfigurations[currentOption].templates).map(templateKey => (
      <button
        key={templateKey}
        type="button"
        onClick={() => handleTemplateClick(templateKey)}
      >
        Render {templateKey}
      </button>
    ))}
    <button type="submit">Render All Templates</button>
  </div>
);

export default TemplateButtons;
