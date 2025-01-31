import cors from 'cors';
import express from 'express';
import stripePackage from 'stripe';

const stripe = stripePackage('sk_test_51Qaxe6G6Ub6sOweclrCOerodIZnFtjVXa6ildV1uWR1kz8ZL2RQFy0pYMTu8tkrJZICeZVhahekr8rmUXthPs2xQ001BEOvL2m');

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Ensure JSON body parsing
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5173';



app.get('/', (req, res) => {res.send('Hello World!')});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QnHQXG6Ub6sOwecMrx8wgWF',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(5000, () => console.log('Running on port 5000'));