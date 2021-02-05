# Work -tools

This is a web application that gives a UI platform to automation APIs for subscriber on-boarding of various services \
Successful login should show the dashboard in the image below

![application infrastructure diagram](https://github.com/dy9amix/antamedia/blob/main/antamedia.png?raw=true)

# Running the web application locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To see the dashboard change the isSignedIn state on App.js to true

```javascript
 const [isSignedIn, setisSignedIn] = useState(true)
 ```

## Deploying the web application to production

## Docker 

Go to the root directory of the run repo and run the command

```bash
sudo docker build -t work-tools .
```

After the docker image build is finish deploy it to a container 

```bash
sudo docker run -it -d -p 80:80 work-tools
```

Go to your application on the container with the url

### `http://{your_server_ip}`

## Kubernetes

To deploy on kubernetes ensure you have self-hosted registers enable on the kubernetes node you intend to use \ 

Build the application image on docker registry

```bash
docker build . -t localhost:32000/work-tools:registry
```

Push the docker image to kubernetes registry

```bash
docker push localhost:32000/work-tools:registry
```

Deploy image to kubernetes

```
kubectl apply -f Deployment.yaml
```

[Optional] Assign extenal IP to the kubernetes pod

```bash
kubectl patch svc work-tools -p '{"spec":{"externalIPs":["x.x.x.x"]}}'
```