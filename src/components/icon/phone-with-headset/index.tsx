import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string,
  width: number,
  height: number
};

class PhoneWithHeadsetIcon extends React.Component<Props> {
  public static defaultProps = {
    color: "#FFF",
    width: 32,
    height: 32
  };

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <svg id="phone-with-headset" data-name="097---Listen-To-Podcast" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        <path id="Shape" d="M0,28.567v6.8a.567.567,0,0,0,.567.567h.567V28H.567A.567.567,0,0,0,0,28.567Z" transform="translate(0 -11.956)" fill={this.props.color} />
        <path id="Shape-2" data-name="Shape" d="M6.266,25H4V36.332H6.266a.567.567,0,0,0,.567-.567v-10.2A.567.567,0,0,0,6.266,25Z" transform="translate(-1.734 -10.649)" fill={this.props.color} />
        <path id="Shape-3" data-name="Shape" d="M31.334,13.032A13.168,13.168,0,0,0,5,13.032H6.145a12.023,12.023,0,0,1,24.044,0Z" transform="translate(-2.167)" fill={this.props.color} />
        <path id="Shape-4" data-name="Shape" d="M54.567,28H54v7.933h.567a.567.567,0,0,0,.567-.567v-6.8A.567.567,0,0,0,54.567,28Z" transform="translate(-23.133 -11.956)" fill={this.props.color} />
        <path id="Shape-5" data-name="Shape" d="M47,25.567v10.2a.567.567,0,0,0,.567.567h2.266V25H47.567A.567.567,0,0,0,47,25.567Z" transform="translate(-20.1 -10.649)" fill={this.props.color} />
        <path id="Shape-6" data-name="Shape" d="M16.133,54.757A2.215,2.215,0,0,1,15,54.44v.317a1.133,1.133,0,0,0,1.133,1.133H28.6a1.133,1.133,0,0,0,1.133-1.133V54.44a2.215,2.215,0,0,1-1.133.317Z" transform="translate(-6.366 -23.319)" fill={this.props.color} />
        <path id="Shape-7" data-name="Shape" d="M21.538,17.133h6.528a.567.567,0,0,0,.51-.312L28.983,16H20.62l.408.822a.567.567,0,0,0,.51.312Z" transform="translate(-8.802 -6.854)" fill={this.props.color} />
        <ellipse id="Oval" cx="0.889" cy="0.445" rx="0.889" ry="0.445" transform="translate(15.265 21.146)" fill={this.props.color} />
        <path id="Shape-8" data-name="Shape" d="M28.6,16h-.782l-.663,1.326a1.7,1.7,0,0,1-1.524.941H19.1a1.7,1.7,0,0,1-1.524-.941L16.915,16h-.782A1.133,1.133,0,0,0,15,17.133v18.7a1.133,1.133,0,0,0,1.133,1.133H28.6a1.133,1.133,0,0,0,1.133-1.133v-18.7A1.133,1.133,0,0,0,28.6,16ZM18.762,32.307a.575.575,0,0,1-.8,0,6.233,6.233,0,0,1,0-8.817.569.569,0,0,1,.8.8,5.1,5.1,0,0,0,0,7.207.567.567,0,0,1,0,.8Zm1.6-2.4a.565.565,0,0,1-.8.8,3.966,3.966,0,0,1,0-5.61.565.565,0,1,1,.8.8,2.833,2.833,0,0,0,0,4.012Zm2.006-.306a1.7,1.7,0,1,1,1.7-1.7A1.7,1.7,0,0,1,22.366,29.6Zm2.4,1.269a.564.564,0,0,1-.4-.963,2.833,2.833,0,0,0,0-4.012.565.565,0,1,1,.8-.8,3.966,3.966,0,0,1,.028,5.638A.567.567,0,0,1,24.769,30.868Zm2.006,1.439a.569.569,0,1,1-.8-.8,5.1,5.1,0,0,0,0-7.207.569.569,0,1,1,.8-.8,6.233,6.233,0,0,1,0,8.817Z" transform="translate(-6.366 -6.66)" fill={this.props.color} />
      </svg>
    );
  }
}

export default PhoneWithHeadsetIcon;
