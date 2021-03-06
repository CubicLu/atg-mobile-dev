import React from 'react';
import {
  IonPage,
  IonContent,
  IonReorder,
  IonItem,
  IonReorderGroup,
  withIonLifeCycle
} from '@ionic/react';
import { Sizes, ShapesSize } from '../../../types';
import {
  Header,
  HeaderOverlay,
  BackgroundImage,
  InputSearch,
  InputText,
  InputComboBox,
  Avatar
} from '../../../components';
import { connect } from 'react-redux';
import {
  updateNavBarTwoActions,
  toggleNavBarTwoActions
} from '../../../actions';

import { hideTabs, preventChangeTabbar } from '../../../utils';
import { RouteComponentProps } from 'react-router';
interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
  toggleNavBarTwoActions: (activate: boolean) => void;
  updateNavBarTwoActions: (
    leftLabel: string,
    rightLabel: string,
    leftAction: Function,
    rightAction: Function
  ) => void;
}
interface State {
  searchText: string;
  stationName?: string;
  errorMessage?: string;
  items: any[];
}

const editedStation = {
  stationName: 'All Pop',
  items: [
    {
      artist: 'Rival Sons',
      selected: true,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_rivalsons.jpg'
    },
    {
      artist: 'Pharrell Williams',
      selected: false,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_pharrell.jpg'
    },
    {
      artist: 'Bono Vox',
      selected: true,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_bono.jpg'
    },
    {
      artist: 'LMFAO',
      selected: false,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_lmfao.jpg'
    },
    {
      artist: 'Future ft. Drake',
      selected: false,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/ecfa926cd9d5369e98bbbc4eefd57a6b/264x264-000000-80-0-0.jpg'
    },
    {
      artist: 'Harry Styles',
      selected: true,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/379613019df276565895074c85ec9efa/264x264-000000-80-0-0.jpg'
    },
    {
      artist: 'Doja Cat',
      selected: true,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/64377279e24c6193fab373abf635a6dd/264x264-000000-80-0-0.jpg'
    },
    {
      artist: 'Coldplay',
      selected: true,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/fd3f599db05db84cf1392021daaf3a61/264x264-000000-80-0-0.jpg'
    }
  ]
};
const newStation = {
  stationName: '',
  items: [
    {
      artist: 'Rival Sons',
      selected: true,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_rivalsons.jpg'
    },
    {
      artist: 'Pharrell Williams',
      selected: false,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_pharrell.jpg'
    },
    {
      artist: 'Bono Vox',
      selected: true,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_bono.jpg'
    },
    {
      artist: 'LMFAO',
      selected: false,
      background:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/avatar_lmfao.jpg'
    },
    {
      artist: 'Future ft. Drake',
      selected: false,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/ecfa926cd9d5369e98bbbc4eefd57a6b/264x264-000000-80-0-0.jpg'
    },
    {
      artist: 'Harry Styles',
      selected: false,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/379613019df276565895074c85ec9efa/264x264-000000-80-0-0.jpg'
    },
    {
      artist: 'Doja Cat',
      selected: false,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/64377279e24c6193fab373abf635a6dd/264x264-000000-80-0-0.jpg'
    },
    {
      artist: 'Coldplay',
      selected: false,
      background:
        'https://e-cdns-images.dzcdn.net/images/cover/fd3f599db05db84cf1392021daaf3a61/264x264-000000-80-0-0.jpg'
    }
  ]
};

