 import { ActionType } from "../action-types";
 import { Action,UpdateCellAction,BundleCompeleteAction,BundleStartAction,DeleteCellAction,MOveCellAction,InsertCellAfterAction ,Direction} from "../actions";
import { CellType } from "../cell";
import { Dispatch } from "redux";

import bundle from '../../bundler';



 export const updateCell =(id:string,content:string):UpdateCellAction=>{
return{
  type:ActionType.UPDATE_CELL,
  payload:{
    id,
    content,
  }
}
 };
 export const deleteCell=(id:string):DeleteCellAction=>{
return{
  type:ActionType.DELETE_CELL,
  payload:id,
}
 };
 export const moveCell=(id:string,direction:Direction):MOveCellAction=>{
return{
  type:ActionType.MOVE_CELL,
  payload:{
    id,
    direction,
  }

}
 };
 export const insertCellAfetr=(id:string|null,cellType:CellType):InsertCellAfterAction=>{
  return{
    type:ActionType.INSERT_CELL_AFTER,
    payload:{
      id,
      type:cellType,

    }
  }
 };


 export const createBundle = (cellId:string,input:string)=>{
return async (dispatch:Dispatch<Action>)=>{
dispatch({
  type:ActionType.BUNDLE_START,
  payload:{
    cellId
  }
});
const result = await bundle(input);

dispatch({
  type:ActionType.BUNDLE_COMPLETE,
  payload:{
    cellId,
    bundle:{
      code:result.code,
      err:result.err
    }
  }
})



}
 }