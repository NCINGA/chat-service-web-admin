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
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Grid2,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TablePagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import BGIMG from "../assets/BgImg.png";
import colorTheme from "../styles/Theme";

interface IAuditLog {
  id: string;
  timestamp: string;
  user: string;
  activity: string;
  endpoint: string;
  status: string;
}

// @Himesh :  Change the data with the sysytem data
const activities = ["Login", "Logout", "Create", "Update", "Delete", "View"];
const endpoints = [
  "Password Reset",
  "User Onboard",
  "User Offboard",
  "Account Unlock",
  "Detail Seeking",
];
const statuses = ["Success", "Failure"];

// Sample dummy data
const dummyAuditLogs: IAuditLog[] = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    user: "admin@example.com",
    activity: "Login",
    endpoint: "User Onboard",
    status: "Success",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "vendor@example.com",
    activity: "Update",
    endpoint: "Password Reset",
    status: "Success",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "user@example.com",
    activity: "Delete",
    endpoint: "User Offboard",
    status: "Failure",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    user: "admin@example.com",
    activity: "Create",
    endpoint: "Account Unlock",
    status: "Success",
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    user: "support@example.com",
    activity: "View",
    endpoint: "Password Reset",
    status: "Success",
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    user: "vendor@example.com",
    activity: "Logout",
    endpoint: "Detail Seeking",
    status: "Success",
  },
  {
    id: "7",
    timestamp: new Date(Date.now() - 345600000).toISOString(),
    user: "admin@example.com",
    activity: "Update",
    endpoint: "Detail Seeking",
    status: "Failure",
  },
  {
    id: "8",
    timestamp: new Date(Date.now() - 432000000).toISOString(),
    user: "user@example.com",
    activity: "View",
    endpoint: "Password Reset",
    status: "Success",
  },
];

const AuditLog: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // audit logs data
  const [auditLogs, setAuditLogs] = useState<IAuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<IAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter
  const [activity, setActivity] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setAuditLogs(dummyAuditLogs);
      setFilteredLogs(dummyAuditLogs);
      setIsLoading(false);
    }, 500);
  }, []);

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

  const handleSearch = (): void => {
    setIsLoading(true);

    // Filter logic
    let results = [...auditLogs];

    if (activity) {
      results = results.filter((log) => log.activity === activity);
    }

    if (endpoint) {
      results = results.filter((log) => log.endpoint === endpoint);
    }

    if (status) {
      results = results.filter((log) => log.status === status);
    }

    if (user) {
      results = results.filter((log) =>
        log.user.toLowerCase().includes(user.toLowerCase())
      );
    }

    if (startDate) {
      results = results.filter((log) => new Date(log.timestamp) >= startDate);
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      results = results.filter((log) => new Date(log.timestamp) <= endOfDay);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (log) =>
          log.user.toLowerCase().includes(term) ||
          log.activity.toLowerCase().includes(term) ||
          log.endpoint.toLowerCase().includes(term) ||
          log.status.toLowerCase().includes(term)
      );
    }

    setTimeout(() => {
      setFilteredLogs(results);
      setIsLoading(false);

      if (results.length === 0) {
        setSuccessMessage("No matching records found");
      }
    }, 500);
  };

  const handleClearFilters = (): void => {
    setActivity("");
    setEndpoint("");
    setStatus("");
    setUser("");
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");

    setFilteredLogs(auditLogs);
    setPage(0);
  };

  const getStatusColor = (
    status: string
  ): "success" | "error" | "warning" | "info" => {
    switch (status.toLowerCase()) {
      case "success":
        return "success";
      case "failure":
        return "error";
      case "warning":
        return "warning";
      default:
        return "info";
    }
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
            Audit Log
          </Typography>
        </Box>
        <Divider sx={{ mb: 4, mt: 4 }} />

        {/* Filter Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2, color: colorTheme.primary }}
          >
            <FilterIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Filters
          </Typography>

          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="activity-label">Activity</InputLabel>
                <Select
                  labelId="activity-label"
                  id="activity-select"
                  value={activity}
                  label="Activity"
                  onChange={(e) => setActivity(e.target.value)}
                >
                  <MenuItem value="">All Activities</MenuItem>
                  {activities.map((act) => (
                    <MenuItem key={act} value={act}>
                      {act}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="endpoint-label">Endpoint</InputLabel>
                <Select
                  labelId="endpoint-label"
                  id="endpoint-select"
                  value={endpoint}
                  label="Endpoint"
                  onChange={(e) => setEndpoint(e.target.value)}
                >
                  <MenuItem value="">All Endpoints</MenuItem>
                  {endpoints.map((ep) => (
                    <MenuItem key={ep} value={ep}>
                      {ep}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  {statuses.map((st) => (
                    <MenuItem key={st} value={st}>
                      {st}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="User"
                variant="outlined"
                size="small"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Filter by user"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in logs..."
                InputProps={{
                  endAdornment: <SearchIcon color="action" />,
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{
                    backgroundColor: colorTheme.primary,
                    color: colorTheme.white,
                    "&:hover": {
                      backgroundColor: colorTheme.secondary,
                    },
                    boxShadow: 5,
                    borderRadius: 5,
                  }}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  startIcon={<ClearIcon />}
                  sx={{
                    color: colorTheme.secondary,
                    borderColor: colorTheme.secondary,
                    "&:hover": {
                      borderColor: colorTheme.primary,
                      color: colorTheme.primary,
                    },
                    borderRadius: 5,
                  }}
                >
                  Clear Filters
                </Button>
              </Stack>
            </Grid2>
          </Grid2>
        </Paper>

        {/* Audit Log Table */}
        <TableContainer component={Paper}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead sx={{ textAlign: "center" }}>
                <TableRow sx={{ backgroundColor: colorTheme.primary }}>
                  <TableCell sx={{ color: colorTheme.white }}>
                    Timestamp
                  </TableCell>
                  <TableCell sx={{ color: colorTheme.white }}>User</TableCell>
                  <TableCell sx={{ color: colorTheme.white }}>
                    Activity
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ color: colorTheme.white }}>
                      Endpoint
                    </TableCell>
                  )}
                  <TableCell sx={{ color: colorTheme.white }}>Status</TableCell>
                  {/* {!isMobile && (
                    <TableCell sx={{ color: colorTheme.white }}>
                      Details
                    </TableCell>
                  )} */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.activity}</TableCell>
                        {!isMobile && <TableCell>{log.endpoint}</TableCell>}
                        <TableCell>
                          <Chip
                            label={log.status}
                            color={getStatusColor(log.status)}
                            size="small"
                            sx={{ minWidth: 80 }}
                          />
                        </TableCell>
                        {/* {!isMobile && <TableCell>{log.details}</TableCell>} */}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 4 : 6} align="center">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <TablePagination
            component="div"
            count={filteredLogs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>

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

export default AuditLog;
