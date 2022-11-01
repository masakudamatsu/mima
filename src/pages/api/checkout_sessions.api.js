// adapted from https://stripe.com/docs/checkout/quickstart?client=next

import {withApiAuthRequired} from '@auth0/nextjs-auth0';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default withApiAuthRequired(async function handleCheckoutSessions(
  req,
  res,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    // Create Checkout Sessions from body params.
    // API reference: https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      // define a product
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1Lu8iZBbNZRzzXQSO4LRMB7e',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/subscribe?success=true`,
      cancel_url: `${req.headers.origin}/subscribe?canceled=true`,
      // if req.headers.origin doesn't work, see https://stackoverflow.com/questions/29531521/req-headers-origin-is-undefined
    });
    res.redirect(303, session.url);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});
