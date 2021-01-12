# Dots and boxes

Dots and boxes is a game created using React and Redux as client side and Node.js(Express.js) as server side.
For db was used PostgreSQL. 

## Installation

Clone repo https://github.com/Allonsy22/stick-game.git;

_client_
```
cd client && npm install
```
_server_
```
cd server && npm install
```
_database_
```
Install db from official web page: https://www.postgresql.org/
```
## Usage
_client folder_
```
npm start
```
_server folder_
```
npm run dev
```

## Configs schema
_auth.config.js_
```
module.exports = {
  secret: "your-super-secure-key",
};
```
_db.config.js_
```
module.exports = {
  HOST: "your-host",
  USER: "user-name",
  PASSWORD: "user-password",
  DB: "db-name",
  dialect: "db-dialect",
  PORT: "port",
};
```

_email.config.js_
```
for quickemailverification library
module.exports = {
  API_KEY: 'email-api-key',
};
```

## License
[MIT](https://choosealicense.com/licenses/mit/)