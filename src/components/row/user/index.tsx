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
    console.log('showComboBox', showComboBox);
    return (
      <div className="row mx-1 w-100 row-user-component">
        <div className={`col s2 no-padding ${opacity}`}>
          <Avatar
            type={ShapesSize.circle}
            width={48}
            height={48}
            image={data.avatar}
          />
        </div>
        <div className={`col s7 no-padding info ${opacity}`}>
          <span className="user f5">{data.username}</span>
        </div>
        <div className="col s3 flex-align-items-end flex-justify-content-end">
          {data.isFriend !== true && showButtonPending && (
            <Button
              className="mt-10"
              gradient={true}
              color={Colors.secondary}
              size={Sizes.md}
              bold
              type={ShapesSize.rounded}
              label="Pending"
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
              className="mt-10"
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
              onSelect={(event): void => {
                if (onSelect) {
                  onSelect(event, data);
                }
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
export default RowUserComponent;
