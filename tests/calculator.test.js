const { add, subtract, multiply, divide } = require("../src/calculator");

describe("add", () => {
  test("adds positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("adds decimal numbers", () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("subtract", () => {
  test("subtracts positive numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("subtracts negative numbers", () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test("returns negative result", () => {
    expect(subtract(3, 10)).toBe(-7);
  });
});

describe("multiply", () => {
  test("multiplies positive numbers", () => {
    expect(multiply(4, 5)).toBe(20);
  });

  test("multiplies by zero", () => {
    expect(multiply(7, 0)).toBe(0);
  });

  test("multiplies negative numbers", () => {
    expect(multiply(-3, 4)).toBe(-12);
  });
});

describe("divide", () => {
  test("divides positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("divides decimal numbers", () => {
    expect(divide(1, 3)).toBeCloseTo(0.3333, 4);
  });

  test("throws error when dividing by zero", () => {
    expect(() => divide(5, 0)).toThrow("Division by zero is not allowed");
  });

  test("handles negative divisor", () => {
    expect(divide(10, -2)).toBe(-5);
  });
});
