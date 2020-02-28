import React from 'react';
import { connect } from 'react-redux';
import { _ } from './../../../components';
import { ApplicationState } from './../../../reducers';
import { updateSettingsProperty } from './../../../actions';
import { TabsFanInterface } from '../../../interfaces';

interface StateProps {
  activeFanTab: string;
  fanTabs: TabsFanInterface[];
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface Props extends StateProps, DispatchProps {}

class MenuProfileComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <ul className="list inline menu profile">
        {_.map(
          this.props.fanTabs,
          (data, i): React.ReactNode => {
            return (
              <li
                className={this.props.activeFanTab === data.id ? 'active' : ''}
                key={i}
                onClick={this.props.updateSettingsProperty.bind(
                  this,
                  'activeFanTab',
                  data.id
                )}
              >
                <span className="circle">
                  <span>{data.icon}</span>
                </span>
                <span className="title">{data.label}</span>
              </li>
            );
          }
        )}
      </ul>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { activeFanTab, fanTabs } = settings;
  return { activeFanTab, fanTabs };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(MenuProfileComponent);
