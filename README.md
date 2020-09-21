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
6. Run the containers. Be sure to change the Docker image tag names to match your repo. Run `docker-compose up` to just run the backend or `docker-compose -f docker-compose.yml -f docker-compose-nginx.yml up` to run the full stack.

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
3. Create a `.env` file in `ois/dist`
```
BUILD_TARGET=server
JWT_SECRET=eebilkitteh
DB_UNAME=databaseUserName
DB_PW=dontH4xMeBro
DOMAIN=mysite.com
```
4. Set the React App environment

- If you will push to a private docker repo, create a `.env.production` file in `react-client`
```
JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE
ROOT_URL=http://localhost:3000
IMG_HOST=http://localhost:3000/images/
```
- If using Docker Compose, you can append these env vars to the `.env` file for the backend

- If using the Docker run command use the `--env` switch for each variable or `--env-file` to specify the `.env` file.

- If using a service like vercel, set the variables in your project settings. Ignore the build warning about a missing `.env` file.

5. Run build scripts. Be sure to change the Docker image tags in each bash script.
```
cd express-server
bash build.bash
cd ../react-client
bash build.bash
```
6. Use rsync to copy the `dist` folder to the remote server
7. Get letsencrypt certs using [certbot](https://certbot.eff.org/docs/install.html) in standalone mode
8. Run `docker-compose up` for the backend or `docker-compose -f docker-compose.yml -f docker-compose-nginx.yml up` to run the full stack.

## Dev
1. Clone the repo
2. Run `docker-compose -f docker-compose-dev.yml up`

The development servers for both the React and Express apps will build and rebuild automatically

The React app will be at `http://localhost:8080`

The Mongoku DB admin app will be at `http://localhost:3100`
