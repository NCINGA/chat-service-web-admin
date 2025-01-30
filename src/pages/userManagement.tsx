import React, { useState } from "react";
import {
  Box,
  Container,
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
} from "@mui/icons-material";
import UserRegistrationForm from "../components/UserManagementComponent/userAddFoarm";

enum UserRole {
  ADMIN = "admin",
  VENDOR = "vendor",
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  userRole: UserRole;
  companyRegistered: string;
  profilePic?: string;
  createdAt: string;
}

interface IFormData {
  name: string;
  email: string;
  password: string;
  userRole: UserRole ;
  companyRegistered: string;
  profilePic: File | null;
}

const UserManagement: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Dummy data
  const dummyUsers: IUser[] = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      userRole: UserRole.ADMIN,
      companyRegistered: "Company A",
      profilePic: "",
      createdAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      userRole: UserRole.VENDOR,
      companyRegistered: "Company B",
      profilePic: "",
      createdAt: "2025-01-02T00:00:00Z",
    },
    // More dummy users
  ];

  const [users, setUsers] = useState<IUser[]>(dummyUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  // const [isSeverity, setIsSeverity] = useState("")

  const handleAddUser = async (userData: IFormData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const newUser: IUser = {
        _id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        userRole: userData.userRole,
        companyRegistered: userData.companyRegistered,
        createdAt: new Date().toISOString(),
        profilePic: "",
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
      setSuccessMessage("User added successfully");
      // setIsSeverity("success")
      setIsFormOpen(false);
    } catch (error) {
      setError("Failed to add user");
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async (userData: IFormData): Promise<void> => {
    if (!selectedUser) return;

    try {
      setIsLoading(true);
      setError(null);

      const updatedUser: IUser = {
        ...selectedUser,
        name: userData.name.trim(),
        email: userData.email.trim(),
        userRole: userData.userRole,
        companyRegistered: userData.companyRegistered.trim(),
      };

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? updatedUser : user
        )
      );

      setSuccessMessage("User updated successfully");
      setIsFormOpen(false);
      setSelectedUser(null);
    } catch (error) {
      setError("Failed to update user");
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setIsLoading(true);
      setError(null);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userToDelete._id)
      );
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

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user: IUser) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
    setError(null);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
    setError(null);
  };

  return (
    <Container>
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
          <Typography variant="h5" component="h1" sx={{ color: "teal" }}>
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
            sx={{
              backgroundColor: "teal",
              color: "white",
              "&:hover": {
                backgroundColor: "orange",
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
              <TableHead>
                <TableRow sx={{ backgroundColor: "teal" }}>
                  <TableCell sx={{ color: "white" }}>User</TableCell>
                  {!isMobile && (
                    <TableCell sx={{ color: "white" }}>Email</TableCell>
                  )}
                  <TableCell sx={{ color: "white" }}>Role</TableCell>
                  {!isMobile && (
                    <TableCell sx={{ color: "white" }}>Company</TableCell>
                  )}
                  <TableCell align="center" sx={{ color: "white" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar src={user.profilePic} sx={{ mr: 2 }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          <Typography>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      {!isMobile && <TableCell>{user.email}</TableCell>}
                      <TableCell>
                        <Chip
                          label={user.userRole}
                          color={
                            user.userRole === UserRole.ADMIN
                              ? "success"
                              : "info"
                          }
                          size="small"
                          sx={{ minWidth: 80 }}
                        />
                      </TableCell>
                      {!isMobile && (
                        <TableCell>{user.companyRegistered}</TableCell>
                      )}
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          sx={{ color: "teal" }}
                          onClick={() => handleEditClick(user)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: "orange" }}
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
          />
        </TableContainer>

        <UserRegistrationForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          initialData={
            selectedUser
              ? {
                  name: selectedUser.name,
                  email: selectedUser.email,
                  password: "",
                  userRole: selectedUser.userRole,
                  companyRegistered: selectedUser.companyRegistered,
                  profilePic: null,
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
          <DialogTitle sx={{ backgroundColor: "teal", color: "white" }}>
            Confirm Delete
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            Are you sure you want to delete {userToDelete?.name}?
          </DialogContent>
          <DialogActions sx={{ pb: 2, px: 3 }}>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              sx={{ color: "teal" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{ backgroundColor: "orange" }}
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
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default UserManagement;
