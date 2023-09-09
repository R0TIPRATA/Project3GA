const express = require("express");
const cors = require("cors");
const { sequelize, WishlistList, WishlistItem } = require("./models");

const listsRouter = require("./routes/ListsRouter");
const itemsRouter = require("./routes/ItemsRouter");
const contributorsRouter = require("./routes/ContributorsRouter");
const messagesRouter = require("./routes/MessagesRouter");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/lists", listsRouter);
app.use("/items", itemsRouter);
app.use("/contributors", contributorsRouter);
app.use("/messages", messagesRouter);

app.listen({ port: 15432 }, async () => {
	console.log("Server up on http://localhost:15432");
	await sequelize.authenticate();
	console.log("Database connected!");
});
