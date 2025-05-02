import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      // Make the PATCH or PUT request to update status
      const res = await axios.put(`/${path}/${id}/status`, { status: "Payment pending" });

      // Update the local list state
      setList((prevList) =>
        prevList.map((item) =>
          item._id === id ? { ...item, status: "Payment pending" } : item
        )
      );
    } catch (err) {
      console.error("Approve error:", err);
    }
  };
  

  useEffect(() => {
    setList(data);
  }, [data]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        // Special case for bookings
        if (path === "bookings") {
          return (
            <div className="cellAction">
            {params.row.status === "Payment pending" ? (
              <div className="viewButton">Payment Approve</div>
            ) : (
              <div
                className="viewButton"
                onClick={() => handleApprove(params.row._id)}
              >
                Approve
              </div>
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
          );
        }
  
        // Default for other resources
        return (
          <div className="cellAction">
            {/* <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Capitalize singular path label
  const singularLabel = path.slice(0, -1).charAt(0).toUpperCase() + path.slice(1, -1);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {`Add New ${singularLabel}`}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns ? columns.concat(actionColumn) : []}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
