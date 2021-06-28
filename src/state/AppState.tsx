import create from "zustand";
import { RECTANGLE_COLORS } from "../style";
import { ensurePointInsideImage, getFromArray } from "../utils";

const SELECTED_NONE = -999;

export interface AppState {
  selectedRectangleId: number;
  rectangles: SelectionRect[];
  borderSafeSpace: number;
  image: AppImageData | null;
  renderSmooth: boolean;

  // setters:
  setImage: (image: AppImageData | null, rects?: SelectionRect[]) => void;
  addRectangle: () => void;
  removeRectangle: (id: number) => void;
  selectRectangle: (id: number) => void;
  moveRectangle: (id: number, points: Rect) => void;
  setRenderSmooth: (nextValue: boolean) => void;
}

// there is some nicer Pick<>, but too lazy ATM
type StateSetter<
  T extends
  | "setImage"
  | "addRectangle"
  | "removeRectangle"
  | "selectRectangle"
  | "moveRectangle"
  | "setRenderSmooth",
  > = (state: AppState, ...params: Parameters<AppState[T]>) => AppState;

const localStorageKey = (image: AppImageData) => `image--${image.filename}`;

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

const getNextId = (rectangles: SelectionRect[]): number => {
  if (rectangles.length < 1) { return 1; }
  return 1 + Math.max(...rectangles.map(r => r.id));
};

const getInitRectangles = (
  image: AppImageData | null,
  rects: SelectionRect[] | undefined,
  borderSafeSpace: number
): SelectionRect[] => {
  if (image == null) { return []; }

  const isOk = (rects: unknown): rects is SelectionRect[] =>
    rects != null && Array.isArray(rects) && rects.length > 0

  if (isOk(rects)) {
    return rects;
  }

  try {
    const fromStorageStr = localStorage.getItem(localStorageKey(image));
    const fromStorage = fromStorageStr != null ? JSON.parse(fromStorageStr) : null;
    if (isOk(fromStorage)) {
      return fromStorage;
    }
    // eslint-disable-next-line no-empty
  } catch (_e) { }

  return [
    createRectangle(0, image, borderSafeSpace),
    // debug only
    // _DEBUGcreateRectangle(100, image, state.borderSafeSpace),
    // _DEBUGcreateRectangle(101, image, state.borderSafeSpace),
    // _DEBUGcreateRectangle(102, image, state.borderSafeSpace),
    // _DEBUGcreateRectangle(103, image, state.borderSafeSpace),
    // _DEBUGcreateRectangle(104, image, state.borderSafeSpace),
    // _DEBUGcreateRectangle(105, image, state.borderSafeSpace),
  ];
};

const persistRectangles = (image: AppImageData | null, rects: SelectionRect[]) => {
  if (image != null && rects.length > 0) {
    localStorage.setItem(localStorageKey(image), JSON.stringify(rects));
  }
};


// Better checking for misspelled properties
function check<T extends AppState, U extends Record<keyof AppState, unknown>>(
  t: T & U,
) {
  return t;
}


const setImage: StateSetter<"setImage"> = (state, image, rects) => {
  const rectangles = getInitRectangles(image, rects, state.borderSafeSpace);

  return check({
    ...state,
    selectedRectangleId: rectangles.length > 0 ? rectangles[0].id : SELECTED_NONE,
    rectangles,
    image,
  });
};

const addRectangle: StateSetter<"addRectangle"> = (state) => {
  if (state.image == null) {
    return state;
  }

  const nextId = getNextId(state.rectangles);
  const newRect = createRectangle(
    nextId,
    state.image,
    state.borderSafeSpace,
  );
  const rectangles = [...state.rectangles, newRect,];
  persistRectangles(state.image, rectangles);

  return check({
    ...state,
    selectedRectangleId: newRect.id,
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
  persistRectangles(state.image, rectangles);

  return check({
    ...state,
    rectangles,
    selectedRectangleId,
  });
};

const selectRectangle: StateSetter<"selectRectangle"> = (
  state: AppState,
  id: number,
) => {
  const rect = state.rectangles.find((r) => r.id === id);
  return check({
    ...state,
    selectedRectangleId: rect != null ? id : state.selectedRectangleId,
  });
};

const moveRectangle: StateSetter<"moveRectangle"> = (state, id, points) => {
  const rectangles = state.rectangles.map((r) =>
    r.id === id ? { ...r, points } : r,
  );
  persistRectangles(state.image, rectangles);

  return check({
    ...state,
    selectedRectangleId: id,
    rectangles,
  });
};

export const useAppState = create<AppState>((set) => ({
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
  selectRectangle: (id: number) => set((state) => selectRectangle(state, id)),
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
