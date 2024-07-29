export const findFirstVisibleChild = (container) => {
  if (!container) {
    return;
  }
  let focusedAnchor;
  try {
    const containerRect = container.getBoundingClientRect();
    container.childNodes.forEach((childElement) => {
      if (focusedAnchor) {
        return;
      }
      const childRect = childElement.getBoundingClientRect();
      if (childRect.bottom >= containerRect.top) {
        focusedAnchor = childElement.childNodes[0].getAttribute('data-anchor');
      }
    });
  } catch (e) {}
  return focusedAnchor;
};
