import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
const config = {
  headers: {
      "authorization": `Bearer ${localStorage.getItem("token")}`,
  },
};

Api.interceptors.request.use(
  async (config) => {
    console.log('config: ', config);
      // const authStore = useAuthStore();
      // const bearerToken = authStore.getToken();
      // if (bearerToken) {
        const bearerToken = localStorage.getItem('token')
        if(bearerToken){

          config.headers['Authorization'] = `Bearer ${bearerToken}`;
        }
      // }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);



export const registerAPI = (data) => Api.post("/api/user/create", data);
export const loginApi=(data)=> Api.post("/api/user/login",data);
export const createProductApi =(formData)=>Api.post('/api/product/createProduct',formData);
export const updateProductApi =(formData,productId)=>Api.put('/api/product/updateProduct/'+productId,formData);
export const getProductApi =()=> Api.get(`/api/product/getProduct`);
export const searchProductApi = (text) => Api.get(`/api/product/search?text=${text}`);
export const getProductsByUserIdApi = (userId) => Api.get(`/api/product/getProductByUserId/${userId}`, config);
export const getProductDetailById = (productId) => Api.get(`/api/product/getProductDetailById/${productId}`);
export const getProductByUserId = (userId) => Api.get(`/api/product/getProductByUserId/${userId}`);
export const getUserDetailById = (userId) => Api.get(`/api/user/getUsers/${userId}`);
export const getLoggedInUserDetail = () => Api.get(`/api/user/getUsers`);
export const updateLoggedInUserDetail = (data) => Api.patch(`/api/user/updateUser`,data);
export const deleteProductApi = (productId) => Api.delete(`/api/product/deleteProduct/${productId}`);
export const getProductByCategoryApi = (category) => Api.get(`/api/product/getProductByCategory/${category}`);
// forgot password
export const forgotPasswordApi = (data) =>Api.post("/api/user/forgot/password", data);
export const resetPasswordApi = (data, token) =>Api.put(`/api/user/password/reset/${token}`, data);
// export const getProductApi =(id)=>Api.get(`/api/product/get_product/${id}`)