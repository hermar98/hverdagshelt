# HverdagsHelt - Team 3

The application will reload on source changes.

## Node

After installing node you should be able to run these commands in your terminal

```sh
$ node --version
v0.10.24

$ npm --version
1.3.21
```

### Installing Node in OSX

Install HomeBrew using the following command:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Now run

```sh
brew install node 
```

### Installing Node in Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.


## Install

```sh
git clone https://gitlab.stud.idi.ntnu.no/trondjro/hverdagshelt---team-3.git
cd hverdagshelt---team-3
npm install
```

## Configure the 'env' file

Open the .env file and enter your database information under: 

DATA_BASE = hverdgashelt
DB_USERNAME = user
DB_PASSWORD = password
DB_HOST = localhost

## Client: run tests and start

From the top-level repository folder:

```sh
cd client
npm test
npm start
```

## Server: run tests and start

Prerequisite: mysql-server installed locally

From the top-level repository folder:

```sh
cd server
npm test
npm start
```

## Open application

http://localhost:3000
