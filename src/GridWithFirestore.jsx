import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase-config";

const GridWithFirestore = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Message", field: "message", sortable: true, filter: true },
  ]);

  const fetchFormSubmissions = useCallback(async () => {
    try {
      const response = await fetch(
        "https://us-central1-contact-us-387f1.cloudfunctions.net/getFormSubmissions",
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (result.success) {
        setRowData(result.data);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching form submissions:", error);
    }
  }, []);

  useEffect(() => {
    fetchFormSubmissions();
  }, [fetchFormSubmissions]);

  return (
    <div className="ag-theme-alpine" style={{ height: 1000, width: 1500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default GridWithFirestore;
