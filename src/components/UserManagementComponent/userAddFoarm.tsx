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
  SelectChangeEvent,
} from "@mui/material";
import colorTheme from "../../styles/Theme";

enum role {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
}

interface IFormData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: role | "";
}

interface IFormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

interface UserRegistrationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IFormData) => Promise<void>;
  initialData?: IFormData;
  isEditing?: boolean;
}

export const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<IFormData>({
    id: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState<IFormErrors>({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<
    "success" | "error"
  >("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && open) {
      setFormData(initialData);
      setErrors({});
    } else if (!open) {
      setFormData({
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
      });
      setErrors({});
    }
  }, [initialData, open]);

  const validateForm = (): boolean => {
    const newErrors: IFormErrors = {};

    if (!formData.username.trim()) newErrors.name = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!isEditing && !formData.password.trim())
      newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "User role is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleRoleChange = (event: SelectChangeEvent<role | "">): void => {
    setFormData((prev) => ({
      ...prev,
      role: event.target.value as role | "",
    }));
    setErrors((prev) => ({ ...prev, role: undefined }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!validateForm() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setNotificationStatus("success");
      setNotificationMessage(
        isEditing ? "User updated successfully!" : "User added successfully!"
      );
      setShowNotification(true);
      onClose();
    } catch (error) {
      setNotificationStatus("error");
      setNotificationMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the user"
      );
      setShowNotification(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseNotification = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              backgroundColor: colorTheme.primary,
              color: colorTheme.white,
            }}
          >
            <DialogTitle sx={{ textAlign: "center" }}>
              {isEditing ? "Edit User" : "Add New User"}
            </DialogTitle>
          </Box>
          <DialogContent sx={{ p: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            )}
            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel id="user-role-label">User Role</InputLabel>
              <Select
                labelId="user-role-label"
                value={formData.role}
                onChange={handleRoleChange}
                label="User Role"
                disabled={isSubmitting}
              >
                <MenuItem value={role.ADMIN}>Admin</MenuItem>
                <MenuItem value={role.VENDOR}>Vendor</MenuItem>
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ pb: 4, px: 3 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                p: 2,
                borderColor: colorTheme.secondary,
                color: colorTheme.secondary,
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 2, backgroundColor: colorTheme.primary }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add User"}
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