# Authenticated Nginx API Gateway 🛡️
Secure API Gateway with Nginx, using authentication to access private microservices

## Description

The main idea is to bring a secure and efficient way to structure your microservices project, using Nginx as API Gateway and NodeJS for authentication service. 

![githubAIAssistant](https://github.com/pablovelasco99/auth-nginx-proxy/assets/58036351/b96a284c-72dc-4bc3-a861-7b4e78db0c00)

In this example, NodeJS authentication service is randomly accepting and rejecting requests to simply show how an authentication process works. For private microservices, it has been used an Express API, but feel free to use whatever you want.

## How it works

In the first and unique public layer, we have our Nginx service, wich routes our requests between the different services.

For each private service, we have to create a new entry in the **nginx.conf** file. In this case, all requests with **/gpt** will be route to **gptService**:

```
location /gpt/ {
  auth_request /auth;
  proxy_pass              http://gptService:3002/;
  proxy_set_header        Content-Length "";
  proxy_set_header        X-Original-URI $request_uri;
}
```

Nginx will redirect the request to auth service due to **_auth_request /auth_** line on location config.

For authentication service, the configuration file should be like as follows, depending on the name of our authentication service:

```
location /auth {
  internal;
  proxy_pass              http://nodeauth:3001/;
  proxy_set_header        Content-Length "";
  proxy_set_header        X-Original-URI $request_uri;
}
```

As told, NodeJS authentication service will randomly accept or reject incomming request. Depending on the response status, Nginx will reject the request or will pass it to our private **gptService**:

```js
app.get("/", (req, res) => {
  let x = Math.round(Math.random());
  if (x === 1) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});
```

## Usage instructions

First, we build the images.

```
> docker-compose build
[+] Building 26.3s (26/26) FINISHED
```

Then start the services
```
docker-compose up -d    
[+] Building 0.0s (0/0)
[+] Running 4/4
 ✔ Network auth-nginx-proxy_mynetwork       Created 
 ✔ Container auth-nginx-proxy-proxy-1       Started 
 ✔ Container auth-nginx-proxy-gptservice-1  Started 
 ✔ Container auth-nginx-proxy-nodeauth-1    Started
```
 
After running these commands, your services will be up and running, ready to be used.

## Usage Example

We made a request to our private **gtp** service, attacking **gpt/csv** endpoint:

If we do the same request twice, NodeJS auth service will randomly chose if the request is rejected or not.

```
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/gpt/v1/csv
401
```

```
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/gpt/v1/csv
200
````

---

Thanks for checking out my project! If you found it useful or interesting, I'd really appreciate it if you could give it a star on GitHub. Your support means a lot and helps me keep improving. Thanks a bunch! 😎

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%23FFDD00.svg?&style=for-the-badge&logo=ko-fi&logoColor=black)](https://www.buymeacoffee.com/pablovelasco)
