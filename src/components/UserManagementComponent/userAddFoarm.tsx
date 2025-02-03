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
  Box,
  Snackbar,
  Alert,
  FormHelperText,
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
    name: "",
    email: "",
    password: "",
    userRole: "",
    companyRegistered: "",
  });

  const [errors, setErrors] = useState<Partial<IFormData>>({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<
      "success" | "error"
  >("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (initialData && open) {
      setFormData(initialData);
      setErrors({});
    } else if (!open) {
      setFormData({
        name: "",
        email: "",
        password: "",
        userRole: "",
        companyRegistered: "",
      });
      setErrors({});
    }
  }, [initialData, open]);

  const validateForm = () => {
    let newErrors: Partial<IFormData> = {};

    if (!formData.name.trim()) newErrors.name = "This field is required";
    if (!formData.email.trim()) newErrors.email = "This field is required";
    if (!isEditing && !formData.password.trim())
      newErrors.password = "This field is required";
    if (!formData.userRole) newErrors.userRole = "This field is required";
    if (!formData.companyRegistered.trim())
      newErrors.companyRegistered = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({ ...prev, userRole: event.target.value as UserRole | "" }));
    setErrors((prev) => ({ ...prev, userRole: "" }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

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
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  return (
      <>
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
                  error={!!errors.name}
                  helperText={errors.name}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
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
                      error={!!errors.password}
                      helperText={errors.password}
                  />
              )}
              <FormControl fullWidth margin="normal" error={!!errors.userRole}>
                <InputLabel id="user-role-label">User Role</InputLabel>
                <Select
                    labelId="user-role-label"
                    value={formData.userRole}
                    onChange={handleRoleChange}
                >
                  <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                  <MenuItem value={UserRole.VENDOR}>Vendor</MenuItem>
                </Select>
                {errors.userRole && <FormHelperText>{errors.userRole}</FormHelperText>}
              </FormControl>
              <TextField
                  fullWidth
                  margin="normal"
                  label="Company"
                  name="companyRegistered"
                  value={formData.companyRegistered}
                  onChange={handleInputChange}
                  error={!!errors.companyRegistered}
                  helperText={errors.companyRegistered}
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
