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

// Static assets such as login.css
// and index.bundle.js (the React app)
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

// This loads both the HTML file that renders
// the actual React app and the login HTML file
// We MUST place it last or else when the browser
// makes a request to /login.css or /index.bundle.js
// it will get swallowed up by the React app instead
// of the server
app.use(router);

const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
