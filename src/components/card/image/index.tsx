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
    const { col, type, image, label } = this.props;
    return (
      <div className={`col s${col}`}>
        <div
          className={`card image ${type}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="label">{label}</div>
      </div>
    );
  }
}

export default CardImageComponent;
