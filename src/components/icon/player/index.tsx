import React from 'react';
interface Props {
  color: string;
}
export class NextButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <rect width="36" height="36" fill="none" />
      <g transform="translate(30 3.5) rotate(90)" fill="none">
        <path
          d="M11.9,4.474a3,3,0,0,1,5.19,0l9.292,16.021A3,3,0,0,1,23.792,25H5.208a3,3,0,0,1-2.6-4.505Z"
          stroke="none"
        />
        <path
          d="M 14.5 4.97944450378418 C 14.32680988311768 4.97944450378418 13.8958101272583 5.027996063232422 13.63496971130371 5.47773551940918 L 4.343050003051758 21.4982852935791 C 4.081310272216797 21.94955444335938 4.254819869995117 22.34853553771973 4.341560363769531 22.49913597106934 C 4.428310394287109 22.64972496032715 4.686389923095703 22.99999618530273 5.208080291748047 22.99999618530273 L 23.79191970825195 22.99999618530273 C 24.3136100769043 22.99999618530273 24.57168960571289 22.64972496032715 24.65843963623047 22.49913597106934 C 24.74518013000488 22.34853553771973 24.9186897277832 21.94955444335938 24.65694999694824 21.4982852935791 L 15.36503028869629 5.47773551940918 C 15.10418033599854 5.027996063232422 14.67319011688232 4.97944450378418 14.5 4.97944450378418 M 14.5 2.979448318481445 C 15.50854206085205 2.979448318481445 16.51708602905273 3.477729797363281 17.09508895874023 4.474294662475586 L 26.38701057434082 20.49484634399414 C 27.54701042175293 22.49483489990234 26.10396003723145 24.99999618530273 23.79191970825195 24.99999618530273 L 5.208080291748047 24.99999618530273 C 2.896039962768555 24.99999618530273 1.45298957824707 22.49483489990234 2.61298942565918 20.49484634399414 L 11.90490913391113 4.474294662475586 C 12.4829158782959 3.477729797363281 13.49145793914795 2.979448318481445 14.5 2.979448318481445 Z"
          stroke="none"
          fill={this.props.color}
        />
      </g>
      <line
        y2="24"
        transform="translate(30.5 6)"
        fill="none"
        stroke={this.props.color}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export class PauseButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <circle cx="18" cy="18" r="18" fill={this.props.color} />
      <rect width="5" height="18" rx="2.5" transform="translate(12 9)" />
      <rect width="5" height="18" rx="2.5" transform="translate(20 9)" />
    </svg>
  );
}

