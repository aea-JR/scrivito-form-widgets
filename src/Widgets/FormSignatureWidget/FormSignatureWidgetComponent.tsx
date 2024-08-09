import * as React from "react";
import * as Scrivito from "scrivito";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormSignatureWidget } from "./FormSignatureWidgetClass";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Signature } from "../FormStepContainerWidget/components/SignatureComponent";
import "./FormSignatureWidget.scss";
Scrivito.provideComponent(FormSignatureWidget, ({ widget }) => {
  const [signatureDataUrl, setSignatureDataUrl] = React.useState<string>("")

  const onChangeSignature = (dataUrl: string) => {
    setSignatureDataUrl(dataUrl);
  }

  return (
    <div className="form-signature mb-3">
      <div className="signature-title">
        <span className="text-super">{widget.get("title")}</span>
        {widget.get("helpText") && <HelpText widget={widget} />}
      </div>
      <Signature
        id={widget.id()}
        onChange={onChangeSignature}
      ></Signature>
      <input
        type="hidden"
        name={getFieldName(widget)}
        value={signatureDataUrl}></input>
    </div>
  );
});
