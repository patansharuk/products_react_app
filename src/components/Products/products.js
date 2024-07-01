import React, { useEffect, useState } from "react";
import CustomNavbar from "../Navbar/navbar";
import ProductItem from "../ProductItem/product_item";
import { Container, Row } from "react-bootstrap";
import {
  clear_local_storage_replace_to,
  fetch_token_else_redirect_login,
} from "../../utils/authUtils";
import { ProductsApi } from "../../utils/urlUtils";
import GlobalComponents from "../_Global";
import CartItemsUtil from "../../utils/cartUtils";

const states = GlobalComponents.states;

const Products = () => {
  const [state, setState] = useState(states.loading);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch_products = () => {
      setState(states.loading);
      const token = fetch_token_else_redirect_login();
      const products_url = ProductsApi.products_url();
      const products_options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(products_url, products_options)
        .then((res) => {
          if (res.status === 401) {
            clear_local_storage_replace_to("/login");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setProducts(data.data);
          setState(states.products);
        })
        .catch((e) => console.log(e));
    };
    fetch_products();
  }, []);

  const onAddProduct = (productId) => {
    const modifyState = () => {
      const modifiedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: 1 };
        } else {
          return product;
        }
      });
      setProducts(modifiedProducts);
    };

    const modifyLocalStorage = () => {
      const fetchProductAppendToCart = (cartItems = "") => {
        const product = products.filter((item) => item.id === productId);
        if (product[0]) {
          product[0].quantity = 1;
          if (cartItems) {
            CartItemsUtil.addCartItems([...cartItems, ...product]);
          } else {
            CartItemsUtil.addCartItems(product);
          }
        } else {
          alert("something went wrong.");
        }
      };

      const cartItems = CartItemsUtil.getCartItems();
      if (cartItems) {
        // check for product existence
        const cartItem = cartItems.filter((item) => item.id === productId);
        if (cartItem[0]) {
          // if product exist in cartItems then increment it's quantity
          const modifiedCartItems = cartItems.map((item) => {
            return item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
          CartItemsUtil.addCartItems(modifiedCartItems);
          modifyState();
        } else {
          fetchProductAppendToCart(cartItems);
          modifyState();
        }
      } else {
        fetchProductAppendToCart();
        modifyState();
      }
    };

    modifyLocalStorage();
  };

  const onIncrementProduct = (productId) => {
    const modifyState = () => {
      const modifiedProducts = products.map((product) => {
        return product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product;
      });
      setProducts(modifiedProducts);
    };

    const modifyLocalStorage = () => {
      const cartItems = CartItemsUtil.getCartItems();
      if (cartItems !== null) {
        const modifiedCartItems = cartItems.map((cartItem) => {
          return cartItem.id === productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
        CartItemsUtil.addCartItems(modifiedCartItems);
        modifyState();
      } else {
        alert("Something went wrong.");
      }
    };

    modifyLocalStorage();
  };

  const onDecrementProduct = (productId) => {
    const modifyState = () => {
      const modifiedProducts = products.map((product) => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
      setProducts(modifiedProducts);
    };

    const modifyLocalStorage = () => {
      const cartItems = CartItemsUtil.getCartItems();
      let modStatus = false
      if (cartItems !== null) {
        const modifiedCartItems = cartItems.map((cartItem) => {
          if (cartItem.id === productId) {
            if (cartItem.quantity === 1) {
              modStatus = true
              return cartItem;
            }
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });
        if(modStatus){
          const filteredCartItems = cartItems.filter((item)=> item.id !== productId)
          CartItemsUtil.addCartItems(filteredCartItems);
        }else{
          CartItemsUtil.addCartItems(modifiedCartItems);
        }
        modifyState();
      } else {
        alert("Something went wrong.");
      }
    };

    modifyLocalStorage();
  };

  const renderProducts = () => (
    <Container>
      <Row className="mt-2">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product.id}
              onAddProduct={onAddProduct}
              onIncrementProduct={onIncrementProduct}
              onDecrementProduct={onDecrementProduct}
            />
          );
        })}
      </Row>
    </Container>
  );

  return (
    <>
      <CustomNavbar />
      {GlobalComponents.renderTitleDivider("Products")}
      {GlobalComponents.renderComponent(state, renderProducts)}
    </>
  );
};

export default Products;
