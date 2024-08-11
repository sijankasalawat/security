import axios from "axios";
import login_mock from "../mock/login_mock.js";
const fs = require("fs");
 
const backenddUrl = "http://localhost:5000";
 
describe("Second testing", () => {
  let authToken;
 
  it("POST /api/user/login | should return 200", async () => {
    const res = await axios.post(`${backenddUrl}/api/user/login`, login_mock);
    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.token).toBeDefined();
 
    // Store the token for later use
    authToken = res.data.token;
  });
 
  // Now you can use the stored token in subsequent requests
//   it("GET /api/user/:id | should return 200", async () => {
//     // Make sure authToken is defined
//     expect(authToken).toBeDefined();
 
//     const headers = {
//       Authorization: `Bearer ${authToken}`,
//     };
 
//     const res = await axios.get(
//       `${backenddUrl}/api/user/login/6593b53986562f71921a0102`,
//       { headers }
//     );
 
//     expect(res.status).toBe(200);
//     expect(res.data.success).toBe(true);
//     expect(res.data.user).toBeDefined();
//     console.log(res.data.user);
//   });
  
  // router.route("/user/:id").get(authGuard, getUsersById);
  it("GET /api/user/:id | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();
 
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
 
    const res = await axios.get(
      `${backenddUrl}/api/user/getUsers/6593b53986562f71921a0102`,
      { headers }
    );
 
    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.status).toBe(200);
    console.log(res.data);
  });
 
  //  router.route("/post/upload").post(authGuard,createPost);
  // Now you can use the stored token in subsequent requests
  it("POST /api/product/createProduct | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();
 
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "multipart/form-data",
    };
 
    const formData = new FormData();
    formData.append("brandName", "product");
    formData.append("address", "product");
    formData.append("category", "Electronic");
    formData.append("details", "product");
    formData.append("price", "product");
    formData.append("contactNo", "1234567890");
 
    
    const imageUrl = process.env.PUBLIC_URL + "/product.jpg"; // Use the correct path to your image
    const imageBlob = await fetch(imageUrl).then((res) => res.blob());
 
    formData.append("productImage", imageBlob, "product.jpg"); // Append the Blob and specify the filename
 
    const res = await axios.post(
      `${backenddUrl}/api/product/createProduct`,
      formData,
      { headers }
    );
 
    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("Product created successfully.");
    console.log(res.data);
  });
  // router.route("/post/:id").get(authGuard, likeAndUnlikePost);
    it("GET /api/product/getProductByUserId/:id | should return 200", async () => {
        // Make sure authToken is defined
        expect(authToken).toBeDefined();
   
        const headers = {
        Authorization: `Bearer ${authToken}`,
        };
   
        const res = await axios.get(
        `${backenddUrl}/api/product/getProductByUserId/659d59720d03e3fc0c51a47a`,
        { headers }
        );
   
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        expect(res.data.message).toBe("Products fetched successfully for the specified user ID");
        console.log(res.data);
    });
    // router.route("/post/delete/:id").delete(authGuard, deletePost);
    it("DELETE /api/product/deleteProduct/:id | should return 200", async () => {
        // Make sure authToken is defined
        expect(authToken).toBeDefined();
   
        const headers = {
        Authorization: `Bearer ${authToken}`,
        };
   
        const res = await axios.delete(
        `${backenddUrl}/api/product/deleteProduct/65d8917f9833f2d199e16b8a`,
        { headers }
        );
   
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        expect(res.data.message).toBe("Post deleted successfully");
        console.log(res.data);
    });
 
    // router.route("/post/user/:userId").get(getPostByUserID);
    it("GET /api/product/getProduct | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const headers = {
        Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.get(
        `${backenddUrl}/api/product/getProduct`, // Corrected endpoint URL
        { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("All products have been fetched successfully");
    console.log(res.data);
});
it("GET /api/product/getProductDetailById/:id | should return 200", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const headers = {
        Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.get(
        `${backenddUrl}/api/product/getProductDetailById/65e087d19343b7751de794b1`, // Corrected endpoint URL
        { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("Product fetched successfully.");
    console.log(res.data);
});
it("PUT /api/product/updateProduct/:id | Response should be json", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();
 
    const productUpdate = {
      category: "Updated Category",
      brandName: "Updated Brand",
      details: "Updated details",
      contactNo: "0987654321",
      address: "456 Updated St",
      price: "199.99",
    };
 
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };
 
    const res = await axios.put(
      `${backenddUrl}/api/product/updateProduct/65e087d19343b7751de794b1`, // Corrected endpoint URL
      productUpdate,
      { headers }
    );
 
    expect(res.status).toEqual(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("Product updated successfully.");
    expect(res.data.product).toBeDefined();
});
it("GET /api/product/getProductByCategory/:category | Response should be json", async () => {
    // Make sure authToken is defined
    expect(authToken).toBeDefined();

    const category = "Electronic"; // Replace "Electronic" with the desired category

    const headers = {
        Authorization: `Bearer ${authToken}`,
    };

    const res = await axios.get(
        `${backenddUrl}/api/product/getProductByCategory/${category}`,
        { headers }
    );

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("All products have been fetched successfully");
    expect(res.data.products).toBeDefined(); // Assuming products are expected in the response
    console.log(res.data);
});
it("POST /api/user/create | should return 200", async () => {
    const user = {
      fName: "John",
      lName: "Doe",
      email: "joh.oe@example.com",
      phoneNumber: "1234567890",
      password: "password123",
    };

    const res = await axios.post(`${backenddUrl}/api/user/create`, user);

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.message).toBe("User created successfully.");
})


    

 
});