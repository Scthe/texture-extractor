import create from "zustand";
import { RECTANGLE_COLORS } from "../style";
import { ensurePointInsideImage, getFromArray } from "../utils";

const SELECTED_NONE = -999;

interface AppState {
  _nextRectangleId: number;
  selectedRectangleId: number;
  rectangles: SelectionRect[];
  borderSafeSpace: number;
  image: AppImageData | null;
  soften: boolean;

  // setters:
  setImage: (image: AppImageData | null) => void;
  addRectangle: () => void;
  removeRectangle: (id: number) => void;
  setSoften: (nextValue: boolean) => void;
}

const _DEBUGcreateRectangle = (
  id: number,
  imageData: AppImageData,
  padding: number,
): SelectionRect => {
  const randPoint = () => ({
    x: Math.floor(Math.random() * imageData.data.width),
    y: Math.floor(Math.random() * imageData.data.height),
  });

  const points = [randPoint(), randPoint(), randPoint(), randPoint()] as Rect;

  points.forEach((p) => ensurePointInsideImage(p, imageData, padding));
  return {
    id,
    points: points,
    color:
      RECTANGLE_COLORS[Math.floor(Math.random() * RECTANGLE_COLORS.length)],
  };
};

const createRectangle = (
  id: number,
  imageData: AppImageData,
  padding: number,
): SelectionRect => {
  const left = padding;
  const right = imageData.data.width / 3;
  const top = padding;
  const bottom = imageData.data.height / 2;
  const points = [
    { x: left, y: bottom },
    { x: right, y: bottom },
    { x: left, y: top },
    { x: right, y: top },
  ] as Rect;

  points.forEach((p) => ensurePointInsideImage(p, imageData, padding));
  return {
    id,
    points: points,
    color: getFromArray(RECTANGLE_COLORS, id),
  };
};

const removeRectangle = (
  state: AppState,
  id: number,
): Pick<AppState, "selectedRectangleId" | "rectangles"> => {
  const rectangles = state.rectangles.filter((r) => r.id !== id);
  const selectedRectangleId =
    id !== state.selectedRectangleId
      ? state.selectedRectangleId
      : rectangles.length > 0
        ? rectangles[0].id
        : SELECTED_NONE;
  return { rectangles, selectedRectangleId };
};

export const useAppState = create<AppState>((set) => ({
  _nextRectangleId: 1,
  selectedRectangleId: SELECTED_NONE,
  rectangles: [],
  borderSafeSpace: 20,
  image: null,
  soften: false,

  // setters:
  setImage: (image: AppImageData | null) =>
    set((state) => ({
      ...state,
      _nextRectangleId: 1,
      selectedRectangleId: 0,
      rectangles:
        image == null
          ? []
          : [
            createRectangle(0, image, state.borderSafeSpace),
            // _DEBUGcreateRectangle(100, image, state.borderSafeSpace), // debug only
            // _DEBUGcreateRectangle(101, image, state.borderSafeSpace),
            // _DEBUGcreateRectangle(102, image, state.borderSafeSpace),
            // _DEBUGcreateRectangle(103, image, state.borderSafeSpace),
          ],
      image,
    })),
  addRectangle: () =>
    set((state) => ({
      ...state,
      _nextRectangleId: state._nextRectangleId + 1,
      selectedRectangleId: state._nextRectangleId,
      rectangles:
        state.image == null
          ? []
          : [
            ...state.rectangles,
            createRectangle(
              state._nextRectangleId,
              state.image,
              state.borderSafeSpace,
            ),
          ],
    })),
  removeRectangle: (id: number) =>
    set((state) => ({
      ...state,
      ...removeRectangle(state, id),
    })),
  moveRectangle: (id: number, points: Rect) =>
    set((state) => ({
      ...state,
      selectedRectangleId: id, // TODO finish
    })),
  setSoften: (nextValue: boolean) =>
    set((state) => ({
      ...state,
      soften: nextValue,
    })),
}));

export const useAppStatePartial = <T extends keyof AppState>(
  ...ks: T[]
): Pick<AppState, T> => {
  return useAppState((state) =>
    ks.reduce((o, k) => {
      o[k] = state[k];
      return o;
    }, {} as Partial<AppState>),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
};
