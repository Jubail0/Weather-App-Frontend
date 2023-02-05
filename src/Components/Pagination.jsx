import React from 'react'
import './pagination.css'

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const[pageNums,setPageNums]=React.useState([]);

  const pageRange = totalPages => {
    const arr = []
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    setPageNums(arr)
  };

  React.useEffect(() => {
  pageRange(totalPages);
  }, [totalPages]);

  
  return (
    <div className="pagination_container">
      <button className="left_arrow-box number-box" onClick={()=>setCurrentPage(prevState => prevState - 1)} disabled={currentPage === 1}>
        <span>&laquo;</span>
      </button>

      {pageNums && pageNums?.map((num, index) => 
        <button key={index} className="number-box" 
        style={currentPage === num ?{backgroundColor: "slateblue", color:'white'}:null} onClick={()=>setCurrentPage(num)}>
        <span>{num}</span>
        </button>
      )}

      <button className="right_arrow-box number-box" 
      onClick={()=>setCurrentPage(prevState => prevState + 1)} 
      disabled={currentPage === totalPages}>
        <span>&raquo;</span>
      </button>
    </div>
  );
};

export default Pagination;
