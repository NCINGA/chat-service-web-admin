// import React, { useState } from "react";
// import {
//     Box,
//     Container,
//     Paper,
//     Typography,
//     Button,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Avatar,
//     IconButton,
//     TablePagination,
//     Chip,
//     useTheme,
//     useMediaQuery,
//     Divider,
//     Dialog,
//     DialogContent,
//     DialogTitle,
//     DialogActions,
//     // CircularProgress,
// } from "@mui/material";
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
// // import userAddFoarm from "../components/UserManagementComponents/userAddFoarm.tsx";
// //  import userAddFoarm from "./userAddFoarm";

// const UserManagement = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//     const handleAddUserClick = () => setIsFormOpen(true);
//     const handleCloseForm = () => setIsFormOpen(false);
//     const handleDeleteClick = () => setIsDeleteDialogOpen(true);
//     const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

//     return (
//         <Container maxWidth="lg">
//             <Box sx={{ mt: 2, mb: 4 }}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} sx={{ flexDirection: isMobile ? "column" : "row", gap: isMobile ? 2 : 0 }}>
//                     <Typography variant="h5" component="h1" sx={{ color: "teal" }}>
//                         User Management
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         onClick={handleAddUserClick}
//                         sx={{ backgroundColor: "teal", color: "white", "&:hover": { backgroundColor: "orange" }, boxShadow: 10, borderRadius: 5, p: 2 }}
//                     >
//                         Add User
//                     </Button>
//                 </Box>
//                 <Divider sx={{ mb: 4, mt: 4 }} />

//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: "teal" }}>
//                                 <TableCell sx={{ color: "white" }}>User</TableCell>
//                                 {!isMobile && <TableCell sx={{ color: "white" }}>Email</TableCell>}
//                                 <TableCell sx={{ color: "white" }}>Role</TableCell>
//                                 {!isMobile && <TableCell sx={{ color: "white" }}>Company</TableCell>}
//                                 <TableCell align="center" sx={{ color: "white" }}>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             <TableRow>
//                                 <TableCell>
//                                     <Box display="flex" alignItems="center">
//                                         <Avatar sx={{ mr: 2 }}>A</Avatar>
//                                         <Typography>John Doe</Typography>
//                                     </Box>
//                                 </TableCell>
//                                 {!isMobile && <TableCell>johndoe@example.com</TableCell>}
//                                 <TableCell>
//                                     <Chip label="Admin" color="success" size="small" sx={{ minWidth: 80 }} />
//                                 </TableCell>
//                                 {!isMobile && <TableCell>Example Corp</TableCell>}
//                                 <TableCell align="center">
//                                     <IconButton size="small" sx={{ color: "teal" }}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton size="small" sx={{ color: "orange" }} onClick={handleDeleteClick}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>
//                     <TablePagination component="div" count={1} page={0} rowsPerPage={5} onPageChange={() => {}} onRowsPerPageChange={() => {}} />
//                 </TableContainer>

//                 {/* <userAddFoarm open={isFormOpen} onClose={handleCloseForm} /> */}

//                 <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
//                     <DialogTitle sx={{ backgroundColor: "teal", color: "white" }}>Confirm Delete</DialogTitle>
//                     <DialogContent sx={{ mt: 2 }}>Are you sure you want to delete this user?</DialogContent>
//                     <DialogActions sx={{ pb: 2, px: 3 }}>
//                         <Button onClick={handleCloseDeleteDialog} sx={{ color: "teal" }}>Cancel</Button>
//                         <Button variant="contained" sx={{ backgroundColor: "orange" }}>Delete</Button>
//                     </DialogActions>
//                 </Dialog>
//             </Box>
//         </Container>
//     );
// };

// export default UserManagement;