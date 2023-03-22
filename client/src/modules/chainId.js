export const CHAINID = {
  GET: "chainId/get",
};

const get = {
  type: CHAINID.GET,
};

export const action = { get };

export const initialize = { chainId: "" };

export const reducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case CHAINID.GET:
      state = payload.input;
      return state;

    default:
      return state;
  }
};
