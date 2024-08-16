
export interface CaptchaOptions {
  siteKey: string;
  captchaType: "google-recaptcha" | "friendly-captcha" | null;
}

export interface Options {
  instanceId?: string
  captchaOptions?: CaptchaOptions,
  tracking?: boolean
}

export declare function initNeoletterFormWidgets(
  options?: Options
): void;

export interface FormSubmissionProviderProps {
  onSuccess?: () => void;
  onFailure?: () => void;
  children: React.ReactNode;
}
export declare const FormSubmissionProvider: React.FC<FormSubmissionProviderProps>;
