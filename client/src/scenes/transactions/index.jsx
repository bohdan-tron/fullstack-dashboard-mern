import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });


  // const [paginationModel, setPaginationModel] = React.useState({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });

  // const { isLoading, rows, pageInfo } = useGetTransactionsQuery(paginationModel);

  // // Some API clients return undefined while loading
  // // Following lines are here to prevent `rowCountState` from being undefined during the loading
  // const [rowCountState, setRowCountState] = React.useState(
  //   pageInfo?.totalRowCount || 0,
  // );
  // React.useEffect(() => {
  //   setRowCountState((prevRowCountState) =>
  //     pageInfo?.totalRowCount !== undefined
  //       ? pageInfo?.totalRowCount
  //       : prevRowCountState,
  //   );
  // }, [pageInfo?.totalRowCount, setRowCountState]);
  // TODO: fix data.total from mongo DB, server side pagination https://mui.com/x/react-data-grid/pagination/#server-side-pagination
  console.log("🚀 ~ file: index.jsx:24 ~ Transactions ~ data:", data)

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          {...data}
          // rows={rows}
          // {...data}
          // rowCount={rowCountState}
          // loading={isLoading}
          // pageSizeOptions={[5]}
          // paginationModel={paginationModel}
          // paginationMode="server"
          // onPaginationModelChange={setPaginationModel}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}

          // rowsPerPageOptions={[10,20,50,100]}
          page={page}
          pageSize={pageSize}
          // paginationModel="server"
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
        {/* <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          // {...data}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
  
          rowsPerPageOptions={[10,20,50,100]}
          page={page}
          pageSize={pageSize}
          // paginationModel="server"
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default Transactions;
