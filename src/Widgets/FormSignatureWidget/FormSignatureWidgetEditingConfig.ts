import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";
//import formDateWidgetIcon from "../../assets/images/form_widget_date.svg";
//TODO: Get thumbnail
Scrivito.provideEditingConfig("FormSignatureWidget", {
  title: "Neoletter Form Signature",
  // thumbnail: formDateWidgetIcon,
  attributes: {
    title: { title: "Label" },
    deleteButtonText: { title: "Delete button text" },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" }
  },
  properties: ["title", "customFieldName", "helpText", "deleteButtonText"],
  initialContent: {
    title: "Sign here",
    customFieldName: "custom_"
  },
  validations: [insideFormContainerValidation, customFieldNameValidation]
});
