import yaml from 'js-yaml';

/**
 * Parse YAML data and return a JavaScript object.
 * @param {string} yamlString - The YAML string to parse.
 * @returns {Object} - The parsed YAML data.
 */
function parseYaml(yamlString) {
  try {
    const parsedData = yaml.load(yamlString);
    console.debug('Parsed YAML data:', parsedData);
    return parsedData;
  } catch (e) {
    console.error('Error parsing YAML:', e);
    throw new Error('Invalid YAML format');
  }
}

export { parseYaml };
