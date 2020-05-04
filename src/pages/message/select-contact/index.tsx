import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import {
  Colors,
  ShapesSize,
  MenuInterface,
  UserInterface
} from '../../../interfaces';
import {
  Button,
  Header,
  BackgroundImage,
  InputSearch,
  MenuMessage,
  ListUser
} from '../../../components';
import {
  updateProfileProperty,
  updateSettingsProperty
} from './../../../actions';

interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
  updateProfileProperty: (property, value) => void;
}

interface StateProps {
  friends: UserInterface[];
  friendsSearch: UserInterface[];
  artists: UserInterface[];
  artistsSearch: UserInterface[];
  admins: UserInterface[];
  adminsSearch: UserInterface[];
  activeSelectContactTab: string;
  selectContactTabs: MenuInterface[];
}

interface State {
  searchText: string;
}
interface Props extends RouteComponentProps, StateProps, DispatchProps {}

const variables = {
  friends: 'friendsSearch',
  artists: 'artistsSearch',
  admins: 'adminsSearch'
};
class SelectContactPage extends React.Component<Props, State> {
  private selected: any[] = [];
  constructor(props: Props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  onSearch(e): void {
    this.setSearchText(e.detail.value);
    let value = String(e.detail.value).toLocaleLowerCase();

    let friendsSearch = this.props.friends.filter((data): boolean => {
      return data.username.includes(value);
    });
    let adminsSearch = this.props.admins.filter((data): boolean => {
      return data.username.includes(value);
    });
    let artistsSearch = this.props.artists.filter((data): boolean => {
      return data.username.includes(value);
    });

    this.props.updateProfileProperty('artistsSearch', artistsSearch);
    this.props.updateProfileProperty('friendsSearch', friendsSearch);
    this.props.updateProfileProperty('adminsSearch', adminsSearch);
  }

  setSearchText(text = ''): void {
    this.setState({
      searchText: text
    });
  }

  getActiveTab(): React.ReactElement {
    const menu = this.props.selectContactTabs.find(
      (s): boolean => s.id === this.props.activeSelectContactTab
    )!;

    return (
      <ListUser
        showComboBox={menu.id === 'friends'}
        showButtonPending={menu.id === 'friends'}
        showRemove={false}
        sliding={false}
        data={this.props[variables[menu.id]]}
        onSelect={(event, data): void => this.toggleSelect(event, data)}
      />
    );
  }
  toggleSelect(event: CustomEvent, data: UserInterface): void {
    const index = this.selected.findIndex(
      (x): boolean => x.username === data.username
    );
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
              onClick={(): void => {
                this.props.history.push('/chat');
              }}
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
  profileAPI,
  settings
}: ApplicationState): object => {
  const {
    artistsSearch,
    friendsSearch,
    adminsSearch,
    admins,
    friends,
    artists
  } = profileAPI;
  const { selectContactTabs, activeSelectContactTab } = settings;
  return {
    artistsSearch,
    friendsSearch,
    adminsSearch,
    admins,
    friends,
    artists,
    selectContactTabs,
    activeSelectContactTab
  };
};

export default withRouter(
  connect(mapStateToProps, { updateProfileProperty, updateSettingsProperty })(
    SelectContactPage
  )
);
