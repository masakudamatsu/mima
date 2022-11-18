// Run all tests with Cypress Desktop app
// Reference: https://glebbahmutov.com/blog/run-all-specs-cypress-v10/

import './auth.cy';
import './background.cy';
import './geolocation.cy';
import './landmarks.cy';
import './menu.cy';
import './metadata.cy';
import './saved-places.cy';
import './saving-a-place.cy';
import './search.cy';
import './snapshot-geolocation.cy';
import './snapshot-initial-ui.cy';
import './snapshot-menu.cy';
import './snapshot-saved-places.cy';

// Before running these tests, create test users on Auth0 Dashboard
// (for password, see cypress.env.json)
//
// subscribed_user1@gmail.com
// {
//   "expiration_date": "2037-12-17T01:24:04.711Z",
//   "status": "subscribed"
// }
//
// subscribed_user2@yahoo.co.jp
// {
//   "expiration_date": "2037-12-17T01:31:14.027Z",
//   "status": "subscribed"
// }
//
// trial_user@gmail.com
// {
//   "expiration_date": "2037-12-08T00:00:58.185Z",
//   "status": "trial"
// }

// trial_expired_user@gmail.com
// {
//   "expiration_date": "2021-12-17T01:32:29.390Z",
//   "status": "trial"
// }

// subscription_expired_user@gmail.com
// {
//   "expiration_date": "2022-11-09T23:01:56.180Z",
//   "status": "subscribed"
// }

// unpaid_user@gmail.com
// {
//   "expiration_date": "2022-11-10T07:13:30.108Z",
//   "status": "unpaid"
// }

// cancelled_user@gmail.com
// {
//   "expiration_date": "2022-11-10T02:14:37.501Z",
//   "status": "cancelled"
// }
