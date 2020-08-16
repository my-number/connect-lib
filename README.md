# Mynaconnect Client Library

The easiest way to interact with mynumber card.

## How to use

### Load Library
#### via <script>
```html
<script src="https://mynaconnect-lib.netlify.app/mynaconnect.js">
```

This source addres will change in the near future.

#### via ESModule import

```js
import { Popup } from "mynaconnect"
```


### Example

```js
const popup = new mynaconnect.Popup({
    appName: "Test Application"
});
popup.open("signWithAuth", { sigHash: "00" })
popup.getResult().then(result=>{
    console.log(result.success, result.cert, result.sig)
})
```

## Build

```sh
npm install
npm run build
```

## Try / Development

```sh
npm run dev  # will automatically open web browser
```
