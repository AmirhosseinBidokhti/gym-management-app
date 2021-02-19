export const product = (
  product_name,
  sale_price,
  session_count,
  start_date,
  end_date
) => {
  return {
    product_name,
    sale_price,
    session_count,
    start_date,
    end_date,
  };
};
