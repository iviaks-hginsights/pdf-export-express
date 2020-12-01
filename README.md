# How to use?

1. Install packages via yarn (or npm): `yarn` or `npm install`
1. Fetch containers: `docker-compose pull`
1. Run containers: `docker-compose up -d`
1. Run application

# How to run application?

```bash
node main.js your-token
```

# How to use it with staging?

## Change BASE_URL

```js
const BASE_URI = `https://platform-staging.hginsights.info`;
// const BASE_URI = `http://192.168.229.251:3000`;
```

## Change company path

```js
// await driver.get(`${BASE_URI}/company/51957769/full`);
await driver.get(`${BASE_URI}/company/51957769/companyview`);
```
