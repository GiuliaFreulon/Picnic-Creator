// populateServices.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { Service } = require("./models/Service");

async function populateDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const dataPath = path.join(__dirname, "servicesmock.json");
    const jsonData = fs.readFileSync(dataPath);
    const services = JSON.parse(jsonData);

    await Service.insertMany(services); // Insere os novos serviços
    console.log("Serviços populados com sucesso!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  }
}

populateDatabase();
