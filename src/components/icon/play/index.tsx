import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class PlayIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 22,
    height: 24
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 22 24`}
      >
        <g transform="translate(25 -2.204) rotate(90)" fill="none">
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
      </svg>
    );
  }
}

export default PlayIcon;
