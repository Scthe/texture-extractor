import { h } from "preact";
import { useCallback } from "preact/hooks";
import { createPortal } from "preact/compat";
import { css } from "@emotion/css";
import "pinch-zoom-element";
import type { FileDropEvent } from "file-drop-element";

import { UVscreen } from "./screens/UVscreen";
import { ImageScreen } from "./screens/ImageScreen";
import { WelcomeModal } from "./screens/WelcomeModal";
import { useAppState } from "./state/AppState";

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

const modalContainer = document.getElementById("modals")!;

const containterStyle = css`
  display: flex;
  flex-direction: row;
`;

function App(): h.JSX.Element {
  useAppState();

  // redrawUVview.current(newState); // TODO error
  const onDragging = useCallback((id: number, rect: Rect) => {}, []);
  const onDragEnd = useCallback((id: number, rect: Rect) => {}, []);

  return (
    <div class={containterStyle}>
      <UVscreen />
      <ImageScreen onDragging={onDragging} onDragEnd={onDragEnd} />
      {createPortal(<WelcomeModal />, modalContainer)}
    </div>
  );
}

export default App;
