import { GridColumnMenu } from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuSortItem: null,
      }}
    />
  )
}

export default CustomColumnMenu