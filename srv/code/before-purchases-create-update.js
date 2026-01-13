module.exports = async function(request) {
  const { Purchases, Customers } = cds.entities;

  // Extract data from the request
  const { purchaseValue, customer_ID } = request.data;

  // Ensure purchaseValue and customer_ID are defined
  if (purchaseValue === undefined || customer_ID === undefined) {
    return;
  }

  // Calculate reward points based on purchase value
  const rewardPoints = Math.floor(purchaseValue / 10); // Example: 1 point for every 10 currency units

  // Update the reward points in the request data
  request.data.rewardPoints = rewardPoints;

  // Retrieve the current customer data
  const customer = await SELECT.one.from(Customers).where({ ID: customer_ID });

  // Ensure the customer exists
  if (!customer) {
    return;
  }

  // Calculate new total purchase value and total reward points
  const newTotalPurchaseValue = (customer.totalPurchaseValue || 0) + purchaseValue;
  const newTotalRewardPoints = (customer.totalRewardPoints || 0) + rewardPoints;

  // Update the customer with new values
  await UPDATE(Customers).set({
    totalPurchaseValue: newTotalPurchaseValue,
    totalRewardPoints: newTotalRewardPoints
  }).where({ ID: customer_ID });
}
