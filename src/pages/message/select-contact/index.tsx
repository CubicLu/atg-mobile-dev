import React from 'react';
import { connect } from 'react-redux';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { Colors, ShapesSize } from '../../../types';
import { getFriendsAPI } from '../../../actions/api/friendsActions';
import { MenuInterface, UserInterface } from '../../../models';
import {
  Button,
  Header,
  BackgroundImage,
  InputSearch,
  MenuMessage,
  ListUser
} from '../../../components';
import { updateSettingsProperty } from './../../../actions';

interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
  getFriendsAPI: () => void;
}

interface StateProps {
  users: UserInterface[];
  activeSelectContactTab: string;
  selectContactTabs: MenuInterface[];
}

interface State {
  searchText: string;
  friends: UserInterface[];
  artists: UserInterface[];
  admins: UserInterface[];
}
interface Props extends StateProps, DispatchProps {}
class SelectContactPage extends React.Component<Props, State> {
  UNSAFE_componentWillMount(): void {
    this.props.getFriendsAPI();
  }

  componentDidMount(): void {
    this.loadAdminsAndArtists();
  }
  componentDidUpdate(o: Props): void {
    if (o.users.length === this.props.users.length) return;
    this.loadAdminsAndArtists();
  }
  loadAdminsAndArtists(): void {
    this.setState({
      friends: this.props.users.filter((x): boolean => x.isFriend),
      artists: this.props.users.filter((x): boolean => x.isArtist),
      admins: this.props.users.filter((x): boolean =>
        ['harold', 'gabriela'].includes(x.username)
      )
    });
  }

  private selected: UserInterface[] = [];
  constructor(props: Props) {
    super(props);

    this.state = {
      searchText: '',
      friends: [],
      artists: [],
      admins: []
    };
  }

  onSearch(e): void {
    this.setSearchText(e.detail.value);
  }

  setSearchText(text = ''): void {
    this.setState({ searchText: text });
  }

  getActiveTab(): React.ReactNode {
    const t = this.props.activeSelectContactTab;
    const menu = this.props.selectContactTabs.find((s): boolean => s.id === t)!;
    const text = this.state.searchText.toLocaleLowerCase();
    const list = this.state[menu.id];
    const filter =
      text.length > 2
        ? list.filter((d): boolean => d?.username?.includes(text))
        : list;

    return (
      <ListUser
        showComboBox={menu.id === 'friends'}
        showButtonPending={menu.id === 'friends'}
        showRemove={false}
        sliding={false}
        users={filter}
        selected={[]}
        onSelect={(event, data): void => this.toggleSelect(event, data)}
      />
    );
  }
  toggleSelect(event: CustomEvent, data: UserInterface): void {
    const index = this.selected.findIndex((x): boolean => x.name === data.name);
    if (event.detail.checked && index === -1) {
      this.selected.push(data);
    } else if (!event.detail.checked && index > -1) {
      this.selected.splice(index, 1);
    }
  }

  render(): React.ReactNode {
    const { activeSelectContactTab, selectContactTabs } = this.props;
    return (
      <IonPage id="message-select-contact-page">
        <Header
          title="Select Contact"
          leftBackButton
          leftBackHref="/message"
          rightContent={
            <Button
              type={ShapesSize.normal}
              label="Chat"
              className="text-18"
              color={Colors.transparent}
              routerLink="/chat/0"
            />
          }
        />
        <IonContent>
          <BackgroundImage default />
          <div
            className="message-select-contact-page content-fixed"
            slot="fixed"
          >
            <div className="m-3">
              <InputSearch
                onChange={(e): void => this.onSearch(e)}
                value={this.state.searchText}
                placeholder="Search"
                debounce={150}
              />
            </div>

            <MenuMessage
              activeId={activeSelectContactTab}
              tabs={selectContactTabs}
              onClick={(data): void =>
                this.props.updateSettingsProperty(
                  'activeSelectContactTab',
                  data.id
                )
              }
            />

            <IonContent>{this.getActiveTab()}</IonContent>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({
  settings,
  friendAPI
}: ApplicationState): object => {
  const { selectContactTabs, activeSelectContactTab } = settings;
  const users = friendAPI.friends;
  return {
    users,
    selectContactTabs,
    activeSelectContactTab
  };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  getFriendsAPI
})(SelectContactPage);
