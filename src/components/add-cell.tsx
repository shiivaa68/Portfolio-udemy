import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  previousCellId:string|null;
  forceVisible?:boolean;
 
}

const AddCell :React.FC<AddCellProps> =({forceVisible,previousCellId})=>{
  const {insertCellAfetr} =useActions();

  return <div className={`add-cell ${forceVisible && 'force-visible'}`}>
     
   <div className='add-buttons'>
   <button className='button is-round is-primiry is-small' onClick={()=>insertCellAfetr(previousCellId,'code')}>
    <span className='icon is-small'>
      <i className='fas fa-plus'/>
    </span>
    <span>code</span>
    </button>
    <button  className='button is-round is-primiry is-small' onClick={()=>insertCellAfetr(previousCellId,'text')}>
    <span className='icon is-small'>
      <i className='fas fa-plus'/>
    </span>
     <span>text</span>
      
      </button>
   </div>
    <div className='divider'></div>
  </div>
}

export default AddCell;