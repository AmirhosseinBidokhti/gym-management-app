export const saleInvoice = (
  account_id,
  memo,
  product_id,
  product_name,
  qty,
  price,
  reduction_price,
  session_qty,
  sale_invoice_payment_type_id
) => {
  return {
    account_id,
    inv_type: 1,
    memo,
    sale_invoice_details: [
      {
        product_id,
        product_name,
        qty,
        price,
        reduction_price,
        session_qty,
      },
    ],
    sale_invoice_payments: [
      {
        sale_invoice_payment_type_id,
        price: (price - reduction_price) * qty,
      },
    ],
  };
};
