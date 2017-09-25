# RH Quizz

## Getting started 
- Clone the project from github 
```bash
git clone git@https://github.com/sqli/quizz-rh.git  
cd rh-quizz
 ```
- Install a local [MongoDB](https://docs.mongodb.com/manual/installation/) or connect to an existing database using [application.yml](server/src/main/resources/application.yml)

## Launching 
### Back
Spring Boot / MongoDB
```bash
cd server
mvn package
java -jar target/rh-quizz-1.0-SNAPSHOT.jar
```
You can check [http://localhost:8080](http://localhost:8080) to see Hal browser  
Authenticate using user/*spring random password*

### Front
React JS  
```bash
npm install
npm install -g gulp
npm start
```
You can check [http://localhost:3000](http://localhost:3000) to use the application !  
In dev environnment, a proxy is set between the React and the Spring applications. 

## Build and deploy
    - npm run build
    - gulp deploy

## Link
- [demo](http://rh-quizz.comite-technique.static.toulouse.sqli.com/)
- [auth](.user.passwd)
- [Rh login](client.config.prod.json)
- [Admin logon](client.config.prod.json)