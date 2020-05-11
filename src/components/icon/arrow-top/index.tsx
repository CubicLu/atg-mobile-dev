import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class ArrowTopIconComponent extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 24,
    height: 24,
    stroke: 0.5
  };

  render(): React.ReactNode {
    const { width, height, color } = this.props;
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="prefix__arrow_upward-24px"
          width={width}
          height={height}
          viewBox="0 0 24 24"
        >
          <path
            id="prefix__Path_66553"
            d="M0 0h24v24H0z"
            data-name="Path 66553"
            style={{ fill: 'none' }}
          />
          <path
            id="prefix__Path_66554"
            d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"
            data-name="Path 66554"
            style={{ fill: color }}
          />
        </svg>
      </>
    );
  }
}

export default ArrowTopIconComponent;
