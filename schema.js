const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        password: String!
        email: String!
        type: String!
    }

    type Listing {
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }

    type Booking {
        id: ID!
        listing_id: String!
        booking_id: String!
        booking_date: Date!
        booking_start: Date!
        booking_end: Date!
        username: String!
    }

    type Query {
        getCurrentUser: User!
        getBookingsByCurrentUser: [Booking]
        getListingsByAdmin(username: String!): [Listing]
        getListingsByCurrentAdmin: [Listing]
        getListingsByName(listing_title: String!): [Listing]
        getListingsBySearch(search_string: String!): [Listing]
        getListingsByCity(city: String!): [Listing]
        getListingsByPostalCode(postal_code: String!): [Listing]
        getAllListings: [Listing]
    }

    type Mutation {
        createUser(
            username: String!
            firstname: String!
            lastname: String!
            email: String!
            password: String!
            type: String!
        ): User

        login(
            username: String!
            password: String!
        ): String

        createListing(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!
            email: String!
            username: String!
        ): Listing

        createBooking(
            listing_id: String!
            booking_id: String!
            booking_start: String!
            booking_end: String!
        ): Booking
    }
`