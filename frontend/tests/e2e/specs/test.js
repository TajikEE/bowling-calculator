

describe("Test game rolls", () => {
  it("Goes to home page and clicks on rolls", () => {
    cy.visit("/");
    cy.get('button.button')
    cy.contains("10")
    .click()
    cy.contains("X")
  });
});
