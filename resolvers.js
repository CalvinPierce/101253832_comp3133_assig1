const Booking = require('./models/Booking')
const Listing = require('./models/Listing')
const User = require('./models/User')
const jwt = require("jsonwebtoken");

exports.resolvers = {
    Query: {
        getCurrentUser: async (parent, args, { user, sub }) => {
            return await User.findById(sub);
        },
        getBookingsByCurrentUser: async (parent, args, { user }) => {
            return await Booking.find({ username: user.username });
        },
        getListingsByAdmin: async (parent, args) => {
            return await Listing.find({ username: args.username });
        },
        getListingsByCurrentAdmin: async (parent, args, { user }) => {
            return await Listing.find({ username: user.username });
        },
        getListingsByName: async (parent, args) => {
            return await Listing.find(args);
        },
        getListingsByCity: async (parent, args) => {
            return await Listing.find(args);
        },
        getListingsByPostalCode: async (parent, args) => {
            return await Listing.find({ postal_code: args.postal_code });
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            let newUser = new User(args)
            return newUser.save();
        },
        login: async (parent, args) => {
            let user = await User.findOne({ username: args.username, password: args.password });
            return await jwt.sign({ user }, "SUPER_SECRET", { algorithm: "HS256", subject: user._id.toString(), expiresIn: "1d" });
        },
        createListing: async (parent, args, { user }) => {
            if (!user) {
                return null;
            }

            let newListing = await Listing({
                listing_id: args.listing_id,
                listing_title: args.listing_title,
                description: args.description,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
                username: user.username,
            });
            return newListing.save();
        },
        createBooking: async (parent, args, { user }) => {
            if (!user) {
                return null;
            }

            let newBooking = await Booking({
                listing_id: args.listing_id,
                booking_id: args.booking_id,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                username: user.username,
            });
            return newBooking.save();
        },
    }

}