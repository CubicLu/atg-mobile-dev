import { Action, WizardReducerType, WizardActionType } from '../../models';
import { wizardQuestions } from '../../constants/wizard';
import createReducer from './../createReducer';

const defaultState: WizardReducerType = {
  answer: '',
  answers: [],
  activeQuestionIndex: 0,
  activeQuestion: wizardQuestions[0]
};

export const wizardReducer = createReducer<WizardReducerType>(defaultState, {
  [WizardActionType.GET_WIZARD_QUESTION](
    state: WizardReducerType
  ): WizardReducerType {
    return {
      ...state,
      activeQuestion: wizardQuestions[state.activeQuestionIndex]
    };
  },
  [WizardActionType.ANSWER_WIZARD_QUESTION](
    state: WizardReducerType,
    action: Action<any>
  ): WizardReducerType {
    return {
      ...state,
      answer: '',
      answers: [...state.answers, action.payload],
      activeQuestionIndex: state.activeQuestionIndex + 1
    };
  },
  [WizardActionType.UPDATE_ANSWER](
    state: WizardReducerType,
    action: Action<string>
  ): WizardReducerType {
    return {
      ...state,
      answer: action.payload
    };
  }
});
