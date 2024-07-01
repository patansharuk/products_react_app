/**
 * It contains Cart Item Handling variables and methods for local storage.
 * @example
 * CartItemsUtil.addCartItems([{id: 1, name: 'mango', price: 200}])
 */
class CartItemsUtil {
  /**
   * Local storage key for cart items.
   */
  static CART_ITEMS_KEY = "cart_items";

  /**
   * Add cart items into the localstorage.
   * @param {String | Object | Number} data
   * @example
   * addCartItems({id: 1, name: 'sharu', age: '20'})
   */
  static addCartItems = (data) => {
    localStorage.setItem(this.CART_ITEMS_KEY, JSON.stringify(data));
  };

  /**
   * Retrieve the cart items from the local storage.
   * @returns null or cart items
   */
  static getCartItems = () => {
    return JSON.parse(localStorage.getItem(this.CART_ITEMS_KEY));
  };

  /**
   * clear the cart items from the local storage.
   */
  static clearCartItems = () => {
    localStorage.removeItem(this.CART_ITEMS_KEY);
  };

  static subTotal = (cartItems) => {
    return cartItems.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0);
  };

  static totalPrice = (chargeSheet = {}) => {
    return Object.values(chargeSheet).reduce((a, b) => a + b, 0);
  };

  static cartItemsCount = () => {
    const items = JSON.parse(localStorage.getItem(this.CART_ITEMS_KEY)) || [];
    return items.length;
  };
}

export default CartItemsUtil;
