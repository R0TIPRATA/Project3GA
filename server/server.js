const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

const listsRouter = require("./routes/ListsRouter");
const itemsRouter = require("./routes/ItemsRouter");
const contributorsRouter = require("./routes/ContributorsRouter");
const messagesRouter = require("./routes/MessagesRouter");
const contributionRouter = require("./routes/ContributionRouter");
const usersRouter = require("./routes/UsersRouter");

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://project3-ga-nm1m.vercel.app', /\.onrender\.com$/], 
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/lists", listsRouter);
app.use("/items", itemsRouter);
app.use("/contributors", contributorsRouter);
app.use("/messages", messagesRouter);
app.use("/contributions", contributionRouter);
app.use("/users", usersRouter);

app.listen({ port: 15432 }, async () => {
	console.log("Server up on http://localhost:15432");
	await sequelize.authenticate();
	console.log("Database connected!");
});
