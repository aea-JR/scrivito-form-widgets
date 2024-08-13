// src/contexts/FormSubmissionContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface FormSubmissionContextProps {
	onSuccess?: () => void;
	onFailure?: () => void;
}

const FormSubmissionContext = createContext<FormSubmissionContextProps>({});

export const useFormSubmission = () => useContext(FormSubmissionContext);

interface FormSubmissionProviderProps {
	children: ReactNode;
	onSuccess?: () => void;
	onFailure?: () => void;
}

export const FormSubmissionProvider: React.FC<FormSubmissionProviderProps> = ({ children, onSuccess, onFailure }) => {
	return (
		<FormSubmissionContext.Provider value={{ onSuccess, onFailure }}>
			{children}
		</FormSubmissionContext.Provider>
	);
};
