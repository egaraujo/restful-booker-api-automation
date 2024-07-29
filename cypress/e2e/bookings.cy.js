/// <reference types="Cypress" />

describe('bookings', () => {

  it('should be up and running', () => {
      cy.api('GET', '/ping').then((response) =>{
        expect(response.status).to.eq(201);
        expect(response.body).to.contain('Created');
    })
  })

  it('should create a new token', () => {
    cy.api({
      method: 'POST',
      url: '/auth',
      body: {
        username: Cypress.env('bookingUsername'),
        password: Cypress.env('bookingPassword')
      },
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.have.lengthOf(15);
    })
  })

  it('should return ten bookings initially', () => {
    cy.api('GET', '/booking').then((response) =>{
      expect(response.status).to.eq(200);
      expect(response.body.length).to.eq(10)
    })
  })

  it('should create a new booking', () => {
    cy.createBooking()
      .its('body.bookingid')
      .should('be.a', 'number').then(bookingId => {
        cy.api('GET', `/booking/${bookingId}`).then((response) =>{
          expect(response.status).to.eq(200);
          expect(response.body.firstname).to.eq('Jim');
          expect(response.body.lastname).to.eq('Brown');
          expect(response.body.totalprice).to.eq(250);
          expect(response.body.depositpaid).to.eq(true);
          expect(response.body.bookingdates.checkin).to.eq('2024-11-01')
          expect(response.body.bookingdates.checkout).to.eq('2025-02-20')
          expect(response.body.additionalneeds).to.eq('Breakfast')

        cy.deleteBooking(bookingId, Cypress.env('bookingAuthValue')).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.contain('Created');
          })
        })
    })
  })

  it('should perform partial booking update', () => {
    cy.createBooking()
      .its('body.bookingid')
      .should('be.a', 'number').then((bookingId) => {
        cy.api({
          method: 'PATCH',
          url: `/booking/${bookingId}`,
          body: {
            firstname : "Robert"
          },
          headers: {
            accept: 'application/json',
            authorization: Cypress.env('bookingAuthValue')
          }
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body.firstname).to.eq('Robert');
            expect(response.body.lastname).to.eq('Brown');
            expect(response.body.totalprice).to.eq(250);
            expect(response.body.depositpaid).to.eq(true);
            expect(response.body.bookingdates.checkin).to.eq('2024-11-01')
            expect(response.body.bookingdates.checkout).to.eq('2025-02-20')
            expect(response.body.additionalneeds).to.eq('Breakfast')
        })

        cy.deleteBooking(bookingId, Cypress.env('bookingAuthValue')).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.contain('Created');
        })
      })
  })

  it('should perform full booking update', () => {
    cy.createBooking()
      .its('body.bookingid')
      .should('be.a', 'number').then((bookingId) => {
        cy.api({
          method: 'PUT',
          url: `/booking/${bookingId}`,
          body: {
            firstname : "Roger",
            lastname : "Taylor",
            totalprice : 170,
            depositpaid : false,
            bookingdates : {
            checkin : "2025-03-01",
            checkout : "2025-05-31"
            },
          additionalneeds : "Car rental"
          },
          headers: {
            accept: 'application/json',
            authorization: Cypress.env('bookingAuthValue')
          }
        }).then((response) =>{
          expect(response.status).to.eq(200);
          expect(response.body.firstname).to.eq('Roger');
          expect(response.body.lastname).to.eq('Taylor');
          expect(response.body.totalprice).to.eq(170);
          expect(response.body.depositpaid).to.eq(false);
          expect(response.body.bookingdates.checkin).to.eq('2025-03-01')
          expect(response.body.bookingdates.checkout).to.eq('2025-05-31')
          expect(response.body.additionalneeds).to.eq('Car rental')
        })

        cy.deleteBooking(bookingId, Cypress.env('bookingAuthValue')).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.contain('Created');
        })
      })
  })

  it('should delete a booking', () => {
    cy.createBooking()
      .its('body.bookingid')
      .should('be.a', 'number').then(bookingId => {
        cy.deleteBooking(bookingId, Cypress.env('bookingAuthValue')).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.contain('Created');
        })
      })
  })

})