import React from 'react';
import { BackgroundImage, InputCheckbox } from '../../../../components';
import { SubGenreInterface } from '../../../../interfaces';
import { IonCheckbox } from '@ionic/react';

interface Props {
  title?: string;
  subGenres: SubGenreInterface[];
  background?: string;
}

class SubGenreModalComponent extends React.Component<Props> {
  indeterminateState: boolean = false;
  selectAll: boolean = false;
  subGenres = this.props.subGenres;

  componentDidMount(): void {
    this.verifyCheckbox();
    this.forceUpdate();
  }

  verifyCheckbox(): void {
    const allItems = this.subGenres.length;
    let selected = 0;

    // eslint-disable-next-line
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
  render(): React.ReactNode {
    return (
      <div className="menu-generic-list">
        <BackgroundImage
          backgroundBottom
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.4}
        />
        <div className={`modal-header ${this.props.background}`}>
          <span className="h2 dark baskerville">{this.props.title}</span>
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

export default SubGenreModalComponent;
