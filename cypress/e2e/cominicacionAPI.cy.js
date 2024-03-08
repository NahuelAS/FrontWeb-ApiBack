/// <reference types="Cypress"/>

beforeEach(() => {
    cy.request('http://localhost:8080/equipos')

    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      cy.wrap(response.body).as('equipos');
    });
  });

  it('Deberia Recibir un objeto con 23 elementos', () => {
    cy.get('@equipos').should('have.length', 23);
  });