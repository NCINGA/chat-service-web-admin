import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  TablePagination,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Password,
} from "@mui/icons-material";
import UserRegistrationForm from "../components/UserManagementComponent/userAddFoarm";
import BGIMG from "../assets/BgImg.png";
import colorTheme from "../styles/Theme";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  REGISTER,
  UPDATE_USERS,
  DELETE_MONGO_USER,
} from "../graphql/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

enum role {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
}

interface IUser {
  id: string;
  username: string;
  email: string;
  role: role | "";
}

interface IFormData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: role | "";
}

const UserManagement: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //Dummy data
  // const dummyUsers: IUser[] = [
  //   {
  //     _id: "1",
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     userRole: UserRole.ADMIN,
  //     companyRegistered: "Company A",
  //     profilePic: "",
  //     createdAt: "2025-01-01T00:00:00Z",
  //   },
  //   {
  //     _id: "2",
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     userRole: UserRole.VENDOR,
  //     companyRegistered: "Company B",
  //     profilePic: "",
  //     createdAt: "2025-01-02T00:00:00Z",
  //   },
  // ];

  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  const {
    loading,
    data,
    refetch: refetchUsers,
  } = useQuery<{ getAllUsers: IUser[] }>(GET_ALL_USERS);

  const [createUser, { loading: creating }] = useMutation(REGISTER, {
    onCompleted: () => {
      console.log("Create User Success!");
      refetchUsers();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      setError(error.message);
    },
  });

  const [deleteUser] = useMutation(DELETE_MONGO_USER, {
    onCompleted: () => {
      console.log("User delete successful!");
      refetchUsers();
      setUserToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      setError(error.message);
    },
  });

  const [updateUser] = useMutation(UPDATE_USERS, {
    onCompleted: () => {
      console.log("User update success!");
      refetchUsers();
    },
    onError: (error) => {
      console.error("Error updating user", error);
    } 
  })

  const [getUserById, { data: selectedNasData}] =
    useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // Update users when data is fetched
  useEffect(() => {
    if (data && data.getAllUsers) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const handleAddUser = async (userData: IFormData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Ensure userRole is not empty string before creating new user
      if (
        !userData.username ||
        !userData.email ||
        !userData.password ||
        !userData.role
      ) {
        throw new Error("All fields are required");
      }

      const variables = {
        username: userData.username.trim(),
        email: userData.email.trim(),
        password: userData.password.trim(),
        role: userData.role,
      };

      createUser({ variables });

      // const { data: mutationData } = await createUser({
      //   variables: {
      //     input: {
      //       username: userData.username,
      //       email: userData.email,
      //       password: userData.password,
      //       role: userData.role,
      //     },
      //   },
      // });

      setSuccessMessage("User added successfully");
      setIsFormOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add user");
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const newUser: IUser = {
  //     id: Math.random().toString(36).substr(2, 9),
  //     username: userData.username,
  //     email: userData.email,
  //     role: userData.role,
  //     // companyRegistered: userData.companyRegistered,
  //     // createdAt: new Date().toISOString(),
  //     // profilePic: "",

  //   };

  //   setUsers((prevUsers) => [...prevUsers, newUser]);
  //   setSuccessMessage("User added successfully");
  //   setIsFormOpen(false);
  // } catch (error) {
  //   setError(error instanceof Error ? error.message : "Failed to add user");
  //   console.error("Error adding user:", error);
  // } finally {
  //   setIsLoading(false);
  // }

  const handleEditUser = async (userData: IFormData): Promise<void> => {
    if (!selectedUser) return;

    //  getUserById({ variables: { id: userData.id } });    

    try {
      setIsLoading(true);
      setError(null);

      const variables = {
        id: userData.id.trim(),
        username: userData.username.trim(),
        email: userData.email.trim(),
        password: userData.password.trim(),
        role: userData.role,
      };

      // Ensure userRole is not empty string before updating
      if (userData.role === "") {
        throw new Error("User role is required");
      }

      updateUser({ variables });

      // const updatedUser: IUser = {
      //   ...selectedUser,
      //   username: userData.username.trim(),
      //   email: userData.email.trim(),
      //   role: userData.role,
      //   // companyRegistered: userData.companyRegistered.trim(),
      // };

      // setUsers((prevUsers) =>
      //   prevUsers.map((user) =>
      //     user.id === selectedUser.id ? updatedUser : user
      //   )
      // );

      setSuccessMessage("User updated successfully");
      setIsFormOpen(false);
      setSelectedUser(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update user"
      );
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleEdit = (nas: any) => {
  //   getNasById({ variables: { nas_id: nas.nas_id } });
  // };

  // useEffect(() => {
  //   if (selectedNasData && !selectedNasLoading) {
  //     navigate(`/manage-nas`, {
  //       state: { nasData: selectedNasData.getNasById },
  //     });
  //   }
  // }, [selectedNasData, selectedNasLoading, navigate]);

  const handleConfirmDelete = async (): Promise<void> => {
    if (!userToDelete) return;

    try {
      setIsLoading(true);
      setError(null);

      // setUsers((prevUsers) =>
      //   prevUsers.filter((user) => user.id !== userToDelete.id)
      // );

      deleteUser({ variables: { id: userToDelete.id } });
      setSuccessMessage("User deleted successfully");
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      setError("Failed to delete user");
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (user: IUser): void => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user: IUser): void => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseForm = (): void => {
    setIsFormOpen(false);
    setSelectedUser(null);
    setError(null);
  };

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = (): void => {
    setSuccessMessage(null);
    setError(null);
  };

  return (
    <div style={{ maxWidth: "95%", margin: "0 auto" }}>
      <img src={BGIMG} alt="BGCover" style={{ width: "100%" }} />
      <Box sx={{ mt: 2, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          sx={{
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ color: colorTheme.fontsColors.header }}
          >
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
            sx={{
              backgroundColor: colorTheme.primary,
              color: colorTheme.white,
              "&:hover": {
                backgroundColor: colorTheme.secondary,
              },
              boxShadow: 10,
              borderRadius: 5,
              p: 2,
            }}
          >
            Add User
          </Button>
        </Box>
        <Divider sx={{ mb: 4, mt: 4 }} />

        <TableContainer component={Paper}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead sx={{ textAlign: "center" }}>
                <TableRow sx={{ backgroundColor: colorTheme.primary }}>
                  <TableCell sx={{ color: colorTheme.white }}>User</TableCell>
                  {!isMobile && (
                    <TableCell sx={{ color: colorTheme.white }}>
                      Email
                    </TableCell>
                  )}
                  <TableCell sx={{ color: colorTheme.white }}>Role</TableCell>
                  {/* {!isMobile && (
                    <TableCell sx={{ color: colorTheme.white }}>
                      Company
                    </TableCell>
                  )} */}
                  <TableCell align="center" sx={{ color: colorTheme.white }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          {/* <Avatar src={user.profilePic} sx={{ mr: 2 }}>
                            {user.name.charAt(0)}
                          </Avatar> */}
                          <Typography>{user.username}</Typography>
                        </Box>
                      </TableCell>
                      {!isMobile && <TableCell>{user.email}</TableCell>}
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={user.role.toUpperCase() === role.ADMIN ? "success" : "info"}
                          size="small"
                          sx={{ minWidth: 80 }}
                        />
                      </TableCell>
                      {/* {!isMobile && (
                        <TableCell>{user.companyRegistered}</TableCell>
                      )} */}
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          sx={{ color: colorTheme.primary }}
                          onClick={() => handleEditClick(user)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: colorTheme.secondary }}
                          onClick={() => handleDeleteClick(user)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>

        <UserRegistrationForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          initialData={
            selectedUser
              ? {
                  id: selectedUser.id,
                  username: selectedUser.username,
                  email: selectedUser.email,
                  password: "",
                  role: selectedUser.role,
                  // companyRegistered: selectedUser.companyRegistered,
                  // profilePic: null,
                }
              : undefined
          }
          isEditing={!!selectedUser}
        />

        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle
            sx={{
              backgroundColor: colorTheme.primary,
              color: colorTheme.white,
            }}
          >
            Confirm Delete
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            Are you sure you want to delete {userToDelete?.username}?
          </DialogContent>
          <DialogActions sx={{ pb: 2, px: 3 }}>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              sx={{ color: colorTheme.primary }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{ backgroundColor: colorTheme.secondary }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={!!successMessage || !!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={error ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default UserManagement;