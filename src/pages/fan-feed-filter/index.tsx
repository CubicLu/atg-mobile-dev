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
import { UserInterface } from './../../models';
import { updateProfileProperty } from './../../actions';

interface State {
  friendsSelected: UserInterface[];
  searchText: string;
}
interface StateProps {
  friends: UserInterface[];
  friendsSearch: UserInterface[];
  friendsSelected: number[];
  recentSelected: number[];
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

  everyRecent?: boolean;
  everyAll?: boolean;
  onSelectAll(e, key): void {
    if (key === 'everyRecent') {
      this.everyRecent = e.detail.checked;
      let recentAll: number[] = [];
      if (this.everyRecent) {
        let data = this.getAll();
        data.map((x): number | null =>
          x.id && x.isFriend ? recentAll.push(x.id) : null
        );
      }
      this.props.updateProfileProperty('recentSelected', recentAll);
    }
    if (key === 'everyAll') {
      this.everyAll = e.detail.checked;
      let everyAll: number[] = [];
      if (this.everyAll) {
        let data = this.getAll();
        data.map((x): number | null =>
          x.id && x.isFriend ? everyAll.push(x.id) : null
        );
      }
      this.props.updateProfileProperty('friendsSelected', everyAll);
    }
  }

  getRecent(): UserInterface[] {
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
          <InputComboBox
            onSelect={(e): void => this.onSelectAll(e, key)}
            checked={this[key]}
          />
        </div>
      </div>
    );
  }

  recentSelected: UserInterface[] = [];
  allSelected: UserInterface[] = [];
  toggleSelect(
    event: CustomEvent,
    data: UserInterface,
    all: boolean = true
  ): void {
    if (all) this.everyAll = undefined;
    if (!all) this.everyRecent = undefined;
    const array = all ? this.allSelected : this.recentSelected;
    const index = array.findIndex((x): boolean => x.username === data.username);
    if (event.detail.checked && index === -1) {
      array.push(data);
    } else if (!event.detail.checked && index > -1) {
      array.splice(index, 1);
    }
  }

  render(): React.ReactNode {
    return (
      <IonPage id="fan-feed-filter-page">
        <Header
          rightCloseButton={true}
          rightCloseHref={'/community'}
          leftBackButton={false}
          title="Fan Feed"
        />
        <IonContent>
          <BackgroundImage default />
          <div className="fan-feed-filter-page content-fixed" slot="fixed">
            <div className="m-3">
              <InputSearch
                onChange={(e): void => this.onSearch(e)}
                value={this.state.searchText}
                placeholder="Search"
                debounce={150}
              />
            </div>

            <IonContent scrollY={true}>
              {this.renderTitle('Recent', 'everyRecent')}
              <ListUser
                onSelect={(e, data): void => this.toggleSelect(e, data, false)}
                sliding={false}
                data={this.getRecent()}
                selected={this.props.recentSelected}
                showComboBox
              />

              <div className="mb-5" />
              {this.renderTitle('All', 'everyAll')}
              <ListUser
                onSelect={(e, data): void => this.toggleSelect(e, data, true)}
                sliding={false}
                data={this.getAll()}
                selected={this.props.friendsSelected}
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
  const {
    friends,
    friendsSearch,
    friendsSelected,
    recentSelected
  } = profileAPI;
  return { friends, friendsSearch, friendsSelected, recentSelected };
};

export default withRouter(
  connect(mapStateToProps, { updateProfileProperty })(FanFeedFilterPage)
);
