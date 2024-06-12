// templates.js
export const template1 = `
Company Information:
=====================
Company: {{company}}
Domain: {{domain}}
conditioonal_mapping: {{zone_name}}
env: {{env}}
`;

export const template2 = `
Tutorial Information:
======================
Company: {{company}}
Domain: {{domain}}
conditioonal_mapping: {{zone_name}}
env: {{env}}
`;

// Aggregate all templates into an object
export const templates = {
  'template1.txt': template1,
  'template2.txt': template2,
};
