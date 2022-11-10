import React from "react"
import Box from "@mui/material/Box"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  )
}

export default function Table({ data, columns, loading }) {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowHeight={() => 'auto'}
        sx={{
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
        }}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  )
}
