/**
 * This custom logic deducts the redemption amount from the customer's total reward points and adds that to their total redeemed points.
 * @On(event = { "redemption" }, entity = "myNamespaceSrv.Redemptions")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
  const { Redemptions, Customers } = cds.entities;
  
  const redemptionData = request.data;
  if (!redemptionData || !redemptionData.customer_ID || !redemptionData.redeemedAmount) {
    return; // Exit if necessary data is missing
  }

  const customerID = redemptionData.customer_ID;
  const redeemedAmount = redemptionData.redeemedAmount;

  // Fetch the current customer's reward points and redeemed points
  const customer = await SELECT.one.from(Customers).where({ ID: customerID });
  if (!customer) {
    return; // Exit if customer does not exist
  }

  // Calculate new values
  const newTotalRewardPoints = customer.totalRewardPoints - redeemedAmount;
  const newTotalRedeemedRewardPoints = customer.totalRedeemedRewardPoints + redeemedAmount;

  // Update the customer's reward points and redeemed points
  await UPDATE(Customers).set({
    totalRewardPoints: newTotalRewardPoints,
    totalRedeemedRewardPoints: newTotalRedeemedRewardPoints
  }).where({ ID: customerID });
};
