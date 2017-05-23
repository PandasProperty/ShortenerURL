/**
 * Created by anda on 5/23/17.
 */

const getUrls = (error, response, body) => {
  if (error) {
    return {
      type: 'URL_FAIL',
      payload: 'Internal server error.'
    }
  }
  if (response.status != 200) {
    return {
      type: 'URL_FAIL',
      payload: body.message
    }
  }
  return {
    type: 'URL_SUCCESS',
    payload: body.links
  }
};

module.exports = {
  getUrls: getUrls
};
