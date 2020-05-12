import {
  PlayerActionType,
  PlayerReducerType,
  PlaylistInterface,
  SongInterface,
  Action,
  SetPlaylistInterface,
  SeekPositionInteface,
  PlaySongInterface
} from './../models';
import createReducer from './createReducer';

export const guitarPlaylist: PlaylistInterface = {
  name: 'Guitars & Grit',
  id: 7516727864,
  source: 'mixtape',
  color1: '#110b15',
  color2: '#ac0a39',
  sourceId: 7516727864,
  cover:
    'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar-playlist.jpg',
  owner: 'Chris',
  items: [
    {
      id: 13443953,
      title: "Rock N' Roll Is Free",
      artist: 'Ben Harper',
      album: "Give Till It's Gone",
      backgroundGradient: {
        color1: '#079848',
        color2: '#136137'
      },
      duration: 204,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/262433a909f181c7343d8756b8a1a156/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/3a8c793f1e55569d570e99283b98045b/264x264-000000-80-0-0.jpg',
      trackNumber: 3,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A1+Ben+Harper+-+Rock+In+Roll+Is+Free.mp3',
      ISRC: 'USNPD1000624'
    },
    {
      id: 16309292,
      title: 'Pressure And Time',
      artist: 'Rival Sons',
      album: 'Pressure & Time',
      duration: 208,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/98d39059e63fdb2a2659fc826c5814ad/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/0f1c0cba0bba2ca146942544dd6693d2/264x264-000000-80-0-0.jpg',
      trackNumber: 3,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A3+Rival+Sons+-+Pressure+and+Time.mp3',
      ISRC: 'GBBPB1100009'
    },
    {
      id: 133585770,
      title: 'Devil’s Land',
      artist: 'The Marcus King Band',
      album: 'The Marcus King Band',
      duration: 310,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/5cf4abe8a3eb2359935e8542e40ad1fd/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/747b78ad3f94b793d65739a05a2d1391/264x264-000000-80-0-0.jpg',
      trackNumber: 2,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A2+Marcus+King+Band+-+Devils+Land.mp3',
      ISRC: 'USC4R1605114'
    },
    {
      id: 3091905,
      title: 'Diamonds On The Inside',
      artist: 'Ben Harper',
      album: 'Diamonds On The Inside',
      duration: 223,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/ec21a4082784f45638fa06137d37a7e1/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/3a8c793f1e55569d570e99283b98045b/264x264-000000-80-0-0.jpg',
      trackNumber: 3,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A4+Ben+Harper+-+Diamonds+on+the+inside.mp3',
      ISRC: 'USVI20200340'
    },
    {
      id: 652860052,
      title: 'Little White Dove',
      artist: 'Jenny Lewis',
      album: 'On The Line',
      duration: 289,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/5c600f7bacc3a506bbaf6abbb125ac60/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/233e39434f50f42ac3ca31cc32249bb8/264x264-000000-80-0-0.jpg',
      trackNumber: 8,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A5+Jenny+Lewis+-+Little+White+Dove.mp3',
      ISRC: 'USWB11803417'
    },
    {
      id: 1088512,
      title: 'Lake Michigan',
      artist: 'Rogue Wave',
      album: "Asleep At Heaven's Gate",
      duration: 219,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/4e4c5d7561b3c9b5927e184c0c882a8f/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/25722a2531db65d1b754a3d87da341bd/264x264-000000-80-0-0.jpg',
      trackNumber: 4,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A6+Rogue+Wave+-+Lake+Michigan.mp3',
      ISRC: 'USUM70745472'
    },
    {
      id: 561883512,
      title: "Where I'm Headed",
      artist: 'The Marcus King Band',
      album: 'Carolina Confessions',
      duration: 293,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/2eadd60707a4cb59935edd1e4255c4f5/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/747b78ad3f94b793d65739a05a2d1391/264x264-000000-80-0-0.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A7+Marcus+King+Band+-+Where+Im+Headed.mp3',
      ISRC: 'USC4R1806587'
    },
    {
      id: 652860002,
      title: 'Red Bull & Hennessy',
      artist: 'Jenny Lewis',
      album: 'On The Line',
      duration: 264,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/5c600f7bacc3a506bbaf6abbb125ac60/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/233e39434f50f42ac3ca31cc32249bb8/264x264-000000-80-0-0.jpg',
      trackNumber: 3,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A8+Jenny+Lewis+-+Red+Bull+and+Hennessy.mp3',
      ISRC: 'USWB11803412'
    },
    {
      id: 920223762,
      title: 'Face of Light',
      artist: 'Rival Sons',
      album: 'Pressure & Time',
      duration: 264,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/91eb785ab8d42bb4797a92d4f3965cdc/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/0f1c0cba0bba2ca146942544dd6693d2/264x264-000000-80-0-0.jpg',
      trackNumber: 10,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A9+Rival+Sons+-+Face+Of+Light.mp3',
      ISRC: 'GBBPB1201415'
    },
    {
      id: 123274886,
      title: "Let's Burn Those Stars - Single",
      artist: 'King Black Acid',
      album: "Let's Burn Those Stars - Single",
      duration: 276,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/3775391c03d4ec55a2148cc64065517d/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover//264x264-000000-80-0-0.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/guitar/A10+King+Black+Acid+-+Lets+Burn.mp3',
      ISRC: 'USA561298478'
    }
  ]
};
export const bluesPlaylist: PlaylistInterface = {
  name: 'Blues & Bass',
  id: 7516744044,
  source: 'artist',
  color1: '#231441',
  color2: '#080709',
  sourceId: 7516744044,
  cover:
    'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues-playlist.jpg',
  owner: 'Chris',
  items: [
    {
      id: 421785532,
      title: 'Bird Gang',
      artist: 'DOE BOY',
      album: 'In Freebandz We Trust 2',
      duration: 165,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/f25f704a1984c503a8cca13ac7321d98/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/1278198def9c07d5c284250ba82072ad/264x264-000000-80-0-0.jpg',
      trackNumber: 2,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B1+Doe+Boy+-+Bird+Gang.mp3',
      ISRC: 'USAEA8167183'
    },
    {
      id: 704346952,
      title: 'Helen Keller',
      artist: 'Shwayze',
      album: 'Beach Boy',
      duration: 181,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/423ad64a66ebc7b179a27ca68ca45b40/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/c4cc49a602bf3894a5c8a69b20ff6b2f/264x264-000000-80-0-0.jpg',
      trackNumber: 6,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B2+Shwayze+-+Helen+Keller.mp3',
      ISRC: 'QM24S1922292'
    },
    {
      id: 5492765,
      title: 'Change Clothes (Made Famous by Jay-Z feat. Pharrell)',
      artist: 'Hip Hop DJs United',
      album: 'The Ultimate Salute To Jay-Z',
      duration: 283,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/15cad877f93e8fda50c6cb347e1e85a5/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/ba300073522e90ace162efc2f9550428/264x264-000000-80-0-0.jpg',
      trackNumber: 37,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B4+Jay+Z%2C+Pharrell+Williams+-+Change+Clothes.mp3'
    },
    {
      id: 704346942,
      title: 'Peach',
      artist: 'Shwayze',
      album: 'Beach Boy',
      duration: 178,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/423ad64a66ebc7b179a27ca68ca45b40/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/c4cc49a602bf3894a5c8a69b20ff6b2f/264x264-000000-80-0-0.jpg',
      trackNumber: 5,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B5+Shwayze+-+Peach.mp3'
    },
    {
      id: 474177342,
      title: 'Aries (YuGo) Part 2',
      artist: 'Mike Will Made-It',
      album:
        'Aries (YuGo) Part 2 (with Big Sean, Pharrell, Quavo, Rae Sremmurd)',
      duration: 316,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/8a631869c0bbf6b8288ceabb598670b0/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/3b994f0fc07323a02c1f67e770f7227c/264x264-000000-80-0-0.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B6+Aries+Yugo+Part+2.mp3',
      ISRC: 'USUM71803655'
    },
    {
      id: 672855732,
      title: 'Walk Down',
      artist: 'DOE BOY',
      album: 'Walk Down',
      duration: 122,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/ecfa926cd9d5369e98bbbc4eefd57a6b/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/1278198def9c07d5c284250ba82072ad/264x264-000000-80-0-0.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B7+Doe+Boy+-+Walk+down.mp3',
      ISRC: 'QZ5FA1950234'
    },
    {
      id: 428537412,
      title: 'Neon Guts (feat. Pharrell Williams)',
      artist: 'Lil Uzi Vert',
      album: 'Luv Is Rage 2 (Deluxe)',
      duration: 259,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/379613019df276565895074c85ec9efa/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/1b584e2ef712bbef4a4dcc535d1aca37/264x264-000000-80-0-0.jpg',
      trackNumber: 8,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B9+Lil+Uzi+Vert%2C+Pharrell+Williams+-+Neon+Guts.mp3',
      ISRC: 'USAT21703398'
    },
    {
      id: 4302229,
      title: 'Excuse Me Miss',
      artist: 'Jay-Z',
      album: 'Def Jam 25, Vol. 19 - For The Lover In You (Explicit Version)',
      duration: 270,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/64377279e24c6193fab373abf635a6dd/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/90fab088c4d091618e7386f688803673/264x264-000000-80-0-0.jpg',
      trackNumber: 8,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/blues/B10+Jay+Z%2C+Pharrell+Williams+-+Excuse+Me+Miss.mp3',
      ISRC: 'USDJ20201202'
    }
  ]
};
export const popPlaylist: PlaylistInterface = {
  name: 'Pop & Synth',
  id: 7516755384,
  source: 'radio',
  // color1: '#ffc90d',
  // color2: '#034627',
  sourceId: 7516755384,
  cover:
    'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop-playlist.jpg',
  owner: 'Chris',
  items: [
    {
      id: 12565421,
      title: 'Sexy And I Know It',
      artist: 'LMFAO',
      album: 'Sorry For Party Rocking',
      duration: 206,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/63278375978f200fb751cd63624151bb/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/d02486ca2c8b585d3490d66e0cf58d15/264x264-000000-80-0-0.jpg',
      trackNumber: 4,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C1+LMFAO+-+Sexy+and+I+Know+It.mp3',
      ISRC: 'USUM71108090'
    },
    {
      id: 374051471,
      title: 'Feels',
      artist: 'Calvin Harris',
      album: 'Feels',
      duration: 223,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/fd3f599db05db84cf1392021daaf3a61/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/fa57fb13c77a51c68374f9e98686ee7d/264x264-000000-80-0-0.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C2+Calvin+Harris%2C+Pharrell+WIlliams%2C+Katy+Perry%2C+Big+Sean+-+Feels.mp3',
      ISRC: 'GBARL1700772'
    },
    {
      id: 12565419,
      title: 'Sorry For Party Rocking',
      artist: 'LMFAO',
      album: 'Sorry For Party Rocking',
      duration: 439,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/63278375978f200fb751cd63624151bb/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/d02486ca2c8b585d3490d66e0cf58d15/264x264-000000-80-0-0.jpg',
      trackNumber: 2,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C4+LMFAO+-+Sorry+For+Party+Rocking.mp3'
    },
    {
      id: 133062636,
      title: 'Horizon',
      artist: 'Tycho',
      album: 'Epoch',
      duration: 249,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/0d5408c64d06cd7abda744bdd5d3168d/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/016623f914d27e1699b1128efc64a745/264x264-000000-80-0-0.jpg',
      trackNumber: 2,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C5+Tycho+-+horizon.mp3',
      ISRC: 'US2J71607902'
    },
    {
      id: 75559484,
      title: 'See',
      artist: 'Tycho',
      album: 'Awake',
      duration: 318,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/d93d697ed8a2d8e005971c504fc1d385/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/016623f914d27e1699b1128efc64a745/264x264-000000-80-0-0.jpg',
      trackNumber: 5,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C3+tycho+-+see.mp3',
      ISRC: 'US2J71400805'
    },
    {
      id: 3119438,
      title: 'Can I Have It Like That',
      artist: 'Pharrell',
      album: 'In My Mind',
      duration: 236,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/7712f6129ff723645f8a46d7e5f2b3cf/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/91a5e323f739fea83478eae246213862/264x264-000000-80-0-0.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C7+Gwen+Stefani%2C+Pharrell+Williams+-+Can+I+Have+It+Like+That.mp3',
      ISRC: 'USUM70503814'
    },
    {
      id: 656504822,
      title: 'Easy',
      artist: 'Tycho',
      album: 'Easy',
      duration: 208,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/bd026be4cb55d4912a2f0119fa8dd459/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/016623f914d27e1699b1128efc64a745/264x264-000000-80-0-0.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C8+Tycho+-+Easy.mp3',
      ISRC: 'GBCFB1900052'
    },
    {
      id: 701326572,
      title: 'Come Get It Bae',
      artist: 'Pharrell Williams',
      album: 'G I R L',
      duration: 209,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/481a67e19a5d59c6dd4eab0785e7bdb7/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/67f517c99b8b6ca8d9bde94db363b887/264x264-000000-80-0-0.jpg',
      trackNumber: 6,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C7+Gwen+Stefani%2C+Pharrell+Williams+-+Can+I+Have+It+Like+That.mp3',
      ISRC: 'USSM11400861'
    },
    {
      id: 13507171,
      title: 'You Could Be My Girl',
      artist: 'Shwayze',
      album: 'Island in the Sun',
      duration: 168,
      cover:
        'https://e-cdns-images.dzcdn.net/images/cover/5c922af811d5e5565b8c2bbd9622aa75/264x264-000000-80-0-0.jpg',
      coverArtist:
        'https://e-cdns-images.dzcdn.net/images/cover/c4cc49a602bf3894a5c8a69b20ff6b2f/264x264-000000-80-0-0.jpg',
      trackNumber: 3,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/pop/C10+Shwayze+Ft+Cisco+-+You+Could+Be+My+Girl.mp3',
      ISRC: 'USA371377794'
    }
  ]
};
export const rivalSonsPlaylist: PlaylistInterface = {
  name: 'Rival Sons',
  id: 7516755396,
  source: 'artist',
  // color1: '#ffc90d',
  // color2: '#034627',
  sourceId: 7516755384,
  cover:
    'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rival-sons-playlist.jpg',
  owner: 'Chris',
  items: [
    {
      id: 12565421,
      title: 'All Over The Road',
      artist: 'Rival Sons',
      album: 'Pressure & Time',
      duration: 174,
      cover:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/trackCover1.jpg',
      coverArtist:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/albumCover1.jpg',
      trackNumber: 1,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/All+Over+The+Road.mp3',
      ISRC: 'GBBPB1100027'
    },
    {
      id: 12565422,
      title: 'Do Your Worst',
      artist: 'Rival Sons',
      album: 'Do Your Worst',
      duration: 211,
      cover:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/trackCover2.jpg',
      coverArtist:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/albumCover1.jpg',
      trackNumber: 2,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/Do+Your+Worst.mp3',
      ISRC: 'USAT21810416'
    },
    {
      id: 12565423,
      title: 'Face Of Light',
      artist: 'Rival Sons',
      album: 'Pressure & Time',
      duration: 269,
      cover:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/trackCover3.jpg',
      coverArtist:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/albumCover1.jpg',
      trackNumber: 3,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/Face+Of+Light.mp3',
      ISRC: 'GBBPB1100349'
    },
    {
      id: 12565424,
      title: 'Keep On Swinging',
      artist: 'Rival Sons',
      album: 'Head Down',
      duration: 332,
      cover:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/defaultTrackCover.jpg',
      coverArtist:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/albumCover2.jpg',
      trackNumber: 4,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/Keep+On+Swinging.mp3',
      ISRC: 'GBBPB1201568'
    },
    {
      id: 12565425,
      title: 'Open My Eyes',
      artist: 'Rival Sons',
      album: 'Great Western Valkyrie',
      duration: 223,
      cover:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/defaultTrackCover.jpg',
      coverArtist:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/albumCover3.jpg',
      trackNumber: 5,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/Open+My+Eyes.mp3',
      ISRC: 'USDY41651904'
    },
    {
      id: 12565426,
      title: 'Until the Sun Comes',
      artist: 'Rival Sons',
      album: 'Head Down',
      duration: 162,
      cover:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/defaultTrackCover.jpg',
      coverArtist:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/covers/albumCover2.jpg',
      trackNumber: 6,
      url:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/player/rivalsons/Until+The+Sun+Comes.mp3',
      ISRC: 'GBBPB1201635'
    }
  ]
};

