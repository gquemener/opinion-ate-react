describe('Creating a restaurant', () => {
  it('allows adding a restaurant', () => {
    const restaurantId = 8274;
    const restaurantName = 'Acme Inc.';

    cy.intercept('GET', 'https://api.outsidein.dev/*/restaurants', []);
    cy.intercept('POST', 'https://api.outsidein.dev/*/restaurants', {
      id: restaurantId,
      name: restaurantName,
    }).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
    cy.contains('Add').click();

    cy.wait('@addRestaurant').its('request.body').should('deep.equal', {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
