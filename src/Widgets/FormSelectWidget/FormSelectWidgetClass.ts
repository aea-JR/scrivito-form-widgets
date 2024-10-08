import * as Scrivito from "scrivito";

export const FormSelectWidget = Scrivito.provideWidgetClass(
  "FormSelectWidget",
  {
    attributes: {
      selectionType: [
        "enum",
        {
          values: ["radio", "dropdown", "multi", "linear-scale"]
        }
      ],
      title: "string",
      items: "stringlist",
      customFieldName: "string",
      required: "boolean",
      helpText: "html",
      linearScaleLowerLimit: ["enum", { values: ["0", "1"] }],
      linearScaleUpperLimit: [
        "enum",
        { values: ["2", "3", "4", "5", "6", "7", "8", "9", "10"] }
      ],
      linearScaleLowerLabel: "string",
      linearScaleUpperLabel: "string",
      showClearSelectionText: "boolean",
      clearSelectionText: "string",
      inlineView: "boolean",
      navigateOnClick: "boolean",
      useFloatingLabel: "boolean"
    }
  }
);
