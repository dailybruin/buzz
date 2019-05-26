const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const webpack = require("webpack");

const sessions = require("./routes/session");
const auth = require("./routes/auth");
const api = require("./routes/api");
const router = require("./routes");
const { isAuthenticated } = require("./controllers/auth");

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
app.use('/api', api);

// Static assets such as login.css
// and index.bundle.js (the React app)
app.use(express.static("public/login"));

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/login/login.html"))
});

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

// main route
app.get('/*', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"))
});

app.use(express.static("public"));

const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
