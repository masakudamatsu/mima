// Follow the instruction below to test stripe_webhooks.api.js
// This file is not meant to be executed with Jest.

beforeAll(() => {
  // ** Launch webhook endpoint **
  // npm run dev
  // ngrok http 3000
  // copy URL (should be ending with .jp.ngrok.io)
  // visit https://dashboard.stripe.com/test/webhooks/we_1LvF8aBbNZRzzXQSJBf1rqZl
  // select the webhook
  // click "Update details"
  // paste the URL to Endpoint URL with suffix with /api/stripe_webhooks
  //
  // ** Create Auth0 test user **
  // visit Auth0 dashboard: https://manage.auth0.com/dashboard/jp/my-ideal-map/users
  // create a new user with masakudamatsu@gmail.com
  // take note of user_id and expiration_date
  //
});
beforeEach(() => {
  // ** Create a test clock **
  // visit https://dashboard.stripe.com/test/test-clocks
  // click "+New simulation" on the upper right,
  // enter the simulation name.
  // set the clock time to be January 1st, 2022, 12:00 (or two years ago, as the clock cannot move forward more than two years). If the clock time is in the future, you won't see "Update payment method" on Customer Portal if payment fails.
  //
  // ** Create a test Stripe customer
  // click "+Add first customer" on the bottom of the page
  // enter name and Email: masakudamatsu@gmail.com then click "Add customer"
  // access the customers
  // then on the payment method tab, click "add" then "add card".
  // add three cards right here
  // - 4242 4242 4242 4242 : this simulate the normal card, they can be used to pay everything in test mode.
  // - 4000 0000 0000 0341 : this simulate the cards that can be attached for customers BUT the payment will always failed.
  // - 4100 0000 0000 0019 : always blocked by Rader to prevent fraud
  //
  // ** Start a subscription for the test customer
  // click "Action" then "create subscription".
  // add monthly products
  // set the payment to "Automatically charge a payment method on file" then select the "4242" card that we had added beforehand.
  // click "Start test subscription".
  //
  // ** Add metadata to the subscription object (cannot be done when creating it...)
  // click into Subscription
  // click Edit metadata (this button won't appear unless the subscription has started...)
  // add the key-value pair of `auth0_user_id` and Auth0 user ID as metadata:
  //
  // ** Manually update Auth0 user app_metadata (the invoice.paid webhook failed as the subscription object lacks metadata when the event was emitted)
  // On Auth0 dashboard, manually update app_metadata as follows:
  // {
  //   "expiration_date": Subscription end date shown on Stripe dashboard,
  //   "status": "subscribed",
  //   "stripe_id": Stripe ID shown on the dashboard
  // }
});

test.skip('invoice.paid: handling subscription renewal', () => {
  // ** Execute **
  // visit Test Clock: https://dashboard.stripe.com/test/test-clocks/
  // Advance time 1 month
  //
  // ** Verify **
  // visit Auth0 dashboard: https://manage.auth0.com/dashboard/jp/my-ideal-map/users
  // verify the app_metadata as
  // {
  //   "expiration_date": Updated to the NEW subscription end date shown on dashboard,
  //   "status": "subscribed",
  //   "stripe_id": Stripe ID shown on the dashboard
  // }
});

test.skip('handling failed payment', () => {
  // ** Simulate an invalid credit card **
  // visit the test clock on Stripe dashboard
  // click into the subscription
  // click on the "action" button, then click "update subscription".
  // change the payment method card into "0341" one.
  // update the subscription.
  //
  // ** Execute **
  // Advance time by 1 month and 1 hour). This will change the user's subscription status into "Overdue".
  //
  // ** Verify **
  // Verify Auth0 user app_metadata to be:
  // {
  //   "expiration_date": same as before,
  //   "status": "subscribed",
  //   "stripe_id": Test user's Stripe customer ID
  // }
  // Visit customer portal: https://billing.stripe.com/p/login/test_9AQ9Ebdw97VxbiE288
  // Enter email address and click "Send code"
  // Check email and enter confirmation code
  // Verify "Update payment method" button appears.
  // ** Execute **
  // Click the button and update the payment method to be 4242.
  //
  // ** Verify **
  // Verify Auth0 user app_metadata to be:
  // {
  //   "expiration_date": Updated to the new subscription end date shown on Stripe dashboard,
  //   "status": "subscribed",
  //   "stripe_id": Test user's Stripe customer ID
  // }
});

test.skip('invoice.marked_uncollectible: handling repeated failure of payment', () => {
  // ** Simulate repeated payment failure **
  // visit the test clock on Stripe dashboard
  // click into the subscription
  // click on the "action" button, then click "update subscription".
  // change the payment method card into "0019" one (as recommended by Stripe support)
  // update the subscription.
  //
  // ** Execute **
  // advance time by 1 month and 1 hour
  // verify that the user status is "Overdue"
  // advance time by 1 week (as we've configured that the subscriptioin will be cancelled after 7 days)
  //
  // ** Verify **
  // verify that Auth0 user app_data is updated as
  // {
  //   "expiration_date": Same as before,
  //   "status": "unpaid",
  //   "stripe_id": Test user's Stripe ID
  // }
  //
});
