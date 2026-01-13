using { myNamespace } from '../db/schema.cds';

@path: '/service/myNamespace'
@requires: 'authenticated-user'
service myNamespaceSrv {
  @odata.draft.enabled
  entity Customers as projection on myNamespace.Customers;
  @odata.draft.enabled
  entity Products as projection on myNamespace.Products;
  @odata.draft.enabled
  entity Purchases as projection on myNamespace.Purchases;
  @odata.draft.enabled
  entity Redemptions as projection on myNamespace.Redemptions;
}