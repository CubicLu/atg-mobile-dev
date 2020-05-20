import React from 'react';
import { connect } from 'react-redux';
import { updateActionSheet } from '../../actions';
import { ApplicationState } from '../../reducers';
import { ActionSheetInterface } from '../../models';
import { ConfirmIcon, DeleteIcon, CopyIcon } from '../icon';
import { IonToast } from '@ionic/react';
interface DispatchProps {
  updateActionSheet: (e) => void;
}
interface StateProps {
  actionSheet: ActionSheetInterface | null;
}
interface Props extends StateProps, DispatchProps {}
interface State {
  showToast: boolean;
  toastMessage: string;
}
class ModalSlideComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showToast: false, toastMessage: '' };
  }
  clickCancel(): void {
    this.props.actionSheet?.onCancel && this.props.actionSheet.onCancel();
    this.props.updateActionSheet(undefined);
  }
  clickConfirm(): void {
    this.props.actionSheet?.onConfirm && this.props.actionSheet.onConfirm();
    this.setState({
      showToast: true,
      toastMessage: 'Item deleted'
    });
  }
  clickCopy(): void {
    this.props.actionSheet?.onConfirm && this.props.actionSheet.onConfirm();
    this.setState({
      showToast: true,
      toastMessage: 'Link copied to pasteboard'
    });
  }
  closeActionSheet(): void {
    this.setState({
      showToast: false,
      toastMessage: ''
    });
    this.props.updateActionSheet(undefined);
  }
  renderShare(): React.ReactNode {
    return (
      <div className="flex fluid share-input">
        <input
          type="text"
          autoComplete="off"
          value="https://panthr.music/iA3X2LKmf"
          disabled
          className="input text mb-0"
          style={{ height: '100%', color: '#000' }}
        />
        <div
          className="my-auto p-1 h-100 pt-15"
          style={{ background: '#ecf0f6' }}
        >
          <span onClick={(): void => this.clickCopy()}>
            <CopyIcon />
          </span>
        </div>
      </div>
    );
  }
  render(): React.ReactNode {
    if (this.props.actionSheet === null) return null;
    if (!this.props.actionSheet) return null;

    const {
      className,
      title,
      description,
      content,
      confirmButtons,
      shareOption
    } = this.props.actionSheet;
    return (
      <div className={`action-sheet ${className}`}>
        <div className="action-sheet__container">
          <div className="dark row f2 center-align my-3 mx-3">{title}</div>

          <div className="action-sheet__container--content m-2">
            <div className="f5 dark center-align">{description}</div>
            {content}
          </div>

          {shareOption && (
            <div className="flex-justify-content-center mt-1 pb-3 mx-2">
              {this.renderShare()}
            </div>
          )}

          <div className="flex-justify-content-center mt-1 pb-3 mx-3">
            {confirmButtons && (
              <React.Fragment>
                <span onClick={(): void => this.clickCancel()}>
                  <DeleteIcon />
                </span>
                <span className="mx-3" />
                <span onClick={(): void => this.clickConfirm()}>
                  <ConfirmIcon />
                </span>
              </React.Fragment>
            )}
          </div>
        </div>

        <IonToast
          isOpen={this.state.showToast}
          message={this.state.toastMessage}
          duration={1000}
          onDidDismiss={(): void => this.closeActionSheet()}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  return { actionSheet: settings.actionSheet };
};
export default connect(mapStateToProps, { updateActionSheet })(
  ModalSlideComponent
);
