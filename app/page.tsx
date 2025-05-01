"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header";
import CategorySidebar from "./components/CategorySidebar";
import { Category } from "../data/categories";

export default function Home() {
  const [selected, setSelected] = useState<Category | null>(null);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <Header />

      {/* Body */}
      <Box flex={1} display="flex" p={2} gap={2}>
        {/* Sidebar container */}
        <Box display="flex" justifyContent="flex-start">
          <CategorySidebar onSelectCategory={setSelected} />
        </Box>

        {/* Main content area */}
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ bgcolor: "#ffffff", borderRadius: 1, border: "1px solid #f0f0f0" }}
        >
          <Typography variant="h5" textAlign="center" fontWeight="bold">
            {selected ? (
              <>
                دسته بندی انتخاب شده:
                <br />
                {selected.name}
              </>
            ) : (
              "لطفاً یک دسته بندی انتخاب کنید"
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
