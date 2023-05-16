import cors from "cors";
import express from "express";
import morgan from "morgan";
import key from "./config/jwt.js";
import logIn from "./routes/logIn.js";
import board from "./routes/board.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/** @note validate the config password */
/* app.set("key", key); */

/** @note routes */
app.use('/', logIn);
app.use('/', board);

app.listen(port, () => {
	console.log(`Proxy server listening at http://localhost:${port}`);
});
