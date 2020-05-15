import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ArtistInterface } from '../../../models';
import { ApplicationState } from '../../../reducers';
import { ContentLoader } from './../../../components';
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

    const slides = [
      `Hi, my name is Rosetta Thorp, but I generally go by Musical Goddes.
      I am a female who grew up in Detroit. I went to My school and the Royal college.
      I currently live in Alabama.`,
      'My favorite festival is Woodstock. Once we get out of lockdown I am going to Rammstein concert in Berlin',
      'I speak English, love red color and word "Love". I listen to music most when walking and do not listen when sleep',
      'I lost my virginity on "A Matter of Trust". At AC/DC concert I first got high and got drunk '
    ];

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
                {slides.map(
                  (slide, i): React.ReactNode => (
                    <div key={i}>{slide}</div>
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

const mapStateToProps = ({ wizardAPI }: ApplicationState): object => {
  const { answers } = wizardAPI;
  return {
    answers
  };
};
export default connect(mapStateToProps, null)(MyBioPage);
