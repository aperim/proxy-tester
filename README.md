# Proxy Tester 🚀

Welcome to Proxy Tester! Proxy Tester is written in TypeScript and Node.js and is primarily intended to assist in testing the intermediary proxies and their ability to pass HTTP status and other header information back to a client.

## Features

1. Handles every valid HTTP status code from 100-599 for testing.
2. For request `/<statuscode>`, responds with the corresponding status code, the type of the status code, client's IP and headers sent by the client.
3. For status codes in the 300 range, redirects to `/redirected/<statuscode>` and responds with client's IP and headers sent by the client.
4. Provides detailed debug logs for incoming request IPs and User-Agents.
5. Uses automated GitHub Actions Workflows to build and push docker images to GitHub Container Registry.

## Running locally

Before we get started, make sure you have Node.js (preferably the latest version) installed. You will also need to have `yarn` installed.

### Clone the repository

First, clone this repository to your local machine. Use the following command to clone it using HTTPS:

```bash
git clone https://github.com/aperim/proxy-tester.git
```

Once you've cloned the repository, navigate to the project root:

```bash
cd proxy-tester
```

### Install dependencies

Open Terminal, change to the project directory (i.e., `proxy-tester`), and execute the following command to install the project dependencies:

```bash
yarn install
```
### Build the application

To build application execute the following command:

```bash
yarn build
```

Build results will be output to a `build/src` directory in the root of the project.

### Run the application

To run the built application use:

```bash
yarn start
```

The server will start running on port 3000 and is accessible at http://localhost:3000

### Docker

This project comes equipped with a `Dockerfile` for building a Docker image of the app, and can be built with Docker running using the following command:

```bash
yarn container:build
```

## GitHub Actions Workflows

This repository uses automated GitHub Actions Workflows to automatically run tests and build a Docker image whenever code is pushed to the repository. It also labels and pushes the Docker image to GitHub Container Registry.

## Contributing

Whether you notice a bug, want to add a feature, or even improve the README, we would appreciate it if you could create an issue so that we could discuss the changes further.

## License

Licensed under the MIT license.