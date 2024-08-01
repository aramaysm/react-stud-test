interface PaginationTableProps {
    page: number;
    totalItems: number;
    itemsPerPage: number;
    onChange: (newPage:number)=> void;
     

}



 export const PaginationTable: React.FC<PaginationTableProps> = ({page,totalItems, itemsPerPage, onChange}:PaginationTableProps) => {

    const onPrevius = () => {
        onChange(page === 0 ? Math.round(totalItems/itemsPerPage)  : page-1);
    }

    const onNext = () => {
        onChange(page === Math.round(totalItems/itemsPerPage) ? 0 : page + 1);
    }

    return (
        <div className="row gap-1">
            <h5 className="cursor-hand me-1" onClick={onPrevius}>Previus</h5>
            {
                page > 0 ? <h5 className="">{page }</h5> : null
            }
            
            <div className="bg-primary " style={{width: "20px"}}>
                <h5 className="color-white">{page+1}</h5>
            </div>
            {
                (page + 1)*itemsPerPage < totalItems ? <h5 className="">{page + 2}</h5> : null
            }
            
            <h5 className="cursor-hand ms-1" onClick={onNext}>Next</h5>
        </div>
    )
}