# Getting Started

## Step 1: Config local server

1. Tạo thư mục mới cho server:

```bash
   mkdir graphql-server
   cd graphql-server
```

2. Khởi tạo npm package:

```bash
     npm init -y
```

3. Cài đặt các gói cần thiết:

```bash
     npm install express graphql express-graphql uuid
```

4. Tạo file index.js chứa code
5. Chạy server:

```bash
   node index.js
```

## Step 2: Cấu hình GraphQL Client với urql trong app

add các package cần thiết và xem doc dưới
https://commerce.nearform.com/open-source/urql/docs/basics/react-preact/

1. Cài đặt các gói cần thiết:

```bash
   npm install express graphql express-graphql uuid --legacy-peer-deps
    "@urql/exchange-graphcache": "^7.1.2",
    "codegen": "^0.1.0",
    "express": "^4.19.2",
    "graphql-codegen": "^0.4.0",
    "graphql-ws": "^5.16.0",
    "urql": "^4.1.0"

```

2. Add urql

```bash
   npm install --save urql
```

3. Tạo file client.ts

```bash
   const client = new Client({
  url: 'http://localhost:3000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});
```

4. Tạo các Truy vấn và Mutation
   Tạo file queries.ts
5. Cập nhật file cấu hình codegen.ts, sau đó
   update script trong package.json
   "scripts": {
   "codegen": "graphql-codegen",
   },
   sau đó

```bash
   npm run codegen
```

6. Sử dụng GraphQL Client
