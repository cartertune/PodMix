# PosseMix

A collaborative app for mixing music. 

# Server
You will need config files from Carter for this to work. If you think you should have these and dont, message him. 

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
