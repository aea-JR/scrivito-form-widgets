import * as React from "react";

interface FormSubmissionSucceededProps {
  submissionSuccessText: string;
  submissionSuccessSecondText: string
}

export const FormSubmissionSucceeded: React.FC<
  FormSubmissionSucceededProps
> = ({ submissionSuccessText, submissionSuccessSecondText }) => {
  return (
    <div className="scrivito-neoletter-form-widgets  text-center">
      {/* <div>
        <p className="text-super">Your JustRelate Code is</p>
        <p className="text-super">AB123_4x</p>

      </div> */}
      <h1 className="text_center center_codepage"><small className="block h2 medium">{submissionSuccessText}</small><strong className="block">{submissionSuccessSecondText}</strong></h1>

      {/* <i className="bi bi-check-lg bi-2x" aria-hidden="true"></i>{" "} */}
      {/* <span className="text-super">{submissionSuccessText}</span> */}
    </div>
  );
};
