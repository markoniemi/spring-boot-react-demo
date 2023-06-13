## SpringBoot application with React UI

<a href="https://dev.azure.com/markoniemi/markoniemi/_build?definitionId=14">
<image src="https://dev.azure.com/markoniemi/markoniemi/_apis/build/status/markoniemi.spring-boot-react-demo?branchName=master"/>
</a>

A maven project which contains two modules, React frontend and SpringBoot backend. 

Frontend is built using maven-frontend-plugin, which installs node and npm and compiles react app to build dir. Maven-jar-plugin packages contents of build dir as maven compatible jar and publishes it to local maven repo.

Backend lists frontend as a dependency. WebConfig class add jar as a static resource and forwards requests to index.html. This enables direct access to react routes.

Integration tests are implemented in backend as JUnit Selenium tests. These test the frontend and backend together using memory only h2 database.

##### Build

Build and run integration tests with
<code>
mvnw install
</code>

##### Development setup

Start backend with
<code>
java -jar backend/target/backend-0.1-SNAPSHOT.jar 
</code>
or start ReactDemoApplication from Eclipse.

Start frontend with
<code>
node/npm run dev
</code>
in frontend directory

