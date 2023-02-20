describe('Listing restaurants', () => {
  it('shows restaurants', () => {
    const sushiPlace = 'Sushi place';
    const pizzaPlace = 'Pizza place';

    cy.intercept('https://api.outsidein.dev/*/restaurants', [
      {id: 1, name: sushiPlace},
      {id: 2, name: pizzaPlace},
    ]);

    cy.visit('/');
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});
