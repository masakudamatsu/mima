import {buffer} from 'micro';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Disable Next.js's default parsing of request body
// See https://www.codedaily.io/tutorials/Stripe-Webhook-Verification-with-NextJS
export const config = {api: {bodyParser: false}};

export default async function handleStripeWebhooks(req, res) {
  if (req.method === 'POST') {
    let event;
    // Verify that Stripe did send the request
    const bufferReq = await buffer(req); // convert `req` to a buffer; see https://www.codedaily.io/tutorials/Stripe-Webhook-Verification-with-NextJS
    const signature = req.headers['stripe-signature'];
    const signingSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
    try {
      event = stripe.webhooks.constructEvent(
        bufferReq,
        signature,
        signingSecret,
      );
    } catch (err) {
      // Handle the case where it is not coming from Stripe
      console.log('Verifying request signature fails.');
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Handle the event
    // See https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=checkout#provision-and-monitor
    console.log(`event.type: ${event.type}`);
    // switch (event.type) {
    //   case 'checkout.session.completed':
    //     // provision the subscription
    //     // save customer ID to the database
    //     break;
    //   case 'invoice.paid':
    //     // continue the provision
    //     // store the status in the database
    //     break;
    //   case 'invoice.payment_failed':
    //     // send user to customer portal to update their payment info
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }
    // Return a 200 response to acknowledge receipt of the event
    // "Send a successful 200 response to Stripe as quickly as possible because Stripe retries the event if a response isn’t sent within a reasonable time." (https://stripe.com/docs/webhooks/quickstart)
    res.send({received: true});
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
