<p align="center">
  <img src="img/Picnic_Image.png" alt="Picnic Creator Banner" />
</p>

## Overview

- This is a fullstack project for a web application for creating and managing picnics
- Users can choose the picnic name, creator, description, budget, background image, and required services
- Built using React, Vite, Axios, Nodemon and MongoDB Atlas

<p align="center">
  <img src="img/Picnic_GIF.gif" alt="Picnic Creator GIF" />
</p>

## Set Up MongoDB Atlas

This project use MongoDB Atlas as database:
1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster called cluster0
3. Add your IP address to the IP whitelist in the cluster settings
4. Create a new database user with a username and password

## Installation and Usage

To view this project locally, follow these steps:
1. Install [Node.js and NPM](https://nodejs.org/en/download/package-manager)
2. Clone the repository:
   ```bash
   git clone https://github.com/GiuliaFreulon/picnic-creator
   cd picnic-creator
3. Install the dependencies:
- In the backend directory
   ```bash
   cd backend
   npm install nodemon --save-dev
- In the frontend directory
   ```bash
   cd ../frontend
   npm install
4. Create a file named .env in the root directory of the project
5. Add the following line to the .env file, replacing <username> and <password> with your MongoDB credentials:
   ```plaintext
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
6. Populate the database with sample services:
   ```bash
   cd ../backend
   cd db
   node populateServices.js
7. Start the Application:
- In the backend directory
   ```bash
   cd backend
   npm start
- In the frontend directory
   ```bash
   cd ../frontend
   npm run dev
8. Open the localhost link that will appear in the terminal

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
