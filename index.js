const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SK);

app.use(cors());
app.use(express.json());

app.post('/criar-pagamento', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card'],
        });
        
        res.send({
            clientSecret: paymentIntent.client_secret,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'O pagamento não foi ser concluído'});
    }
});

app.listen(3000, () => {

    console.log('Servidor rodando na porta 3000');
  });
