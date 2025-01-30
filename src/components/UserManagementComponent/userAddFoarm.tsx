import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

enum UserRole {
  ADMIN = "admin",
  VENDOR = "vendor",
}

interface IFormData {
  name: string;
  email: string;
  password: string;
  userRole: UserRole | "";
  companyRegistered: string;
  profilePic: File | null;
}

interface UserRegistrationFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: IFormData;
  isEditing?: boolean;
}

export const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  open,
  onClose,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<IFormData>({
    name: "John Doe",  // Dummy data
    email: "john.doe@example.com",  // Dummy data
    password: "password123",  // Dummy data
    userRole: UserRole.ADMIN,  // Dummy data
    companyRegistered: "ABC Ltd.",  // Dummy data
    profilePic: null,
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<
    "success" | "error"
  >("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (initialData && open) {
      setFormData(initialData);
    } else if (!open) {
      setFormData({
        name: "",  // Dummy data
        email: "",  // Dummy data
        password: "",  // Dummy data
        userRole: "",  // Dummy data
        companyRegistered: "",  // Dummy data
        profilePic: null,
      });
    }
  }, [initialData, open]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (event: SelectChangeEvent<UserRole | "">) => {
    setFormData((prev) => ({
      ...prev,
      userRole: event.target.value as UserRole | "",
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // No real API call, just simulate a success
    setNotificationStatus("success");
    setNotificationMessage(
      isEditing ? "User updated successfully!" : "User added successfully!"
    );
    setShowNotification(true);
    onClose();
  };

  const handleCloseNotification = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(9px)",
            boxShadow: "none",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ backgroundColor: "teal", color: "white" }}>
            <DialogTitle sx={{ textAlign: "center" }}>
              {isEditing ? "Edit User" : "Add New User"}
            </DialogTitle>
          </Box>
          <DialogContent sx={{ p: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {!isEditing && (
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            )}
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="user-role-label">User Role</InputLabel>
              <Select
                labelId="user-role-label"
                label="User Role"
                name="userRole"
                value={formData.userRole}
                onChange={handleRoleChange}
              >
                <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                <MenuItem value={UserRole.VENDOR}>Vendor</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Company"
              name="companyRegistered"
              value={formData.companyRegistered}
              onChange={handleInputChange}
              required
            />
          </DialogContent>
          <DialogActions sx={{ pb: 4 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ p: 2, borderColor: "orange", color: "orange" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 2, backgroundColor: "teal" }}
            >
              {isEditing ? "Update" : "Add User"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationStatus}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserRegistrationForm;
