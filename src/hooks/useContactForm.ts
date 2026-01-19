'use client';

import { useApi } from './useApi';
import { useCallback, useState } from 'react';
import * as Sentry from '@sentry/nextjs';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  file?: File | null;
  sendTo: 'CAREER' | 'CONTACT_US' | 'PRODUCT';
}

interface SubmitResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface UseContactFormReturn {
  submitApplication: (data: ContactFormData) => Promise<SubmitResponse>;
  isSubmitting: boolean;
  error: string | null;
  isSuccess: boolean;
  reset: () => void;
}

const useContactForm = (): UseContactFormReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const api = useApi({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30000, // 30 seconds for file uploads
    retries: 1,
  });

  const getEndpoint = useCallback((sendTo: ContactFormData['sendTo']) => {
    switch (sendTo) {
      case 'CAREER':
        return '/careers/apply';
      case 'CONTACT_US':
        return '/email/send/contact';
      case 'PRODUCT':
        return '/email/send/custom-products';
    }
  }, []);

  const submitApplication = useCallback(
    async (data: ContactFormData): Promise<SubmitResponse> => {
      setIsSubmitting(true);
      setError(null);
      setIsSuccess(false);

      try {
        const formData = new FormData();
        formData.append('firstname', data.firstName);
        formData.append('lastname', data.lastName);
        formData.append('email', data.email);
        formData.append('message', data.message || '');

        if (data.file) {
          formData.append('file', data.file);
        }

        const response = await api.execute(getEndpoint(data.sendTo), {
          method: 'POST',
          body: formData,
        });

        if (response.error) {
          Sentry.captureException(response.error, {
            tags: {
              hook: 'useContactForm',
              operation: 'submitApplication',
            },
            extra: {
              error: response.error,
            },
          });
          return {
            success: false,
            message: response.error,
          };
        }

        setIsSuccess(true);
        return {
          success: true,
          message: 'Application submitted successfully',
          data: response.data,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to submit application';

        Sentry.captureException(err, {
          tags: {
            hook: 'useContactForm',
            operation: 'submitApplication',
          },
          extra: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            hasFile: !!data.file,
            errorMessage,
          },
        });

        setError(errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      } finally {
        setIsSubmitting(false);
      }
    },
    [api]
  );

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setError(null);
    setIsSuccess(false);
  }, []);

  return {
    submitApplication,
    isSubmitting,
    error,
    isSuccess,
    reset,
  };
};

export default useContactForm;
