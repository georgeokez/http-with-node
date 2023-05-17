The curl commands used:

```
curl http://localhost:8080/metadata\?id\=1

curl -H "Authorization: Bearer 123456"  http://localhost:8080/metadata\?id\=1


The curl command used:

```

curl --header Content-Type:application/json --request POST --data @MOCK_DATA.json http://localhost:8080

```



The curl command used, when called from inside this directory:

```

curl --header Content-Type:application/json --request POST --data '{"userName": "armen"}' http://localhost:8080

curl --header Content-Type:application/json --request POST --data '{"userName": "armen"}>' http://localhost:8080

```


The command used for generating self-signed certificates:

```

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -subj "/"

```

```
