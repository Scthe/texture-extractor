import { h } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { createPortal } from "preact/compat";
import { css } from "@emotion/css";
import "pinch-zoom-element";
import type { FileDropEvent } from "file-drop-element";

import { RefrawWebGlRef, UVscreen } from "./screens/UVscreen";
import { ImageScreen } from "./screens/ImageScreen";
import { WelcomeModal } from "./screens/WelcomeModal";
import { useAppState } from "./state/AppState";
import { useLatest } from "./hooks/useLatest";

declare module "preact" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "file-drop": FileDropAttributes;
      "pinch-zoom": preact.JSX.HTMLAttributes<HTMLElement>;
    }
  }
}

interface FileDropAttributes extends preact.JSX.HTMLAttributes<HTMLElement> {
  onfiledrop?: (e: FileDropEvent) => void;
}

// TODO add example images to repo, with example rectangles

const modalContainer = document.getElementById("modals")!;

const containterStyle = css`
  display: flex;
  flex-direction: row;
`;

function App(): h.JSX.Element {
  const { moveRectangle } = useAppState();
  const redrawWebglRef = useRef<RefrawWebGlRef>();
  const moveRectangleRef = useLatest(moveRectangle);

  const onDragging = useCallback((id: number, rect: Rect) => {
    if (redrawWebglRef.current) {
      redrawWebglRef.current.redrawWebGl(rect);
    }
  }, []);
  const onDragEnd = useCallback(
    (id: number, rect: Rect) => {
      if (redrawWebglRef.current) {
        redrawWebglRef.current.redrawWebGl(rect);
      }
      moveRectangleRef.current(id, rect);
    },
    [moveRectangleRef],
  );

  return (
    <div class={containterStyle}>
      <UVscreen ref={redrawWebglRef} />
      <ImageScreen onDragging={onDragging} onDragEnd={onDragEnd} />
      {createPortal(<WelcomeModal />, modalContainer)}
    </div>
  );
}

export default App;
