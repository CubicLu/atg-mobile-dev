import React from 'react';
import {
  Avatar,
  Button,
  ButtonIcon,
  MessageBalloonIcon,
  InputComboBox
} from '../../';
import { UserInterface } from '../../../models';
import { ShapesSize, Colors, Sizes } from '../../../types';

interface Props {
  user: UserInterface;
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
      user,
      showButtonConnect,
      showButtonPending,
      showChat,
      showComboBox,
      selected,
      onSelect
    } = this.props;
    let opacity = user.isFriend !== true ? 'opacity' : '';
    return (
      <div className="m-1 fluid flex-justify-content-end">
        <div className={`align-start ${opacity}`}>
          <div className="p-05 flex-align-items-center">
            <Avatar
              avatarUrl={`/profile/friend/${user.username}`}
              type={ShapesSize.circle}
              width={48}
              height={48}
              image={user.image}
            />
            <span className="ml-2 f5">{user.username}</span>
          </div>
        </div>
        <div className="align-end no-padding flex-align-items-center my-auto">
          {user.isFriend !== true && showButtonPending && (
            <Button
              className="my-auto"
              size={Sizes.md}
              type={ShapesSize.rounded}
              color={Colors.chat}
              label="PENDING"
              bold
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
              label="CONNECT"
            />
          )}
          {showComboBox && user.isFriend === true && (
            <InputComboBox
              checked={selected}
              onSelect={(e): void => (onSelect ? onSelect(e, user) : {})}
            />
          )}
        </div>
      </div>
    );
  }
}
export default RowUserComponent;
