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
import {
  SettingsActionType,
  UpdateModalInterface,
  Action
} from '../../../../models';

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

  setCountry(
    selectedCountryCode
  ): Action<SettingsActionType.UPDATE_MODAL, UpdateModalInterface> {
    this.setState({ selectedCountryCode });
    return store.dispatch(updateSettingsModal(false));
  }
  toggleCountryList(): void {
    store.dispatch(
      updateSettingsModal(
        <DefaultModal
          title="Select Country"
          onClick={(
            country
          ): Action<SettingsActionType.UPDATE_MODAL, UpdateModalInterface> =>
            this.setCountry(country.code)
          }
          data={countries}
        />,
        'background-white-base',
        60
      )
    );
  }

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
              onClick={(): Action<
                SettingsActionType.UPDATE_MODAL,
                UpdateModalInterface
              > => this.setCountry(undefined)}
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
                (d, i): React.ReactNode => {
                  return (
                    <ListItem
                      key={i}
                      node={i}
                      sliding={false}
                      bottomBorder={false}
                      hasAvatar={true}
                      avatarImage={d.image}
                      avatarSize={48}
                      username={d.name}
                      rightContent={<span className="f6 dark">{d.time}</span>}
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
