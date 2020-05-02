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
./dispatcher-linux --wss  wss://my-graphql-server/subscriptions --secret mySecretToken
```

```bash
./dispatcher-linux --port 42042 --graphiql true
```

Define Type of runner

```bash
./dist/dispatcher-linux --wss wss://my-graphql-server/subscriptions --runner-type runner
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
GRAPHQL_RUNNER_API_PORT='42042';
```

### Subscriptions query which this machine is subscribed

```graphql
subscription($machineHash: String!) {
  registerInstance(machineHash: $machineHash) {
    command
    args
  }
}
```

### Server subscription endpoint

```ts
  @Type(
    new GraphQLObjectType({
      name: 'InstanceConnectionType',
      fields: {
        command: {
          type: GraphQLInt,
        },
        args: {
          type: GraphQLString,
        },
      },
    }),
  )
  @Subscribe(
    withFilter(
      (self: InstanceController) =>
        self.pubsub.asyncIterator(InstanceCommandsChannel),
      async (event: InstanceEventType, unk, args: InstanceEventType) => {
        if (args.machineHash === event.machineHash) {
          console.log(
            `
[RegisterInstance]
  NetworkInterfaces:
  MachineHash: "${args.machineHash}"
  Event: "instance-notification"
  Command: ${InstanceCommandsEnum[event.command]}
  Arguments: ${event.args}
[RegisterInstance]
            `,
          );
        }
        return args.machineHash === event.machineHash;
      },
    ),
  )
  @Subscription({
    machineHash: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  registerInstance(event: InstanceEventType) {
    return event;
  }

```

### Visual Studio Code endpoints

```graphql
query listDockerContainers {
  listDockerContainers {
    code
    data
    error
  }
}
query inspectDocker {
  inspectDocker(specifier: "my-vs-code") {
    code
    data
    error
  }
}

query startVsCode {
  startVsCode(
    specifier: "my-vs-code"
    ports: ["9000:9000", "80:8443"]
    password: "12345"
    folder: "project"
  ) {
    code
    data
    error
  }
}

query removeVsCode {
  removeVsCode(specifier: "my-vs-code") {
    code
    data
    error
  }
}
```

```bash
./runner-linux --wss wss://my-graphql-server/subscriptions --runner-type runner --secret secret --label mylabel --systemctl true --systemctl-name runner --systemctl-description 'Graphql pubsub runner' --systemctl-executable 'dispatcher-linux' --send-response-to-server
```
