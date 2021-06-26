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
  renderSmooth: boolean;

  // setters:
  setImage: (image: AppImageData | null) => void;
  addRectangle: () => void;
  removeRectangle: (id: number) => void;
  moveRectangle: (id: number, points: Rect) => void;
  setRenderSmooth: (nextValue: boolean) => void;
}

// there is some nicer Pick<>, but too lazy ATM
type StateSetter<
  T extends
    | "setImage"
    | "addRectangle"
    | "removeRectangle"
    | "moveRectangle"
    | "setRenderSmooth",
> = (state: AppState, ...params: Parameters<AppState[T]>) => AppState;

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

// Better checking for misspelled properties
function check<T extends AppState, U extends Record<keyof AppState, unknown>>(
  t: T & U,
) {
  return t;
}

const setImage: StateSetter<"setImage"> = (state, image) => {
  const rectangles =
    image == null
      ? []
      : [
          createRectangle(0, image, state.borderSafeSpace),
          // _DEBUGcreateRectangle(100, image, state.borderSafeSpace), // debug only
          // _DEBUGcreateRectangle(101, image, state.borderSafeSpace),
          // _DEBUGcreateRectangle(102, image, state.borderSafeSpace),
          // _DEBUGcreateRectangle(103, image, state.borderSafeSpace),
        ];
  return check({
    ...state,
    _nextRectangleId: 1,
    selectedRectangleId: 0,
    rectangles,
    image,
  });
};

const addRectangle: StateSetter<"addRectangle"> = (state) => {
  const rectangles =
    state.image == null
      ? []
      : [
          ...state.rectangles,
          createRectangle(
            state._nextRectangleId,
            state.image,
            state.borderSafeSpace,
          ),
        ];
  return check({
    ...state,
    _nextRectangleId: state._nextRectangleId + 1,
    selectedRectangleId: state._nextRectangleId,
    rectangles,
  });
};

const removeRectangle: StateSetter<"removeRectangle"> = (
  state: AppState,
  id: number,
) => {
  if (state.rectangles.length === 1) {
    return state;
  }
  const rectangles = state.rectangles.filter((r) => r.id !== id);
  const selectedRectangleId =
    id === state.selectedRectangleId
      ? rectangles[0].id
      : state.selectedRectangleId;

  return check({
    ...state,
    rectangles,
    selectedRectangleId,
  });
};

const moveRectangle: StateSetter<"moveRectangle"> = (state, id, points) => {
  const rectangles = state.rectangles.map((r) =>
    r.id === id ? { ...r, points } : r,
  );
  return check({
    ...state,
    selectedRectangleId: id,
    rectangles,
  });
};

export const useAppState = create<AppState>((set) => ({
  _nextRectangleId: 1,
  selectedRectangleId: SELECTED_NONE,
  rectangles: [],
  borderSafeSpace: 20,
  image: null,
  renderSmooth: false,

  // setters:
  setImage: (image: AppImageData | null) =>
    set((state) => setImage(state, image)),
  addRectangle: () => set((state) => addRectangle(state)),
  removeRectangle: (id: number) => set((state) => removeRectangle(state, id)),
  moveRectangle: (id: number, points: Rect) =>
    set((state) => moveRectangle(state, id, points)),
  setRenderSmooth: (nextValue: boolean) =>
    set((state) => ({
      ...state,
      renderSmooth: nextValue,
    })),
}));

export const useAppStatePartial = <T extends keyof AppState>(
  ...ks: T[]
): Pick<AppState, T> => {
  return useAppState(
    (state) =>
      ks.reduce((o, k) => {
        o[k] = state[k];
        return o;
      }, {} as Partial<AppState>),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
};
