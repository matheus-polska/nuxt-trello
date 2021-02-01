export function makeDropHandler(onComplete, onDrop) {
  let src = null;
  let trg = null;
  let payload = null;
  let element = null;

  function reset() {
    src = null;
    trg = null;
    payload = null;
    element = null;
  }

  return function onDrop(event, ...params) {
    // delegate to drop handler if supplied
    if (this.onDrop) {
      this[onDrop](event, ...params);
    }

    // source and target events
    if (event.removedIndex !== null) {
      src = new DragData(event.removedIndex, params);
    }
    if (event.addedIndex !== null) {
      trg = new DragData(event.addedIndex, params);
      payload = event.payload;
      element = event.droppedElement;
    }

    // source and target events have fired
    if (src && trg) {
      this[onComplete](src, trg, element, payload);
      reset();
    }
  };
}

function DragData(index, params) {
  this.index = index;
  this.params = params;
}
