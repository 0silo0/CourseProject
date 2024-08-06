import { helper } from '@ember/component/helper';
import ENV from 'course-project/config/environment';
import { get } from "@ember/object";

export function env([paramName]) {
  return get(ENV, paramName);
}

export default helper(env);