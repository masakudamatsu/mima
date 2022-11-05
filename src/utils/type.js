export const statusType = {
  cancelled: 'cancelled',
  subscribed: 'subscribed',
  trial: 'trial',
};

// Combined with expiration_date, statusType determines user status
//
// If status === 'cancelled', then
// - Subscription to be cancelled if expiration_date > today
//
// If status === 'subscribed', then
// - Subscribed if expiration_date > today
// - Payment failed if expiration_date < today
//
// If status === 'trial', then
// - Free trial if expiration_date > today
// - Trial expired if expiration_date < today
