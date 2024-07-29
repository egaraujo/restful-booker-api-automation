// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createBooking', () => {
    cy.api({
        method: 'POST',
        url: '/booking',
        body: {
          firstname : "Jim",
          lastname : "Brown",
          totalprice : 250,
          depositpaid : true,
          bookingdates : {
          checkin : "2024-11-01",
          checkout : "2025-02-20"
        },
        additionalneeds : "Breakfast"
        },
        headers: {
          accept: 'application/json'
        }
      })
  })

  Cypress.Commands.add('deleteBooking', (bookingId, authValue) => {
    cy.api({
        method: 'DELETE',
        url: `/booking/${bookingId}`,
        headers: {
            accept: 'application/json',
            authorization: authValue
        }
      })
  })