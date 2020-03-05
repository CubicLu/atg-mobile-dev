import React from 'react';

interface Props {
  image: string | undefined;
  key: number;
  type: 'normal' | 'rounded' | 'circle';
  col: number;
  label?: string;
}

class CardImageComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'normal',
    col: 6
  };
  render(): React.ReactNode {
    return (
      <div className={`col s${this.props.col}`}>
        <div
          className={`card image ${this.props.type}`}
          style={{ backgroundImage: `url(${this.props.image})` }}
        ></div>
        <div className="label">{this.props.label}</div>
      </div>
    );
  }
}

export default CardImageComponent;
