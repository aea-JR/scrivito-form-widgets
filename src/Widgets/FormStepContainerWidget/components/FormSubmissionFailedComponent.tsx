import * as React from "react";

interface FormSubmissionFailedProps {
  submissionFailureText: string;
  //TODO: Fix this for legacy form
  onReSubmit?: () => Promise<void>;
  hidden: boolean;
  retryButtonText: string;
}
export const FormSubmissionFailed: React.FC<FormSubmissionFailedProps> = ({
  submissionFailureText,
  onReSubmit,
  hidden,
  retryButtonText
}) => {
  return (
    <div hidden={hidden} className="scrivito-neoletter-form-widgets form-container-widget text-center full-width">
      <i
        className="bi bi-exclamation-triangle-fill bi-5x"
        aria-hidden="true"></i>{" "}
      <h5 className="text-super submission-failed-text">{submissionFailureText}</h5>
      <div>
        <button className="btn btn-primary retry-button" onClick={onReSubmit}>{retryButtonText}</button>
      </div>
    </div>
  );
};
