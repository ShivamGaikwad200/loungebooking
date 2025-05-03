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
      if (path === "bookings") {
        try {
          await axios.put(`/${path}/${id}/status`, { status: "Rejected" });
          setList((prevList) =>
            prevList.map((item) =>
              item._id === id ? { ...item, status: "Rejected" } : item
            )
          );
        } catch (err) {
          console.error("Reject error:", err);
        }
      } else {
        try {
          await axios.delete(`/${path}/${id}`);
          setList((prevList) => prevList.filter((item) => item._id !== id));
        } catch (err) {
          console.error("Delete error:", err);
        }
      }

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const currentItem = list.find(item => item._id === id);
      const currentStatus = currentItem?.status;
  
      let newStatus = "";
      if (currentStatus === "pending") {
        newStatus = "Payment pending";
      } else if (currentStatus === "Payment pending") {
        newStatus = "Booking Done";
      } else {
        return; // Already done
      }
  
      await axios.put(`/${path}/${id}/status`, { status: newStatus });
  
      setList((prevList) =>
        prevList.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Approve error:", err);
    }
  };
  
  

  useEffect(() => {
    if (path === "bookings") {
      setList(data.filter((item) => item.status !== "Rejected"));
    } else {
      setList(data);
    }
  }, [data, path]);
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        if (path === "bookings") {
          const status = params.row.status;
      
          let buttonLabel = "";
          if (status === "pending") {
            buttonLabel = "Approve";
          } else if (status === "Payment pending") {
            buttonLabel = "Approve Payment";
          } else if (status === "Booking Done") {
            buttonLabel = "Booking Done";
          }
      
          return (
            <div className="cellAction">
              {status !== "Booking Done" ? (
                <div
                  className="viewButton"
                  onClick={() => handleApprove(params.row._id)}
                >
                  {buttonLabel}
                </div>
              ) : (
                <div className="viewButton">
                  {buttonLabel}
                </div>
              )}
      
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Reject
              </div>
            </div>
          );
        }
      
        // Default delete for other paths
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      }
      
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
