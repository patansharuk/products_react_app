import { clear_local_storage_replace_to } from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";

const fetchDealerProducts = (token) => {
  const dealer_products_url = ProductsApi.dealer_products_url();
  const dealer_products_options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(dealer_products_url, dealer_products_options)
    .then((res) => {
      if (res.status === 401) {
        clear_local_storage_replace_to("/login");
      }
      return res.json();
    })
    .catch((e) => console.log(e));
};

export default fetchDealerProducts;
