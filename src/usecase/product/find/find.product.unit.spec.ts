import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(new Product("123", "Product 1", 10))),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const expectedOutput = {
      id: "123",
      name: "Product 1",
      price: 10
    };

    const output = await usecase.execute(input);

    expect(output).toEqual(expectedOutput);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
