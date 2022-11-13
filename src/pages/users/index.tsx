import React, { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Divider,
  CardHeader,
} from "@mui/material";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export class CurrentPaginations {
  public start: number;
  public end: number;
  public isAll: boolean;

  constructor(start: number, end: number, isAll: boolean) {
    this.start = start;
    this.end = end;
    this.isAll = isAll;
  }
}

function getCurrentPaginations(
  currentPage: number,
  rowsperPage: number
): CurrentPaginations {
  return new CurrentPaginations(
    currentPage * rowsperPage,
    (currentPage + 1) * rowsperPage,
    false
  );
}

const Users = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "userName", headerName: "User Name", width: 170 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "surname", headerName: "Surname", width: 120 },
    { field: "phoneNumber", headerName: "Phone number", width: 120 },
    { field: "address", headerName: "Address", width: 120 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "actions",
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => handleClickDelete(cellValues.row)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: 5 }}
              onClick={() => handleClickEdit(cellValues.row)}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              style={{ marginLeft: 5 }}
              onClick={() => handleClickBlock(cellValues.row)}
            >
              Block
            </Button>
          </>
        );
      },
      headerName: "Actions",
      width: 250,
    },
  ];

  const { GetUsers, DeleteUserForAdmin, UpdatePayload, GetUsersQuantity } =
    useActions();
  const { payload, usersQuantity, user } = useTypedSelector(
    (state) => state.UserReducer
  );

  let rows: [] = [];
  if (payload != null) {
    rows = payload;
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, SetRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: null });

  useEffect(() => {
    GetUsers(getCurrentPaginations(page, rowsPerPage));
    GetUsersQuantity();
  }, []);

  const handleClickDelete = (row: any) => {
    if (row.id == user.Id) {
      toast.warning("You can't delete your account");
    } else {
      setSelectedUser(row);
      setModalOpen(true);
    }
  };
  const navigate = useNavigate();

  const handleClickEdit = (row: any) => {
    UpdatePayload(row);
    navigate("/dashboard/edituser");
    setSelectedUser(row);
  };

  const handleClickBlock = (row: any) => {
    setSelectedUser(row);
    setBlockModalOpen(true);
  };

  const handleDeleteUser = () => {
    const DeleteCallbackResult = (result: boolean) => {
      if (result) {
        GetUsers(getCurrentPaginations(page, rowsPerPage));
        GetUsersQuantity();
        setSelectedUser({ id: null });
      }
    };
    setModalOpen(false);
    DeleteUserForAdmin(selectedUser.id, DeleteCallbackResult);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const pag = getCurrentPaginations(newPage, rowsPerPage);
    GetUsers(pag);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let rows = parseInt(event.target.value);
    SetRowsPerPage(rows);
    setPage(0);
    const pag = getCurrentPaginations(0, rows);
    GetUsers(pag);
  };

  return (
    <>
      <Link style={{ textDecoration: "none" }} to="/dashboard/register">
        <Button sx={{ mb: 3, mt: 3 }} variant="contained" color="success">
          Add User
        </Button>
      </Link>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={rowsPerPage}
          checkboxSelection
          hideFooterPagination={true}
          hideFooter={true}
        />

        <TablePagination
          component="div"
          count={usersQuantity}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
      <div id="modals">
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure want to delete the user with id {selectedUser.id}?
            </Typography>
            <div style={{ marginTop: 20 }}>
              <Button variant="contained" onClick={handleDeleteUser}>
                Yes
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: 20 }}
                onClick={() => setModalOpen(false)}
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={blockModalOpen}
          onClose={() => setBlockModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure want to block the user with id {selectedUser.id}?
            </Typography>
            <div style={{ marginTop: 20 }}>
              <Button variant="contained" onClick={handleClickBlock}>
                Yes
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: 20 }}
                onClick={() => setBlockModalOpen(false)}
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Users;
