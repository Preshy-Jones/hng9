const csvToJson = require("csvtojson");
const fs = require("fs");
const crypto = require("crypto");
const csvFilePath = "./data.csv";
const jsonToCsv = require("csvjson");
const prompt = require("prompt-sync")({ sigint: true });
const teamKeys = require("./constants");

let teamName = prompt("Enter Team Name: ").toLowerCase();

csvToJson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const teamRange = teamKeys[teamName];
    const inputTeamRecords = jsonObj.slice(
      teamRange.start - 1,
      teamRange.end - 1
    );

    try {
      const hashArray = inputTeamRecords.map((obj) => {
        let outputJson = { ...obj };
        let attributes = outputJson["attributes"].split(";");
        outputJson["attributes"] = attributes.map((attribute) => {
          if (attribute !== "") {
            let [trait_type, value] = attribute.split(":");
            trait_type = trait_type.trim();
            value = value.trim();
            return { trait_type, value };
          }
        });

        outputJson = {
          format: "CHIP-0007",
          name: obj["Name"],
          description: obj["Description"],
          minting_tool: teamName,
          sensitive_content: false,
          series_number: parseInt(obj["Series Number"]),
          series_total: jsonObj.length,
          attributes: obj["attributes"],
        };

        let hash = crypto
          .createHash("sha256")
          .update(JSON.stringify(outputJson))
          .digest("hex");

        outputJson["Hash"] = hash;
        outputJson["attributes"] = obj["attributes"];
        return outputJson;
      });

      fs.writeFile("output.json", JSON.stringify(hashArray), "utf-8", (err) => {
        if (err) {
          console.log(err);
        }
      });
      const csv = jsonToCsv.toCSV(hashArray, {
        headers: "key",
      });
      fs.writeFileSync(`${teamName}.output.csv`, csv, "utf-8");
    } catch (error) {
      console.log("Input team's data has an Invalid format");
    }
  });
