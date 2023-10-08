# Scrivito Form Widgets

A set of Scrivito Widgets for building awesome forms

# Features
- Single step & multi step forms
- Dropdown
- Single select radio buttons
- Multi select checkboxes
- Rating
- Date & date-time
- Conditionals

## Installation

Install the package in your scrivito app:

```shell
npm install scrivito-form-widgets
```

Import the widget in your javascript (e.g. in `src/index.js` or `src/Widgets/index.js`):

```js
import "scrivito-form-widgets";
```

Add the styling of the widget to your app. 
This can be done by either loading it via `css-loader` (e.g. in `src/index.js` or `src/Widgets/index.js`):

```js
import "scrivito-form-widgets/index.css";
```

 Or by including the styling to your stylesheets (e.g. in `src/assets/stylesheets/index.scss`):

```scss
@import "~scrivito-form-widgets/index.css";
```

Delete all Form Widgets contained in the Widgets folder:
- FormButtonWidget
- FormCheckboxWidget
- FormContainerWidget
- FormHiddenFieldWidget
- FormInputFieldWidget

Navigate to the config folder in your Scrivito App and create a new file called formConfig.js or similar and paste the below code inside of it
```js
import { setScrivitoFormWidgetConfig } from "scrivito-form-widgets";

export function configureForm() {
    setScrivitoFormWidgetConfig(process.env.SCRIVITO_TENANT);
}
```
This will set the tenant for the form widgets which is needed for form submission. Optionaly you can also add the ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE variable if you are using it:
```js
setScrivitoFormWidgetConfig(process.env.SCRIVITO_TENANT, process.env.ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE);
 ```

Go to the index.js file in the config folder and call the configureForm() function inside configure()
```js
export function configure(options) {
  configureScrivito(options);
    ...
  configureForm();
}
```
