import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
  strokeWidth?: number;
}

class CommentIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 16,
    height: 15.329,
    strokeWidth: 1
  };

  render(): React.ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="15.329"
        viewBox="0 0 16 15.329"
      >
        <g transform="translate(0 0)">
          <path
            id="Path_60541"
            data-name="Path 60541"
            d="M13.937,13.465l-11.874.024A2.065,2.065,0,0,0,0,15.552v7.353a2.065,2.065,0,0,0,2.063,2.062H4.174v3.478a.348.348,0,0,0,.605.234l3.375-3.713,5.783-.024A2.065,2.065,0,0,0,16,22.881V15.528A2.065,2.065,0,0,0,13.937,13.465ZM3.478,16.943H8a.348.348,0,1,1,0,.7H3.478a.348.348,0,0,1,0-.7Zm9.043,4.87H3.478a.348.348,0,1,1,0-.7h9.043a.348.348,0,0,1,0,.7Zm0-2.087H3.478a.348.348,0,1,1,0-.7h9.043a.348.348,0,1,1,0,.7Z"
            transform="translate(0 -13.465)"
            fill="#01add9"
          />
        </g>
      </svg>
    );
  }
}

export default CommentIcon;
