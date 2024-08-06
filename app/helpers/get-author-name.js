import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template'

export function getAuthorName(params/*, hash*/) {
  let [id, lastName, firstName] = params
  return htmlSafe(`<strong>${id}</strong> ${lastName} ${firstName}`);
}

export default helper(getAuthorName);