# @rxdi/graphql-monorepo

## Install globally `bolt` and `yarn`

```bash
npm i -g @rxdi/bolt yarn
```

## Installing packages

```
npx bolt install
```

## Running whole stack

```bash
npx yarn start
```

## Queries

Create Linode

```graphql
mutation {
  createLinode(
    payload: {
      type: "g6-nanode-1"
      region: "eu-west"
      image: "linode/ubuntu18.04"
      root_pass: "12345RHTML"
      stackscript_id: 562974
    }
  ) {
    id
    label
    status
  }
}
```

Delete Linode

```graphql
mutation {
  deleteLinode(instanceId: "20098096") {
    label
    region
    image
  }
}
```

List Linodes

```graphql
query {
  listLinodes {
    data {
      id
      image
      label
    }
  }
}
```
