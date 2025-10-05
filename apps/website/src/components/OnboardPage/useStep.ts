'use client';

import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { formatOnboardUrl } from './formatOnboardUrl';
import { getPlanDetails } from './getPlanDetails';
import {
  type OnboardingStepIds,
  onboardingSteps,
  sessionStorageIndex,
} from './steps';

export const useStep = <T extends OnboardingStepIds>(stepId: T) => {
  type Step = (typeof onboardingSteps)[T];

  const router = useRouter();
  const step = onboardingSteps[stepId] as Step;

  const { details } = useParams<{ details: string[] }>();
  const pageDetails = getPlanDetails(details);

  const searchParams = useSearchParams();
  const { origin, ...otherParams } = Object.fromEntries(searchParams.entries());
  const [dynamicsContent, setDynamicsContent] = usePersistedStore<Pick<
    Step,
    'state' | 'formData'
  > | null>(`${sessionStorageIndex}${stepId}`, {
    state: step.state,
    formData: step.formData,
  });

  type NextUrlType = Step['getNextStep'] extends undefined ? undefined : string;

  const nextUrl: NextUrlType = (
    step.getNextStep
      ? formatOnboardUrl({
          ...pageDetails,
          origin,
          step: step.getNextStep(pageDetails),
          otherParams,
        })
      : undefined
  ) as NextUrlType;

  type PreviousUrlType = Step['getPreviousStep'] extends undefined
    ? undefined
    : string;

  const previousUrl: PreviousUrlType = (
    step.getPreviousStep
      ? formatOnboardUrl({
          ...pageDetails,
          origin,
          step: step.getPreviousStep(pageDetails),
          otherParams,
        })
      : undefined
  ) as PreviousUrlType;

  type GoNextStepType = Step['getNextStep'] extends undefined
    ? undefined
    : () => void;

  const goNextStep: GoNextStepType = (
    nextUrl
      ? () => {
          if (nextUrl) {
            router.push(nextUrl);
          }
        }
      : undefined
  ) as GoNextStepType;

  type GoPreviousStepType = Step['getPreviousStep'] extends undefined
    ? () => undefined
    : () => void;

  const goPreviousStep: GoPreviousStepType = (
    previousUrl
      ? () => {
          if (previousUrl) {
            router.push(previousUrl);
          }
        }
      : origin
        ? () => router.push(origin)
        : undefined
  ) as GoPreviousStepType;

  const setState = (data: Partial<Step['state']>) =>
    setDynamicsContent((prev) => ({
      ...prev,
      state: {
        ...(prev?.state as Step['state']),
        ...data,
      },
    }));

  const setFormData = (data: Partial<Step['formData']>) =>
    setDynamicsContent((prev) => ({
      ...prev,
      formData: {
        ...(prev?.formData as Step['formData']),
        ...data,
      },
    }));

  return {
    ...step,
    ...dynamicsContent,
    nextUrl,
    previousUrl,
    goNextStep,
    goPreviousStep,
    setState,
    setFormData,
  };
};
