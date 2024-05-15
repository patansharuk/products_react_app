import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetch_products = () => {
      const products_url = "http://localhost:3002/products";
      const products_options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODA4MWZiNS05ZDE0LTQ4ZmEtYTVhMC0wMDgyMGRhOGRjMGYiLCJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE1ODAyMjQ4LCJleHAiOjE3MTU4MDQwNDh9.Xm9oyv0KiZptQH7CoWuX_Up5wHeUCFUwsJEt9XPFfoo",
        },
      };
      fetch(products_url, products_options)
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            // setMessage(data.errors);
            window.location.replace('/login')
          } else {
            setMessage("fetched data successfully!");
            setProducts(data);
          }
        })
        .catch((e) => console.log(e));
    };
    fetch_products();
  });

  return (
    <>
    <h1>{message}</h1>
      {products.map((product) => {
        return (
          <>
            <p>{product.title}</p>
            <p>{product.desciption}</p>
          </>
        );
      })}
    </>
  );
};

export default Products;
