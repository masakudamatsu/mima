// adapted from https://stripe.com/docs/checkout/quickstart?client=next

import {withApiAuthRequired, getSession} from '@auth0/nextjs-auth0';

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
  // retrieve Auth0 user data from cookie
  const {user} = getSession(req, res);
  try {
    // Create Checkout Sessions from body params.
    // API reference: https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      // prefill user email address; see https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout#prefill-customer-data
      customer_email: user.email,
      // define a product
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1Lu8iZBbNZRzzXQSO4LRMB7e',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        // API ref: https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-subscription_data
        metadata: {
          auth0_user_id: user.sub, // to be used in stripe_webhooks.api.js
        },
      },
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/subscribe?canceled=true`,
      // if req.headers.origin doesn't work, see https://stackoverflow.com/questions/29531521/req-headers-origin-is-undefined
    });
    res.redirect(303, session.url);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});
