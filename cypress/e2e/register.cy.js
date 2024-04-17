describe("Register spec", () => {
  beforeEach(() => {
    cy.visit("/signUp");
  });

  it("should display registration form", () => {
    cy.getDataTest("form-test").should("be.exist");
    cy.getDataTest("form-test").find("input").should("be.exist");
  });

  it("should allow user to input name, email, and password", () => {
    cy.getDataTest("name-test").type("John");
    cy.getDataTest("email-test").type("John@gmail.com");
    cy.getDataTest("password-test").type("123456");
    cy.getDataTest("match-password-test").type("123456");
  });

  it.only("should allow user to register", () => {
    cy.intercept("POST", "https://forum-api.dicoding.dev/v1/register", {
      fixture: "register.json",
    }).as("RegisterRequest");

    cy.getDataTest("name-test").type("John");
    cy.getDataTest("email-test").type("John@gmail.com");
    cy.getDataTest("password-test").type("123456");
    cy.getDataTest("match-password-test").type("123456");
    cy.getDataTest("register-button").click();
    cy.wait("@RegisterRequest").then((interception) => {
      cy.wait(8000);

      const responseStatusCode = interception.response.statusCode;
      // Periksa apakah status code respons adalah 401
      expect(responseStatusCode).to.equal(200);
    });
    // Menambahkan asersi untuk memastikan perilaku pendaftaran yang berhasil
  });

  it.only("should display error message if registration fails", () => {
    cy
      .intercept("POST", "https://forum-api.dicoding.dev/v1/register")
      .as("RegisterRequest"),
      cy.getDataTest("name-test").type("John");
    cy.getDataTest("email-test").type("John@gmail.com");
    cy.getDataTest("password-test").type("123456");
    cy.getDataTest("match-password-test").type("123456");

    cy.getDataTest("register-button").click();
    cy.wait("@RegisterRequest").then((interception) => {
      cy.wait(8000);

      const responseStatusCode = interception.response.statusCode;
      // Periksa apakah status code respons adalah 401
      expect(responseStatusCode).to.equal(400);
    });
    // Implementasi untuk pengujian jika pendaftaran gagal
    // Anda dapat menggunakan cy.intercept untuk mensimulasikan respons gagal dari server
    // Setelah itu, periksa apakah pesan kesalahan ditampilkan dengan benar
  });
});
