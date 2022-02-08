import { helper } from '@ember/component/helper';
import fetch from 'fetch';

export async function apiCall(endpoint, method, token, limit) {
  let response = await fetch(endpoint + '?limit=' + limit.toString(), {
    method: method,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  });
  return await response.json();
}

export default helper(apiCall);
