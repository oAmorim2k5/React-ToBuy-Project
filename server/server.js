const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

app.listen(8800, () => {
    console.log("Servidor rodando na porta 8800");
});
