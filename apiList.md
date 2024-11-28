# ApiList

## authRouter
- POST /signup
- POST /signin
- POST /signout

## profileRouter
- GET /profile/views
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed    - get the profile of othere users on the platform
