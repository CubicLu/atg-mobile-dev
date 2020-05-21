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
          backgroundColor: '#02020280',
          borderRadius: '50%'
        }}
      >
        <PauseIcon color="#ffffff" width={24} height={30} opacity={1} />
      </div>
    );
  }
}
