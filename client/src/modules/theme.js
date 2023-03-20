export const THEME = {
  CHANGE: "theme/change",
  CHECK: "theme/check",
};

const change = {
  type: THEME.CHANGE,
};

const check = {
  type: THEME.CHECK,
};

export const action = { change, check };

export const initialize = { theme: "light" };

export const reducer = (state = "light", action) => {
  const { type, payload } = action;
  switch (type) {
    case THEME.CHANGE:
      if (state == "light") {
        state = "dark";
        return state;
      } else {
        state = "light";
        return state;
      }
    case THEME.CHECK:
      return state;

    default:
      return state;
  }
};