const defaultState: PlayerReducerType = {
  starting: false,
  expanded: false,
  fadingOut: false,
  playing: false,
  paused: false,
  stopped: false,
  timeElapsed: 0,
  duration: 0,
  masterVolume: 1,
  canSkip: true,
  shuffle: false,
  repeat: false,
  firstIndex: 0
};

type RunningStatus = 'PLAY' | 'PAUSE' | 'STOP';
interface RunningValues {
  playing: boolean;
  paused: boolean;
  stopped: boolean;
}
//ensure that not forget to have only one of three toggled
const getRunningStatus = (status: RunningStatus): RunningValues => {
  return {
    playing: status === 'PLAY',
    paused: status === 'PAUSE',
    stopped: status === 'STOP'
  };
};

export const playerReducer = createReducer<PlayerReducerType>(defaultState, {
  //oficial used with song, nextSong and first item
  [PlayerActionType.SET_PLAYLIST](
    state: PlayerReducerType,
    action: Action<SetPlaylistInterface>
  ): PlayerReducerType {
    const { playlist, song } = action.payload;
    let isSamePlaylist = state.playlist?.id === playlist.id;
    if (isSamePlaylist && state.song?.id === song.id) return state;

    console.log('prev playlist:', state.playlist?.name, 'new: ', playlist.name);
    console.log('prev song: ', state.song?.title, 'new: ', song.title);

    let index = playlist.items.findIndex((s): boolean => s.id === song?.id);
    const songIdx = Math.max(index, 0); //-1 becomes zero;
    const nextIdx = songIdx + 1 < playlist.items.length ? songIdx + 1 : 0;

    return {
      ...state,
      starting: true,
      ...getRunningStatus('PLAY'),
      playlist: playlist,
      firstIndex: songIdx,
      song: playlist.items[songIdx],
      duration: playlist.items[songIdx].duration,
      next: playlist.items[nextIdx],
      timeElapsed: 0,
      playerAction: PlayerActionType.SET_PLAYLIST
    };
  },

  [PlayerActionType.FAVORITE_SONG](
    state: PlayerReducerType
  ): PlayerReducerType {
    if (!state.song) {
      return state;
    }

    let currentSong = state.song;
    currentSong.favorite = !state.song.favorite;
    return {
      ...state,
      song: currentSong,
      playerAction: undefined
    };
  },
  [PlayerActionType.RESUME_SONG](state: PlayerReducerType): PlayerReducerType {
    return {
      ...state,
      playing: true,
      paused: false,
      stopped: false,
      playerAction: PlayerActionType.RESUME_SONG
    };
  },
  [PlayerActionType.PAUSE_SONG](state: PlayerReducerType): PlayerReducerType {
    return {
      ...state,
      ...getRunningStatus('PAUSE'),
      playerAction: PlayerActionType.PAUSE_SONG
    };
  },
  [PlayerActionType.STOP_SONG](state: PlayerReducerType): PlayerReducerType {
    return {
      ...state,
      ...getRunningStatus('STOP'),
      song: undefined,
      expanded: false,
      playerAction: PlayerActionType.STOP_SONG
    };
  },
  [PlayerActionType.TOGGLE_CURRENT_NEXT_SONG](
    state: PlayerReducerType
  ): PlayerReducerType {
    return {
      ...state,
      song: state.next,
      next: undefined,
      playing: true,
      paused: false,
      playerAction: PlayerActionType.TOGGLE_CURRENT_NEXT_SONG
    };
  },
  [PlayerActionType.PLAY_SONG](
    state: PlayerReducerType,
    action: Action<PlaySongInterface>
  ): PlayerReducerType {
    return {
      ...state,
      starting: true,
      ...getRunningStatus('PLAY'),
      song: action.payload.song,
      next: action.payload.nextSong,
      timeElapsed: 0,
      duration: action.payload.song?.duration || 0,
      playerAction: PlayerActionType.PLAY_SONG
    };
  },
  [PlayerActionType.LOAD_NEXT_SONG](
    state: PlayerReducerType,
    action: Action<SongInterface>
  ): PlayerReducerType {
    return {
      ...state,
      next: action.payload,
      playerAction: PlayerActionType.LOAD_NEXT_SONG
    };
  },
  [PlayerActionType.SEEK_TO_SONG](
    state: PlayerReducerType,
    action: Action<SeekPositionInteface>
  ): PlayerReducerType {
    const { increase, seekTo } = action.payload;
    return {
      ...state,
      timeElapsed: !increase ? seekTo : Math.max(state.timeElapsed + seekTo, 0),
      playerAction: PlayerActionType.SEEK_TO_SONG
    };
  },
  [PlayerActionType.UPDATE_MASTER_VOLUME](
    state: PlayerReducerType,
    action: Action<number>
  ): PlayerReducerType {
    return {
      ...state,
      masterVolume: action.payload,
      playerAction: PlayerActionType.UPDATE_MASTER_VOLUME
    };
  },
  [PlayerActionType.UPDATE_ELAPSED_SONG](
    state: PlayerReducerType,
    action: Action<number>
  ): PlayerReducerType {
    return {
      ...state,
      timeElapsed: action.payload,
      playerAction: undefined
    };
  },
  [PlayerActionType.UPDATE_SONG_DURATION](
    state: PlayerReducerType,
    action: Action<number>
  ): PlayerReducerType {
    return {
      ...state,
      duration: action.payload,
      playerAction: undefined
    };
  },
  [PlayerActionType.TOGGLE_SHUFFLE](
    state: PlayerReducerType
  ): PlayerReducerType {
    return {
      ...state,
      shuffle: !state.shuffle,
      playerAction: PlayerActionType.TOGGLE_SHUFFLE
    };
  },
  [PlayerActionType.TOGGLE_REPEAT](
    state: PlayerReducerType
  ): PlayerReducerType {
    return {
      ...state,
      repeat: !state.repeat,
      playerAction: PlayerActionType.TOGGLE_REPEAT
    };
  },
  [PlayerActionType.TOGGLE_PLAYER](
    state: PlayerReducerType
  ): PlayerReducerType {
    return { ...state, expanded: !state.expanded, playerAction: undefined };
  },
  [PlayerActionType.PREV_SONG](state: PlayerReducerType): PlayerReducerType {
    return { ...state, playerAction: PlayerActionType.PREV_SONG };
  },
  [PlayerActionType.NEXT_SONG](state: PlayerReducerType): PlayerReducerType {
    return { ...state, playerAction: PlayerActionType.NEXT_SONG };
  },
  [PlayerActionType.LOADING](
    state: PlayerReducerType,
    action: Action<boolean>
  ): PlayerReducerType {
    return { ...state, starting: action.payload, playerAction: undefined };
  }
});
