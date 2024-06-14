import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should accumulate more than one validation error", () => {
    const product = new Product("123", "Product 1", 10);

    product.changeName("")
    product.changePrice(-1)
    
    expect(product.notification.getErrors().length).toBeGreaterThan(1)
    expect(product.notification.getErrors().map(e => e.message)).toContain("Name is required")
    expect(product.notification.getErrors().map(e => e.message)).toContain("Price must be greater than zero")
  });
});
