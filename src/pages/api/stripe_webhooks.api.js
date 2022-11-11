// For updating Auth0 user data
import {getAccessToken, updateAppMetadata} from 'src/utils/callManagementApi';
import {statusType} from 'src/utils/type';

// For Stripe webhooks
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
    // See https://stripe.com/docs/billing/quickstart#provision-access-webhooks
    // See also https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=checkout#provision-and-monitor
    console.log(`Event ${event.type} received`);
    switch (event.type) {
      case 'invoice.paid': {
        // retrieve subscription object
        const invoice = event.data.object; // API ref: https://stripe.com/docs/api/invoices/object
        console.log(`Subscription ID ${invoice.subscription} retrieved`);
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription,
        ); // API ref: https://stripe.com/docs/api/subscriptions/retrieve
        console.log(`Stripe customer ID ${subscription.customer} retrieved`);
        console.log(
          `Subscription renewal date ${subscription.current_period_end} retrieved`,
        );
        console.log(
          `Auth0 user ID ${subscription.metadata.auth0_user_id} retrieved`,
        );
        // prepare for updating Auth0 user data
        const accessToken = await getAccessToken();
        const appMetadata = {
          status: statusType.subscribed,
          // save customer ID to the database
          stripe_id: subscription.customer,
          // provision the subscription
          expiration_date: new Date(
            subscription.current_period_end * 1000, // Stripe uses UNIX timestamps in seconds while JavaScript assumes in milliseconds
          ).toISOString(), // save in the format of "2022-12-02T00:14:18.000Z"
        };
        const userId = subscription.metadata.auth0_user_id;
        if (!userId) {
          throw new Error('Stripe subscription object misses Auth0 user ID.');
        }

        // update Auth0 user data with new subscription expiration date
        await updateAppMetadata({
          accessToken,
          appMetadata,
          userId,
        });
        break;
      }
      // case 'invoice.payment_failed':
      //   // send user to customer portal to update their payment info
      //   break;
      case 'customer.subscription.updated': {
        // retrieve subscription object
        const subscription = event.data.object;
        console.log(
          `Subscription object retrieved with 'cancel_at_period_end' value: "${subscription['cancel_at_period_end']}" retrieved`,
        );
        console.log(
          `Auth0 user ID ${subscription.metadata.auth0_user_id} retrieved`,
        );
        // record whether the user has cancelled subscription
        let status;
        if (subscription['cancel_at_period_end'] === true) {
          status = statusType.cancelled;
        } else if (subscription['cancel_at_period_end'] === false) {
          status = statusType.subscribed;
        } else {
          throw new Error(
            `Stripe subscription object misses "cancel_at_period_end" property.`,
          );
        }
        // prepare for updating Auth0 user data
        const accessToken = await getAccessToken();
        const appMetadata = {
          status,
        };
        const userId = subscription.metadata.auth0_user_id;
        if (!userId) {
          throw new Error('Stripe subscription object misses Auth0 user ID.');
        }
        // update Auth0 user data with new subscription expiration date
        await updateAppMetadata({
          accessToken,
          appMetadata,
          userId,
        });
        break;
      }
      case 'invoice.marked_uncollectible': {
        // this event takes place when users fail to pay after several recovery attempts by Stripe
        // as configured in https://dashboard.stripe.com/settings/billing/automatic

        // retrieve subscription object
        const invoice = event.data.object; // API ref: https://stripe.com/docs/api/invoices/object
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription,
        ); // API ref: https://stripe.com/docs/api/subscriptions/retrieve

        // prepare for updating Auth0 user data
        const accessToken = await getAccessToken();
        const appMetadata = {
          status: statusType.unpaid,
        };
        const userId = subscription.metadata.auth0_user_id;
        if (!userId) {
          throw new Error('Stripe subscription object misses Auth0 user ID.');
        }

        // update Auth0 user data with new subscription expiration date
        await updateAppMetadata({
          accessToken,
          appMetadata,
          userId,
        });
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    // "Send a successful 200 response to Stripe as quickly as possible because Stripe retries the event if a response isn’t sent within a reasonable time." (https://stripe.com/docs/webhooks/quickstart)
    res.send({received: true});
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
