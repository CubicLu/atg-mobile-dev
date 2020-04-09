import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../reducers';
import {
  BackgroundImage,
  Header,
  InputSearch,
  ListUser,
  InputComboBox
} from '../../components';
import { UserInterface } from './../../interfaces';
import { updateProfileProperty } from './../../actions';

interface State {
  friendsSelected: UserInterface[];
  searchText: string;
}
interface StateProps {
  friends: UserInterface[];
  friendsSearch: UserInterface[];
}

interface DispatchProps {
  updateProfileProperty: (property, value) => void;
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}

class FanFeedFilterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      friendsSelected: [],
      searchText: ''
    };
  }

  onSearch(e): void {
    let value = String(e.detail.value).toLocaleLowerCase();
    this.setText(e.detail.value);
    let searchFriends = this.props.friends.filter((data): boolean => {
      return data.username.includes(value);
    });
    this.props.updateProfileProperty('friendsSearch', searchFriends);
  }

  setText(text): void {
    this.setState({
      searchText: text
    });
  }

  everyResent?: boolean;
  everyAll?: boolean;
  onSelectAll(e, key): void {
    if (key === 'resent') this.everyResent = e.detail.checked;
    if (key === 'all') this.everyAll = e.detail.checked;
  }

  getResent(): UserInterface[] {
    return this.props.friendsSearch.slice(0, 3);
  }
  getAll(): UserInterface[] {
    return this.props.friendsSearch.slice();
  }

  renderTitle(title: string, key: string): React.ReactNode {
    return (
      <div className="px-3 header-list flex-justify-content-end search-outline-contact">
        <div className="align-start text-36 title title-green">{title}</div>
        <div className="align-end flex-align-items-center">
          <InputComboBox onSelect={(e): void => this.onSelectAll(e, key)} />
        </div>
      </div>
    );
  }

  resentSelected: UserInterface[] = [];
  allSelected: UserInterface[] = [];
  toggleSelect(
    event: CustomEvent,
    data: UserInterface,
    all: boolean = true
  ): void {
    if (all) this.everyAll = undefined;
    if (!all) this.everyResent = undefined;
    const array = all ? this.allSelected : this.resentSelected;
    const index = array.findIndex((x): boolean => x.username === data.username);
    if (event.detail.checked && index === -1) {
      array.push(data);
    } else if (!event.detail.checked && index > -1) {
      array.splice(index, 1);
    }
  }
  // isChecked(data, all: boolean = true): boolean {
  //   const array = all ? this.allSelected : this.resentSelected;
  //   return !!array.find((x): boolean => x.username === data.username);
  // }

  render(): React.ReactNode {
    return (
      <IonPage id="fan-feed-filter-page">
        <Header rightCloseButton leftBackButton={false} title="Fan Feed" />
        <IonContent>
          <BackgroundImage
            gradient={`180deg,#1F0739,#1F0739`}
            backgroundTop
            backgroundBottom
            backgroundBottomDark={false}
            backgroundTopDark
            backgroundTopOpacity={0.7}
          />
          <div className="fan-feed-filter-page content-fixed" slot="fixed">
            <div className="row">
              <div className="fluid">
                <div className="p-3">
                  <InputSearch
                    onChange={(e): void => this.onSearch(e)}
                    value={this.state.searchText}
                    placeholder="Search"
                    debounce={150}
                  />
                </div>
              </div>
            </div>

            <IonContent scrollY={true}>
              {this.renderTitle('Resent', 'resent')}
              <ListUser
                onSelect={(e, data): void => this.toggleSelect(e, data, false)}
                sliding={false}
                selectAll={this.everyResent}
                checkSelected={(e): void => console.log(e)}
                data={this.getResent()}
                showComboBox
              />

              <div className="mb-5" />
              {this.renderTitle('All', 'all')}
              <ListUser
                onSelect={(e, data): void => this.toggleSelect(e, data, true)}
                sliding={false}
                selectAll={this.everyAll}
                data={this.getAll()}
                showComboBox
              />
              <div className="pb-5" />
            </IonContent>
            <div className="pb-4" />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({ profileAPI }: ApplicationState): StateProps => {
  const { friends, friendsSearch } = profileAPI;
  return { friends, friendsSearch };
};

export default withRouter(
  connect(mapStateToProps, { updateProfileProperty })(FanFeedFilterPage)
);
