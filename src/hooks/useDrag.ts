import { useEffect, useRef } from "preact/hooks";
import PointerTracker, { Pointer } from "pointer-tracker";
import { cancelEvent, sub2d } from "../utils";
import { useLatest } from "./useLatest";

const POINTER_ID_NOT_POINTING = -999;

const getMousePosition = (pointer: Pointer): Point2d => ({
  x: pointer.pageX,
  y: pointer.pageY,
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

export const useDrag = (element: HTMLElement, callbacks: Callbacks): void => {
  const callbacksRef = useLatest(callbacks);
  // firefox starts pointer.id from 0, chrome from 1.
  // Yes, this is really happening.
  // Of course this hack will never break, why would it?
  const pointerIdRef = useRef(POINTER_ID_NOT_POINTING);

  useEffect(() => {
    if (element == null) {
      return;
    }
    let startPos: Point2d = { x: 0, y: 0 };
    const createEvent = (pointer: Pointer): DragEvent => {
      const now = getMousePosition(pointer);
      const delta = sub2d(now, startPos);
      return { start: startPos, delta, now };
    };

    const tracker = new PointerTracker(element, {
      start(pointer, event) {
        cancelEvent(event);
        if (pointerIdRef.current !== POINTER_ID_NOT_POINTING) {
          return false;
        }
        pointerIdRef.current = pointer.id;

        // console.log(`start p=${pointIdx}`, { pointer, event });
        startPos = getMousePosition(pointer);
        if (callbacksRef.current.onDragStart) {
          callbacksRef.current.onDragStart({ start: startPos });
        }
        return true;
      },
      move(_previousPointers, changedPointers, event) {
        cancelEvent(event);
        const pointer = changedPointers.find(
          (p) => p.id === pointerIdRef.current,
        );
        if (pointer == null) {
          return;
        }

        // console.log(`move p=${pointIdx}: ${dt.x},${dt.y}`, { startPos, pointer, event });
        if (callbacksRef.current.onDrag) {
          callbacksRef.current.onDrag(createEvent(pointer));
        }
      },
      end(pointer, event, _cancelled) {
        cancelEvent(event);
        if (pointer.id !== pointerIdRef.current) {
          return;
        }
        pointerIdRef.current = POINTER_ID_NOT_POINTING;

        // console.log(`end p=${pointIdx}: ${dt.x},${dt.y}`, { pointer, event, cancelled });
        if (callbacksRef.current.onDragEnd) {
          callbacksRef.current.onDragEnd(createEvent(pointer));
        }
        startPos = { x: 0, y: 0 };
      },
      rawUpdates: false,
    });

    return () => {
      tracker.stop();
    };
  }, [callbacksRef, element]);
};
