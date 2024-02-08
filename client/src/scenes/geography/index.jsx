import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="GEOGRAPHY"
        subtitle="Here is where are users coming from"
      />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            // colors="nivo"
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={[150]}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            // graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor={theme.palette.background.main}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: -100,
                translateY: -125,
                itemsSpacing: 1,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.main,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
