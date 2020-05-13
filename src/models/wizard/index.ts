import { Nullable, QuestionWizardTypes, QuestionIdType } from './../../types';
export interface QuestionsWizardInterface {
  id: string;
  dependsOn?: Nullable<QuestionDependsOnInterface>;
  skip?: boolean;
  skipText?: string;
  question: string;
  type: QuestionWizardTypes;
  options?: QuestionWizardOptionInterface[];
}

export interface QuestionWizardOptionInterface {
  description: string;
  value: string | number;
}

export interface QuestionDependsOnInterface {
  id: QuestionIdType;
  value: string | number;
}
