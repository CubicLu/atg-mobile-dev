import { Action, WizardActionType } from '../../models';

export const getWizardQuestion = (): any => ({
  type: WizardActionType.GET_WIZARD_QUESTION
});

export const answerWizardQuestion = (answer: string): any => ({
  type: WizardActionType.ANSWER_WIZARD_QUESTION,
  payload: answer
});

export const setAnswerValue = (inputValue: string): Action<string> => ({
  type: WizardActionType.UPDATE_ANSWER,
  payload: inputValue
});
