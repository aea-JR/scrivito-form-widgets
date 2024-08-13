import * as React from "react";

interface FormSubmissionSucceededProps {
  submissionSuccessText: string;
}

export const FormSubmissionSucceeded: React.FC<
  FormSubmissionSucceededProps
> = ({ submissionSuccessText }) => {
  return (
    <div className="scrivito-neoletter-form-widgets  text-center">
      {/* <div>
        <p className="text-super">Your JustRelate Code is</p>
        <p className="text-super">AB123_4x</p>

      </div> */}
      <h1 className="h1 text_center center_codepage"><small className="block h2 medium">Your JustRelate Code is</small><strong className="block">AB123_4x</strong></h1>

      {/* <i className="bi bi-check-lg bi-2x" aria-hidden="true"></i>{" "} */}
      {/* <span className="text-super">{submissionSuccessText}</span> */}
    </div>
  );
};
