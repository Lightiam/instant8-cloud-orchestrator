
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cloud, ArrowRight, ArrowLeft, Check, Settings, Monitor, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CloudProviderSetup from '@/components/onboarding/CloudProviderSetup';
import PreferencesSetup from '@/components/onboarding/PreferencesSetup';
import BillingSetup from '@/components/onboarding/BillingSetup';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Connect Cloud Providers',
      description: 'Link your AWS, Azure, and Google Cloud accounts',
      icon: Cloud,
      component: CloudProviderSetup
    },
    {
      title: 'Configure Preferences',
      description: 'Set your default deployment preferences',
      icon: Settings,
      component: PreferencesSetup
    },
    {
      title: 'Setup Billing & Monitoring',
      description: 'Configure cost tracking and alerts',
      icon: CreditCard,
      component: BillingSetup
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and navigate to dashboard
      navigate('/');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Instant8</span>
          </div>
          <Button variant="ghost" onClick={handleSkip}>
            Skip Setup
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const StepIcon = step.icon;

              return (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2
                      ${isActive ? 'bg-blue-600 border-blue-600 text-white' : ''}
                      ${isCompleted ? 'bg-green-600 border-green-600 text-white' : ''}
                      ${!isActive && !isCompleted ? 'bg-white border-gray-300 text-gray-400' : ''}
                    `}>
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                      Step {index + 1}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="p-8 shadow-xl border-0">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-lg text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          <CurrentStepComponent />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next Step'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
