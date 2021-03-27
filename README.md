# crm4finance

## Project setup
```
npm install
```
* create new project on Firebase
* enable authentication by Email/Password
* create a database with next "rules": 
```
{ 
  ".read": "auth != null", 
  ".write": "auth != null" 
}
```
* create .env.local file
* create Web application and paste Firebase config in .env.local file:
```
VUE_APP_apiKey=yourApiKeyStringWithoutQuotes
VUE_APP_authDomain=yourApp.firebaseapp.com
...
```
* get api key from https://free.currencyconverterapi.com/ and save it in .env.local as VUE_APP_currconv_apiKey
* add app title in .env.local ```VUE_APP_TITLE = crm4finance```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
