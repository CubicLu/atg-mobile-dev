import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class SearchIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 24,
    height: 24
  };

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <svg
        id="search"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      >
        <path
          id="Path_39741"
          data-name="Path 39741"
          d="M23.466,20.859l-4.947-4.947a9.878,9.878,0,0,0,1.789-5.755,9.974,9.974,0,0,0-.8-3.945A9.944,9.944,0,0,0,14.1.8a10.12,10.12,0,0,0-7.89,0A9.943,9.943,0,0,0,.8,6.212,10.119,10.119,0,0,0,.8,14.1,9.946,9.946,0,0,0,6.209,19.51a9.978,9.978,0,0,0,3.945.8,9.878,9.878,0,0,0,5.755-1.789l4.947,4.933a1.713,1.713,0,0,0,1.3.548,1.846,1.846,0,0,0,1.312-3.144Zm-8.748-6.137a6.222,6.222,0,0,1-4.565,1.9,6.223,6.223,0,0,1-4.565-1.9,6.222,6.222,0,0,1-1.9-4.565,6.223,6.223,0,0,1,1.9-4.565,6.222,6.222,0,0,1,4.565-1.9,6.224,6.224,0,0,1,4.565,1.9,6.222,6.222,0,0,1,1.9,4.565A6.223,6.223,0,0,1,14.719,14.721Z"
          transform="translate(0 -0.003)"
          fill={this.props.color}
        />
      </svg>
    );
  }
}

export default SearchIcon;
