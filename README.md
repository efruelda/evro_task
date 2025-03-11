# Project Setup and Execution Guide

This document provides instructions on setting up and running the project, which includes a backend (evro_be_todo) and a frontend (evro_fe_todo). You can choose to run these services using Docker or directly with Node.js.

## Prerequisites

Before proceeding, ensure you have the following installed:

- **Docker** (if using Docker)
- **Node.js** (if running directly with Node.js)
- **npm** (Node Package Manager, usually installed with Node.js)

## Docker Setup (Recommended for MySQL)

This project uses Docker to manage MySQL and optionally run the backend and frontend services.

### Installing Docker

1. **Download Docker Desktop:** Visit the [Docker website](https://www.docker.com/products/docker-desktop) and download the appropriate version for your operating system.
2. **Install Docker Desktop:** Follow the installation instructions provided on the website.

### Running with Docker Compose

1. **Navigate to the Project Root:** Open your terminal and navigate to the root directory of your project.
2. **Start the Services:** Run the following command to start the services defined in `docker-compose.yml`:

   ```bash
   docker-compose up -d

This command will build the Docker images (if necessary), create the containers, and start them in detached mode (-d).

Note: By default, docker-compose.yml is configured to run `MySQL`. You can uncomment the sections for `evro_be_todo` and `evro_fe_todo` to run them in Docker as well.

### Running with Node.js (Alternative)
If you prefer to run the backend and frontend directly with Node.js, follow these instructions.

### Installing Node.js

1. **Download Node.js**: Visit the [NodeJS](https://nodejs.org/en) website and download the LTS (Long Term Support) version for your operating system.

2. **Install Node.js**: Follow the installation instructions provided on the website.

### Backend Setup (evro_be_todo)
1. **Navigate to the Backend Directory**: Open your terminal and navigate to the evro_be_todo directory.

2. **Install Dependencies**: Run the following command to install the project dependencies:

   ```bash
   npm install

3. **Start the Backend Server:** Run the following command to start the Express.js server:

```bash
   node server.js
```

The server should now be running and accessible at the specified port usually 5000.

### Frontend Setup (evro_fe_todo)
1. **Navigate to the Frontend Directory:** Open your terminal and navigate to the evro_fe_todo directory.

2. **Install Dependencies:** Run the following command to install the project dependencies:

   ```bash
   npm install

3. **Start the Frontend Development Server:** Run the following command to start the Next.js development server:

```bash
   npm run dev
```

The frontend should now be running and accessible at http://localhost:3000 (or the port specified by Next.js).

### Important Notes
**Database Configuration:** If running with Node.js, ensure your backend is configured to connect to the MySQL database. You may need to update the database connection details in server.js or a configuration file.

**Environment Variables:** If your project uses environment variables, make sure to set them up correctly before running the services.

**Port Conflicts:** If you encounter port conflicts, you can change the port numbers in docker-compose.yml or the respective configuration files for the backend and frontend.