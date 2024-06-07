import { Alert, Spinner } from "react-bootstrap";
import {
  clear_local_storage_replace_to,
  get_user_details,
} from "../../utils/authUtils";

/**
 * Contains methods and variable which are needed for globally in the application
 */
class GlobalComponents {
  static states = {
    api_error: "API_ERROR",
    loading: "LOADING",
    data: "DATA",
    empty_items: "EMPTY_ITEMS",
  };

  /**
   * Display the spinner
   * @returns JSX
   */
  static renderSpinner = () => (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" className="text-center m-5" />
    </div>
  );

  /**
   * Display Api error view
   * @returns JSX
   */
  static renderApiError = () => (
    <Alert variant="danger" className="container m-auto mt-2 mb-2">
      Something went wrong! Try after sometime.
    </Alert>
  );

  /**
   * Display not found view
   * @returns JSX
   */
  static renderNotFoundItem = () => (
    <Alert variant="danger" className="container m-auto mt-2 mb-2">
      <h3 className="mb-0">Items Not Found</h3>
    </Alert>
  );

  /**
   * Handles loader view, api error view, empty items view and data view
   * @param {string} state
   * @param {Function} comp
   * @returns JSX Component
   * @example
   * GlobalComponents.renderComponent('LOADING', () => (<h1>Data</h1>))
   */
  static renderComponent = (state, comp) => {
    switch (state) {
      case this.states.loading:
        return this.renderSpinner();
      case this.states.api_error:
        return this.renderApiError();
      case this.states.empty_items:
        return this.renderNotFoundItem();
      default:
        return comp();
    }
  };

  /**
   * Display Title with bottom border.
   * @param {string} title
   * @returns JSX
   */
  static renderTitleDivider = (title = "") => (
    <div className="container mb-3">
      <h1>{title}</h1>
      <hr className="border border-danger-subtle border-3 m-0" />
    </div>
  );

  static renderBasedOnRole = (views) => {
    const user_details = get_user_details();
    user_details === null && clear_local_storage_replace_to("/login");

    switch (user_details.role) {
      case "admin":
        return views.admin;
      case "dealer":
        return views.dealer;
      case "customer":
        return views.customer;
      default:
        return <h1>default view</h1>;
    }
  };
}

export default GlobalComponents;
