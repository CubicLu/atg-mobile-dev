import React from 'react';
import {
  IonContent,
  IonPage,
  IonSlides,
  IonSlide,
  createAnimation,
  withIonLifeCycle
} from '@ionic/react';
import {
  Avatar,
  CloseIcon,
  ButtonIcon,
  ShareLineIcon,
  BalloonIcon,
  StarIcon,
  DotsThreeIcon
} from '../../../components';
import { ShapesSize, DailyDripType, DailyDripItem } from '../../../interfaces';
import { RouteChildrenProps } from 'react-router';
import { hideTabs } from '../../../utils';
interface MatchParams {
  artistId: string;
  dailyDripId: string;
}
interface State {
  dailyDrip?: DailyDripType;
}
interface Props extends RouteChildrenProps<MatchParams> {}
class CommunityDailyDripPage extends React.Component<Props, State> {
  private slider: React.RefObject<HTMLIonSlidesElement> = React.createRef();
  private dailyDripAnimation: Animation | any;
  private paused: boolean = false;
  private last: boolean = false;
  private first: boolean = true;
  constructor(props: Props) {
    super(props);
    this.state = { dailyDrip: undefined };
  }
  ionViewWillEnter(): void {
    hideTabs(true);
  }
  ionViewWillLeave(): void {
    hideTabs(false);
    this.setState({ dailyDrip: undefined });
    this.resetProgress();
  }
  componentDidMount(): void {
    const now = document.querySelector('.dots-now') as HTMLElement;
    this.dailyDripAnimation = createAnimation()
      .addElement(now)
      .duration(5000)
      .delay(500)
      .easing('linear')
      .fromTo('width', 0, '100%')
      .onFinish((): void => this.renderNextSlide());
  }
  ionViewDidEnter(): void {
    this.loadDrip(this.props.match!.params);
  }
  UNSAFE_componentWillUpdate(next: Props): void {
    const params = next.match!.params;
    if (params.dailyDripId !== this.props.match!.params.dailyDripId) {
      this.loadDrip(next.match!.params);
    }
  }

  loadDrip(newP: MatchParams): void {
    if (this.state.dailyDrip?.id === newP.dailyDripId) return;
    const current = this.drips.find((x): boolean => x.id === newP.dailyDripId)!;
    if (!current) {
      return this.props.history.push(`/community/artist/${newP.artistId}`);
    }
    this.setState({ dailyDrip: current }, (): void => {
      this.last = false;
      this.first = true;
      this.resetProgress();
    });
  }

