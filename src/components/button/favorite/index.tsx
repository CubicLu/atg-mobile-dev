import React from 'react';
import { ShapesSize, Colors } from '../../../types';
import { StarIcon, HeartIcon } from '../..';
import { store } from '../../../store';
import {
  showToastAction,
  hideToastAction,
  updateSettingsProperty
} from '../../../actions';
import ToastComponent from '../../toast';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { IonRouterLink } from '@ionic/react';

interface Props extends StateProps {
  color?: Colors;
  type?: ShapesSize;
  icon?: string;
}
interface StateProps {
  showToast: boolean;
}
class FavoriteIconComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  public static defaultProps = {
    color: Colors.orange,
    type: ShapesSize.circle,
    showToast: false,
    icon: 'star'
  };

  toast(): React.ReactNode {
    if (!this.props.showToast) return null;
    return (
      <ToastComponent
        clickId={'toastClick'}
        clickHandler={this.toastClickHandler}
        hideToast={(): any => store.dispatch(hideToastAction())}
        message={
          '<span>Added to your <a href="#" id="toastClick">VAULT</a></span>'
        }
        classNames={'custom-toast'}
      />
    );
  }

  icon(): React.ReactNode {
    if (this.props.icon === 'heart') return <HeartIcon />;
    return <StarIcon width={24} height={24} />;
  }
  toastClickHandler = (e): void => {
    e.preventDefault();
    store.dispatch(hideToastAction());
    store.dispatch(updateSettingsProperty('activeFanTab', 'vault'));
    this.linkRef.current?.click();
  };

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <IonRouterLink
          ref={this.linkRef}
          routerLink={'/profile'}
          routerDirection="forward"
        />
        {this.toast()}
        <button
          onClick={(): any => store.dispatch(showToastAction())}
          className={`btn icon ${this.props.type} ${this.props.color}`}
        >
          {this.icon()}
        </button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { showToast } = settings;
  return { showToast };
};
export default connect(mapStateToProps, null)(FavoriteIconComponent);
