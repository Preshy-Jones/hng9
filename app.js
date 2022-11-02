const csvToJson = require("csvtojson");
const fs = require("fs");
const crypto = require("crypto");
const csvFilePath = "./data.csv";
const jsonToCsv = require("csvjson");

csvToJson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const hashArray = jsonObj.map((obj) => {
      const hash = crypto
        .createHash("sha256")
        .update(JSON.stringify(obj))
        .digest("hex");
      obj.hash = hash;
      return obj;
    });
    console.log(hashArray);

    const csv = jsonToCsv.toCSV(hashArray, {
      headers: "key",
    });

    fs.writeFileSync("output.csv", csv);
  });
