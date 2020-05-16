import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ApplicationState } from '../../../reducers';
import { ContentLoader } from './../../../components';
import { userBioMock } from '../../../constants/mocks';
import { connect } from 'react-redux';

interface State {
  isReady: boolean;
}

interface StateProps {
  answers: string[];
}

interface Props extends StateProps {}

class MyBioPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  displayContent = (): void => {
    setTimeout((): void => {
      this.setState({
        isReady: true
      });
    }, 2000);
  };

  render(): React.ReactNode {
    if (!this.state.isReady) this.displayContent();
    const settings: any = {
      dots: true,
      infinite: false,
      speed: 500,
      arrows: false
    };

    return (
      <div className="content">
        <div className="my-bio my-3 mx-4">
          {!this.state.isReady ? (
            <ContentLoader
              speed={2}
              width={'100%'}
              height={'100vh'}
              baseUrl={window.location.pathname}
              backgroundColor="rgb(255,255,255)"
              foregroundColor="rgb(255,255,255)"
              backgroundOpacity={0.05}
              foregroundOpacity={0.15}
            >
              <rect x="0" y="0" rx="3" ry="3" width="375" height="200" />
            </ContentLoader>
          ) : (
            <div>
              <Slider {...settings}>
                {userBioMock.slides.map(
                  (slide, i): React.ReactNode => {
                    if (slide.text) {
                      return <div key={i}>{slide.text}</div>;
                    } else {
                      return (
                        <div key={i}>
                          {slide.questionaire?.map(
                            (q, c): React.ReactNode => (
                              <div key={c}>
                                <span className="question-row">
                                  {q.question}
                                </span>
                                <span className="answer-row">{q.answer}</span>
                              </div>
                            )
                          )}
                        </div>
                      );
                    }
                  }
                )}
              </Slider>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ wizardAPI }: ApplicationState): object => {
  const { answers } = wizardAPI;
  return {
    answers
  };
};
export default connect(mapStateToProps, null)(MyBioPage);
