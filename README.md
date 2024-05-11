# priyangga-music

A music application project for managing and streaming music. This project consists of a client built with React, a server using Express.js, and a MongoDB database.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
    - [Client](#client)
    - [Server](#server)
    - [Database](#database)
- [Usage](#usage)
    - [Client](#client-usage)
    - [Server](#server-usage)
- [Deployment on Vercel](#deployment-on-vercel)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project aims to provide a comprehensive music management and streaming solution, allowing users to easily manage their music collections and stream music seamlessly. The project is divided into a client-side application built with React, a server-side application using Express.js, and a MongoDB database to store music data.
## Installation
To install and set up the project locally, follow these steps:
### Client
1. Navigate to the `client` directory:
     ```bash
     cd client
     npm i
### Server
1. Navigate to the `server` directory:
     ```bash
     cd client
     npm i
### Database
### Why MongoDB?
MongoDB is chosen as the database solution for several reasons:

1. **Flexibility**: MongoDB is a NoSQL database, which provides flexibility in storing data. Its schema-less nature allows for easy adaptation to changing data requirements, making it suitable for projects where data structures may evolve over time.

2. **Scalability**: MongoDB is designed to scale out horizontally, meaning it can handle large volumes of data and traffic by distributing data across multiple servers. This scalability is crucial for applications with high growth potential, such as a music streaming platform.

3. **Performance**: MongoDB's document-based data model and efficient indexing system contribute to high performance and low latency. This is especially beneficial for applications requiring fast read and write operations, such as retrieving music metadata and serving streaming requests.

4. **Rich Query Language**: MongoDB supports a powerful query language that allows for complex queries, aggregation, and geospatial operations. This enables developers to efficiently retrieve and manipulate data according to various criteria, enhancing the functionality and user experience of the music application.

5. **Community Support and Ecosystem**: MongoDB has a large and active community of developers and contributors, providing extensive documentation, tutorials, and resources. Additionally, MongoDB offers a rich ecosystem of tools and integrations, facilitating development, deployment, and management of the database.

Overall, MongoDB's combination of flexibility, scalability, performance, rich query capabilities, and strong community support makes it a suitable choice for storing and managing music-related data in this project.
1. Install MongoDB on your system if you haven't already. Follow the official MongoDB installation instructions for your    operating system.
2. Start MongoDB service.
## Usage
To install and set up the project locally, follow these steps:
### Client
1. Navigate to the `client` directory:
     ```bash
     cd client
     npm start
2. It will running on port 8080 as default port
    
### Server
1. Please copy `.env.example` and change it into `.env`
    ```bash
    MONGO_URL=localhost:27017
    PORT=8080
    JWT_SECRET_KEY=secret
2. Navigate to the `client` directory:
     ```bash
     cd client
     npm start
3. It will running on port 3000 as default
## Deployment on Vercel
This project can be deployed to Vercel for production use. Follow these steps to deploy the client application:
1. Install the Vercel CLI globally using npm:
    ```bash
    npm install -g vercel
2. Navigate to the client directory:
    ```bash
    cd client
3. Log in to your Vercel account:
    ```bash
    vercel login
4. Deploy the client application:
    ```bash
    vercel
5. Follow the prompts to configure your deployment settings.
6. Once deployed, you will receive a unique URL for your application.
## Contributing
Contributions to the project are welcome. To contribute, follow these steps:
1. Fork the repository.
2. Clone the forked repository to your local machine:
    ```bash
    git clone https://github.com/your-username/priyangga-music.git
3. Create a new branch:
    ```bash
    git add .
    git commit -m 'Add new feature'
4. Make your changes and commit them:
    ```bash
    vercel
5. Push your changes to your forked repository:
    ```bash
    git push origin feature/new-feature
6. Create a pull request to the main branch of the original repository.
## License
This project is licensed under the [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/).
