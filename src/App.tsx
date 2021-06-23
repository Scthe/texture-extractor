import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { css } from "@emotion/css";
import "pinch-zoom-element";
import type { FileDropEvent } from "file-drop-element";

import testImageUrl from "./test-image.jpg";
import { UVscreen } from "./screens/UVscreen";
import { ImageScreen } from "./screens/ImageScreen";
import { WelcomeModal } from "./screens/WelcomeModal";

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

const BORDER_SAFE_SPACE = 20;
const modalContainer = document.getElementById("modals")!;

const containterStyle = css`
  display: flex;
  flex-direction: row;
`;

function App(): h.JSX.Element {
  // TODO into separate hook
  const imageData = {
    width: 800,
    height: 1137,
    borderSafeSpace: BORDER_SAFE_SPACE,
  };
  const [points, setPoints] = useState<Rect>([
    { x: BORDER_SAFE_SPACE, y: imageData.height / 2 },
    { x: imageData.width / 3, y: imageData.height / 2 },
    { x: BORDER_SAFE_SPACE, y: BORDER_SAFE_SPACE },
    { x: imageData.width / 3, y: BORDER_SAFE_SPACE },
  ]);

  const onPreviewUpdate = useCallback((newState: Rect) => {
    redrawUVview.current(newState);
  }, []);

  return (
    <div class={containterStyle}>
      <UVscreen points={points} imageData={imageData} />
      <ImageScreen
        points={points}
        imageData={imageData}
        imageUrl={testImageUrl}
        setPoints={setPoints}
        onPreviewUpdate={onPreviewUpdate}
      />
      {createPortal(<WelcomeModal isOpen={true} />, modalContainer)}
    </div>
  );
}

export default App;
