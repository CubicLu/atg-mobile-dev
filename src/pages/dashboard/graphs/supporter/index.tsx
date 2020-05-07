import React from 'react';
import { IonContent, IonPage, IonList } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  ListItem,
  DefaultModal
} from './../../../../components';
import { store } from '../../../../store';
import { updateSettingsModal } from '../../../../actions';
import { countries } from '../../../../constants/countries';
import { dashboardSupporters } from '../../../../constants';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  artistId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}
interface State {
  selectedCountryCode: string | undefined;
}
export default class DashboardGraphSupporterPage extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCountryCode: undefined
    };
  }

  setCountry(selectedCountryCode): void {
    this.setState({ selectedCountryCode });
    return store.dispatch(updateSettingsModal(false));
  }
  toggleCountryList(): void {
    store.dispatch(
      updateSettingsModal(
        <DefaultModal
          title="Select Country"
          onClick={(country): void => this.setCountry(country.code)}
          data={countries}
        />,
        'background-white-base',
        60
      )
    );
  }

  goToLink = (data): (() => void) => (): void => {
    const { name } = data;
    this.props.history.push(`/profile/${name}`);
  };

  render(): React.ReactNode {
    const { selectedCountryCode } = this.state;
    const code = selectedCountryCode;
    return (
      <IonPage
        id="dashboard-supporter-page"
        className={'dashboard-supporter-page'}
      >
        <Header
          className="header"
          title="Supporters"
          rightCloseButton
          rightCloseHref={`/dashboard/${this.props.match.params.artistId}`}
          leftBackButton={false}
        />

        <BackgroundImage gradient={'180deg,#fbffdb,#dcfaf6'} />

        <IonContent className="content" scrollEvents={true}>
          <div className="nav-bar f4 mt-2 mb-3 dark flex center-align">
            <div
              onClick={(): void => this.setCountry(undefined)}
              className={`nav-item pb-1 mx-3 ${
                selectedCountryCode ? '' : 'active'
              }`}
            >
              Top Supporters
            </div>
            <div
              onClick={(): void => this.toggleCountryList()}
              className={`nav-item pb-1 mx-3 ${
                selectedCountryCode ? 'active' : ''
              }`}
            >
              By Region
            </div>
          </div>

          <IonList lines="none">
            {dashboardSupporters
              .filter((x): boolean => (code ? x.country === code : true))
              .map(
                (data, i): React.ReactNode => {
                  return (
                    <ListItem
                      key={i}
                      node={i}
                      sliding={false}
                      bottomBorder={false}
                      hasAvatar={true}
                      avatarSize={48}
                      username={data.name}
                      avatarClick={this.goToLink(data)}
                      rightContent={
                        <span className="f6 dark">{data.time}</span>
                      }
                    />
                  );
                }
              )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}
