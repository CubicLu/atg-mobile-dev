import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { HeaderOverlay, Header, BackgroundImage } from '../../../components';
import { validateScrollHeader } from '../../../utils';

interface Props {}

interface State {
  blur: boolean;
}

class ArtistVideosPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<any> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = { blur: false };
  }

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event, 30);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef.current!.playTopHeader(currentScroll);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="artist-videos-page">
        <div className="artist-videos-page">
          <Header title="Videos" titleClassName="videos" />
          <HeaderOverlay ref={this.headerRef} />

          <IonContent
            scrollY={true}
            scrollEvents={true}
            onIonScroll={this.handleScroll.bind(this)}
            style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
          >
            <BackgroundImage
              gradient={`180deg,#1F0739,#1F0739`}
              backgroundTop
              backgroundBottom
              backgroundBottomDark={false}
              bottomRotate
              backgroundTopDark
              backgroundTopOpacity={0.7}
            >
              
            </BackgroundImage>
          </IonContent>
        </div>
      </IonPage>
    );
  }
}

export default ArtistVideosPage;
