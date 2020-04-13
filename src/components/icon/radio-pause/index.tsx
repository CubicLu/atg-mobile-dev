import React from 'react';
import { PauseIcon } from '..';

interface Props {}

export default class RadioPauseButtonComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div
        className="flex-justify-content-center flex-align-items-center"
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#0202025c',
          borderRadius: '50%'
        }}
      >
        <PauseIcon color="#ffffff" opacity={1} />
      </div>
    );
  }
}
