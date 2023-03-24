import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import { initialize as themeIni } from "./modules/theme";
import { reducer as theme } from "./modules/theme";
import { reducer as userInfo } from "./modules/userInfo";
import { initialize as userInfoIni } from "./modules/userInfo";

const store = createStore(
  combineReducers({ theme, userInfo }),
  { ...themeIni, ...userInfoIni },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;
