```js
import SliderRadioCard from "./index";
import '../../../theme/scss/_styles.scss';

<div className="card-station">
  <SliderRadioCard
    canEdit={true}
    data={[
      {
        image:
          'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png',
      },
      {
        image:
          'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/reb.jpg'
      }
    ]}
  />
</div>
```