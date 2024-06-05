export const PORT = 3003;

export const DOMAIN = `localhost:${PORT}`;

export const HOME_PATH = "/";

export const LOGIN_PATH = "/login";

export const LOGOUT_PATH = "/logout";

export const NOT_FOUND_PATH = "/notfound";

/**
 * API Routes related to Server
 * @example
 * ProductsApi.login_url()
 */
export class ProductsApi {
  static domain = "http://localhost:3002/";

  static login_url() {
    return this.domain + "login";
  }

  static signup_url() {
    return this.domain + "signup";
  }

  static logout_url() {
    return this.domain + "logout";
  }

  static products_url() {
    return this.domain + "products";
  }

  static create_dealer_product_url(id) {
    return this.domain + `stores/${id}/products`;
  }
}

export class StoresApi {
  static domain = "http://localhost:3002/";

  static stores_url() {
    return this.domain + "stores";
  }

  static create_store_url() {
    return this.domain + "stores";
  }

  static show_store_url(store_id) {
    return this.domain + `stores/${store_id}`;
  }

  static stores_products() {
    return this.domain + "stores/products";
  }

  static store_products_url(store_id) {
    return this.domain + `stores/${store_id}/products`;
  }
}
