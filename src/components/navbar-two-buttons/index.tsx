import React from 'react';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import { updateNavBarTwoActions, toggleNavBarTwoActions } from '../../actions';
import { IonAlert } from '@ionic/react';
interface StateProps {
  status: boolean;
  leftLabel?: string;
  rightLabel?: string;
  leftAction?: Function;
  rightAction?: Function;
}
interface DispatchProps {
  toggleNavBarTwoActions: (activate: boolean) => void;
  updateNavBarTwoActions: (
    leftLabel: string,
    rightLabel: string,
    leftAction: Function,
    rightAction: Function
  ) => void;
}
interface Props extends StateProps, DispatchProps {}
class NavBarTwoButtonsComponent extends React.Component<Props> {
  showDelete: boolean = false;
  showComplete: boolean = false;
  showMessage(item: number): void {
    if (item === 0) {
      this.showDelete = true;
    } else if (item === 1) {
      this.showComplete = true;
    }
    this.forceUpdate();
  }
  hideMessage(): void {
    this.showDelete = false;
    this.showComplete = false;
    this.forceUpdate();
  }
  confirmComplete(): React.ReactNode {
    return (
      <IonAlert
        isOpen={this.showComplete}
        onDidDismiss={(): void => this.hideMessage()}
        header={this.props.rightLabel}
        message="Do you want to save changes?"
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (): void => this.hideMessage()
          },
          {
            text: 'Yes',
            handler: (): void => {
              console.log('Execute Save action API on rightAction');
              this.props.rightAction!();
              this.hideMessage();
            }
          }
        ]}
      />
    );
  }
  confirmDelete(): React.ReactNode {
    return (
      <IonAlert
        isOpen={this.showDelete}
        onDidDismiss={(): void => this.hideMessage()}
        header={this.props.leftLabel}
        message="Do you want to permanently delete?"
        buttons={[
          {
            text: 'Yes',
            handler: (): void => {
              console.log('Execute Delete action API on leftAction');
              this.props.leftAction!();
              this.hideMessage();
            }
          },
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (): void => this.hideMessage()
          }
        ]}
      />
    );
  }
  render(): React.ReactNode {
    if (!this.props.status) {
      return null;
    }
    const { leftLabel, rightLabel } = this.props;
    return (
      <div className="navbar-two-buttons flex-justify-content-center">
        {this.confirmDelete()}
        <div
          onClick={(): void => this.showMessage(0)}
          className="fluid my-auto f6 button-cancel center-align"
        >
          {leftLabel}
        </div>

        {this.confirmComplete()}
        <div
          onClick={(): void => this.showMessage(1)}
          className="fluid my-auto f6 button-confirm center-align"
        >
          {rightLabel}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ navbar }: ApplicationState): StateProps => {
  const { navbarTwoButtons } = navbar;
  const {
    status,
    leftLabel,
    rightLabel,
    leftAction,
    rightAction
  } = navbarTwoButtons;
  return { status, leftLabel, rightLabel, leftAction, rightAction };
};
export default connect(mapStateToProps, {
  toggleNavBarTwoActions,
  updateNavBarTwoActions
})(NavBarTwoButtonsComponent);
