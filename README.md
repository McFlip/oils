# oils
YL oils DB

## Prereq
Install docker-compose and add yourself to the docker group. MongoDB recommends the XFS file system. You can create an XFS partition and mount it to `/var/lib/docker`.

User accounts and logins are handled with JSON Web Tokens. Until OAuth is implemented, JWTs are created manually [here](https://jwt.io). 

## Get the release
1. Go to the [release](https://github.com/McFlip/oils/releases) page and download the attached TAR file.
2. Alternately, use curl.
3. Extract `tar xvzf deploy.tar.gz`
4. Create a `.env` file in the `oils` folder with creds for the database and the JWT secret
```
DB_UNAME=databaseUserName
DB_PW=dontH4xMeBro
DB_ADMIN_UNAME=admin
DB_ADMIN_PW=adminpw123
JWT_SECRET=eebilkitteh
```
5. Set up the database - see bellow.
6. Run the containers `docker-compose up` or `docker-compose -f docker-compose-back.yml` to just run the backend.

## MongoDB Deployment
The development setup `docker-compose-dev` uses root access without a password.
The production compose file enables authentication with username & password using the app database as the auth db.
The app database is named `mean-docker`.

Create the DB container and set up the admin and app accounts
```
docker-compose start database
docker exec -it mongo-db mongo
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: passwordPrompt(),
    roles: [
      {
        "role" : "userAdminAnyDatabase",
        "db" : "admin"
      },
      {
        "role" : "root",
        "db" : "admin"
      },
      {
        "role" : "readWriteAnyDatabase",
        "db" : "admin"
      }
	  ]
  }
)
db.auth("myUserAdmin", passwordPromp())
use mean-docker
db.createUser(
  {
    user: "appUser",
    pwd: passwordPrompt(),
    roles: [ { role: "readWrite", db: "mean-docker" } ]
  }
)
```
Exit the mongo-shell with `ctrl+d` or `exit`.
Read the README and load the database from the dump called `init`.
```
bash load.bash init
```

## BUILD
1. Clone the source code
2. Go to [jwt](https://jwt.io) to generate a token for the next 2 steps
3. Create a `.env.production` file in express-server
```
BUILD_TARGET=server
JWT_SECRET=eebilkitteh
DB_UNAME=databaseUserName
DB_PW=dontH4xMeBro
```
4. Create a `.env.production` file in react-client
```
JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE
ROOT_URL=http://localhost:3000
IMG_HOST=http://localhost:3000/images/
```
5. Run build scripts
```
cd express-server
bash build.bash
cd ../react-client
bash build.bash
```
6. Run `docker-compose up`
7. Open a browser to `http://localhost`