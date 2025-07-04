require("dotenv").config();

const host = process.env.HOST || "0.0.0.0";
const port = +process.env.PORT || 3000;

const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const appLogger = require("./appLogger");
appLogger.initGlobalLoggers();

const sequelizeInit = require("./database/init");
const testConnection = require("./database/testConnection");
const syncDb = require("./database/syncDb");

const appRouter = require("./routes/index");
// const lib = require("./lib");

const applyCors = (app) => {
  if (process.env.NODE_ENV != "production") {
    const cors = require("cors");

    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "*"
    ];
    
    // Configure CORS middleware
    const corsOptions = {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, // Allow credentials like cookies and Authorization headers
    };

    app.use(cors(corsOptions));
  }
};


function addMiddlewares(app) {
  applyCors(app);

  global.logger.server.info("Initializing Middlewares");
  // lib.auth.authenticate.middlewares();

  morgan.token("currentTime", function (req, res) {
    return new Date().toISOString();
  });
  morgan.format(
    "arkcombinedreq",
    'RQ ":currentTime" ":remote-addr" ":remote-user" "[:date[ios]]" ":method :url HTTP/:http-version" ":referrer" ":user-agent"'
  );
  morgan.format(
    "arkcombinedres",
    'RS ":currentTime" ":remote-addr" ":remote-user" "[:date[ios]]" ":method :url HTTP/:http-version" :response-time[2] :total-time[3] :status :res[content-length] ":referrer" ":user-agent"'
  );

  // log the request immediately when it is received by server
  app.use(
    morgan("arkcombinedreq", { stream: appLogger.stream, immediate: true })
  );

  // log the request & response immediately when it is received by server
  app.use(
    morgan("arkcombinedres", { stream: appLogger.stream, immediate: false })
  );
  

  // Serve static files from the 'uploads' directory
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  app.use(express.json({ limit: "50mb" }));

  // app.use(express.urlencoded({ extended: true }));
}

function addRoutes(app) {
  global.logger.routes.info("Initializing Routes..");
  app.use("/api", appRouter());

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
}

async function init() {
  // create loggers as first step
  // Connect to database;
  await sequelizeInit();
  await testConnection();
  await syncDb();

  const app = express();
  app.set("case sensitive routing", true);
  app.set("etag", false);
  app.set("json escape", true);
  app.set("trust proxy", !!process.env.WEB_ENV);
  app.disable("x-powered-by");

  addMiddlewares(app);
  addRoutes(app);

  // start listening to requests
  app.listen(port, host, 1024, (req, res) => {
    global.logger.server.info(`App Started at ${host}:${port}`);
  });
}

init();