// src/contexts/FormSubmissionContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface FormSubmissionContextProps {
	onSuccess?: () => void;
	onFailure?: () => void;
}

const FormSubmissionContext = createContext<FormSubmissionContextProps>({});

export const useFormSubmission = () => useContext(FormSubmissionContext);

export const FormSubmissionProvider: React.FC<{
	onSuccess?: () => void;
	onFailure?: () => void;
	children: ReactNode;
}> = ({ children, onSuccess, onFailure }) => {
	return (
		<FormSubmissionContext.Provider value={{ onSuccess, onFailure }}>
			{children}
		</FormSubmissionContext.Provider>
	);
};
