export interface VideoInterface {
  readonly image: string;
  readonly video: string;
  readonly time: number | string;
  readonly datePublished: Date;
}

export interface VideosBetaInterface {
  readonly id: string;
  readonly artistId: string;
  readonly name: string;
  readonly videos: VideoBetaInterface[];
}

interface VideoBetaInterface {
  readonly id: string;
  readonly artistId: string;
  readonly name: string;
  readonly videoSectionId: string;
  readonly duration: number;
  readonly thumbnail: string;
  readonly description: string;
  readonly url: string;
  readonly rated: boolean;
}
