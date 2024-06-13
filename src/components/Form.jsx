import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config/config.json';
import { renderTemplate } from '../utils/templateRenderer';
import {
  initializeDefaultOptions,
  updateConditionalFields,
  validateField,
  log
} from '../utils/formHelpers';
import FormConfigurationsSelection from './FormConfigurationsSelection';
import InputTextFields from './InputTextFields';
import SelectFields from './SelectFields';
import TemplateButtons from './TemplateButtons';
import { Container, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '../styles/main.scss';

const FormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentOption, setCurrentOption] = useState(config.defaultOption);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state) {
      const { formData, optionsData, optionType } = location.state;
      const initializedOptions = initializeDefaultOptions(optionsData, config);
      setSelectedOptions(initializedOptions);
      setCurrentOption(optionType || config.defaultOption);
      log('Form data initialized from location state', { formData, optionsData, optionType });
      setFormData(formData);
    } else {
      const initializedOptions = initializeDefaultOptions({}, config);
      setSelectedOptions(initializedOptions);
      log('Form data initialized with default options', {});
      setFormData({});
    }
  }, [location.state]);

  const handleOptionChange = (e) => {
    setCurrentOption(e.target.value);
    const initializedOptions = initializeDefaultOptions({}, config);
    setSelectedOptions(initializedOptions);
    log('Option changed', { selectedOption: e.target.value });
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      log('Form data changed', { [name]: value });
      const errorMessage = validateField(name, value, config);
      if (errorMessage) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
      return newFormData;
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions, [name]: value };
      log('Select option changed', { [name]: value });
      return newSelectedOptions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeFormData = { ...formData, ...selectedOptions };
    const updatedFormData = updateConditionalFields(selectedOptions, completeFormData, config);

    let allValid = true;
    config.formConfigurations[currentOption].fields.forEach((fieldKey) => {
      const errorMessage = validateField(fieldKey, updatedFormData[fieldKey], config);
      if (errorMessage) {
        setErrors((prevErrors) => ({ ...prevErrors, [fieldKey]: errorMessage }));
        allValid = false;
      }
    });

    if (!allValid) {
      log('Form submission failed due to validation errors', { errors });
      return;
    }

    const renderedTemplates = {};
    Object.keys(config.formConfigurations[currentOption].templates).forEach(templateKey => {
      const templateName = config.formConfigurations[currentOption].templates[templateKey];
      renderedTemplates[templateKey] = renderTemplate(templateName, updatedFormData);
    });
    log('Form submitted', { formData: updatedFormData, renderedTemplates });
    navigate('/output', { state: { renderedTemplates } });
  };

  const handleTemplateClick = (templateKey) => {
    const completeFormData = { ...formData, ...selectedOptions };
    const updatedFormData = updateConditionalFields(selectedOptions, completeFormData, config);

    const templateName = config.formConfigurations[currentOption].templates[templateKey];
    const renderedTemplate = renderTemplate(templateName, updatedFormData);
    log('Single template rendered', { templateKey, renderedTemplate });

    navigate('/output', { state: { renderedTemplates: { [templateKey]: renderedTemplate } } });
  };

  return (
    <Container className="page-container">
      <Typography variant="h4">Form Page</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel>Select Configuration</InputLabel>
          <Select value={currentOption} onChange={handleOptionChange}>
            {Object.keys(config.formConfigurations).map(option => (
              <MenuItem key={option} value={option}>{config.formConfigurations[option].heading}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputTextFields
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          fields={config.formConfigurations[currentOption].fields}
          inputFields={config.inputFields}
        />
        <SelectFields
          selectedOptions={selectedOptions}
          handleSelectChange={handleSelectChange}
          fields={config.formConfigurations[currentOption].fields}
          inputFields={config.inputFields}
        />
        <TemplateButtons
          currentOption={currentOption}
          handleTemplateClick={handleTemplateClick}
          handleSubmit={handleSubmit}
          formConfigurations={config.formConfigurations}
        />
      </form>
    </Container>
  );
};

export default FormPage;
