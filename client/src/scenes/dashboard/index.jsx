import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardStatsQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardStatsQuery();

  if (!data || isLoading) {
    return "Loading...";
  }

  let yearlySalesTotal = 0;
  (data.monthlyData).forEach((element) => yearlySalesTotal += element.totalSales);

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
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bolda",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined
              sx={{
                mr: "10px",
              }}
            />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: (isNonMediumScreen ? undefined : "span 12") }
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+8%"
          description="Since last month"
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="-1%"
          description="Since yesterday"
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={ theme.palette.background.alt }
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="Sales" isDashboard={true} />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+4%"
          description="Since last month"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Yearly Sales"
          value={yearlySalesTotal}
          increase="+11%"
          description="Since last month"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        {/* Row 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
            rows={(data && data.transactions) || []}
            {...data}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            columns={columns}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={ theme.palette.background.alt }
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales by category
          </Typography>

          <BreakdownChart isDashboard={true} />

          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
            Information for sales for each category by last year
          </Typography>
        </Box>
      </Box>
    </Box>
  )
};

export default Dashboard;