// const newCustomerInfo = {
//   first_name: firstName,
//   last_name: lastName,
//   birth_date: new Date(selectedDay.year, selectedDay.month, selectedDay.day),
//   //birthdate: dateFormated,
//   gender: gender,
//   mobile: mobile,
//   tel: phone,

//   email: email,
//   telegram: telegram,
//   instagram: instagram,
//   address: address,

//   membership_join_type_id: membershipJoinType,
//   contract_file_path: fileName,
//   jobinfo_id: job,
// };

export const customer = (
  first_name,
  last_name,
  birth_date,
  gender,
  mobile,
  tel,
  email,
  telegram,
  instagram,
  address,
  membership_join_type_id,
  contract_file_path,
  jobinfo_id
) => {
  return {
    first_name,
    last_name,
    birth_date,
    gender,
    mobile,
    tel,
    email,
    telegram,
    instagram,
    address,
    membership_join_type_id,
    contract_file_path,
    jobinfo_id,
  };
};
