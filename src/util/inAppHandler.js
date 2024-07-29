export const handleInAppWebview = async (handler, callback = () => {}) => {
  if (window.flutter_inappwebview?.callHandler) {
    await window.flutter_inappwebview
      .callHandler(handler, '')
      .then(function (result) {
        return callback(result);
      });
  }
};
