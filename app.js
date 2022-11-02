const csvToJson = require("csvtojson");
const fs = require("fs");
const crypto = require("crypto");
const csvFilePath = "./data.csv";
const dotenv = require("dotenv");
const jsonToCsv = require("csvjson");

dotenv.config();

const fileNameKey = process.env.FILENAMEKEY;

csvToJson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const hashArray = jsonObj.map((obj) => {
      const hash = crypto
        .createHash("sha256")
        .update(JSON.stringify(obj))
        .digest("hex");
      obj["Output"] = `${obj[fileNameKey]}.${hash}.csv`;
      return obj;
    });


    const csv = jsonToCsv.toCSV(hashArray, {
      headers: "key",
    });

    fs.writeFileSync("output.csv", csv,"utf-8");

  });
