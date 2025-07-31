import React, { useEffect } from 'react';
import { FormContainer } from '@/components/FormContainer';
import { useAuthStore } from '@/store/authStore';
import { BasicInfoForm } from '@/components/signup/BasicInfoForm';
import { ProfessionalDetailsForm } from '@/components/signup/ProfessionalDetailsForm';
import { PortfolioForm } from '@/components/signup/PortfolioForm';
import { LocationDetailsForm } from '@/components/signup/LocationDetailsForm';

export default function SignupScreen() {
  const currentStep = useAuthStore(state => state.currentSignupStep);
  const resetSignupForm = useAuthStore(state => state.resetSignupForm);
  
  // Reset form when component unmounts
  useEffect(() => {
    return () => {
      resetSignupForm();
    };
  }, [resetSignupForm]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm />;
      case 2:
        return <ProfessionalDetailsForm />;
      case 3:
        return <PortfolioForm />;
      case 4:
        return <LocationDetailsForm />;
      default:
        return <BasicInfoForm />;
    }
  };

  return (
    <FormContainer>
      {renderStep()}
    </FormContainer>
  );
}

