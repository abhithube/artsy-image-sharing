# Artsy Image Sharing

Artsy is a full-stack web application that allows users to upload images, browse all uploaded content, and leave feedback on other users' posts.

The app, hosted on Heroku, can be found at https://artsy.abhithube.com. The GraphQL playground for testing queries and mutations can be found at https://artsy.abhithube.com/playground

## Tech Stack

- TypeScript
- Node.js
- React
- Express
- GraphQL
- PostgreSQL
- Redis

## Features

- Upload images up to 5MB in size
- Create an account, and choose an avatar
- Browse featured posts, or the entire library of posts
- Add comments to posts
- Add posts to your favorites
- View other users' artist profiles
- Dark mode support :)

## Todo

- Add React functionality to edit/delete profile, posts, comments
- Improve responsive design

## How It Works - Frontend

The frontend is built in React and TypeScript. Data fetching, caching, and prefetching is handled by the `react-query` library. GraphQL queries and mutations are written in `.graphql` files, and the `graphql-codegen` library parses them and generates the necessary typings to be used in React components. The `react-query` plugin for the codegen library also creates custom React hooks for executing each query and mutation.

Images are hosted on Cloudinary and cached on their CDN. Cloudinary's URL-based transformation API is used to resize and manipulate the requested images in order to optimize performance.

## How It Works - Backend

The backend is built in Node.js, TypeScript, and Express. The API is designed using the GraphQL specification, as opposed to REST. Type definitions are written in `.graphql` files, which are parsed by the `graphql-codegen` library to generate TypeScript definitions to be used in the resolver implementations. This library allows for types and resolvers to be separated, while still having a single source of truth. The `graphql-tools` library creates the schema, and `express-graphql` creates the GraphQL server.

Data is stored in a PostgreSQL database. The Prisma ORM is used to programatically interact with the database. A `schema.prisma` file contains the schemas for each entity, which is used by the Prisma CLI to generate the necessary typings as well as the Prisma client for executing queries. Creating and applying migrations are also handled by the Prisma CLI.

Session-based authentication with username/password login is the authentication stategy of choice. The `express-session` library creates and manages user sessions using a Redis session store. The user's session identifier is stored in a cookie and sent to the server on every request.

## Development Setup

Local development consists of Dockerized PostgreSQL and Redis instances. A `docker-compose.yml` file configures both databases, and sets up a volume to persist PostgreSQL data after container shutdown. The GraphQL Playground provides a clean and simple GUI for designing queries and mutations.

## Production Setup

The full-stack application is deployed to Heroku, either by CLI or pushing to the main branch on GitHub. Heroku-managed instances of PostgreSQL and Redis were provisioned to mininize self-management/maintenance. The React web application is served by the Express server as a bunch of static files and assets.
