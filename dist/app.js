"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
var OperationType;
(function (OperationType) {
    OperationType["MULTIPLICATION"] = "multiplication";
    OperationType["ADDITION"] = "addition";
    OperationType["SUBTRACTION"] = "subtraction";
})(OperationType || (OperationType = {}));
app.get("/", (req, res) => {
    res.json({
        slackUsername: "Preshy Jones",
        backend: true,
        age: 24,
        bio: "I just want to build cool software and retire on a beach watching the sunset everyday.",
    });
});
app.post("/", (req, res) => {
    let result;
    console.log(req.body);
    let { operation_type, x, y } = req.body;
    console.log(operation_type);
    if (operation_type === OperationType.MULTIPLICATION) {
        result = x * y;
    }
    else if (operation_type === OperationType.ADDITION) {
        result = x + y;
    }
    else if (operation_type === OperationType.SUBTRACTION) {
        result = x - y;
    }
    res.json({
        slackUsername: "Preshy Jones",
        operation_type,
        result,
    });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
