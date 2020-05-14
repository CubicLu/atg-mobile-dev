import React from 'react';
import { BackgroundImage, InputCheckbox } from '../../../../components';
import { SubGenreInterface } from '../../../../models';
import { IonCheckbox } from '@ionic/react';
import { updateSettingsProperty } from '../../../../actions';
import { ApplicationState } from '../../../../reducers';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface StateProps {
  selectedGenres: string[];
}

interface Props extends StateProps, DispatchProps {
  name: string;
  subGenres: SubGenreInterface[];
  background?: string;
}

interface State {
  selectAll: boolean;
  indeterminateState: boolean;
  subGenres: SubGenreInterface[];
}
class SubGenreModalComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      indeterminateState: false,
      subGenres: this.props.subGenres
    };
  }
  componentDidMount(): void {
    this.verifyCheckbox();
  }
  updateStateSelectAll(condition): void {
    let subgenres = this.state.subGenres;
    subgenres.forEach((item: SubGenreInterface): void => {
      item.selected = condition;
    });

    this.setState({
      subGenres: subgenres
    });
  }

  updateState(indeterminateState: boolean, selectAll: boolean): void {
    this.setState({
      indeterminateState: indeterminateState,
      selectAll: selectAll
    });
  }

  verifyCheckbox(): void {
    const allItems = this.state.subGenres.length;
    let selected = 0;

    this.state.subGenres.map((item: SubGenreInterface): void => {
      if (item.selected) selected++;
    });

    if (selected > 0 && selected < allItems) {
      this.updateState(true, false);
    } else if (selected === allItems) {
      this.updateState(false, true);
    } else {
      this.updateState(false, false);
    }
  }
  selectGenre(): void {
    let selectedGenresArray = this.props.selectedGenres;
    if (!selectedGenresArray.includes(this.props.name)) {
      selectedGenresArray.push(this.props.name);
      this.props.updateSettingsProperty('genreFilters', selectedGenresArray);
    }
  }

  updateStateSelected(i: number): void {
    let subgenres = this.state.subGenres;
    subgenres[i].selected = !subgenres[i].selected;
    this.setState({
      subGenres: subgenres
    });
  }
  unselectGenre(): void {
    let selectedGenresArray = this.props.selectedGenres;
    if (selectedGenresArray.includes(this.props.name)) {
      selectedGenresArray.splice(
        selectedGenresArray.indexOf(this.props.name),
        1
      );
      this.props.updateSettingsProperty('genreFilters', selectedGenresArray);
    }
  }
  render(): React.ReactNode {
    return (
      <div className="menu-generic-list">
        <BackgroundImage
          backgroundBottom
          backgroundBottomDark={true}
          backgroundBottomOpacity={0.15}
        />
        <div className={`modal-header ${this.props.background}`}>
          <span className="h2 dark baskerville">{this.props.name}</span>
        </div>

        <div className="modal-content">
          <ul style={{ width: 312 }}>
            <li style={{ marginBottom: 24, fontSize: 16 }}>
              <b>Select All</b>
              <IonCheckbox
                slot="end"
                onClick={(): void => {
                  this.updateState(false, !this.state.selectAll);
                  this.updateStateSelectAll(!this.state.selectAll);

                  this.state.selectAll
                    ? this.selectGenre()
                    : this.unselectGenre();
                }}
                mode={'md'}
                className={'checkbox-outline'}
                checked={this.state.selectAll}
                indeterminate={this.state.indeterminateState}
              />
            </li>
            {this.state.subGenres &&
              this.state.subGenres.map(
                (data, i): React.ReactNode => (
                  <li key={i}>
                    <div className="name">{data.name}</div>
                    <InputCheckbox
                      action={(): void => {
                        this.updateStateSelected(i);
                        this.state.subGenres[i].selected
                          ? this.selectGenre()
                          : this.unselectGenre();
                        this.verifyCheckbox();
                      }}
                      checked={data.selected}
                    />
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { selectedGenres } = settings;
  return { selectedGenres };
};

export default withRouter(
  // @ts-ignore
  connect(mapStateToProps, {
    updateSettingsProperty
  })(SubGenreModalComponent)
);
