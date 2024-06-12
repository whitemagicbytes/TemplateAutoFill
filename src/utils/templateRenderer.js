import { templates } from '../config/templates';

/**
 * Render a template with the provided data.
 * @param {string} templateName - The name of the template file.
 * @param {Object} data - The data to apply to the template.
 * @returns {string} - The rendered template.
 */
function renderTemplate(templateName, data) {
  console.debug(`Rendering template ${templateName} with data:`, data);
  const templateContent = templates[templateName];
  if (!templateContent) {
    console.error(`Template ${templateName} not found.`);
    return `Template ${templateName} not found.`;
  }
  let rendered = templateContent;
  for (const key in data) {
    const placeholder = `{{${key}}}`;
    rendered = rendered.replace(new RegExp(placeholder, 'g'), data[key]);
  }
  return rendered;
}

export { renderTemplate };
