"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Paper,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { Category, categoryTree } from "../../data/categories";

interface FilterDropdownProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const FilterDropdown = ({
  title,
  open,
  onToggle,
  children,
}: FilterDropdownProps) => {
  return (
    <Box sx={{ width: "100%", mb: 0.5 }}>
      <Box
        onClick={onToggle}
        display="flex"
        alignItems="center"
        gap={2}
        p={1.2}
        sx={{
          cursor: "pointer",
        }}
      >
        <KeyboardArrowDownIcon
          fontSize="small"
          sx={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
        <Typography
          fontFamily={"inherit"}
          fontWeight="500"
          fontSize="14px"
          color="#333"
        >
          {title}
        </Typography>
      </Box>
      <Collapse in={open}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: "#ffffff",
            borderRadius: 1,
            border: "1px solid #f0f0f0",
            borderTop: "none",
            mt: -0.5,
            overflow: "hidden",
          }}
        >
          {children}
        </Paper>
      </Collapse>
    </Box>
  );
};

interface Props {
  onSelectCategory?: (category: Category | null) => void;
}

export default function FilterDropdowns({ onSelectCategory }: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const handleToggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSelectCategory = (category: Category) => {
    if (category.children && category.children.length > 0) {
      // Toggle expanded state for this category
      setExpandedCategories(prev => ({
        ...prev,
        [category.id]: !prev[category.id]
      }));
    } else {
      // It's a leaf category, select it
      setSelectedCategory(category);
      onSelectCategory?.(category);
    }
  };

  const isCategoryExpanded = (categoryId: string): boolean => {
    return !!expandedCategories[categoryId];
  };

  // Recursive function to render categories and their children
  const renderCategories = (categories: Category[], level: number = 0) => {
    return categories.map((category) => {
      const hasChildren = !!(category.children && category.children.length > 0);
      const isExpanded = isCategoryExpanded(category.id);
      
      return (
        <div key={category.id}>
          <ListItemButton
            onClick={() => handleSelectCategory(category)}
            sx={{
              px: 2,
              py: 1,
              textAlign: "right",
              paddingRight: level > 0 ? `${level * 16 + 16}px` : 16,
              "&:hover": { bgcolor: "rgba(0,0,0,0.03)" },
            }}
          >
            <ListItemText
              primary={category.name}
              primaryTypographyProps={{
                fontSize: "14px",
                fontWeight: "normal",
                fontFamily: "inherit",
                textAlign: "right",
              }}
            />
            <ListItemIcon
              sx={{ minWidth: 36, color: "text.secondary", marginLeft: 0 }}
            >
              {hasChildren ? (
                <KeyboardArrowDownIcon
                  fontSize="small"
                  sx={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              ) : (
                getCategoryIcon(category.id)
              )}
            </ListItemIcon>
          </ListItemButton>
          
          {/* Render children if expanded */}
          {hasChildren && isExpanded && renderCategories(category.children, level + 1)}
        </div>
      );
    });
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "ind-build":
        return <FactoryOutlinedIcon fontSize="small" />;
      case "services":
        return <BusinessCenterOutlinedIcon fontSize="small" />;
      case "agri":
        return <AgricultureOutlinedIcon fontSize="small" />;
      case "health":
        return <HealthAndSafetyOutlinedIcon fontSize="small" />;
      case "beauty":
        return <CheckroomOutlinedIcon fontSize="small" />;
      case "home-garden":
        return <HomeOutlinedIcon fontSize="small" />;
      case "handicraft":
        return <ColorLensOutlinedIcon fontSize="small" />;
      case "it-tech":
        return <DevicesOutlinedIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 250,
        direction: "rtl",
        textAlign: "right",
        background: "white",
      }}
    >
      {/* دسته بندی */}
      <FilterDropdown
        title="دسته بندی"
        open={openDropdown === "category"}
        onToggle={() => handleToggleDropdown("category")}
      >
        <List disablePadding>
          {renderCategories(categoryTree)}
        </List>
      </FilterDropdown>
      <Divider />
      {/* قیمت */}
      <FilterDropdown
        title="قیمت"
        open={openDropdown === "price"}
        onToggle={() => handleToggleDropdown("price")}
      >
        <List disablePadding>
          <ListItemButton sx={{ px: 2, py: 1 }}>
            <ListItemText
              primary="همه قیمت‌ها"
              primaryTypographyProps={{
                fontSize: "14px",
                fontFamily: "inherit",
                textAlign: "right",
              }}
            />
          </ListItemButton>
          <ListItemButton sx={{ px: 2, py: 1 }}>
            <ListItemText
              primary="توافقی"
              primaryTypographyProps={{
                fontSize: "14px",
                fontFamily: "inherit",
                textAlign: "right",
              }}
            />
          </ListItemButton>
        </List>
      </FilterDropdown>
      <Divider />
      {/* وضعیت آگهی */}
      <FilterDropdown
        title="وضعیت آگهی"
        open={openDropdown === "status"}
        onToggle={() => handleToggleDropdown("status")}
      >
        <List disablePadding>
          <ListItemButton sx={{ px: 2, py: 1 }}>
            <ListItemText
              primary="همه آگهی‌ها"
              primaryTypographyProps={{
                fontSize: "14px",
                fontFamily: "inherit",
                textAlign: "right",
              }}
            />
          </ListItemButton>
          <ListItemButton sx={{ px: 2, py: 1 }}>
            <ListItemText
              primary="نو"
              primaryTypographyProps={{
                fontSize: "14px",
                fontFamily: "inherit",
                textAlign: "right",
              }}
            />
          </ListItemButton>
          <ListItemButton sx={{ px: 2, py: 1 }}>
            <ListItemText
              primary="در حد نو"
              primaryTypographyProps={{
                fontSize: "14px",
                fontFamily: "inherit",
                textAlign: "right",
              }}
            />
          </ListItemButton>
          <ListItemButton sx={{ px: 2, py: 1 }}>
            <ListItemText
              primary="کارکرده"
              primaryTypographyProps={{
                fontSize: "14px",
                fontFamily: "inherit",
                textAlign: "right",
              }}
            />
          </ListItemButton>
        </List>
      </FilterDropdown>
    </Box>
  );
}
