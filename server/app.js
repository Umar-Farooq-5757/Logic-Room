import express from "express";
import dotenv from 'dotenv'
import sequelize from './config/db.js'
const app = express();
dotenv.config()

const port = process.env.PORT

app.get("/", (req, res) => {
  res.send("Server is running");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connection established.');
    
    await sequelize.sync({ alter: true }); 
    
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}
startServer() 