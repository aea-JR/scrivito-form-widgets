import * as Scrivito from "scrivito";

export const FormSignatureWidget = Scrivito.provideWidgetClass("FormSignatureWidget", {
  attributes: {
    title: "string",
    helpText: "html",
    deleteButtonText: "string",
    customFieldName: "string"
  }
});