export class PlayButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <g>
        <circle cx="18" cy="18" r="18" fill={this.props.color} />
        <g transform="translate(29.967 6.897) rotate(90)" fill="#212121">
          <path
            d="M 19.23599624633789 18.46658706665039 L 2.677115440368652 18.46658706665039 C 1.863635420799255 18.46658706665039 1.14775538444519 18.05875587463379 0.762165367603302 17.37563705444336 C 0.4046553671360016 16.74229621887207 0.4161353707313538 15.99152660369873 0.7928653955459595 15.36734676361084 L 9.072305679321289 1.649466276168823 C 9.516295433044434 0.9076563119888306 10.17058563232422 0.4999963045120239 10.91561508178711 0.4999963045120239 C 11.67518520355225 0.4999963045120239 12.41287517547607 0.9404562711715698 12.84081554412842 1.649476289749146 L 21.12025451660156 15.36733627319336 C 21.49697494506836 15.99152660369873 21.50845527648926 16.74229621887207 21.15094566345215 17.37563705444336 C 20.76534461975098 18.05875587463379 20.04947471618652 18.46658706665039 19.23599624633789 18.46658706665039 Z"
            stroke="none"
          />
          <path
            d="M 10.91561508178711 0.9999961853027344 C 10.35338497161865 0.9999961853027344 9.851455688476562 1.32127571105957 9.500385284423828 1.9078369140625 L 1.220945358276367 15.62570571899414 C 0.9344558715820312 16.10037612915039 0.9259357452392578 16.64861679077148 1.197586059570312 17.12985610961914 C 1.493326187133789 17.65378570556641 2.046424865722656 17.96658706665039 2.677114486694336 17.96658706665039 L 19.23599624633789 17.96658706665039 C 19.86668586730957 17.96658706665039 20.41978454589844 17.65378570556641 20.71552467346191 17.12985610961914 C 20.98717498779297 16.64861679077148 20.97866439819336 16.10037612915039 20.69217491149902 15.62570571899414 L 12.41273498535156 1.9078369140625 C 12.07475566864014 1.347866058349609 11.50109577178955 0.9999961853027344 10.91561508178711 0.9999961853027344 M 10.91561985015869 1.9073486328125e-06 C 11.82906532287598 1.9073486328125e-06 12.73373699188232 0.5044479370117188 13.26888561248779 1.391105651855469 L 21.54832458496094 15.10897636413574 C 22.5819149017334 16.82149696350098 21.29611587524414 18.96658706665039 19.23599624633789 18.96658706665039 L 2.677114486694336 18.96658706665039 C 0.6169948577880859 18.96658706665039 -0.6688041687011719 16.82149696350098 0.3647956848144531 15.10897636413574 L 8.644235610961914 1.391105651855469 C 9.218583106994629 0.4314765930175781 10.07085514068604 1.9073486328125e-06 10.91561985015869 1.9073486328125e-06 Z"
            stroke="none"
            fill="#212121"
          />
        </g>
      </g>
    </svg>
  );
}
export class RadioPlayButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
    >
      <circle cx="32" cy="32" r="32" fill="#020202" style={{ opacity: 0.5 }} />
      <g>
        <path
          d="M11.9 4.474a3 3 0 0 1 5.19 0l9.292 16.021A3 3 0 0 1 23.792 25H5.208a3 3 0 0 1-2.6-4.505z"
          transform="rotate(90 15.25 32.75)"
        />
        <path
          d="M14.5 4.98c-.173 0-.604.048-.865.498l-9.292 16.02c-.262.452-.088.85-.001 1.001.086.15.344.501.866.501h18.584c.522 0 .78-.35.866-.5.087-.151.26-.55-.001-1.002l-9.292-16.02c-.26-.45-.692-.499-.865-.499m0-2c1.009 0 2.017.499 2.595 1.495l9.292 16.02c1.16 2-.283 4.506-2.595 4.506H5.208c-2.312 0-3.755-2.505-2.595-4.505l9.292-16.02c.578-.997 1.586-1.496 2.595-1.496z"
          fill={this.props.color}
          transform="rotate(90 15.25 32.75)"
        />
      </g>
    </svg>
  );
}
export class PrevButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <g transform="translate(287.5 720.5) rotate(180)">
        <rect
          width="36"
          height="36"
          transform="translate(287.5 720.5) rotate(-180)"
          fill="none"
        />
        <g transform="translate(282 688) rotate(90)" fill="none">
          <path
            d="M11.906,4.464a3,3,0,0,1,5.188,0l9.287,15.982a3,3,0,0,1-2.594,4.507H5.213a3,3,0,0,1-2.594-4.507Z"
            stroke="none"
          />
          <path
            d="M 14.5 4.971128463745117 C 14.32697010040283 4.971128463745117 13.89632987976074 5.019609451293945 13.6353702545166 5.468709945678711 L 4.348329544067383 21.45107841491699 C 4.086099624633789 21.9023494720459 4.259510040283203 22.30157852172852 4.346229553222656 22.45226860046387 C 4.432960510253906 22.60297012329102 4.691019058227539 22.95348930358887 5.212959289550781 22.95348930358887 L 23.78704071044922 22.95348930358887 C 24.30896949768066 22.95348930358887 24.56703948974609 22.60297966003418 24.65375900268555 22.45227813720703 C 24.7404899597168 22.30157852172852 24.91390037536621 21.9023494720459 24.65167045593262 21.45106887817383 L 15.3646297454834 5.468719482421875 C 15.10365962982178 5.019618988037109 14.67302989959717 4.971128463745117 14.5 4.971128463745117 M 14.5 2.971132278442383 C 15.50780296325684 2.971132278442383 16.51560592651367 3.468713760375977 17.09387969970703 4.463878631591797 L 26.38092041015625 20.44623947143555 C 27.54306983947754 22.44621849060059 26.10017013549805 24.95348930358887 23.78704071044922 24.95348930358887 L 5.212959289550781 24.95348930358887 C 2.899829864501953 24.95348930358887 1.456920623779297 22.44621849060059 2.61907958984375 20.44623947143555 L 11.90612030029297 4.463878631591797 C 12.48439407348633 3.468713760375977 13.49219703674316 2.971132278442383 14.5 2.971132278442383 Z"
            stroke="none"
            fill={this.props.color}
          />
        </g>
        <line
          y2="25"
          transform="translate(282.5 690.5)"
          fill="none"
          stroke={this.props.color}
          strokeLinecap="round"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export class MixTapeButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24.317"
      height="24.317"
      viewBox="0 0 24.317 24.317"
    >
      <path d="M0,0H24.317V24.317H0Z" fill="none" />
      <path
        d="M14.159,10.053H2v2.026H14.159Zm0-4.053H2V8.026H14.159Zm4.053,8.106V10.053H16.185v4.053H12.132v2.026h4.053v4.053h2.026V16.132h4.053V14.106ZM2,16.132h8.106V14.106H2Z"
        transform="translate(0.026 0.08)"
        fill={this.props.color}
      />
    </svg>
  );
}
export class LikeButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23.975"
      height="23.975"
      viewBox="0 0 23.975 23.975"
    >
      <path d="M0,0H23.975V23.975H0Z" fill="none" />
      <path
        d="M22.933,10.187l-5.82-.508L14.84,4.3a1.2,1.2,0,0,0-2.213,0L10.354,9.691l-5.808.5A1.208,1.208,0,0,0,3.86,12.3L8.274,16.15,6.951,21.858a1.2,1.2,0,0,0,1.792,1.306l4.991-3.024,4.991,3.036a1.2,1.2,0,0,0,1.792-1.306L19.193,16.15,23.606,12.3a1.206,1.206,0,0,0-.673-2.117Zm-9.2,7.692L9.212,20.625l1.2-5.176L6.422,11.965l5.267-.46,2.044-4.874,2.056,4.886,5.267.46L17.064,15.46l1.2,5.176Z"
        transform="translate(-1.528 -1.815)"
        fill={this.props.color}
      />
    </svg>
  );
}
export class RepeatButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22.867"
      height="25.492"
      viewBox="0 0 22.867 25.492"
    >
      <g transform="translate(1 0.707)">
        <path
          d="M3618,487l4.013,4.013L3618,495.026"
          transform="translate(-3613.185 -470.948)"
          fill="none"
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M3631.013,475.026,3627,471.013l4.013-4.013"
          transform="translate(-3614.961 -467)"
          fill="none"
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M3627.8,472h5.618a2.408,2.408,0,0,1,2.408,2.408v11.236a2.408,2.408,0,0,1-2.408,2.408H3627"
          transform="translate(-3614.961 -467.987)"
          fill="none"
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M3620.026,488.052h-5.618a2.408,2.408,0,0,1-2.408-2.408V474.408a2.408,2.408,0,0,1,2.408-2.408h6.421"
          transform="translate(-3612 -467.987)"
          fill="none"
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
export class ShuffleButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22.23"
      height="25.433"
      viewBox="0 0 22.23 25.433"
    >
      <g transform="translate(0 0.707)">
        <path
          d="M3693,487l4,4-4,4"
          transform="translate(-3676.187 -470.987)"
          fill="none"
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M3692.016,488.013h-5.6c-1.327,0-1.945-1.172-2.4-2.4l-4-11.209c-.387-1.288-1.075-2.4-2.4-2.4H3672"
          transform="translate(-3672 -467.997)"
          fill="none"
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M3693,475.006l4-4-4-4"
          transform="translate(-3676.187 -467)"
          fill="none"
          stroke={this.props.color}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M3680.52,484.2l-1.28,3.61c-.551,1.832-1.339,1.832-1.635,1.832H3672v1.6h5.6c1.037,0,2.429-.516,3.155-2.934l.6-1.72Z"
          transform="translate(-3672 -470.43)"
          fill={this.props.color}
        />
        <path
          d="M3689.062,471c-2.065,0-2.827,2.049-3.155,2.934l-.61,1.733.85,2.4,1.264-3.586c.5-1.353.966-1.881,1.651-1.881h5.6V471Z"
          transform="translate(-3674.651 -467.797)"
          fill={this.props.color}
        />
      </g>
    </svg>
  );
}
export class ShareButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.357"
      height="26.408"
      viewBox="0 0 19.357 26.408"
    >
      <g transform="translate(1 1.414)">
        <path
          d="M417,103.084,421.084,99l4.084,4.084"
          transform="translate(-412.405 -99)"
          fill="none"
          stroke={this.props.color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          y1="15.145"
          transform="translate(8.679 0.17)"
          fill="none"
          stroke={this.props.color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M412.595,114H408v16.336h17.357V114h-4.595"
          transform="translate(-408 -106.342)"
          fill="none"
          stroke={this.props.color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
export class VolumeButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <g>
        <path
          fill="#ffffffaa"
          d="M7 7.042v3.65h2.633l3.291 3.042V4L9.633 7.042z"
        />
      </g>
    </svg>
  );
}
export class VolumeMuteButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <g>
        <path
          fill="#ffffffaa"
          d="M7 7.042v3.65h2.633l3.291 3.042V4L9.633 7.042z"
        />
      </g>
    </svg>
  );
}

export class SongInfoButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg
      transform="translate(-2 -8)"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <g fill="#000">
        <path d="M0 0h20v20H0z" transform="translate(6 8)"></path>
        <path
          d="M18 2a16 16 0 1 0 16 16A16.006 16.006 0 0 0 18 2zm1.6 24h-3.2v-9.6h3.2zm0-12.8h-3.2V10h3.2z"
          fill={this.props.color}
        />
      </g>
    </svg>
  );
}
export class PlusButton extends React.Component<Props> {
  public static defaultProps = { color: '#FFF' };
  render = (): React.ReactNode => (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <path
        d="M34.121,17.061A17.061,17.061,0,1,1,17.063,0,17.057,17.057,0,0,1,34.121,17.061Z"
        transform="translate(24 0) rotate(45)"
        style={{ opacity: 0.25 }}
      />
      <line
        y1="13.105"
        x2="13.105"
        transform="translate(24 15) rotate(45)"
        fill="none"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="1"
      />
      <line
        x1="13.105"
        y1="13.105"
        transform="translate(24 15) rotate(45)"
        fill="none"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="1"
      />
    </svg>
  );
}
