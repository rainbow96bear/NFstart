export const ACCOUNT = {
  SET: "account/set",
};

const set = {
  type: ACCOUNT.SET,
};

export const action = { set };

export const initialize = { account: "" };

export const reducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT.SET:
      state = payload.input;
      return state;

    default:
      return state;
  }
};
