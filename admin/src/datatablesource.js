export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img 
            className="cellImg" 
            src={"https://i.ibb.co/MBtjqXQ/no-avatar.gif"} 
            alt="avatar" 
          />
          <span>{params.row?.username || "No Name"}</span>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

// export const hotelColumns = [
//   { field: "_id", headerName: "ID", width: 250 },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 150,
//   },
//   {
//     field: "type",
//     headerName: "Type",
//     width: 100,
//   },
//   {
//     field: "title",
//     headerName: "Title",
//     width: 230,
//   },
//   {
//     field: "city",
//     headerName: "City",
//     width: 100,
//   },
// ];

// export const roomColumns = [
//   { field: "_id", headerName: "ID", width: 70 },
//   {
//     field: "title",
//     headerName: "Title",
//     width: 230,
//   },
//   {
//     field: "desc",
//     headerName: "Description",
//     width: 200,
//   },
//   {
//     field: "price",
//     headerName: "Price",
//     width: 100,
//   },
//   {
//     field: "maxPeople",
//     headerName: "Max People",
//     width: 100,
//   },
// ];

export const loungeColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Lounge Name",
    width: 200,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 120,
  },
  {
    field: "maxPersons",
    headerName: "Capacity",
    width: 100,
  },
  {
    field: "cost",
    headerName: "Price",
    width: 150,
  },
];

export const bookingColumns = [
  { field: "loungeName", headerName: "Lounge Name", width: 250 },
  { field: "userId", headerName: "User ID", width: 250 },
  { field: "userName", headerName: "User Name", width: 250 },

  // {
  //   field: "user",
  //   headerName: "User",
  //   width: 200,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img
  //           className="cellImg"
  //           src={params.row?.userImg || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
  //           alt="avatar"
  //         />
  //         <span>{params.row?.username || "Unknown User"}</span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   field: "loungeId",
  //   headerName: "Lounge ID",
  //   width: 200,
  // },
  {
    field: "startDate",
    headerName: "From",
    width: 200,
  },{
    field: "endDate",
    headerName: "To",
    width: 200,
  },
  // {
  //   field: "startTime",
  //   headerName: "Start Time",
  //   width: 120,
  // },
  // {
  //   field: "endTime",
  //   headerName: "End Time",
  //   width: 120,
  // },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 130,
  },
  {
    field: "occasion",
    headerName: "Occassion",
    width: 130,
  },
  {
    field: "generatorBackup",
    headerName: "Add Generator",
    width: 130,
  },
  {
    field: "additionalFurniture",
    headerName: "Add Furniture",
    width: 130,
  },
  {
    field: "additionalLighting",
    headerName: "Add Lighting",
    width: 130,
  },
  {
    field: "additionalWaiters",
    headerName: "Add Waiter",
    width: 130,
  },
  {
    field: "catering",
    headerName: "Catering By",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      return (
        <span className={`status ${params.row.status}`}>
          {params.row.status}
        </span>
      );
    },
  },
];

