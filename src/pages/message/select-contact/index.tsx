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
  MenuTabs
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

  render(): React.ReactNode {
    const { activeSelectContactTab, selectContactTabs } = this.props;
    return (
      <IonPage id="message-select-contact-page">
        <Header
          title="Select Contact"
          leftBackButton
          rightContent={
            <Button
              type={ShapesSize.normal}
              label="Chat"
              className="text-18"
              color={Colors.transparent}
              onClick={(): void => {
                this.props.history.push('/home/message/chat/new');
              }}
            />
          }
        />
        <IonContent>
          <BackgroundImage
            gradient={`180deg,#1F0739,#1F0739`}
            backgroundTop
            backgroundBottom
            backgroundBottomDark={false}
            backgroundTopDark
            backgroundTopOpacity={0.7}
          />
          <div
            className="message-select-contact-page content-fixed"
            slot="fixed"
          >
            <div className="row">
              <div className="fluid">
                <div className="p-3">
                  <InputSearch
                    onChange={(e): void => {
                      this.onSearch(e);
                    }}
                    value={this.state.searchText}
                    placeholder="Search"
                    debounce={150}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="fluid">
                <MenuTabs
                  onClick={(data): void => {
                    this.props.updateSettingsProperty(
                      'activeSelectContactTab',
                      data.id
                    );
                  }}
                  className=""
                  activeId={activeSelectContactTab}
                  tabs={selectContactTabs}
                />
              </div>
            </div>
            <IonContent>
              {selectContactTabs?.map(
                (data, i): React.ReactNode => {
                  let array = this.props[variables[data.id]];
                  return (
                    data.id === activeSelectContactTab &&
                    React.createElement(data.component, {
                      key: i,
                      data: array,
                      showRemove: false,
                      showComboBox: true,
                      showButtonPending: data.id === 'friends',
                      onSelect: (event, data): void => {
                        console.log('event', event, 'event', data);
                      },
                      checkSelected: (event): void => {
                        console.log('event2', event);
                      }
                    })
                  );
                }
              )}
            </IonContent>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({ profileAPI, settings }: ApplicationState): object => {
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
