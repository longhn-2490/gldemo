# React native graphql app

A demo app to demonstrate the usage of context api, custom hook, styled components, graphql,

## Key Features

```
- Detect network online/offline
- Change theme
- Login
- List products
- Add new product.
```

## Step 1: Config local server:

1. Access server folder

```bash
   cd gpserver
```

2. Init node modules

```bash
  npm install -save-dev --legacy-peer-deps
```

3. Run server

```bash
   node index.mjs
```

## Step 2: Run app

1. Access gldemo folder then install packages

```bash
   yarn install
```

2. Install ios dependency

```bash
   cd ios
   pod install
   cd ..
```

3. Run app

```bash
   yarn ios
```
