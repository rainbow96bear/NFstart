import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as themeIni } from "./modules/theme";
import { reducer as theme } from "./modules/theme";
// createStore
const store = createStore(
  combineReducers({ theme }),
  { ...themeIni },
  composeWithDevTools()
);

export default store;
