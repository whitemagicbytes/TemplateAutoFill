Template AutoFill
A React application for auto-filling templates based on user input, with functionality for downloading the rendered output as a PDF.

Table of Contents
Introduction
Features
Getting Started
Prerequisites
Installation
Usage
Running the Application
Using the Application
Configuration
Testing
Contributing
License
Acknowledgements
Introduction
Template AutoFill is a React-based web application designed to streamline the process of filling out and generating documents from templates. Users can input data, select options, and render templates, which can then be downloaded as PDF files.

Features
Auto-fill templates based on user input
Dynamic form fields and options
Conditional logic for form field values
PDF download of rendered templates
User-friendly UI with improved user experience
Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js (v14 or higher)
npm or yarn
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/your-username/template-autofill.git
cd template-autofill
Install the dependencies:

sh
Copy code
npm install
# or
yarn install
Usage
Running the Application
Start the development server:

sh
Copy code
npm start
# or
yarn start
The application will be available at http://localhost:3000.

Using the Application
Navigate to the application in your browser.
Enter the required data in the form fields on the form page.
Click the "Submit" button to generate the templates.
Review the rendered templates on the output page.
Click "Download PDF" to save the rendered template as a PDF file.
Configuration
The application configuration is managed through a JSON file located at src/config/config.json. This file includes:

Form configurations
Input field definitions
Conditional mappings for dynamic field values
Example Configuration
json
Copy code
{
  "defaultOption": "basic",
  "inputFields": {
    "company": {
      "label": "Company",
      "placeholder": "Enter company name",
      "validation": {
        "required": true,
        "pattern": "^[a-zA-Z0-9 ]+$",
        "errorMessage": "Company name should only contain alphanumeric characters and spaces."
      }
    },
    "domain": {
      "label": "Domain",
      "placeholder": "Enter domain",
      "validation": {
        "required": true,
        "pattern": "^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}$",
        "errorMessage": "Please enter a valid domain."
      }
    }
  },
  "formConfigurations": {
    "basic": {
      "heading": "Basic Info",
      "fields": ["company", "domain"],
      "templates": {
        "template1": "template1.txt",
        "template2": "template2.txt"
      }
    },
    "tutorial": {
      "heading": "Tutorial Info",
      "fields": ["company", "domain"],
      "templates": {
        "template2": "template2.txt",
        "template1": "template2.txt"
      }
    }
  }
}

Testing
To run the tests for this project, use the following command:

sh
Copy code
npm test
# or
yarn test
The test suite includes unit tests for the core functionality, including form handling, template rendering, and conditional logic.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Create a pull request.
Please ensure your code follows the project's coding standards and includes tests where applicable.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgements
React
jsPDF
React Router
This README provides an overview of the project, instructions for setting up and running the application, and information on how to contribute. You can customize it further based on your specific requirements and project details.


You
ok I dont want to have aws_account and env qa prod or perf account zone name in this config can you share a new one with out all these 
{
  "defaultOption": "basic",
  "inputFields": {
    "company": {
      "label": "Company",
      "placeholder": "Enter company name",
      "validation": {
        "required": true,
        "pattern": "^[a-zA-Z0-9 ]+$",
        "errorMessage": "Company name should only contain alphanumeric characters and spaces."
      }
    },
    "domain": {
      "label": "Domain",
      "placeholder": "Enter domain",
      "validation": {
        "required": true,
        "pattern": "^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}$",
        "errorMessage": "Please enter a valid domain."
      }
    },
    "aws_account": {
      "label": "AWS Account",
      "type": "select",
      "options": ["clone3", "clone2"],
      "defaultValue": "clone2",
      "conditionalMappings": [
        {
          "if": {"aws_account": "clone2", "env": "qa"},
          "then": {"account": "shared-qaclone2", "zone_name": "qa_zone"}
        },
        {
          "if": {"aws_account": "clone3", "env": "perf"},
          "then": {"account": "shared-perfclone3", "zone_name": "perf_zone_clone3"}
        }
      ]
    },
    "env": {
      "label": "Environment",
      "type": "select",
      "options": ["qa", "perf", "prod"],
      "defaultValue": "qa"
    }
  },
  "formConfigurations": {
    "basic": {
      "heading": "Basic Info",
      "fields": ["company", "domain", "aws_account", "env"],
      "templates": {
        "template1": "template1.txt",
        "template2": "template2.txt"
      }
    },
    "tutorial": {
      "heading": "Tutorial Info",
      "fields": ["company", "aws_account", "env"],
      "templates": {
        "template2": "template2.txt",
        "template1": "template2.txt"
      }
    }
  }
}