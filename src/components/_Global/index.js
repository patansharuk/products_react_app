import { Alert, Spinner } from "react-bootstrap";

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
    <Alert variant="danger" className="container m-auto mt-2">
      Something went wrong! Try after sometime.
    </Alert>
  );

  /**
   * Display not found view
   * @returns JSX
   */
  static renderNotFoundItem = () => {
    <div className="d-flex justify-content-center mt-5">
      <h1>ItemNotFound</h1>
    </div>;
  };

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
  static renderTitleDivider = (title='') => (
    <div >
      <h1>{title}</h1>
      <hr className="border border-danger-subtle border-3 m-0"/>
    </div>
  );
}

export default GlobalComponents;
