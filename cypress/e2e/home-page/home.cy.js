describe('Home page', () => {
  describe('Render the Home component', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should render the title and subtitle of the page', () => {
      cy.get('h1').contains('Tabela FIPE').should('be.visible')
      cy.get('h2')
        .contains('Consulte o valor de um veículo de forma gratuita')
        .should('be.visible')
    })

    it('should render the form component', () => {
      cy.get('#input-brand-label').contains('Marcas').should('be.visible')
      cy.get('#input-brand').should('be.visible')
      cy.get('#input-model-car-label').contains('Modelos').should('be.visible')
      cy.get('#input-model-car').should('be.visible').and('be.disabled')
      cy.get('#input-year-model').should('not.exist')
      cy.get('button[type="submit"]')
        .contains('Consultar preço')
        .should('be.visible')
        .and('be.disabled')
    })
  })

  describe('Validates interaction with form fields', () => {
    beforeEach(() => {
      cy.visit('/')

      cy.intercept({
        method: 'GET',
        url: `https://parallelum.com.br/fipe/api/v1/carros/marcas`
      }, {
        fixture: 'brands.json'
      }).as('listBrands')

      cy.intercept({
        method: 'GET',
        url: `https://parallelum.com.br/fipe/api/v1/carros/marcas/21/modelos`
      }, {
        fixture: 'model-car.json'
      }).as('listModelCar')
    })

    it('should be able to enable the Models field when selecting a brand', () => {
      cy.wait('@listBrands')

      cy.get('#input-brand').click()
      cy.focused().type('f')

      cy.contains('Fiat')
        .should('be.visible')
        .and('have.class', 'MuiAutocomplete-option')
        .click()

      cy.get('#input-brand').should('have.value', 'Fiat')
      cy.get('#input-model-car').should('not.be.disabled')
    })

    it('should be possible to disable the Models field when clearing the Brands field', () => {
      cy.wait('@listBrands')

      cy.get('#input-brand').click()
      cy.focused().type('f')

      cy.contains('Fiat')
        .should('be.visible')
        .and('have.class', 'MuiAutocomplete-option')
        .click()

      cy.get('#input-brand').should('have.value', 'Fiat')
      cy.get('[data-testid="CloseIcon"').click()
      cy.get('[data-cy="error-message"]')
        .contains('Informe uma marca')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#input-model-car').should('be.disabled')
    })

    it('should be possible to display the Model Year field when selecting a model', () => {
      cy.wait('@listBrands')

      cy.get('#input-brand').click()
      cy.focused().type('f')

      cy.contains('Fiat')
        .should('be.visible')
        .and('have.class', 'MuiAutocomplete-option')
        .click()

      cy.get('#input-brand').should('have.value', 'Fiat')

      cy.wait('@listModelCar')

      cy.get('#input-model-car').click()
      cy.focused().type('id')

      cy.contains('Idea ATTRACTIVE 1.4 Fire Flex 8V 5p')
        .should('be.visible')
        .and('have.class', 'MuiAutocomplete-option')
        .click()

      cy.get('#input-model-car')
        .should('have.value', 'Idea ATTRACTIVE 1.4 Fire Flex 8V 5p')
      cy.get('#input-year-model').should('exist')
      cy.get('#input-year-model-label').should('be.visible')
    })

    it('should be possible to hide the Model Year field when clearing the Models field', () => {
      cy.wait('@listBrands')

      cy.get('#input-brand').click()
      cy.focused().type('f')

      cy.contains('Fiat')
        .should('be.visible')
        .and('have.class', 'MuiAutocomplete-option')
        .click()

      cy.get('#input-brand').should('have.value', 'Fiat')

      cy.wait('@listModelCar')

      cy.get('#input-model-car').click()
      cy.focused().type('id')

      cy.contains('Idea ATTRACTIVE 1.4 Fire Flex 8V 5p')
        .should('be.visible')
        .and('have.class', 'MuiAutocomplete-option')
        .click()

      cy.get('#input-model-car')
        .should('have.value', 'Idea ATTRACTIVE 1.4 Fire Flex 8V 5p')
      cy.get('#input-year-model').should('exist')
      cy.get('#input-year-model-label').should('be.visible')

      cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-clearIndicator > [data-testid="CloseIcon"]')
        .click()
      cy.get('[data-cy="error-message"]')
        .contains('Informe um modelo')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#input-year-model').should('not.exist')
    })
  })
})