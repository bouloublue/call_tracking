const express = require("express");

function init() {
  const router = express.Router();

  // Optional: Skipper file upload config (if you're using Skipper)
  // const skipperOptions = {
  //   maxBytes: 57671680, // 55 MB
  //   maxTimeToBuffer: 1800000,
  //   maxTimeToWaitForFirstFile: 1800000,
  //   maxWaitTimeBeforePassingControlToApp: 1800000,
  // };
  // router.use(require("skipper")(skipperOptions));
  // global.skipperUploadOptions = {
  //   ...skipperOptions,
  //   dirname: process.env.TEMP_UPLOAD_PATH || "./temp_uploads",
  // };

  // Route imports
//   const authRouter = require("./auth");
  const userRouter = require("./user");
  const campaignRouter = require("./campaign")
  const numberController =  require("./number")

  global.logger?.routes?.info("Initializing API Routes");

  // Public routes
//   router.use("/auth", authRouter());

  // Secured API routes (passport middleware can be added later here)
  router.use("/user", userRouter());
  router.use("/campaign", campaignRouter());
  router.use("/number", numberController());

  // Catch-all for 404s
  router.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  return router;
}

module.exports = init;
