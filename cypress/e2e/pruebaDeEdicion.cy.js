/// <reference types="Cypress"/>

describe("Demostracion", () => {
  it("Corroboracion de editar equipos", () => {
      cy.visit("http://127.0.0.1:8081", {fixture:'equipos.json'}).as("equipos");
      cy.get(".row .col .card").should('have.length', 23);

      cy.get(".row .col .card").eq(22).find('#btnLink').click();

      cy.url().should('include', 'http://127.0.0.1:8081/Web/Templates/mostrar_equipo?id=812');

      cy.get('.edit').click();

      cy.get('#abreviatura-upd').type('BOC');
      cy.get('#abreviatura-upd').should('have.value', 'BOC');

      cy.get('.editarAbreviatura').click();
  });
});
