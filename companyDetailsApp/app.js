const express = require("express");
const app = express();
var http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const companyData = require("./database/companyData");

var addData = require("./routes/addData")(
    app
);
var queryResolver = require("./routes/queryResolver")(
    app
);


let portNumber = 3000;
server.listen(portNumber, function () {
    console.log("Server is running on " + portNumber);
});

            app.use(bodyParser.json());
            app.use("/query",queryResolver);
            app.use("/adddetails", addData);
            app.use("/query",queryResolver);





