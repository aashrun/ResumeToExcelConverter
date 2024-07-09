const express = require("express");
require('dotenv').config()
const app = express();
const pdfParseRouter = require("./Routes/convertResumeRoutes")

app.use(express.json());


app.use("/resumeToExcel", pdfParseRouter)



app.listen(process.env.PORT || 5071, function () {
  console.log("Express app running on port " + (process.env.PORT || 5071));
});


