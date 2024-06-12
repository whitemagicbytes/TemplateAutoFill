import config from '../config/config.json';

export const log = (message, data = null) => {
  console.log(`[Log] ${message}`, data ? JSON.stringify(data, null, 2) : '');
};

export const initializeDefaultOptions = (formConfigurations) => {
  const initializedOptions = { ...formConfigurations };
  Object.keys(config.inputFields).forEach((fieldKey) => {
    const field = config.inputFields[fieldKey];
    if (field.type === 'select' && !initializedOptions[field.yamlKey]) {
      initializedOptions[field.yamlKey] = field.defaultValue;
    }
  });
  return initializedOptions;
};

export const updateConditionalFields = (options, currentFormData) => {
  const updatedFormData = { ...currentFormData };

  Object.keys(config.inputFields).forEach(fieldKey => {
    const field = config.inputFields[fieldKey];

    if (field.conditionalMappings) {
      field.conditionalMappings.forEach(mapping => {
        const allConditionsMet = mapping.conditions.every(condition =>
          options[condition.field] === condition.value
        );

        if (allConditionsMet) {
          Object.keys(mapping.actions.setFields).forEach(actionKey => {
            updatedFormData[actionKey] = mapping.actions.setFields[actionKey];
          });
        }
      });
    }
  });

  return updatedFormData;
};

export const validateField = (name, value) => {
  const field = config.inputFields[name];
  if (field.validation) {
    if (field.validation.required && !value) {
      return 'This field is required.';
    } else if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
      return field.validation.errorMessage;
    }
  }
  return null;
};
