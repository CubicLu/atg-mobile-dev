import React from 'react';
import { connect } from 'react-redux';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import {
  getWizardQuestion,
  answerWizardQuestion,
  setAnswerValue
} from '../../../actions';
import { wizardQuestions } from '../../../constants/wizard';
import {
  Header,
  BackgroundImage,
  ChatBalloon,
  InputChat,
  InputChip,
  HeaderOverlay,
  LogoIcon
} from '../../../components';
import { QuestionsWizardInterface } from '../../../models';

interface StateProps {
  answer: string;
  answers: string[];
  activeQuestionIndex: number;
  activeQuestion: QuestionsWizardInterface;
}

interface DispatchProps {
  answerWizardQuestion: (answer: string) => void;
  setAnswerValue: (index: string) => void;
}

interface Options {
  description: string;
  value: string;
}

interface Props extends DispatchProps, StateProps {}

class WizardPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  private messagesEndRef: React.RefObject<any> = React.createRef();
  componentDidUpdate(): boolean {
    const { answers, activeQuestionIndex } = this.props;
    const isLastQuestion = !wizardQuestions[activeQuestionIndex];
    if (isLastQuestion) return false;
    if (wizardQuestions[activeQuestionIndex].dependsOn) {
      const index = wizardQuestions.findIndex(
        (question): boolean =>
          question.id === wizardQuestions[activeQuestionIndex].dependsOn?.id
      );
      if (
        wizardQuestions[activeQuestionIndex].dependsOn?.value !== answers[index]
      ) {
        this.props.answerWizardQuestion('');
        this.scrollToBottom();
        return true;
      }
    }
    this.scrollToBottom();
    return false;
  }
  handleOnChange = (value: string): void => {
    this.props.setAnswerValue(value);
  };

  handleOnClick = (value: string): void => {
    this.props.answerWizardQuestion(value || this.props.answer);
  };
  componentDidMount(): void {
    this.scrollToBottom();
  }
  scrollToBottom = (): void => {
    this.messagesEndRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  };

  renderMessages(
    answers: string[],
    wizardQuestions: QuestionsWizardInterface[]
  ): React.ReactNode {
    return (
      answers &&
      answers.map((answer: string, i: number): React.ReactNode | void => {
        if (answer === '') return null;
        return (
          <React.Fragment key={i}>
            {wizardQuestions[i].question.split('||').map(
              (message: string, index: number): React.ReactNode => {
                return (
                  <ChatBalloon
                    isReply={false}
                    message={message}
                    key={`${i}-${index}-question`}
                    date={new Date()}
                  />
                );
              }
            )}
            <ChatBalloon
              isReply={true}
              message={answer[0].toUpperCase() + answer.slice(1)}
              key={`${i}answer`}
              date={new Date()}
            />
          </React.Fragment>
        );
      })
    );
  }

  renderQuestion(
    wizardQuestions: any[],
    activeQuestionIndex: number
  ): React.ReactNode {
    return (
      <>
        {wizardQuestions[activeQuestionIndex].question.split('||').map(
          (message: string, index: number): React.ReactNode => {
            return (
              <ChatBalloon
                isReply={false}
                message={message}
                key={`${activeQuestionIndex}-${index}`}
                date={new Date()}
              />
            );
          }
        )}
        {wizardQuestions[activeQuestionIndex].type === 'multi-option' &&
          wizardQuestions[activeQuestionIndex].options?.map(
            (option: Options): React.ReactNode => {
              return (
                <InputChip
                  key={`${option.value}`}
                  clickable
                  label={option.description}
                  action={(): void => {
                    this.handleOnClick(option.value.toString());
                  }}
                />
              );
            }
          )}
        {wizardQuestions[activeQuestionIndex].skip && (
          <InputChip
            clickable
            label={wizardQuestions[activeQuestionIndex].skipText || 'Skip'}
            action={(): void => {
              this.handleOnClick('');
            }}
          />
        )}
      </>
    );
  }

  renderBioInfo(answers: any[]): string {
    let bio = '';
    const realName = answers[0];
    const nickname = answers[0].split(' ')[0];
    bio += `Hi, my name is ${realName}, but I generally go by ${nickname}.`;
    const gender = answers[1];
    const hometown = answers[4];
    bio += ` I am a ${gender} who grew up in ${hometown}.`;
    const highSchool = answers[5];
    const college = answers[6];
    if (highSchool && college)
      bio += ` I went to ${highSchool} and the ${college}.`;
    const cityState = answers[7];
    bio += `I currently live in ${cityState}.`;

    return bio;
  }

  render(): React.ReactNode {
    const { answers, activeQuestionIndex } = this.props;
    const isLastQuestion = !wizardQuestions[activeQuestionIndex];
    return (
      <IonPage id="wizard-page">
        <Header
          rightCloseButton
          className="wizard-page--header"
          centerContent={
            <div className="wizard-page--avatar">
              <LogoIcon width={50} height={50} />
              <span className="f6 wizard-page--avatar--span">Panthr Bot</span>
            </div>
          }
        />
        <HeaderOverlay
          ref={this.headerRef}
          className="wizard-page--header-overlay"
        />
        <BackgroundImage default />
        <IonContent
          className="wizard-page--content"
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div
            className="wizard-page--content content-container"
            ref={this.messagesEndRef}
          >
            {this.renderMessages(answers, wizardQuestions)}
            {!isLastQuestion &&
              this.renderQuestion(wizardQuestions, activeQuestionIndex)}
            {isLastQuestion && (
              <ChatBalloon
                isReply={true}
                message={this.renderBioInfo(answers)}
                date={new Date()}
              />
            )}
          </div>
        </IonContent>
        {!isLastQuestion &&
          wizardQuestions[activeQuestionIndex].type === 'text' && (
            <InputChat
              className={'wizard-page--chat-input'}
              label={'Send'}
              placeholder={'Type the answer here'}
              onChange={this.handleOnChange}
              onClick={this.handleOnClick}
              value={this.props.answer}
            />
          )}
      </IonPage>
    );
  }
}

const mapStateToProps = ({ wizardAPI }: ApplicationState): StateProps => {
  const { activeQuestion, activeQuestionIndex, answers, answer } = wizardAPI;
  return {
    answer,
    activeQuestion,
    activeQuestionIndex,
    answers
  };
};

export default connect(mapStateToProps, {
  getWizardQuestion,
  answerWizardQuestion,
  setAnswerValue
})(WizardPage);
