import { useEffect } from "preact/hooks";
import PointerTracker, { Pointer } from "pointer-tracker";

import { useLatest } from "./useLatest";
import { cancelEvent, sub2d } from "../utils";

const POINTER_ID = 0;

const getMousePosition = (pointer: Pointer): Point2d => ({
  x: pointer.pageX, y: pointer.pageY,
});

interface DragEvent {
  delta: Point2d;
  start: Point2d;
  now: Point2d;
}

interface Callbacks {
  onDragStart?: (e: { start: Point2d }) => void;
  onDrag?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
}

export const useDrag = (
  element: HTMLElement,
  callbacks: Callbacks,
) => {
  const callbacksRef = useLatest(callbacks);

  useEffect(() => {
    if (element == null) {
      return;
    }
    let startPos: Point2d = { x: 0, y: 0 };
    const createEvent = (pointer: Pointer): DragEvent => {
      const now = getMousePosition(pointer)
      const delta = sub2d(now, startPos);
      return ({ start: startPos, delta, now });
    }

    const tracker = new PointerTracker(element, {
      start(pointer, event) {
        cancelEvent(event);
        if (pointer.id !== POINTER_ID) { return false }

        // console.log(`start p=${pointIdx}`, { pointer, event });
        startPos = getMousePosition(pointer);
        if (callbacksRef.current.onDragStart) {
          callbacksRef.current.onDragStart({ start: startPos });
        }
        return true;
      },
      move(_previousPointers, changedPointers, event) {
        cancelEvent(event);
        const pointer = changedPointers.find(p => p.id === POINTER_ID);
        if (pointer == null) { return; }

        // console.log(`move p=${pointIdx}: ${dt.x},${dt.y}`, { startPos, pointer, event });
        if (callbacksRef.current.onDrag) {
          callbacksRef.current.onDrag(createEvent(pointer));
        }
      },
      end(pointer, event, cancelled) {
        cancelEvent(event);
        if (pointer.id !== POINTER_ID) { return; }

        // console.log(`end p=${pointIdx}: ${dt.x},${dt.y}`, { pointer, event, cancelled });
        if (callbacksRef.current.onDragEnd) {
          callbacksRef.current.onDragEnd(createEvent(pointer));
        }
        startPos = { x: 0, y: 0 };
      },
      rawUpdates: false,
    });

    return () => { tracker.stop() };
  }, [element]);
}