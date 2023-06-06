import "./pagination.css";
const Pagination = ({pages,currentPage,setCurrentPage}) => {
  const pageArray=[]
  for(let i=1;i<=pages;i++){
    pageArray.push(i)
  }
  return (
    <div className="pagination">
      <button className="page previous"
      onClick={()=>setCurrentPage(prev=>prev-1)}
      disabled={currentPage === 1}
      >Previous</button>
      {pageArray.map(page => (
        <div onClick={()=>setCurrentPage(page)} 
        className={currentPage === page ? "page active":"page"}
        key={page}>
          {page}
        </div>
      ))}
      <button className="page next"
        onClick={()=>setCurrentPage(prev=>prev + 1)}
        disabled={currentPage === pages}
      >Next</button>
    </div>
  );
};

export default Pagination;
