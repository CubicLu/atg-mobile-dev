import React from 'react';
import { BackgroundImage, InputCheckbox } from '../../../../components';
import { SubGenreInterface } from '../../../../interfaces';
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

class SubGenreModalComponent extends React.Component<Props> {
  indeterminateState: boolean = false;
  selectAll: boolean = false;
  subGenres = this.props.subGenres;
  componentDidMount(): void {
    this.verifyCheckbox();
  }

  verifyCheckbox(): void {
    const allItems = this.subGenres.length;
    let selected = 0;

    this.subGenres.map((item: SubGenreInterface): void => {
      if (item.selected) selected++;
    });
    if (selected > 0 && selected < allItems) {
      this.indeterminateState = true;
      this.selectAll = false;
    } else if (selected === allItems) {
      this.selectAll = true;
      this.indeterminateState = false;
    } else {
      this.indeterminateState = false;
      this.selectAll = false;
    }
    this.forceUpdate();
  }
  selectGenre(): void {
    let selectedGenresArray = this.props.selectedGenres;
    if (!selectedGenresArray.includes(this.props.name)) {
      selectedGenresArray.push(this.props.name);
      this.props.updateSettingsProperty('genreFilters', selectedGenresArray);
    }
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
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.2}
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
                  this.indeterminateState = false;
                  this.selectAll = !this.selectAll;
                  this.subGenres.forEach((item: SubGenreInterface): void => {
                    item.selected = this.selectAll;
                  });
                  this.selectAll ? this.selectGenre() : this.unselectGenre();
                  this.forceUpdate();
                }}
                mode={'md'}
                className={'checkbox-outline'}
                checked={this.selectAll}
                indeterminate={this.indeterminateState}
              />
            </li>
            {this.subGenres &&
              this.subGenres.map(
                (data, i): React.ReactNode => (
                  <li key={i}>
                    <div className="name">{data.name}</div>
                    <InputCheckbox
                      action={(): void => {
                        this.subGenres[i].selected = !data.selected;
                        this.subGenres[i].selected
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
