import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props{
    metaData: MetaData;
    onPageChange: (page: number) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AppPagination({metaData, onPageChange}: Props){
    const{CurrentPage, TotalCount, TotalPages, PageSize} = metaData;
    return(
        <Box display='flex' justifyContent='space-between' alignItems='center'>
  <Typography>
    Displaying {(CurrentPage -1)*PageSize+1}-
    {CurrentPage*PageSize > TotalCount !
     ? TotalCount
     : CurrentPage*PageSize} of {TotalCount} items
    
  </Typography>
  <Pagination 
  color = 'secondary'
  size = 'large'
  count = {TotalPages}
  page = {CurrentPage}
  onChange={(_e, page) => onPageChange(page)}
  />
</Box>
    )
}