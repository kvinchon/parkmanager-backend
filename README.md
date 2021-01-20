# parkmanager-backend
This repository is exclusively reserved for Blacksmith's back test, carried out with a purely pedagogical aim.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
This project is based on `Express.js` framework.

Make sure that `Node.js` is installed on your local machine. Binaries, installers, and source tarballs are available at <https://nodejs.org/en/download/>. 

### Installing
Clone this repository into a folder of your choice:
```bash
$ git clone https://github.com/kvinchon/parkmanager-backend.git && cd parkmanager-backend/
```

To load dependencies, run the following command: 
```bash
$ npm install
```

Create a `.env` file containing the database connection credentials and the secret key for authentication:
```
DB_HOST=MY_DB_HOST
DB_USER=MY_DB_USER
DB_PASSWORD=MY_DB_PASSWORD
DB_NAME=MY_DB_NAME
SECRET_KEY=MY_SECRET_KEY
```

Start the server by running the following command. By default, the server runs on port `8000`:
```bash
$ npm run dev
```

## API Authentication & Authorization
In order to access protected resources, you will need an access token, retrieved when the user logs in.
To access the protected resources, make sure you have the required role and add the following line in the request headers:
```
x-access-token: my-access-token
```

## API Documentation
Documentation for the latest Current release is available at <http://localhost:8000/api/documentation>.

## Authors
* **Kevin Vinchon** - *Initial work* - [kvinchon](https://github.com/kvinchon)
