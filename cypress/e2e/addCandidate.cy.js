describe("Test Automation for Add Candidate Form", () => {
  before(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate"
    );
  });

  it("Verify Add Candidate title is displayed correctly", () => {
    cy.get(".orangehrm-main-title").should("contain.text", "Add Candidate");
  });

  it("Select an option from the Vacancy dropdown", () => {
    cy.get(".oxd-select-text-input").click();
    cy.get(".oxd-select-option").eq(1).click();
  });

  it("Check if Resume input allows uploading supported file types", () => {
    const fileName = "sample_resume.pdf";
    cy.fixture(fileName).then((fileContent) => {
      cy.get(".oxd-file-input").attachFile({
        fileContent,
        fileName,
        mimeType: "application/pdf",
      });
    });
  });

  it("Ensure Keywords input accepts commaseparated words", () => {
    const keywords = "keyword1, keyword2, keyword3";
    cy.get(".orangehrm-keywords").type(keywords);
  });

  it("Validate Date of Application input allows entering a valid date", () => {
    cy.get(".oxd-date-input").type("2022-12-31");
  });

  it("Enter notes in the Notes textarea", () => {
    const notes = "These are some notes for testing purposes.";
    cy.get(".oxd-textarea").type(notes);
  });

  it("Verify Consent to keep data checkbox can be checked", () => {
    cy.get(".oxd-checkbox-input").check();
  });

  it("Attempt to submit form without filling required Email field", () => {
    cy.get(".oxd-button--secondary").click();
    cy.get(".oxd-input--error").should("have.length", 1);
  });

  it("Enter an invalid date format in the Date of Application input", () => {
    cy.get(".oxd-date-input").type("31-12-2022");
    cy.get(".oxd-input--error").should("have.length", 1);
  });

  it("Try uploading a file format not supported by Resume input", () => {
    const fileName = "invalid_file.exe";
    cy.fixture(fileName).then((fileContent) => {
      cy.get(".oxd-file-input").attachFile({
        fileContent,
        fileName,
        mimeType: "application/octet-stream",
      });
      cy.get(".oxd-input--error").should("have.length", 1);
    });
  });

  it("Check if form submission fails when Consent to keep data checkbox is not checked", () => {
    cy.get(".oxd-button--secondary").click();
    cy.get(".oxd-input--error").should("have.length", 1);
  });

  it("Test behavior of form when entering special characters in input fields", () => {
    const specialChars = "!@#$%^&*()";
    cy.get(".oxd-input--active").type(specialChars);
  });

  it("Verify responsiveness of form by resizing browser window", () => {
    cy.viewport(1200, 800);
    cy.viewport(768, 1024);
    cy.viewport(375, 667);
  });

  it("Submit form with extremely long input values to check for UI issues", () => {
    const longText = "a".repeat(1000);
    cy.get(".oxd-input--active").type(longText);
    cy.get(".oxd-button--secondary").click();
  });

  it("Test form with different browser configurations for compatibility", () => {
    // Run test in different browsers or configurations
  });

  it("Verify form data persists when page is refreshed or navigated away from", () => {
    cy.get(".oxd-input--active").type("Test Data");
    cy.reload();
    cy.get(".oxd-input--active").should("have.value", "Test Data");
  });
});