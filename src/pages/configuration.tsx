import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  Paper,
  CircularProgress,
  InputAdornment,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ConfigBG from "../assets/BGImgConfig.png";

const THEME = {
  white: "#FFFFFF",
  teal: "#008080",
  orange: "#FFA500",
};

const StyledButton = styled(Button)(({ color }) => ({
  backgroundColor: color,
  "&:hover": {
    backgroundColor: color === THEME.orange ? "#cc8400" : "#006666",
  },
  color: THEME.white,
}));

const JsonEditor = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontFamily: "monospace",
    backgroundColor: THEME.white,
  },
});

const ConfigUI = () => {
  const types = ["Type 1", "Type 2", "Type 3"];
  const [selectedType, setSelectedType] = useState("");
  const [jsonContent, setJsonContent] = useState('{\n  "key": "value"\n}');
  const [isLoading, setIsLoading] = useState(false);

  const handleTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setIsLoading(true);
    setSelectedType(event.target.value);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleJsonChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setJsonContent(event.target.value);
  };

  return (
    <div style={{ maxWidth: "95%", margin: "0 auto" }}>
      <img src={ConfigBG} alt="BGCover" style={{ width: "100%" }} />
      <Paper
        elevation={10}
        sx={{
          p: 4,
          mt: 5,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: THEME.teal,
            mb: 4,
            fontWeight: 500,
          }}
        >
          Edit Configurations
        </Typography>

        <Box
          component="hr"
          sx={{
            border: "none",
            height: 2,
            backgroundColor: THEME.orange,
            mb: 4,
          }}
        />

        <Stack spacing={4}>
          <TextField
            select
            label="Select Your JSON File"
            value={selectedType}
            onChange={handleTypeChange}
            fullWidth
            sx={{ backgroundColor: THEME.white }}
            InputProps={{
              startAdornment: isLoading && (
                <InputAdornment position="start">
                  <CircularProgress size={20} color="inherit" />
                </InputAdornment>
              ),
            }}
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {selectedType && (
            <JsonEditor
              multiline
              rows={10}
              value={jsonContent}
              onChange={handleJsonChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontFamily: "monospace",
                  backgroundColor: THEME.white,
                },
              }}
            />
          )}
        </Stack>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: THEME.teal,
              fontWeight: 500,
            }}
          >
            Please perform <strong>Save Backup</strong> before updating.
          </Typography>

          <Stack direction="row" spacing={2}>
            <StyledButton
              variant="contained"
              sx={{ backgroundColor: THEME.orange }}
            >
              Update
            </StyledButton>

            <StyledButton
              variant="contained"
              sx={{ backgroundColor: THEME.teal }}
            >
              Save Backup
            </StyledButton>

            <StyledButton
              variant="contained"
              sx={{ backgroundColor: THEME.teal }}
            >
              Restore Backup
            </StyledButton>
          </Stack>
        </Box>
      </Paper>
    </div>
  );
};

export default ConfigUI;
