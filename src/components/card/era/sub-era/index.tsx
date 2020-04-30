import React from 'react';
import { connect } from 'react-redux';
import { updateSettingsModal } from '../../../../actions';
import { ApplicationState } from '../../../../reducers';

interface StateProps {}
interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}

interface Props extends DispatchProps {
  name: string;
  image: string;
  shadowColor?: string;
  key: number;
}

class CardSubEraComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  render(): React.ReactNode {
    const { image, shadowColor } = this.props;
    return (
      <div
        className="card-genre-filter pb-15"
        style={{
          backgroundImage: `url(${image})`,
          boxShadow: `inset 0 -45px 30px -20px ${shadowColor}`
        }}
      />
    );
  }
}

const mapStateToProps = ({
  settings,
  artistAPI
}: ApplicationState): StateProps => {
  const { modal } = settings;
  const { loading } = artistAPI;
  return { modal, loading };
};

export default connect(mapStateToProps, {
  updateSettingsModal
})(CardSubEraComponent);
