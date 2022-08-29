import Axios from 'axios';

const link = 'http://localhost:5000/api';

export const withoutBody = async (method, linkFragment) => {
  const token = localStorage.getItem('token') || '';
  const finalLink = `${link}/${linkFragment}`;

  const result = await Axios({
    method,
    url: finalLink,
    headers: {
      'x-access-token': token,
    },
  });

  return await result.data;
};

export const withBody = async (method, linkFragment, body) => {
  const token = localStorage.getItem('token') || '';
  const finalLink = `${link}/${linkFragment}`;

  const result = await Axios({
    method,
    url: finalLink,
    headers: {
      'x-access-token': token ? token : null,
    },
    data: body,
  });

  if (result.data.token) {
    localStorage.setItem('token', result.data.token);
  }

  return await result.data;
};
