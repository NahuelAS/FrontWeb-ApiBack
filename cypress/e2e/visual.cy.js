/// <reference types="Cypress"/>

describe("Demostracion", () => {
    it("Corroboracion de aparicion de equipos", () => {
        cy.visit("http://127.0.0.1:8081", {fixture:'equipos.json'}).as("equipos");
        cy.get(".row .col .card").should('have.length', 23);

        cy.get('#btnLink').click();

        cy.url().should('include', 'http://127.0.0.1:8081/Web/Templates/mostrar_equipo?id=57');
    });
});
