import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {}

class MenuProfileComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <ul className="list inline menu profile">
        <li className="active">
          <span className="circle">
            <span>a</span>
          </span>

          <span className="title">Artists</span>
        </li>
        <li>
          <span className="circle">
            <span>v</span>
          </span>
          <span className="title">Vault</span>
        </li>
        <li>
          <span className="circle">
            <span>m</span>
          </span>
          <span className="title">Mixtapes</span>
        </li>
        <li>
          <span className="circle">
            <span>f</span>
          </span>
          <span className="title">Friends</span>
        </li>
      </ul>
    );
  }
}

export default MenuProfileComponent;
