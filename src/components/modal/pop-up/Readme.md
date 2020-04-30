PopUpModal example:

```js
import PopUpModal from "./index";
import { Provider } from "react-redux";
import { store } from "../../../store";
import "../../../theme/scss/components/_pop-up.scss";

<Provider store={store}>
  <PopUpModal header={"PREMIUM FEATURES"}>
    <p>Modal example</p>
  </PopUpModal>
</Provider>;
```
