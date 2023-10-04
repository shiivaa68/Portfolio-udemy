import { ActionType } from "../action-types";
import { CellType } from "../cell";


export type Direction ='up'|'down';
export interface MOveCellAction {
type:ActionType.MOVE_CELL;
payload:{
  id:string;
  direction:Direction;

}
}
export interface DeleteCellAction {
type:ActionType.DELETE_CELL;
payload:string;

}

export interface InsertCellAfterAction {
type:ActionType.INSERT_CELL_AFTER;
payload:{
  id:string|null;
  type:CellType;
}
}
export interface BundleStartAction{
type:ActionType.BUNDLE_START
payload:{
  cellId:string;
}
}

export interface BundleCompeleteAction {
  type:ActionType.BUNDLE_COMPLETE;
  payload:{
    cellId:string;
    bundle:{
      code:string;
      err:string;
    }
  
  }
}

export type Action = MOveCellAction|DeleteCellAction|InsertCellAfterAction|BundleStartAction|BundleCompeleteAction;