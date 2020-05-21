import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

export default class CopyIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 26,
    height: 26
  };

  render(): React.ReactNode {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
      >
        <path
          d="M505.5,142.4c-6.3-15-16.9-27.7-30.2-36.7c-6.7-4.5-14-8.1-21.9-10.5c-7.8-2.4-16.2-3.8-24.8-3.8h-8.2l0.2-8.7v-0.4
        c0-11.3-2.4-22.1-6.5-32c-6.3-14.8-16.7-27.3-29.8-36.1c-6.6-4.4-13.8-8-21.5-10.4C355,1.3,346.8,0,338.3,0h-0.1H91.4h-0.1
        C78.8,0,66.8,2.6,55.8,7.3c-16.4,7-30.3,18.5-40.2,33.1c-4.9,7.3-8.8,15.3-11.5,23.9C1.5,72.8,0,82,0,91.4v0.1v246.9v0.1
        c0,11.3,2.4,22.1,6.5,32c6.3,14.8,16.7,27.3,29.8,36.1c6.6,4.4,13.8,8,21.5,10.4c7.7,2.4,15.9,3.7,24.4,3.8h0.1h9.1v7.8
        c0,11.5,2.3,22.5,6.6,32.5c6.3,15,16.9,27.7,30.2,36.7c6.7,4.5,14,8.1,21.9,10.5c7.8,2.4,16.2,3.8,24.8,3.8h253.7
        c11.5,0,22.5-2.3,32.5-6.6c15-6.3,27.7-16.9,36.7-30.2c4.5-6.7,8.1-14,10.5-21.9c2.4-7.8,3.8-16.2,3.8-24.8V174.9
        C512.1,163.4,509.8,152.4,505.5,142.4z M475.4,428.5c0,6.5-1.3,12.6-3.7,18.2c-3.5,8.4-9.5,15.6-17,20.6c-3.7,2.5-7.9,4.5-12.2,5.9
        c-4.4,1.4-9,2.1-13.9,2.1H174.9c-6.5,0-12.6-1.3-18.2-3.7c-8.4-3.5-15.6-9.5-20.6-17c-2.5-3.7-4.5-7.9-5.9-12.2
        c-1.4-4.4-2.1-9-2.1-13.9V174.9c0-6.5,1.3-12.6,3.7-18.2c3.5-8.4,9.5-15.6,17-20.6c3.7-2.5,7.9-4.5,12.2-5.9c4.4-1.4,9-2.1,13.9-2.1
        v-18.4V91.4c-11.5,0-22.5,2.3-32.5,6.6c-15,6.3-27.7,16.9-36.7,30.2c-4.5,6.7-8.1,14-10.5,21.9c-2.4,7.8-3.8,16.2-3.8,24.8v209.3h-9
        c-6.4,0-12.3-1.3-17.8-3.6c-8.2-3.5-15.2-9.3-20.1-16.6c-2.5-3.7-4.4-7.7-5.8-11.9c-1.3-4.3-2.1-8.8-2.1-13.6v-247
        c0-7.6,1.6-14.8,4.4-21.3C45.2,60.4,52.1,52,60.9,46c4.4-3,9.2-5.3,14.3-6.9c5.1-1.6,10.6-2.5,16.3-2.5h246.7
        c6.4,0,12.3,1.3,17.8,3.6c8.2,3.5,15.2,9.3,20.1,16.6c2.5,3.7,4.4,7.7,5.8,11.9c1.3,4.2,2.1,8.7,2.1,13.4l-0.2,9.3H174.9v18.3V128
        h253.7c6.5,0,12.6,1.3,18.2,3.7c8.4,3.5,15.6,9.5,20.6,17c2.5,3.7,4.5,7.9,5.9,12.2c1.4,4.4,2.1,9,2.1,13.9V428.5z"
        />
      </svg>
    );
  }
}