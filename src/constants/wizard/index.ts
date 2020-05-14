import { QuestionIdType } from '../../types';
import { QuestionsWizardInterface } from '../../models';

export const wizardQuestions: QuestionsWizardInterface[] = [
  {
    id: QuestionIdType.WHAT_REAL_NAME,
    type: 'text',
    question:
      "What's up Rosetta! Help us to create a brief bio for you. || What is your real name? (This will only be visible to your friends)"
  },
  {
    id: QuestionIdType.IDENTIFY_GENDER,
    type: 'multi-option',
    question: 'How do you best identify your gender?',
    options: [
      {
        description: 'Male',
        value: 'male'
      },
      {
        description: 'Female',
        value: 'female'
      },
      {
        description: 'Human',
        value: 'human'
      }
    ]
  },
  {
    id: QuestionIdType.IDENTIFY_GENDER_MALE,
    dependsOn: {
      id: QuestionIdType.IDENTIFY_GENDER,
      value: 'male'
    },
    type: 'multi-option',
    question: 'Which of these do you prefer as your gender reference?',
    options: [
      {
        description: 'Dude',
        value: 'dude'
      },
      {
        description: 'Guy',
        value: 'guy'
      },
      {
        description: 'Boy',
        value: 'boy'
      },
      {
        description: 'Cowboy',
        value: 'cowboy'
      },
      {
        description: 'Male',
        value: 'male'
      },
      {
        description: 'Alpha Male',
        value: 'alpha-male'
      }
    ]
  },
  {
    id: QuestionIdType.IDENTIFY_GENDER_FEMALE,
    dependsOn: {
      id: QuestionIdType.IDENTIFY_GENDER,
      value: 'female'
    },
    type: 'multi-option',
    question: 'Which of these do you prefer as your gender reference?',
    options: [
      {
        description: 'Dudette',
        value: 'dudette'
      },
      {
        description: 'Chick',
        value: 'chick'
      },
      {
        description: 'Girl',
        value: 'girl'
      },
      {
        description: 'Babe',
        value: 'babe'
      },
      {
        description: 'Woman',
        value: 'woman'
      },
      {
        description: 'Female',
        value: 'female'
      }
    ]
  },
  {
    id: QuestionIdType.WHAT_HOME_TOWN,
    question: 'What is your hometown? (City and state/province, please)',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_HIGH_SCHOOL,
    skip: true,
    skipText: 'I didn’t attend high school',
    question: 'What high school(s) did you attend?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHERE_DID_YOU_GO_COLLEGE,
    skip: true,
    skipText: 'I didn’t attend college',
    question: 'Where did you go to college?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_CITY_AND_STATE_LIVE_CURRENTLY,
    question: 'What city and state do you live in currently?',
    type: 'text'
  },
  {
    id: QuestionIdType.ARE_YOU_MUSICIAN,
    question: 'Are you a musician?',
    type: 'multi-option',
    options: [
      {
        description: 'Yes',
        value: 'yes'
      },
      {
        description: 'No',
        value: 'no'
      }
    ]
  },
  {
    id: QuestionIdType.ARE_YOU_MUSICIAN_YES_WHAT_DO_YOU_PLAYER,
    dependsOn: {
      id: QuestionIdType.ARE_YOU_MUSICIAN,
      value: 'yes'
    },
    question: 'Sweet! What do you play?',
    type: 'text'
  },
  {
    id: QuestionIdType.ARE_YOU_MUSICIAN_YES_WHAT_WANT_LEARN_PLAY,
    dependsOn: {
      id: QuestionIdType.ARE_YOU_MUSICIAN,
      value: 'yes'
    },
    question: 'What do you want to learn to play?',
    type: 'text'
  },
  {
    id: QuestionIdType.ARE_YOU_MUSICIAN_YES_WHEN_DID_START_PLAYING_MUSIC,
    dependsOn: {
      id: QuestionIdType.ARE_YOU_MUSICIAN,
      value: 'yes'
    },
    question: 'When did you start playing music?',
    type: 'text'
  },
  {
    id: QuestionIdType.ARE_YOU_MUSICIAN_YES_DO_PLAY_PROFESSIONALLY,
    dependsOn: {
      id: QuestionIdType.ARE_YOU_MUSICIAN,
      value: 'yes'
    },
    question: 'Do you play (or have you ever played) professionally?',
    type: 'text'
  },
  {
    id: QuestionIdType.COULD_THREE_GENRES_STYLE_ERAS_OF_MUSIC,
    skip: true,
    question:
      "Play 20 questions to help your new friends learn more about you! Answer any 20. || Plead the fifth (skip) any questions you don't want to answer. || Alright, let's get into some music! || If you could only listen to three genres/style/eras of music, what would they be? (in order of favorite)",
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_WERE_YOUR_EARLIEST_MUSICAL_INFLUENCES,
    skip: true,
    question: 'What were you earliest musical influences?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_FAVORITE_BANDS_ARTISTS_MUSICAL_INFLUENCES,
    skip: true,
    question:
      'What are your favorite bands/artists/musical influences of all time?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_ALBUMS_CHANGED_YOUR_LIFE,
    skip: true,
    question: 'What albums changed your life?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_IS_YOUR_GUILTY_PLEASURE_MUSIC,
    skip: true,
    question:
      'What is your "guilty pleasure" music? (We\'re talking the music you secretly love, but won\'t admit in public!)',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_IS_MOST_UNUSUAL_MUSIC_YOU_LIKE,
    skip: true,
    question: 'What is the most unusual music you like?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_CITY_COUNTRY_BEST_LOCAL_MUSIC_SCENE,
    skip: true,
    question: 'What city/country has the best local music scene?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_ARE_YOUR_FAVORITE_FESTIVALS,
    skip: true,
    question: 'What are your favorite festivals?',
    type: 'text'
  },
  {
    id: QuestionIdType.FIRST_CONCERT_FESTIVAL_I_AM_GOING_IS,
    skip: true,
    question:
      'As soon as we get out of lockdown, the first concert/festival I am going to is...',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_WAS_FIRST_CONCERT,
    skip: true,
    question: 'What was your first concert?',
    type: 'text'
  },
  {
    id: QuestionIdType.I_LISTEN_MUSIC_MOST_WHEN,
    skip: true,
    question: 'Finish this statement: I listen to music most when....',
    type: 'text'
  },
  {
    id: QuestionIdType.DESCRIBE_FIRST_TIME_BACKSTAGE,
    skip: true,
    question: 'Describe your first time going backstage',
    type: 'text'
  },
  {
    id:
      QuestionIdType.WHAT_WAS_MOST_MEMORABLE_EXPERIENCE_MEETING_ARTIST_BACKSTAGE,
    skip: true,
    question:
      'You’re doing good… a few more to go. || Let’s get a little more personal – well, not that personal! ||What was your most memorable experience meeting an artist backstage?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHEN_I_AM_NOT_LISTENING_TO_MUSIC_I_AM,
    skip: true,
    question: 'Finish this statement: when I am not listening to music I am ….',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_ARE_YOUR_FAVORITE_COUNTRIES_YOU_HAVE_VISITED,
    skip: true,
    question: 'What are your favorite countries you have visited? ',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_LANGUAGES_DO_YOU_SPEAK,
    skip: true,
    question: 'What languages do you speak?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_FOOD_CANT_YOU_LIVE_WITHOUT,
    skip: true,
    question: 'What food can’t you live without?',
    type: 'text'
  },
  {
    id: QuestionIdType.MY_FAVORITE_BOOKS_ARE,
    skip: true,
    question: 'My favorite books are:',
    type: 'text'
  },
  {
    id: QuestionIdType.MY_FAVORITE_MOVIES_ARE,
    skip: true,
    question: 'My favorite movies are:',
    type: 'text'
  },
  {
    id: QuestionIdType.MY_FAVORITE_VIDEOGAMES_ARE,
    skip: true,
    question: 'My favorite videogames are:',
    type: 'text'
  },
  {
    id: QuestionIdType.MY_FAVORITE_WORD_IS,
    skip: true,
    question: 'My favorite word is:',
    type: 'text'
  },
  {
    id: QuestionIdType.MY_FAVORITE_COLOR_IS,
    skip: true,
    question: 'My favorite color is:',
    type: 'text'
  },
  {
    id: QuestionIdType.MY_FAVORITE_ANIMAL_IS,
    skip: true,
    question: 'My favorite animal is:',
    type: 'text'
  },
  {
    id:
      QuestionIdType.WHAT_IS_THE_BIGGEST_CHALLENGE_IN_LIFE_THAT_YOU_HAVE_OVERCOME,
    skip: true,
    question: 'What is the biggest challenge in life that you have overcome?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_DO_YOU_WANT_TO_BE_WHEN_YOU_GROW_UP,
    skip: true,
    question:
      'What do you want to be when you grow up? If you are already grown up, what do you wish you would have become?',
    type: 'text'
  },
  {
    id: QuestionIdType.WHAT_DO_YOUR_FRIENDS_ALL_HAVE_IN_COMMON,
    skip: true,
    question: 'What do your friends all have in common?',
    type: 'text'
  }
];
