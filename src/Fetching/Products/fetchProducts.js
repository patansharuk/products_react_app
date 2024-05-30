import { clear_local_storage_replace_to } from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";

const fetchProducts = (token) => {
  const products_url = ProductsApi.products_url();
  const products_options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(products_url, products_options)
    .then((res) => {
      if (res.status === 401) {
        clear_local_storage_replace_to("/login");
      }
      return res.json();
    })
    .catch((e) => console.log(e));
};

export default fetchProducts;
