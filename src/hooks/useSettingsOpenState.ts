import { useEffect } from "preact/hooks";
import { useAppStatePartial } from "../state/AppState";
import { useBoolState } from "./useBoolState";

export const useSettingsOpenState = (): [boolean, (v: boolean) => void] => {
  const { image } = useAppStatePartial("image");

  const [isSettingsOpen, setSettingsOpen] = useBoolState(false);

  useEffect(() => {
    setSettingsOpen(image != null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return [isSettingsOpen, setSettingsOpen];
};
