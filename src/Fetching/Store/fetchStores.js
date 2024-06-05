import { clear_local_storage_replace_to } from "../../utils/authUtils";
import { StoresApi } from "../../utils/urlUtils";

const fetchStores = (token) => {
  const url = StoresApi.stores_url();
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
      }
      return res.json();
    })
    .catch((e) => console.log(e));
};

export default fetchStores;
