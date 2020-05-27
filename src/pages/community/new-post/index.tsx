import React from 'react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonActionSheet,
  ActionSheetButton
} from '@ionic/react';
import { Button, CardCamera, InputTextArea } from '../../../components';
import { ShapesSize, Colors } from '../../../types';
import { CameraOptions, Camera } from '../../../models';
import CameraImage from '../../../components/icon/camera';
import { convertIonicFileSrc } from '../../../utils';
import { RouteComponentProps } from 'react-router';

interface CameraFile {
  fileUrl: string;
  selected: boolean;
}
interface Props extends RouteComponentProps {}
interface State {
  showCameraActions: boolean;
  errorMessage?: string;
  postText?: string;
  cameraFiles: CameraFile[];
}
export default class CommunityNewPostPage extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showCameraActions: false,
      cameraFiles: []
    };
  }

  componentWillUnmount(): void {
    this.navCamera?.cleanup(
      (): void => {},
      (): void => {}
    );
  }
  navCamera = (navigator as any).camera as Camera;

  getCameraOptions(sourceType: number = 2): CameraOptions {
    return {
      quality: 50,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: 0,
      mediaType: 0,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: 1,
      destinationType: 1
    };
  }

  getCameraPicture(sourceType: number = 2): void {
    this.navCamera?.getPicture(
      (data: string): void => {
        let cameraFiles = this.state.cameraFiles;
        cameraFiles.push({
          fileUrl: convertIonicFileSrc(data),
          selected: true
        });
        this.setState({
          cameraFiles: cameraFiles
        });
      },
      (error: string): void => console.log('Camera Error', error),
      this.getCameraOptions(sourceType)
    );
  }

  cameraActions: ActionSheetButton[] = [
    {
      text: 'Camera Roll',
      role: 'destructive',
      handler: (): void => this.getCameraPicture(1)
    },
    {
      text: 'Photo Gallery',
      role: 'destructive',
      handler: (): void => this.getCameraPicture(2)
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ];
  toggleCameraActions(opt: boolean = true): void {
    this.setState({ showCameraActions: opt });
  }
  removeImage(data: string): void {
    const idx = this.state.cameraFiles.findIndex(
      (x): boolean => x.fileUrl === data
    );
    let cameraFiles = this.state.cameraFiles;
    cameraFiles.splice(idx, 1);
    this.setState({
      cameraFiles: cameraFiles
    });
    this.validatePost();
  }
  selectImage(data: string): void {
    let cameraFiles = this.state.cameraFiles;
    const id = cameraFiles.findIndex((x): boolean => x.fileUrl === data);
    if (id !== -1) {
      return;
    }

    cameraFiles[id].selected = !cameraFiles[id].selected;

    this.setState({
      cameraFiles: cameraFiles
    });

    this.validatePost();
  }

  get selectedFiles(): CameraFile[] {
    return this.state.cameraFiles.filter((f): boolean => f.selected);
  }
  validatePost(): void {
    const selected = this.selectedFiles;
    let msg: string | undefined = undefined;
    if (selected.length < 1) {
      msg = 'You must select at least 1 image';
    }
    if (selected.length > 10) {
      msg = 'You must select up to 10 images';
    }
    this.setState({ errorMessage: msg });
  }
  get invalidPost(): boolean {
    return !!this.state.errorMessage && this.state.errorMessage.length > 1;
  }
  doPost(): void {
    this.validatePost();
    if (this.invalidPost || this.selectedFiles.length < 1) {
      return;
    }
    console.log('POSTING TO API, ', {
      text: this.state.postText,
      itens: this.selectedFiles
    });
    this.props.history.push('/community');
  }
  renderThumbnails(): React.ReactNode {
    return (
      <div id="images" className="mx-2 fluid flex row overflow-x">
        <div onClick={(): any => this.toggleCameraActions(true)}>
          <CardCamera
            className="no-shadow"
            key={0}
            width={105}
            frame={true}
            type={ShapesSize.roundedFrame}
            innerContent={<CameraImage />}
          />
        </div>

        {this.state.cameraFiles.map(
          (post, id): React.ReactNode => (
            <CardCamera
              key={id}
              className="no-shadow"
              canRemove={false}
              removeAction={(): void => this.removeImage(post.fileUrl)}
              selected={post.selected}
              selectAction={(): void => this.selectImage(post.fileUrl)}
              width={105}
              type={ShapesSize.rounded}
              image={post.fileUrl}
            />
          )
        )}
      </div>
    );
  }
  renderHeaderBar(): React.ReactNode {
    return (
      <IonItem className="mx-0 mt-7">
        <div slot="start" className="f6">
          <Button
            routerLink="/community"
            routerDirection="back"
            type={ShapesSize.rounded}
            color={Colors.transparentRed}
            bold={true}
            label={'Cancel'}
          />
        </div>
        <div slot="end">
          <Button
            disabled={this.invalidPost}
            onClick={(): void => this.doPost()}
            type={ShapesSize.rounded}
            color={Colors.tertiary}
            label={'\u00A0\u00A0\u00A0Post\u00A0\u00A0\u00A0\u00A0'}
          />
        </div>
      </IonItem>
    );
  }
  updateText(value: string): void {
    this.setState({ postText: value });
  }
  render(): React.ReactNode {
    return (
      <IonPage id="community-new-post-page" className="background-white">
        <IonContent fullscreen={true}>
          {this.renderHeaderBar()}

          <div className="mx-2 mb-1 center-align">
            <span className="f6 error">{this.state.errorMessage}</span>
          </div>

          <InputTextArea
            className="post-input"
            type={'text'}
            placeholder={'What\u0027s up?'}
            onChangeText={(e): void => this.updateText(e)}
          />

          <IonActionSheet
            onDidDismiss={(): any => this.toggleCameraActions(false)}
            isOpen={this.state.showCameraActions}
            buttons={this.cameraActions}
          />

          {this.renderThumbnails()}
        </IonContent>
      </IonPage>
    );
  }
}
