const dotenv = require("dotenv");

const { app } = require("./app");

dotenv.config();

const startServer = async () => {
  try {
    // Set server to listen
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log("Express app running!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
