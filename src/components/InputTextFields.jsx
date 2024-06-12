import React from 'react';

const InputTextFields = ({ formData, handleChange, errors, fields, inputFields }) => (
  fields.map(fieldKey => {
    const field = inputFields[fieldKey];
    if (field && field.type !== 'select') {
      return (
        <div key={fieldKey} className="form-group">
          <label>{field.label}</label>
          <input
            type="text"
            name={field.yamlKey}
            placeholder={field.placeholder}
            value={formData[field.yamlKey] || ''}
            onChange={handleChange}
          />
          {errors[field.yamlKey] && <span className="error-message">{errors[field.yamlKey]}</span>}
        </div>
      );
    }
    return null;
  })
);

export default InputTextFields;
