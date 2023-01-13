
### overwrites .env file
### before docker run: source runtimedocker-args.template.sh
### This sets the environment variables for the docker container


export REACT_APP_BACKEND="http://host.docker.internal:3000"
export REACT_APP_SUBMISSIONSERVER="http://localhost:55140"
export REACT_APP_COURSEID="java-wise2021"
export REACT_APP_CLIENTID="stmgmt-client"
export REACT_APP_AUTHORITY="http://host.docker.internal:8090"
export REACT_APP_REDIRECTURI="http://localhost:3000/redirect"