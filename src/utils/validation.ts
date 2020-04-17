/* eslint-disable no-useless-escape */
export function validateEmail(text: string): boolean {
  if (text !== '') {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
  }
  return true;
}

export function validateNickname(text: string): boolean {
  if (text !== '') {
    var re = /^[a-zA-Z0-9._]*$/;
    return re.test(text);
  }
  return true;
}
