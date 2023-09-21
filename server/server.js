const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const listsRouter = require("./routes/ListsRouter");
const itemsRouter = require("./routes/ItemsRouter");
const contributorsRouter = require("./routes/ContributorsRouter");
const messagesRouter = require("./routes/MessagesRouter");
const contributionRouter = require("./routes/ContributionRouter");
const usersRouter = require("./routes/UsersRouter");

const app = express();
app.use(cors());
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
