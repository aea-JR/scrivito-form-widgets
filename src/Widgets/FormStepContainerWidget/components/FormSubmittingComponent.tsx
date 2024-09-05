import * as React from "react";
interface FormSubmittingProps {
  submittingText: string;
  hidden: boolean;
}
export const FormSubmitting: React.FC<FormSubmittingProps> = ({
  submittingText,
  hidden

}) => {
  return (
    <div hidden={hidden} className="scrivito-neoletter-form-widgets form-container-widget text-center">
      <i
        className="bi bi-arrow-repeat bi-2x rotate-icon"
        aria-hidden="true"></i>{" "}
      <span className="text-super">{submittingText}</span>
    </div>
  );
};
