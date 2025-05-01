"use client";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" color="default" sx={{ bgcolor: "#ddd", mb: 2 }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" color="text.primary" fontWeight="bold">
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
} 