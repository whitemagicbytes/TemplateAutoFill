import React from 'react';

const SelectFields = ({ selectedOptions, handleSelectChange, fields, inputFields }) => (
  fields.map(fieldKey => {
    const field = inputFields[fieldKey];
    if (field && field.type === 'select') {
      return (
        <div key={fieldKey} className="form-group">
          <label>{field.label}</label>
          <select
            name={field.yamlKey}
            value={selectedOptions[field.yamlKey] || field.defaultValue}
            onChange={handleSelectChange}
          >
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  })
);

export default SelectFields;
