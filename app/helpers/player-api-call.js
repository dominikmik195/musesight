import { helper } from '@ember/component/helper';
import fetch from 'fetch';

export async function playerApiCall(token) {
  let response = await fetch('https://api.spotify.com/v1/me/player?market=HR', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export default helper(playerApiCall);
