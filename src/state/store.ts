import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";
import { ActionType } from "./action-types";
import { bundlerMiddleWare } from "./middlewares/bundler-middleware";


export const store =createStore(reducers,{},applyMiddleware(bundlerMiddleWare as any,thunk));

store.dispatch({
type:ActionType.INSERT_CELL_AFTER,
payload:{
  id:null,
  type:'code',
}
})

store.dispatch({
  type:ActionType.INSERT_CELL_AFTER,
  payload:{
    id:null,
    type:'text',
  }
  })

// console.log(store.getState())
// const state=store.getState();
// state.cells.data;