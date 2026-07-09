const { add, subtract, multiply, divide } = require("./calculator");

const [,, operation, a, b] = process.argv;

if (!operation || !a || !b) {
  console.log("Usage: node src/index.js <add|subtract|multiply|divide> <num1> <num2>");
  process.exit(1);
}

const num1 = parseFloat(a);
const num2 = parseFloat(b);

if (isNaN(num1) || isNaN(num2)) {
  console.log("Error: Both arguments must be valid numbers");
  process.exit(1);
}

const operations = { add, subtract, multiply, divide };
const fn = operations[operation];

if (!fn) {
  console.log("Error: Unknown operation. Use add, subtract, multiply, or divide");
  process.exit(1);
}

try {
  const result = fn(num1, num2);
  console.log(`Result: ${result}`);
} catch (err) {
  console.log(`Error: ${err.message}`);
  process.exit(1);
}
