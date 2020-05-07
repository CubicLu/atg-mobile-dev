ToastComponent example:

```js
import React from 'react';
import ToastComponent from './';
import '../../theme/scss/components/_toast.scss';

const [isOpen, setIsOpen] = React.useState(false);

<>
  <button onClick={() => setIsOpen(true)}>show</button>
  <ToastComponent
    clickId={"toastClick"}
    showToast={isOpen}
    clickHandler={() => console.log("click")}
    message={'<span>Added to your <a href="#" id="toastClick">VAULT</a></span>'}
    hideToast={() => setIsOpen(false)}
    classNames={"custom-toast"}
  />
</>;
```
