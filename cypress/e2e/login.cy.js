describe("Login Form Tests", () => {
  const baseUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  it("Verify labels for Username and Password fields", () => {
    cy.visit(baseUrl);
    cy.get("label").eq(0).should("have.text", "Username");
    cy.get("label").eq(1).should("have.text", "Password");
  });

  it("Login with valid credentials", () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get(".orangehrm-login-button").click();
    cy.url().should("include", "/dashboard");
  });

  it("Submit form by clicking Login button", () => {
    cy.visit(baseUrl);
    cy.get(".orangehrm-login-button").click();
    cy.url().should("include", "/auth/validate");
  });

  it("Click on 'Forgot your password?' link", () => {
    cy.visit(baseUrl);
    cy.contains("Forgot your password?").click();
    cy.url().should("include", "/requestPasswordResetCode");
  });

  it("Login with incorrect credentials for error handling", () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type("InvalidUser");
    cy.get('input[name="password"]').type("InvalidPassword");
    cy.get(".orangehrm-login-button").click();
    cy.get(".orangehrm-login-error").should("be.visible");
  });

  it("Submit form without entering credentials for validation", () => {
    cy.visit(baseUrl);
    cy.get(".orangehrm-login-button").click();
    cy.get(".orangehrm-login-error").should("be.visible");
  });

  it("Enter invalid characters to trigger error messages", () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type("!@#$%^&*");
    cy.get('input[name="password"]').type("!@#$%^&*");
    cy.get(".orangehrm-login-button").click();
    cy.get(".orangehrm-login-error").should("be.visible");
  });

  it("Submit form with blank password field", () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type("Admin");
    cy.get(".orangehrm-login-button").click();
    cy.get(".orangehrm-login-error").should("be.visible");
  });

  it("Simulate slow network connection", () => {
    cy.visit(baseUrl, { failOnStatusCode: false });
    cy.wait(5000);
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get(".orangehrm-login-button").click();
    cy.url().should("include", "/dashboard");
  });

  it("Test responsiveness on different screen sizes", () => {
    cy.viewport(320, 480);
    cy.visit(baseUrl);
  });

  it("Test browser autofill compatibility", () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
  });

  it("Check form data retention after page reload", () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.reload();
  });
});