import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseYaml } from '../utils/yamlParser';
import config from '../config/config.json';
import '../styles/main.scss';

const LandingPage = () => {
  const [yamlData, setYamlData] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleYamlChange = (e) => {
    setYamlData(e.target.value);
  };

  const handleYamlSubmit = () => {
    try {
      const parsedData = parseYaml(yamlData);
      const { formData, optionsData, optionType } = extractFormDataAndOptions(parsedData);
      console.log("LandingPage: Parsed YAML data and extracted formData and optionsData", formData, optionsData, optionType);
      navigate('/form', { state: { formData, optionsData, optionType } });
    } catch (e) {
      setError(e.message);
    }
  };

  const extractFormDataAndOptions = (parsedData) => {
    const formData = {};
    const optionsData = {};
    let optionType = config.defaultOption;

    Object.keys(parsedData).forEach(key => {
      const field = Object.values(config.inputFields).find(f => f.yamlKey === key);
      if (field) {
        formData[key] = parsedData[key];
        if (field.type === 'select') {
          optionsData[key] = parsedData[key];
        }
      }
    });

    Object.keys(config.formConfigurations).forEach(configKey => {
      if (Object.keys(parsedData).includes(configKey)) {
        optionType = configKey;
      }
    });

    return { formData, optionsData, optionType };
  };

  return (
    <div className="page-container">
      <h1>Enter YAML Data</h1>
      <textarea
        value={yamlData}
        onChange={handleYamlChange}
        placeholder="Enter YAML data here..."
      ></textarea>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleYamlSubmit}>Submit YAML</button>
      <div className="readme-container">
        <h2>Read Me</h2>
        <p>Welcome to the YAML data processing application. Here's how to use this page:</p>
        <ul>
          <li>Enter your YAML data in the text area above.</li>
          <li>Click the "Submit YAML" button to process the data.</li>
          <li>You will be taken to the form page where you can review and modify the parsed data.</li>
          <li>Submit the form to see the rendered templates on the output page.</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
