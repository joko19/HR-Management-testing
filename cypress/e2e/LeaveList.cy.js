describe("Leave List Tests", () => {
  before(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/");
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList");
  });

  it("Verify Leave List title is displayed correctly", () => {
    cy.get(".oxd-table-filter-title").should("contain.text", "Leave List");
  });

  it("Test From Date input field with valid date", () => {
    cy.get("input[placeholder='yyyy-dd-mm']")
      .type("2022-12-01")
      .should("have.value", "2022-12-01");
  });

  it("Test To Date input field with valid date", () => {
    cy.get("input[placeholder='yyyy-dd-mm']")
      .eq(1)
      .type("2022-12-15")
      .should("have.value", "2022-12-15");
  });

  it("Check Show Leave with Status dropdown functionality", () => {
    cy.get(".oxd-select-text-input").eq(0).click();
    cy.contains(".oxd-chip", "Pending Approval").click();
    cy.get(".oxd-select-text-input")
      .eq(0)
      .should("contain.text", "Pending Approval");
  });

  it("Test autocomplete feature in Employee Name field", () => {
    cy.get("input[placeholder='Type for hints...']").type("John Doe");
    cy.contains(".oxd-autocomplete-text-input", "John Doe").click();
    cy.get("input[placeholder='Type for hints...']").should(
      "have.value",
      "John Doe"
    );
  });

  it("Verify Sub Unit dropdown functionality", () => {
    cy.get(".oxd-select-text-input").eq(1).click();
    cy.contains(".oxd-select-text-input", "Option 1").click();
    cy.get(".oxd-select-text-input").eq(1).should("contain.text", "Option 1");
  });

  it("Test checkbox for Include Past Employees", () => {
    cy.get("input[type='checkbox']").check().should("be.checked");
  });

  it("Verify Search button triggers search action", () => {
    cy.get(".oxd-button--secondary").click();
    // Add assertion for search action if needed
  });
});
