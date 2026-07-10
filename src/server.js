const path = require("path");
const express = require("express");
const { add, subtract, multiply, divide } = require("./calculator");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/calculator", (req, res) => 
  const { op, a, b } = req.query;

  if (!op || a === undefined || b === undefined) {
    return res.status(400).json({ error: "Missing required query params: op, a, b" });
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ error: "a and b must be valid numbers" });
  }

  const operations = { add, subtract, multiply, divide };
  const fn = operations[op];

  if (!fn) {
    return res.status(400).json({ error: "Unknown operation. Use: add, subtract, multiply, divide" });
  }

  try {
    const result = fn(numA, numB);
    res.json({ operation: op, a: numA, b: numB, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
