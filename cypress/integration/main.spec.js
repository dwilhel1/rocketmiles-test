describe('rocketmiles-test integration tests', function () {
    beforeEach(function () {
        cy.server();
        cy.fixture('getHotels').as('getHotelsResponse');
    });

    context('Without data', function () {
        beforeEach(function () {
            cy.route('GET', `${Cypress.env('endpointServer')}/rates`, {}).as('hotelsRoute');
            cy.visit('/');
            cy.wait('@hotelsRoute');
        });

        it('displays no data message', function () {
            cy.get('body').should('contain', 'No hotel results');
        });

        it('displays search controls', function () {
            cy.get('mat-card').eq(0).should('contain', 'Search')
                .and('contain', 'Filter hotel results');
            cy.get('mat-card').eq(0).find('input[ng-reflect-name="hotelSearch"]').should('be.enabled');
            cy.get('mat-card').eq(0).find('mat-select[ng-reflect-name="currency"]').should('not.have.class', 'mat-select-disabled');
            cy.get('mat-card').eq(0).find('button').eq(0).should('be.disabled');
            cy.get('mat-card').eq(0).find('button').eq(1).should('be.enabled');

            // mat-select has default options
            cy.get('mat-select[ng-reflect-name="currency"]').click();
            cy.get('mat-option').eq(0).should('have.class', 'mat-option-disabled');
            cy.get('mat-option').should('contain', 'Recommended')
                .and('contain', 'Price low-to-high')
                .and('contain', 'Price high-to-low');
        });
    });

    context('With route errors', function () {
        beforeEach(function () {
            cy.route({
                method: 'GET',
                url: `${Cypress.env('endpointServer')}/rates`,
                status: 500,
                response: {},
            }).as('hotelsRoute');
            cy.visit('/');
            cy.wait('@hotelsRoute');
        });

        it('displays contacts error message', function () {
            cy.get('body').should('contain', 'Error requesting hotels')
                .and('contain', 'No hotel results');
        });

        it('displays disabled search controls', function () {
            cy.get('mat-card').eq(0).find('input[ng-reflect-name="hotelSearch"]').should('be.disabled');
            cy.get('mat-card').eq(0).find('mat-select[ng-reflect-name="currency"]').should('have.class', 'mat-select-disabled');
            cy.get('mat-card').eq(0).find('button').eq(0).should('be.disabled');
            cy.get('mat-card').eq(0).find('button').eq(1).should('be.enabled');
        })
    });

    context('With all data', function () {
        beforeEach(function () {
            cy.route('GET', `${Cypress.env('endpointServer')}/rates`, '@getHotelsResponse').as('hotelsRoute');
            cy.visit('/');
            cy.wait('@hotelsRoute');
        });

        it('displays correct number of hotel results', function () {
            cy.get('mat-card').eq(0).should('contain', `Filter hotel results (${this.getHotelsResponse.results.hotels.length})`);
            cy.get('.search-result-card').should('have.length', this.getHotelsResponse.results.hotels.length);
        });

        it('displays correct hotel data', function () {
            // Check for static hotel data
            this.getHotelsResponse.results.hotels.forEach(function (hotel, index) {
                cy.get('.search-result-card').eq(index).should('contain', hotel.hotelStaticContent.name)
                    .and('contain', hotel.hotelStaticContent.neighborhoodName)
                    .and('contain', `${hotel.hotelStaticContent.rating} / 10`)
                    .and('contain', hotel.lowestAveragePrice.amount);
                cy.get('.search-result-card').eq(index).find('img').should('have.attr', 'src', hotel.hotelStaticContent.mainImage.url)
            })
        });

        it('filters hotel data', function () {
            // No search results
            cy.get('input[ng-reflect-name="hotelSearch"]').type('sdfkhbsdfkhbsdkhjfbsdkhjbfsdkjfb');
            cy.get('mat-card').eq(0).find('button').eq(0).should('be.enabled');
            cy.get('.search-result-card').should('have.length', 0);

            // All search results
            cy.get('mat-card').eq(0).find('button').eq(1).click();
            cy.get('.search-result-card').should('have.length', this.getHotelsResponse.results.hotels.length);

            // Some search results
            cy.get('input[ng-reflect-name="hotelSearch"]').type('marriot');
            cy.get('.search-result-card').should('have.length', 1);
        });

        it('sorts hotel data', function () {
            // Low to high
            cy.get('mat-select[ng-reflect-name="currency"]').click();
            cy.get('mat-option').contains('Price low-to-high').click();
            cy.get('mat-card').eq(0).find('button').eq(0).should('be.enabled');
            cy.get('.search-result-card').first().should('contain', this.getHotelsResponse.results.hotels[2].hotelStaticContent.name)
              .and('contain', this.getHotelsResponse.results.hotels[2].hotelStaticContent.neighborhoodName)
              .and('contain', `${this.getHotelsResponse.results.hotels[2].hotelStaticContent.rating} / 10`)
              .and('contain', this.getHotelsResponse.results.hotels[2].lowestAveragePrice.amount);
            cy.get('.search-result-card').first().find('img').should('have.attr', 'src', this.getHotelsResponse.results.hotels[2].hotelStaticContent.mainImage.url);

            // High to low
            cy.get('mat-select[ng-reflect-name="currency"]').click();
            cy.get('mat-option').contains('Price high-to-low').click();
            cy.get('mat-card').eq(0).find('button').eq(0).should('be.enabled');
            cy.get('.search-result-card').first().should('contain', this.getHotelsResponse.results.hotels[3].hotelStaticContent.name)
                .and('contain', this.getHotelsResponse.results.hotels[3].hotelStaticContent.neighborhoodName)
                .and('contain', `${this.getHotelsResponse.results.hotels[3].hotelStaticContent.rating} / 10`)
                .and('contain', this.getHotelsResponse.results.hotels[3].lowestAveragePrice.amount);
            cy.get('.search-result-card').first().find('img').should('have.attr', 'src', this.getHotelsResponse.results.hotels[3].hotelStaticContent.mainImage.url);
        });

        it('sorts and filters hotel data', function () {
            cy.get('input[ng-reflect-name="hotelSearch"]').type('chicago');
            cy.get('.search-result-card').should('have.length', 6);

            cy.get('mat-select[ng-reflect-name="currency"]').click();
            cy.get('mat-option').contains('Price high-to-low').click();
            cy.get('.search-result-card').first().should('contain', this.getHotelsResponse.results.hotels[6].hotelStaticContent.name)
              .and('contain', this.getHotelsResponse.results.hotels[6].hotelStaticContent.neighborhoodName)
              .and('contain', `${this.getHotelsResponse.results.hotels[6].hotelStaticContent.rating} / 10`)
              .and('contain', this.getHotelsResponse.results.hotels[6].lowestAveragePrice.amount);
            cy.get('.search-result-card').first().find('img').should('have.attr', 'src', this.getHotelsResponse.results.hotels[6].hotelStaticContent.mainImage.url);
        });
    });
});
