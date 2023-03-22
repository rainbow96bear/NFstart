import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as themeIni } from "./modules/theme";
import { reducer as theme } from "./modules/theme";
import { initialize as accountIni } from "./modules/account";
import { reducer as account } from "./modules/account";
import { reducer as chainId } from "./modules/chainId";
import { initialize as chainIdIni } from "./modules/chainId";
// createStore
const store = createStore(
  combineReducers({ theme, account, chainId }),
  { ...themeIni, ...accountIni, ...chainIdIni },
  composeWithDevTools()
);

export default store;
