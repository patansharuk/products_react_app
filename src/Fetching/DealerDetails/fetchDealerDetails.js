import { clear_local_storage_replace_to } from "../../utils/authUtils";
import { DealerDetailsApi } from "../../utils/urlUtils";

const fetchDealerDetails = (token) => {
  const dealer_details_url = DealerDetailsApi.dealer_details_url();
  const dealer_details_options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(dealer_details_url, dealer_details_options)
    .then((res) => {
      if (res.status === 401) {
        clear_local_storage_replace_to("/login");
      }
      return res.json();
    })
    .catch((e) => console.log(e));
};

export default fetchDealerDetails;
