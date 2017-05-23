/**
 * Created by anda on 5/23/17.
 */

/**
 * Created by anda on 5/14/17.
 */

const onShow = (title, contentIfSuccess, error, response, body) => {
  if (error) {
    return {
      type: 'SHOW_MODAL',
      payload: {
        show: true,
        title: title,
        content: 'Internal server error.'
      }
    }
  }
  if (response.status != 200) {
    return {
      type: 'SHOW_MODAL',
      payload: {
        show: true,
        title: title,
        content: body.error
      }
    }
  }
  return {
    type: 'SHOW_MODAL',
    payload: {
      show: true,
      title: title,
      content: contentIfSuccess
    }
  }
};

const onHide = () => {
  return {
    type: 'HIDE_MODAL',
    payload: {
      show: false
    }
  }
};

module.exports = {
  onShowModal: onShow,
  onHideModal: onHide
};
