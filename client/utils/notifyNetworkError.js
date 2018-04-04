const { Materialize } = window;

const notifyNetworkError = error => (error.response ?
  Materialize.toast(error.response.data.message, 2000, 'red') :
  Materialize
    .toast('An error occured. It appears you are offline', 2000, 'red'));

export default notifyNetworkError;
