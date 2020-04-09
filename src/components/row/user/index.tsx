import React from 'react';
import {
  Avatar,
  Button,
  ButtonIcon,
  MessageBalloonIcon,
  InputComboBox
} from '../../';
import { ShapesSize, Colors, Sizes, UserInterface } from '../../../interfaces';

interface Props {
  data: UserInterface;
  showChat?: boolean;
  showComboBox?: boolean;
  showButtonConnect?: boolean;
  showButtonPending?: boolean;
  selected?: boolean;
  onSelect?: Function;
}

class RowUserComponent extends React.Component<Props> {
  public static defaultProps = {
    showChat: false,
    showComboBox: false,
    showButtonConnect: false,
    showButtonPending: false,
    selected: false,
    onSelect: (): void => {}
  };
  render(): React.ReactNode {
    const {
      data,
      showButtonConnect,
      showButtonPending,
      showChat,
      showComboBox,
      selected,
      onSelect
    } = this.props;
    let opacity = data.isFriend !== true ? 'opacity' : '';
    return (
      <div className="m-1 fluid flex-justify-content-end">
        <div className={`align-start ${opacity}`}>
          <div className="p-05 flex-align-items-center">
            <Avatar
              type={ShapesSize.circle}
              width={48}
              height={48}
              image={data.avatar}
            />
            <span className="ml-2 f5">{data.username}</span>
          </div>
        </div>
        <div className="align-end no-padding flex-align-items-center my-auto">
          {data.isFriend !== true && showButtonPending && (
            <Button
              className="my-auto"
              size={Sizes.md}
              type={ShapesSize.rounded}
              color={Colors.primary}
              label="Pending"
              bold
              gradient
            />
          )}
          {showChat && (
            <ButtonIcon
              icon={<MessageBalloonIcon />}
              color={Colors.transparent}
            />
          )}
          {showButtonConnect && (
            <Button
              className="my-auto"
              gradient={true}
              color={Colors.secondary}
              size={Sizes.md}
              bold
              type={ShapesSize.rounded}
              label="Connect"
            />
          )}
          {showComboBox && data.isFriend === true && (
            <InputComboBox
              checked={selected}
              onSelect={(e): void => (onSelect ? onSelect(e, data) : {})}
            />
          )}
        </div>
      </div>
    );
  }
}
export default RowUserComponent;
