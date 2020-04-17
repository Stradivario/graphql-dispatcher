# @graphql/dispatcher

### Installing dispatcher

#### Prerequires `docker`

```bash
snap install docker
```

or

```bash
apt-get install docker.io
```

#### Download binary

```bash
wget https://github.com/Stradivario/graphql-dispatcher/raw/master/dist/dispatcher-linux
```

#### Give it permission to execute

```bash
chmod +x dispatcher-linux
```

#### Start it

```bash
./dispatcher-linux
```

#### Advanced arguments

Connect it to pubsub server

```bash
./dispatcher-linux --wss  wss://my-graphql-server/subscriptions
```

### Environment variables

Graphql Pubsub Uri

```bash
GRAPHQL_RUNNER_SUBSCRIPTION_URI='wss://my-pubsub.com/subscriptions';
```

Graphql Pubsub secret key

```bash
GRAPHQL_RUNNER_SECRET_KEY='Bareer my-token';
```

Graphql Pubsub API_PORT (When Secret and subscription uri are provided API is removed from application)

```bash
API_PORT='42042';
```