class RadioStationEditPage extends React.Component<Props, State> {
  isEdit: boolean = false;
  editId?: string;
  componentDidMount(): void {
    const isEdit = !!this.props.match?.params.id;
    this.setState(isEdit ? { ...editedStation } : { ...newStation });
  }
  ionViewWillEnter(): void {
    this.componentDidMount();
    preventChangeTabbar(true);
    hideTabs(true);
    this.props.updateNavBarTwoActions(
      'Delete Station',
      'Done',
      (): void => this.deleteItems(),
      (): void => this.saveItems()
    );
  }
  ionViewWillLeave(): void {
    hideTabs(false);
    preventChangeTabbar(false);
    this.props.toggleNavBarTwoActions(false);
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
      stationName: '',
      items: []
    };
  }
  private headerRef: React.RefObject<any> = React.createRef();

  invalidStation(): boolean {
    let error: string | undefined = undefined;
    if (!this.state.stationName || this.state.stationName.length < 2) {
      error = 'Invalid Station Name! It must contain at least 2 characters';
    }
    if (this.state.stationName!.length > 50) {
      error = 'Invalid Station Name! It must contain less than 50 characters';
    }
    if (this.state.items.filter((x): boolean => x.selected).length < 2) {
      error = 'Invalid Station! You must select at least 2 artists';
    }
    this.setState({ errorMessage: error });
    return !!error;
  }
  deleteItems(): void {
    this.props.history.push('/radio');
  }
  saveItems(): void {
    if (this.invalidStation()) {
      return;
    }
    const list = {
      id: 2,
      name: this.state.stationName,
      items: this.state.items.filter((x): boolean => x.selected)
    };
    console.log('FINISHED. Send this list to API', list);
    this.props.history.push('/radio');
  }
  toggleList(name: string, checked: boolean): void {
    const state = this.state.items.slice();
    const item = state.find((x): boolean => x.artist === name)!;
    item.selected = checked;
    this.setState({ items: state });
  }
  isSelected(name: string): boolean {
    const sel = this.state.items;
    return sel.find((x): boolean => x.artist === name)?.selected || false;
  }
  renderArtistRow(
    index: number,
    artistName: string,
    image?: string
  ): React.ReactNode {
    return (
      <IonItem key={index} mode="ios" className="mx-0 f4">
        <InputComboBox
          checked={this.isSelected(artistName)}
          onSelect={(e): void => this.toggleList(artistName, e.detail.checked)}
          format="rounded"
        />
        <span className="mx-1">
          <Avatar
            image={image}
            type={ShapesSize.rounded}
            width={56}
            height={56}
          />
        </span>
        <span>{artistName}</span>
        <IonReorder
          style={{ filter: 'brightness(2)' }}
          className="mx-0"
          color="white"
          slot="end"
        />
      </IonItem>
    );
  }
  reorderList(e: CustomEvent): void {
    const items = e.detail.complete(this.state.items);
    this.setState({ items: items.slice() });
  }
  filteredList(): any[] {
    let list = this.state.items;
    const text = this.state?.searchText;
    return text?.length > 0
      ? list.filter((x: any): boolean =>
          x.artist.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      : list;
  }
  renderArtistList(): React.ReactNode {
    return (
      <div className="mx-2">
        <IonReorderGroup
          disabled={false}
          onIonItemReorder={(e): void => this.reorderList(e)}
        >
          {this.filteredList().map(
            (data, i): React.ReactNode => (
              <React.Fragment key={i}>
                {this.renderArtistRow(i, data.artist, data.background)}
              </React.Fragment>
            )
          )}
        </IonReorderGroup>
      </div>
    );
  }
  performSearch(value: string): void {
    this.setState({ searchText: value });
  }
  updateText(value: string): void {
    this.setState({ stationName: value });
  }
  renderNameAndSearch(): React.ReactNode {
    return (
      <>
        <div className="mx-4 mt-3">
          <InputText
            onChangeText={(e): void => this.updateText(e)}
            size={Sizes.md}
            defaultValue={this.state.stationName}
            type={'text'}
            placeholder={'Name your station'}
          />
        </div>

        <div className="mx-4 mt-3 search-outline" />
        <div className="mx-4">
          <span className="f6 error">{this.state.errorMessage}</span>
        </div>

        <div className="mx-4 mt-3">
          <InputSearch
            placeholder="Search..."
            debounce={150}
            value={this.state.searchText}
            onChange={(e): void => this.performSearch(e.detail.value!)}
          />
        </div>
      </>
    );
  }

  resetSearch = async (): Promise<void> => {
    this.setState({
      searchText: ''
    });
  };

  render(): React.ReactNode {
    const pageTitle = !this.props.match?.params.id
      ? 'Create Station'
      : 'Edit Station';
    const parentScroll = (e): void => {
      this.headerRef.current?.handleParentScroll(e);
    };
    return (
      <IonPage id="radio-custom-page">
        <Header
          title={pageTitle}
          titleLeft={true}
          leftBackButton={false}
          rightCloseButton={true}
          rightClickGoBack={true}
        />
        <HeaderOverlay ref={this.headerRef} />
        <BackgroundImage
          gradient={'180deg,#22143c,#1a1123'}
          backgroundTop
          backgroundBottom
          backgroundBottomDark={false}
          backgroundTopDark
          backgroundTopOpacity={1}
          backgroundBottomOpacity={0.17}
        />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={parentScroll}
        >
          <div
            className="container-top-bottom fluid"
            style={{
              paddingBottom: 65
            }}
          >
            {this.renderNameAndSearch()}
            <div className="mx-4 mt-3" />
            {this.renderArtistList()}
            <div className="mb-2" />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default connect(null, {
  toggleNavBarTwoActions,
  updateNavBarTwoActions
})(withIonLifeCycle(RadioStationEditPage));
