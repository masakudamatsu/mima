export const statusType = {
  cancelled: 'cancelled',
  subscribed: 'subscribed',
  trial: 'trial',
  unpaid: 'unpaid',
};

// Combined with expiration_date, statusType determines user status
//
// If status === 'cancelled', then
// - Subscription to be cancelled if expiration_date > today
// - Subscription cancelled if expiration_date < today
//
// If status === 'subscribed', then
// - Subscribed if expiration_date > today
// - Payment failed if expiration_date < today
//
// If status === 'trial', then
// - Free trial if expiration_date > today
// - Trial expired if expiration_date < today
//
// If status === 'unpaid', then
// - Subscription cancelled due to the repeated failure of payment
// - It's always the case that expiration_date < today
