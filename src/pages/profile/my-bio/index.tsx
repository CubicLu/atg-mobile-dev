import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FriendInterface } from '../../../models';
import { ApplicationState } from '../../../reducers';
import { ContentLoader } from './../../../components';
import { connect } from 'react-redux';

interface State {
  isReady: boolean;
}

interface StateProps {
  friends: FriendInterface[];
}

interface Props extends RouteComponentProps, StateProps {
  friendNickName?: string;
}

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
    const { friends, friendNickName } = this.props;
    const settings: any = {
      dots: true,
      infinite: false,
      speed: 500,
      arrows: false
    };

    const friendInfo = friends?.find(
      (item): boolean => item.username === friendNickName
    );

    return (
      <div className="content">
        <div className="my-bio my-3 mx-4">
          {!this.state.isReady && friends ? (
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
                <div key={'ss'}>{friendInfo?.shortBio}</div>
                {friendInfo?.slides.map(
                  (slide, i): React.ReactNode => (
                    <div key={i}>
                      <span className="question-row">{slide.question}</span>
                      <span className="answer-row">{slide.answer}</span>
                    </div>
                  )
                )}
              </Slider>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ friendAPI }: ApplicationState): object => {
  const { friends } = friendAPI;
  return {
    friends
  };
};
export default connect(mapStateToProps, null)(MyBioPage);
