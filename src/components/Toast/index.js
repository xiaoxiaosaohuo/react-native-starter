import React from 'react';
import topView from 'rn-topview';
import ToastContainer from './ToastContainer';

function notice(content, type, duration = 3, onClose, mask = true) {
  topView.remove();
  function animationEnd() {
    topView.remove();
  }
  topView.set(
    <ToastContainer
      content={content}
      duration={duration}
      onClose={onClose}
      type={type}
      mask={mask}
      onAnimationEnd={animationEnd}
    />,
  );
}

export default {
  SHORT: 3,
  LONG: 8,
  show(content, duration, mask) {
    return notice(content, 'info', duration, () => {
    }, mask);
  },
  info(content, duration, onClose, mask) {
    return notice(content, 'info', duration, onClose, mask);
  },
  success(content, duration, onClose, mask) {
    return notice(content, 'success', duration, onClose, mask);
  },
  fail(content, duration, onClose, mask) {
    return notice(content, 'fail', duration, onClose, mask);
  },
  offline(content, duration, onClose, mask) {
    return notice(content, 'offline', duration, onClose, mask);
  },
  loading(content, duration, onClose, mask) {
    return notice(content, 'loading', duration, onClose, mask);
  },
  hide() {
    topView.remove();
  },
};