  renderHeader(): React.ReactNode {
    return (
      <div className="header px-2">
        <div className="dots my-1 flex-justify-content-center">
          <div className="dots-container fluid">
            <div className="dots-bar m-0 my-1" />
            <div className="dots-now m-0 my-1" />
          </div>
        </div>
        <div className="flex-justify-content-center">
          <div className="align-start flex-align-items-center">
            <Avatar
              image={'https://loremflickr.com/50/50'}
              type={ShapesSize.circle}
              width={36}
              height={36}
            />
            <span className="f5 bold mx-1">{this.state.dailyDrip?.name}</span>
          </div>
          <div className="align-end">
            <ButtonIcon
              icon={<CloseIcon />}
              styles={{ width: 32, height: 32 }}
              onClick={(): void =>
                this.props.history.push(
                  `/community/artist/${this.props.match?.params.artistId}`
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }

  renderFooter(): React.ReactNode {
    return (
      <div className="footer pb-4 flex-justify-content-center buttons">
        <ButtonIcon className="mx-1" icon={<ShareLineIcon />} />
        <ButtonIcon className="mx-1" icon={<BalloonIcon />} />
        <ButtonIcon className="mx-1" icon={<StarIcon />} />
        <ButtonIcon className="mx-1" icon={<DotsThreeIcon />} />
      </div>
    );
  }
  click(d: TouchEvent): void {
    const regionClicked = 0 in d.changedTouches && d.changedTouches[0].pageX;
    if (!regionClicked) return;
    if (regionClicked <= 100) {
      this.first ? this.navigateOtherDrip(false) : this.renderPreviousSlide();
    } else if (d.view!.innerWidth - regionClicked <= 100) {
      this.renderNextSlide();
    }
  }
  renderPreviousSlide(): void {
    if (!this.slider) return;
    this.resetProgress();
    this.slider?.current?.slidePrev();
  }
  renderNextSlide(): void {
    if (!this.slider) return;
    this.resetProgress();
    if (this.first) this.first = false;
    this.last
      ? this.navigateOtherDrip(true)
      : this.slider?.current?.slideNext();
  }
  resetProgress(): void {
    this.dailyDripAnimation.stop();
  }
  startProgress(): void {
    this.paused = false;
    this.dailyDripAnimation.play();
  }
  pauseProgress(): void {
    if (this.paused) return;
    this.paused = true;
    this.dailyDripAnimation.pause();
  }
  navigateOtherDrip(next: boolean = true): void {
    this.last = false;
    this.first = true;
    const params = this.props.match!.params!;
    const nextDrip = Number(params.dailyDripId) + (next ? 1 : -1);
    const url =
      nextDrip < 0 || nextDrip > 2
        ? `/community/artist/${params.artistId}`
        : `/community/artist/${params.artistId}/daily-drip/${nextDrip}`;
    return this.props.history.push(url);
  }

  render(): React.ReactNode {
    const slides = this.state.dailyDrip?.items;
    return (
      <IonPage style={{ background: '#000' }} id="community-daily-drip-page">
        <IonContent scrollY={false}>
          <div className={`community-daily-drip-page space-between h-100`}>
            {this.renderHeader()}
            <React.Fragment>
              {slides && (
                <IonSlides
                  key={this.state.dailyDrip?.id}
                  ref={this.slider}
                  style={{
                    width: '100vw',
                    transform: 'scaleX(1.15) scaleY(1.05)'
                  }}
                  pager={true}
                  scrollbar={false}
                  options={this.slideOptions}
                  onIonSlideTransitionStart={(): void => this.resetProgress()}
                  onIonSlideTransitionEnd={(): void => this.startProgress()}
                  onIonSlidesDidLoad={(): void => this.startProgress()}
                  onIonSlideTouchEnd={(): void => this.startProgress()}
                  onIonSlideDrag={(): void => this.pauseProgress()}
                  onIonSlideTouchStart={(): void => this.pauseProgress()}
                  onIonSlideDoubleTap={(): void => this.navigateOtherDrip(true)}
                  onIonSlideReachStart={(): boolean => (this.first = true)}
                  onIonSlideReachEnd={(): boolean => (this.last = true)}
                  onIonSlideTap={(e: CustomEvent): void => this.click(e.detail)}
                >
                  {slides?.map((slide: DailyDripItem, i: number): any => (
                    <IonSlide
                      key={i}
                      style={{
                        backgroundImage: `url(${slide.href})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: 'auto',
                        height: '100vh'
                      }}
                    />
                  ))}
                </IonSlides>
              )}
            </React.Fragment>
            {this.renderFooter()}
          </div>
        </IonContent>
      </IonPage>
    );
  }

  drips: DailyDripType[] = [
    {
      id: '0',
      name: 'Ok Now',
      total: 9,
      lastViewed: -1,
      artistUsername: 'pharell-williams',
      items: [
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id840316170?s=612x612',
          duration: 5000,
          id: 'id840316170'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id473357786?s=612x612',
          duration: 5000,
          id: 'id473357786'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id537429024?s=612x612',
          duration: 5000,
          id: 'id537429024'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id510510510?s=612x612',
          duration: 5000,
          id: 'id510510510'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id612577988?s=612x612',
          duration: 5000,
          id: 'id612577988'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id487833634?s=612x612',
          duration: 5000,
          id: 'id487833634'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id978876670?s=612x612',
          duration: 5000,
          id: 'id978876670'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id97690691?s=612x612',
          duration: 5000,
          id: 'id97690691'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id931712328?s=612x612',
          duration: 5000,
          id: 'id931712328'
        }
      ]
    },
    {
      id: '1',
      name: 'Interviews',
      total: 6,
      lastViewed: -1,
      artistUsername: 'pharell-williams',
      items: [
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id849799804?s=612x612',
          duration: 5000,
          id: 'id849799804'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id1052659610?s=612x612',
          duration: 5000,
          id: 'id1052659610'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id606519424?s=612x612',
          duration: 5000,
          id: 'id606519424'
        },

        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id487141800?s=612x612',
          duration: 5000,
          id: 'id487141800'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id84011349?s=612x612',
          duration: 5000,
          id: 'id84011349'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id508985426?s=612x612',
          duration: 5000,
          id: 'id508985426'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id508987324?s=612x612',
          duration: 5000,
          id: 'id508987324'
        }
      ]
    },
    {
      id: '2',
      name: 'New Single',
      total: 7,
      lastViewed: -1,
      artistUsername: 'pharell-williams',
      items: [
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id543488922?s=612x612',
          duration: 5000,
          id: 'id543488922'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id1127185310?s=612x612',
          duration: 5000,
          id: 'id1127185310'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id465311435?s=612x612',
          duration: 5000,
          id: 'id465311435'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id1068531852?s=612x612',
          duration: 5000,
          id: 'id1068531852'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id626494358?s=612x612',
          duration: 5000,
          id: 'id626494358'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id626505698?s=612x612',
          duration: 5000,
          id: 'id626505698'
        },
        {
          createdAt: 1586187656148,
          dripType: 'image',
          href:
            'https://media.gettyimages.com/photos/picture-id903731016?s=612x612',
          duration: 5000,
          id: 'id903731016'
        }
      ]
    }
  ];

  private slideOptions: any = {
    initialSlide: 0,
    scrollbar: false,
    pager: false,
    speed: 300,
    shortSwipes: false,
    passiveListeners: false,
    pagination: {
      el: null
    },
    cubeEffect: {
      shadow: false,
      slideShadows: false,
      shadowOffset: 20,
      shadowScale: 0.94
    },
    on: {
      beforeInit(): void {
        const swiper = this;
        // @ts-ignore
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        // @ts-ignore
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: true,
          virtualTranslate: true
        };
        // @ts-ignore
        this.params = Object.assign(this.params, overwriteParams);
        // @ts-ignore
        // eslint-disable-next-line
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      },
      setTranslate(): void {
        const swiper = this;
        // @ts-ignore
        // eslint-disable-next-line
        const { $wrapperEl, slides, width: swiperWidth, size: swiperSize } = swiper;
        // @ts-ignore
        const params = swiper.params.cubeEffect;
        // @ts-ignore
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            // @ts-ignore
            // eslint-disable-next-line
            $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: `${swiperWidth}px` });
        }
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            // @ts-ignore
            // eslint-disable-next-line
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + round * 4 * swiperSize;
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = 3 * swiperSize + swiperSize * 4 * round;
          }
          const transform$$1 = `rotateX(0deg) rotateY(${slideAngle}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = slideIndex * 90 + progress * 90;
          }
          $slideEl.transform(transform$$1);

          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = $slideEl.find('.swiper-slide-shadow-left');
            let shadowAfter = $slideEl.find('.swiper-slide-shadow-right');
            if (shadowBefore.length === 0) {
              // @ts-ignore
              // eslint-disable-next-line
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-left" />`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              // @ts-ignore
              // eslint-disable-next-line
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-right" />`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) {
              shadowBefore[0].style.opacity = Math.max(-progress, 0);
            }
            if (shadowAfter.length) {
              shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`
        });
        if (params.shadow) {
          const halfWidth = swiperWidth / 2;
          $cubeShadowEl.transform(
            `translate3d(0px, ${halfWidth +
              params.shadowOffset}px, ${-halfWidth}px) rotateX(90deg) rotateZ(0deg) scale(${
              params.shadowScale
            })`
          );
        }
        // @ts-ignore
        // eslint-disable-next-line
        const zFactor = -0.4 * swiperSize;
        $wrapperEl.transform(
          `translate3d(0px,0,${zFactor}px) rotateX(0deg) rotateY(${-wrapperRotate}deg)`
        );
      },
      setTransition(duration): void {
        const swiper = this;
        // @ts-ignore
        swiper.slides
          .transition(duration)
          .find(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
          )
          .transition(duration);
      }
    }
  };
}
export default withIonLifeCycle(CommunityDailyDripPage);
