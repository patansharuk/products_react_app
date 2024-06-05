import { clear_local_storage_replace_to } from "../../utils/authUtils";
import { StoresApi } from "../../utils/urlUtils";

const fetchStoreProducts = (token, storeId) => {
  const url = StoresApi.store_products_url(storeId);
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, options)
    .then((res) => {
      if (res.status === 401) {
        clear_local_storage_replace_to("/login");
      } else if (res.status === 404) {
        return { message: "api error", status: 404 };
      } else {
        return res.json();
      }
    })
    .catch((e) => console.log(e));
};

export default fetchStoreProducts;
