const request = require("supertest");
const app = require("../index");
const fs = require("fs");
 
describe("Product API", () => {
    let token; 
     // Create user
  it("POST /api/user/create | Response should be json", async () => {
    const user = {
      fName: "tests",
      lName: "testers",
      phoneNumber: "09876543212",
      email: "tester2@teste1r.coss",
      password: "123456",
    };
 
    const res = await request(app)
      .post("/api/user/create")
      .send(user);
 
    console.log(res.body);
    if (res.body.success) {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("User created successfully");
    } else {
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toEqual("User already exists.");
    }
  });
 
  // Login user
  it("POST /api/user/login | Response should be json", async () => {
    const loginUser = {
      email: "test1@gmail.com",
      password: "12345",
    };
 
    const res = await request(app)
      .post("/api/user/login")
      .send(loginUser);
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "User logged in successfully.");
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // Save the token for later use
  });
 
 
  // Get User Profile
  it("GET /api/user/getUsers/:id | Response should be json", async () => {
    if (!token) {
      throw new Error("Token is not defined");
    }
 
    const res = await request(app)
      .get("/api/user/getUsers/659d59720d03e3fc0c51a47a")
      .set("Authorization", `Bearer ${token}`);
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Users fetched successfully.");
    expect(res.body).toHaveProperty("user");
  });
  // Store the token for later use
 
  // Assuming you have user authentication tests before these product tests
 
  // Create product
  it("POST /api/product/createProduct | Response should be json", async () => {
    if (!token) {
      throw new Error("Token is not defined");
    }
 
    const product = {
      category: "Electronic",
      brandName: "Test Brand",
      details: "Test details",
      contactNo: "1234567890",
      address: "123 Test St",
      price: "99.99",
    };
 
    const res = await request(app)
      .post("/api/product/createProduct")
      .set("Authorization", `Bearer ${token}`)
      .field("category", product.category)
      .field("brandName", product.brandName)
      .field("details", product.details)
      .field("contactNo", product.contactNo)
      .field("address", product.address)
      .field("price", product.price)
      .attach("productImage", "D:/5th sem/webDevelopment/product.png");
 
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Product created successfully.");
    expect(res.body).toHaveProperty("product");
  });
 
  // Get products
  it("GET /api/product/getProduct | Response should be json", async () => {
    const res = await request(app)
      .get("/api/product/getProduct");
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "All products have been fetched successfully");
    expect(res.body).toHaveProperty("products");
  });
 
  // Get product by user ID
  it("GET /api/product/getProductByUserId//:userId | Response should be json", async () => {
    if (!token) {
      throw new Error("Token is not defined");
    }
 
    const res = await request(app)
      .get("/api/product/getProductByUserId/659d59720d03e3fc0c51a47a")
      .set("Authorization", `Bearer ${token}`);
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Products fetched successfully for the specified user ID");
    expect(res.body).toHaveProperty("products");
  });
 
  // Delete product
  it("DELETE /api/product/deleteProduct/:id | Response should be json", async () => {
    if (!token) {
      throw new Error("Token is not defined");
    }
 
    const res = await request(app)
      .delete("/api/product/deleteProduct/65e0c8d0096f4db64a5afdab")
      .set("Authorization", `Bearer ${token}`);
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Product deleted successfully.");
    expect(res.body).toHaveProperty("deletedProduct");
  });
 
  // Get product by ID
  it("GET /api/product/getProduct/:id | Response should be json", async () => {
    const res = await request(app)
      .get("/api/product/getProduct/65e0c8d0096f4db64a5afdab");
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Product fetched successfully.");
    expect(res.body).toHaveProperty("product");
  });
 
  // Update product
  it("PUT /api/product/updateProduct/:id | Response should be json", async () => {
    if (!token) {
      throw new Error("Token is not defined");
    }
 
    const productUpdate = {
      category: "Electronic",
      brandName: "Updated Brand",
      details: "Updated details",
      contactNo: "0987654321",
      address: "456 Updated St",
      price: "199.99",
    };
 
    const res = await request(app)
      .put("/api/product/updateProduct/65d8917f9833f2d199e16b8a")
      .set("Authorization", `Bearer ${token}`)
      .field("category", productUpdate.category)
      .field("brandName", productUpdate.brandName)
      .field("details", productUpdate.details)
      .field("contactNo", productUpdate.contactNo)
      .field("address", productUpdate.address)
      .field("price", productUpdate.price);
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Product updated successfully.");
    expect(res.body).toHaveProperty("product");
  });
 
  // Get products by category
  it("GET /api/product/getProductByCategory/:category | Response should be json", async () => {
    const res = await request(app)
      .get("/api/product/getProductByCategory/Electronic");
 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "All products have been fetched successfully");
    expect(res.body).toHaveProperty("products");
  });
 
//   // Search product
//   it("GET /api/product/search?text=QUERY_TEXT | Response should be json", async () => {
//     const res = await request(app)
//       .get("/api/product/search?text=thar");
 
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("success", true);
//     expect(res.body).toHaveProperty("message", "Products fetched successfully.");
//     expect(res.body).toHaveProperty("products");
//   });
 
});