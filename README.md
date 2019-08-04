# oils
YL oils DB

## BUILD
1. Clone the source code
2. Go to [jwt](https://jwt.io) to generate a token for the next 2 steps
3. Create a `.env` file in express-server
```
BUILD_TARGET=server
JWT_SECRET=eebilkitteh
```
4. Create a `.env` file in react-client
```
JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE
ROOT_URL=http://localhost:3000
IMG_HOST=http://localhost:3000/images/
```
5. Run `npm build` in express-server and react-client
6. Run `docker-compose build`
7. Run `docker-compose up`
8. Open a browser to `http://localhost:8080`