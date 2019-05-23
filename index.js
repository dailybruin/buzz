const express = require("express");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const webpack = require("webpack");

const sessions = require("./routes/session");
const auth = require("./routes/auth");
const router = require("./routes");

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);

dotenv.config();

// SERVER
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors({
  credentials: true,
  origin: true
}));

app.use(sessions);
app.use(auth);
app.use(router);

// static assets
app.use(express.static("public"));

if (process.env.NODE_ENV !== "production") {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}


const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
