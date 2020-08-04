# Bifocl

clone repository: ``` git clone https://github.com/cartertune/WebApp-Boilerplate.git``` 
# Server

Dependencies:

- node: https://nodejs.org/en/download/
- yarn: ```brew install yarn```
- serverless: ```yarn global add serverless```

In order to run serverless commands that interface with AWS, you will need to setup your AWS account credentials with their CLI:
https://serverless.com/framework/docs/providers/aws/guide/credentials/


To run server:
- ```cd server```
- ```yarn add```
- to build: ```yarn tsc```
- to deploy locally: ```yarn dev```
- to deploy remotely: ```yarn deploy```

# Webclient

To run webclient:
- ```cd webclient```
- ```yarn add```
- ```yarn start```
