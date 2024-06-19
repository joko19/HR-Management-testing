describe("Test Automation for OrangeHRM Add User Page", () => {
    before(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/");
        cy.get('input[name="username"]').type("Admin");
        cy.get('input[name="password"]').type("admin123");
        cy.get('button[type="submit"]').click();
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee");
    });
    it("Verify Add Employee title is displayed correctly", () => {
      cy.get(".orangehrm-main-title").should("contain.text", "Add Employee");
    });
  
    it("Check employee image section allows uploading and displays the image", () => {
      const fileName = "sample-image.png";
      cy.fixture(fileName).then(fileContent => {
        cy.get(".oxd-file-input").attachFile({ fileContent, fileName, mimeType: "image/png" });
        cy.get(".employee-image").should("have.attr", "src").and("include", fileName);
      });
    });
  
    it("Ensure employee full name fields are editable", () => {
      const firstName = "John";
      const middleName = "Doe";
      const lastName = "Smith";
      cy.get(".orangehrm-firstname").type(firstName).should("have.value", firstName);
      cy.get(".orangehrm-middlename").type(middleName).should("have.value", middleName);
      cy.get(".orangehrm-lastname").type(lastName).should("have.value", lastName);
    });
  
    it("Verify Create Login Details section includes a checkbox", () => {
      cy.contains(".user-form-header-text", "Create Login Details").should("exist");
      cy.get(".oxd-switch-input").should("exist");
    });
  
    it("Test Cancel button cancels employee addition process", () => {
      cy.get(".oxd-button--ghost").click();
      cy.url().should("not.contain", "/addEmployee");
    });
  
    it("Confirm Save button saves employee details successfully", () => {
      cy.get(".oxd-button--secondary").click();
      // Add assertions for successful save, navigate to next page, or display success message
    });
  });