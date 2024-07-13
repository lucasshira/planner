# Plann.er

Plann.er is a project developed in TypeScript using Node.js with Fastify and Prisma as the ORM, connected to a SQL database.

## Overview

Plann.er is an app designed to help organize and plan trips, allowing users to create, confirm trips and invite their friends easily.

## Technologies Used

- **Node.js**
- **TypeScript**
- **Fastify**
- **Prisma**
- **SQL**
- **Zod**


## Getting Started

To get started with Pass In Web, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/lucasshira/planner.git
   ```
   
2. Navigate to the project directory:

   ```bash
   cd planner
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables. Create a .env file in the root of the project with the following content:

   ```bash
    DATABASE_URL="file:./dev.db"
    API_BASE_URL="http://localhost:3333"
    WEB_BASE_URL="http://localhost:3000"
    PORT="3333"
   ```

## Prisma Migrations

1. Create the database migrations:

   ```bash
   npx prisma migrate dev
   ```
   
2. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

## Running the Project

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Access the application at http://localhost:3333


