export const reqexp = {
  queryParams: /login=[A-Za-z0-9]*&member_id=[A-Za-z0-9]*&(auto=https%3A%2F%2F.*)/,
  errorDuplicate: /ERR02: Duplicate/,
  url: /https:\/\/[A-Za-z0-9].*/,
  anotherEmail: /E-mail address in use, please choose another. Forgot Password\? click here/,
  arrayStringSuccess: /Array \( \[Code\] => 200 \[Status\] => 1 \[Message\] => [0-9]* \)/,
  arrayStringError: /Array \( \[Code\] => 500 \[Status\] => \[Message\] => ([0-9]*-([A-Za-z]* )*)\)/,
}