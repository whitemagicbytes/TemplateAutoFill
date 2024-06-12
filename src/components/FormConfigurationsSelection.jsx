import React from 'react';

const FormConfigurationsSelection = ({ currentOption, handleOptionChange, formConfigurations }) => (
  <div className="form-group">
    <label>Select Configuration</label>
    <select value={currentOption} onChange={handleOptionChange}>
      {Object.keys(formConfigurations).map(optionKey => (
        <option key={optionKey} value={optionKey}>{formConfigurations[optionKey].heading}</option>
      ))}
    </select>
  </div>
);

export default FormConfigurationsSelection;
