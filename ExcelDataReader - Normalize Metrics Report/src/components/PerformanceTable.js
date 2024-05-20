import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'locationName', headerName: 'Location Name', width: 130 },
    { field: 'average', headerName: 'Performance Average', width: 160 },
  ];
  
function PerformanceTable({data}) {
    return (
    <div style={{ height: 400, width: '100%', paddingTop: 20 }}>
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 20 },
                },
            }}
        />
    </div>
      );
}

export default PerformanceTable;