import { QuestionsWizardInterface } from '.';

export interface WizardReducerType {
  answer: string;
  answers: any[];
  activeQuestionIndex: number;
  activeQuestion: QuestionsWizardInterface;
}
