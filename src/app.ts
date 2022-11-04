import express, { Application, Request, Response } from "express";
const app: Application = express();

// Create an express api endpoint that returns the following in json response:  { "slackUsername**": "Precious Adedibu", "backend": true, "age": 24, "bio": "I just want to build cool software and retire on a beach watching the sunset everyday." }

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

interface Payload {
  operation_type: OperationType;
  x: number;
  y: number;
}

enum OperationType {
  MULTIPLICATION = "multiplication",
  ADDITION = "addition",
  SUBTRACTION = "subtraction",
}

app.get("/", (req: Request, res: Response) => {
  res.json({
    slackUsername: "Preshy Jones",
    backend: true,
    age: 24,
    bio: "I just want to build cool software and retire on a beach watching the sunset everyday.",
  });
});

app.post("/", (req: Request, res: Response) => {
  let result;

  console.log(req.body);

  let { operation_type, x, y } = req.body;

  console.log(operation_type);

  if (operation_type === OperationType.MULTIPLICATION) {
    result = x * y;
  } else if (operation_type === OperationType.ADDITION) {
    result = x + y;
  } else if (operation_type === OperationType.SUBTRACTION) {
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
