import express from 'express';
import stripePackage from 'stripe';

const stripe = stripePackage('sk_test_51Qaxe6G6Ub6sOweclrCOerodIZnFtjVXa6ildV1uWR1kz8ZL2RQFy0pYMTu8tkrJZICeZVhahekr8rmUXthPs2xQ001BEOvL2m');

const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5173/';



app.get('/', (req, res) => {res.send('Hello World!')});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1QnD8xG6Ub6sOwecX6lXpBVg',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
});

  res.redirect(303, session.url);
});

app.listen(5000, () => console.log('Running on port 5000'));