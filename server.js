require("dotenv").config();

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require('./routes/apiRoutes');
// Testing port will be 5000
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

//const TEST_PRICE = "price_1LtZepI1cZyhQVfh5u8fotxD";
//const LIVE_PRICE = "price_1LtaQhI1cZyhQVfhe7KmL9Fi";

// Initialize express server
const app = express();
// cors
// app.use(cors({ origin: "*" }));

// Serve static files from public
app.use(express.static("public"));

app.use("/", htmlRoutes);
app.use('/api', apiRoutes);

// STRIPE
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: "price_1LucRII1cZyhQVfhK1chS3Ws",
                //price: TEST_PRICE,
                quantity: 1,
            },
        ],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        shipping_options: [
            {
                shipping_rate: "shr_1LyNzmI1cZyhQVfhZYeNI8Qx",
            },
        ],
        mode: 'payment',
        success_url: `https://postcardsthroughhell.com/success.html`,
        cancel_url: `https://postcardsthroughhell.com/index.html`,
        //success_url: `http://localhost:5000/success.html`,
        //cancel_url: `http://localhost:5000/index.html`,
        automatic_tax: { enabled: true },
    });

    res.redirect(303, session.url);

});

// EXPRESS SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}...`);
});
