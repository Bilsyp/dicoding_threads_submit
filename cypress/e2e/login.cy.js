describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login form", () => {
    cy.getDataTest("form-test").should("be.exist");
    cy.getDataTest("form-test").find("input").should("be.exist");
  });

  it("should allow user to input email and password", () => {
    cy.getDataTest("email-test").type("John@gmail.com");
    cy.getDataTest("password-test").type("Hello World haha");
  });

  it("should allow user to login", () => {
    cy.getDataTest("email-test").type("cosmos@gmail.com");
    cy.getDataTest("password-test").type("123456");
    cy.getDataTest("login-button").click();
  });

  it("should intercept login request with correct body", () => {
    cy.intercept("POST", "https://forum-api.dicoding.dev/v1/login", {
      fixture: "login.json",
    }).as("loginRequest");
    cy.getDataTest("email-test").type("cosmos@gmail.com");
    cy.getDataTest("password-test").type("123456");
    cy.getDataTest("login-button").click();

    cy.wait("@loginRequest").then((interception) => {
      cy.contains("login berhasil").should("be.visible");

      cy.wait(8000);

      const requestBody = interception.request.body;
      cy.wrap(requestBody).its("email").should("eq", "cosmos@gmail.com");
    });
    cy.url().should("include", "/profile");
  });
  it("should handle error with unauthorized", () => {
    cy.intercept("POST", "https://forum-api.dicoding.dev/v1/login").as(
      "loginRequest"
    );

    cy.getDataTest("email-test").type("cosmo@gmail.com");
    cy.getDataTest("password-test").type("123456");
    cy.getDataTest("login-button").click();

    cy.contains("connection timeout").should("be.visible");

    cy.wait("@loginRequest").then((interception) => {
      const responseStatusCode = interception.response.statusCode;
      cy.contains("email or password is wrong").should("be.visible");

      expect(responseStatusCode).to.equal(401);
    });
  });
});
