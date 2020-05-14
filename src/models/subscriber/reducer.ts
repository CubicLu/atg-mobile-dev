import {
  DefaultReducerInterface,
  SubscriberArtistSupportedInterface
} from '../';

export interface SubscriberReducerType extends DefaultReducerInterface {
  artists: SubscriberArtistSupportedInterface[];
}
