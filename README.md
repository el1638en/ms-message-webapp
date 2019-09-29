# MsMessageWebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Quality code - SonarQube

###  Code coverage

Add `"code-coverage": "ng test --code-coverage"` in `package.json` scripts session.

"scripts": {
    "code-coverage": "ng test --code-coverage"
}

Run `npm run code-coverage` to generate the code coverage.
You will see a `coverage` folder would have generated in your application root directory.

### Install Sonarqube

To install Sonarqube, [look at the official site.](https://docs.sonarqube.org/latest/setup/get-started-2-minutes/).


### Configure Sonarqube with Angular

To configure Sonar with Angular, we need `sonar-scanner` node package in the angular application.

To include this, install sonar-scanner with this command : `npm install sonar-scanner --save-dev`) 
or add `sonar-scanner` as `devDependencies` in the `package.json`.

"devDependencies": {
    "sonar-scanner": "^3.1.0"
}

Then, initialize  the configuration file `sonar-project.properties` to the root of the project

```
sonar.host.url=http://localhost:9000
sonar.login=admin
sonar.password=admin
sonar.projectKey=ms-message-webapp
sonar.projectName=ms-message-webapp
sonar.projectVersion=1.0
sonar.sourceEncoding=UTF-8
sonar.sources=src
sonar.exclusions=**/node_modules/**,**/*.spec.ts
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.typescript.tslintconfigpath=tslint.json
sonar.typescript.lcov.reportPaths=coverage/ms-message-webapp/lcov.info
```

### Integrate Karma code coverage with Sonarqube

Karma code-coverage and Sonar server are ready. Now, we will integrate both using sonar-scanner.
Add the script below in package.json.

"scripts": {
    "sonar": "sonar-scanner"
}

Finally, run command : `npm run sonar`.

Navigate to http://localhost:9000/projects and you will get the final result.

## Docker - Build docker image for the Angular Application

### [Dockerfile](https://docs.docker.com/engine/reference/builder/)

Create the docker file `Dockerfile` to the root of the project.

```shell
FROM nginx:1.17

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy dist to nginx website
COPY /dist/ms-message-webapp/ /usr/share/nginx/html
```

### Build docker image

Build the application by this command : `ng build --prod`.

Build the docker image in local registry : `docker image build -t ms-message-webapp:latest .`

```shell
Sending build context to Docker daemon  52.01MB
Step 1/3 : FROM nginx:1.17
1.17: Pulling from library/nginx
8d691f585fa8: Already exists 
5b07f4e08ad0: Pull complete 
abc291867bca: Pull complete 
Digest: sha256:922c815aa4df050d4df476e92daed4231f466acc8ee90e0e774951b0fd7195a4
Status: Downloaded newer image for nginx:1.17
 ---> 540a289bab6c
Step 2/3 : RUN rm -rf /usr/share/nginx/html/*
 ---> Running in e13e49302ff6
Removing intermediate container e13e49302ff6
 ---> 97744336846e
Step 3/3 : COPY /dist /usr/share/nginx/html
 ---> 84e2eba92c51
Successfully built 84e2eba92c51
Successfully tagged ms-message-webapp:latest
```

### Run docker container

`docker container run -it --network="host" -p 80:80 --name ms-message-webapp ms-message-webapp:latest`
