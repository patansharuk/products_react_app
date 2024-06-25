const domain = "http://localhost:3002";
let authToken = "";

describe("API Testing", () => {
  describe("Login", () => {
    it("With invalid credentials", () => {
      cy.request({
        method: "POST",
        url: domain + "/login",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(422);
      });
    });

    it("With valid credentials", () => {
      cy.request({
        method: "POST",
        url: domain + "/login",
        body: {
          user: {
            email: "sharukhan@admin.com",
            password: "123456",
          },
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        authToken = response.body.token;
      });
    });
  });

  describe("Signup", () => {
    it("With duplicate credentials", () => {
      cy.request({
        method: "POST",
        url: domain + "/signup",
        body: {
          user: {
            name: "sharu",
            email: "sharukhan@customer.com",
            password: "123456",
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property("errors");
      });
    });
  });

  describe("Products", () => {
    it("forbid products if unauthorised", () => {
      cy.request({
        method: "GET",
        url: domain + "/products",
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.eq("Unauthorised");
      });
    });

    it("get products if authorised", () => {
      cy.wrap(authToken).should("exist");

      cy.request({
        method: "GET",
        url: domain + "/products",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.message).to.eq("Products fetched successfully!");
      });
    });
  });

  describe("Stores", () => {
    it("forbid stores if unauthorised", () => {
      cy.request({
        method: "GET",
        url: domain + "/stores",
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.eq("Unauthorised");
      });
    });

    it("get stores if authorised", () => {
      cy.wrap(authToken).should("exist");

      cy.request({
        method: "GET",
        url: domain + "/stores",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.message).to.eq("Stores fetched successfully");
      });
    });
  });
});
