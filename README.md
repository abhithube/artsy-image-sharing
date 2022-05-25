# Artsy Image Sharing

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m791863761-8263eb6a3f4716b2a32ed73e)

Artsy is a full-stack web application that allows users to upload images, browse all uploaded content, and leave feedback on other users' posts.

The app, hosted on AWS, can be found at https://artsy.abhithube.com.

_IMPORTANT: To minimize server costs, the underlying EC2 instance on AWS is only running from 9 am to 5 pm._

## Tech Stack

- TypeScript
- Node.js
- React
- GraphQL
- PostgreSQL
- Redis
- AWS

## Features

- Create an account, and choose an avatar
- Browse featured posts, or the entire library of posts
- Upload images up to 5MB in size
- Add comments to posts, or add posts to your favorites
- View user profiles, which list a user's uploaded and favorited posts

## How It Works - Frontend

The frontend is built in React and TypeScript, using a custom build process. `Babel` compiles the Typescript and ES6+ code into the backwards-compatible version of JS that common web browsers can interpret. `Webpack` is used to bunde the compiled JS. In development, all of the code and dependencies are bundled into a single file, which is served by webpack-dev-server. Hot module replacement is also configured in development, which allows updates to React components to be reflected immediately, without resetting the state of the DOM. In production, the application and dependencies are minified and bundled separately.

Data fetching, caching, and prefetching is handled by the `Apollo Client` GraphQL library. Routing is done by `React Router`, and styling is taken of by `Tailwind CSS`.

## How It Works - Backend

The backend is built in Node.js, TypeScript, and Express. The API is designed according the GraphQL specification, as opposed to REST. Type definitions are written in _.graphql_ files, which are parsed by the graphql-codegen library to generate TypeScript definitions to be used in the resolver implementations. The graphql-tools library creates the schema, and `Apollo Server` fires up a GraphQL server using the `Express` web framework. Express is necessary because its middleware functionality enables access to the request/response lifecyle, which is useful for things such as attaching cookies to the response or verifying authentication status on every request.

Data is stored in a `PostgreSQL` database. The `Prisma` ORM is used to programatically interact with the database. A _schema.prisma_ file contains the schemas for each entity, which is used by the Prisma CLI to generate the necessary typings as well as the Prisma client for executing queries. Creating and applying migrations are also handled by the Prisma CLI.

Session-based authentication with username/password login is the authentication stategy of choice. The express-session library creates and manages user sessions using a `Redis` session store. The user's session identifier is stored in a cookie and sent to the server on every request.

## Production Setup

The full-stack application is deployed on AWS, specifically the Elastic Beanstalk platform. This means that AWS itself manages/mantains the underlying EC2 instances and simplifies the configuration process, while still providing full control over the EC2 instances.

The _.ebextensions_ directory contains AWS infrastructure configuration, such as setting up auto-scaling and enabling the HTTPS port on the EC2 instances. The _.platform_ directory contains the build/deploy hooks responsible for initializing the application before starting the production server.

Besides building the source code and applying any pending database migrations, the most important piece of configuration is setting up TLS on the EC2 server. A certificate issued by the AWS certificate manager can only be attached to a load balancer, not to an EC2 instance itself. So, configuring HTTPS had to be done manually. This project uses the Certbot CLI utility to obtain a certificate from the Let's Encrypt certificate authority and attaches it to the nginx reverse proxy sitting in front of the application.
