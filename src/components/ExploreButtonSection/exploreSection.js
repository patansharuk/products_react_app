import React from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

const ExploreButtonSection = () => {
  return (
    <div className="container pt-4 pb-4 text-center">
      <h2 className="font-roboto">Explore the millions of products</h2>
      <Button variant="danger" href="/stores/products">
        Explore Now
      </Button>
    </div>
  );
};

export default ExploreButtonSection;
