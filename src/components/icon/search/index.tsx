import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

export default class SearchIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 32,
    height: 32
  };

  render(): React.ReactNode {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 32 32`}
      >
        <path
          d="M27.378,24.335l-5.772-5.771a11.524,11.524,0,0,0,2.087-6.714,11.636,11.636,0,0,0-.934-4.6,11.6,11.6,0,0,0-6.31-6.31,11.806,11.806,0,0,0-9.2,0,11.6,11.6,0,0,0-6.31,6.31,11.806,11.806,0,0,0,0,9.2,11.6,11.6,0,0,0,6.31,6.31,11.641,11.641,0,0,0,4.6.934,11.525,11.525,0,0,0,6.714-2.087l5.772,5.755A2,2,0,0,0,25.846,28a2.154,2.154,0,0,0,1.531-3.668Zm-10.206-7.16a7.259,7.259,0,0,1-5.326,2.213,7.26,7.26,0,0,1-5.326-2.213,7.259,7.259,0,0,1-2.213-5.326A7.26,7.26,0,0,1,6.521,6.523a7.259,7.259,0,0,1,5.326-2.213,7.261,7.261,0,0,1,5.326,2.213,7.259,7.259,0,0,1,2.213,5.326A7.26,7.26,0,0,1,17.172,17.175Z"
          transform="translate(2 2)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}
