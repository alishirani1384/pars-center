"use client";
import { useState, useMemo, Fragment } from "react";
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { Category, categoryTree } from "../../data/categories";

interface Props {
  onSelectCategory?: (category: Category | null) => void;
}


export default function CategorySidebar({ onSelectCategory }: Props) {

  const [path, setPath] = useState<Category[]>([]);

  const list = useMemo<Category[]>(() => {
    if (path.length === 0) return categoryTree;
    const last = path[path.length - 1];
    return last.children ?? [];
  }, [path]);

  const drillDown = (node: Category) => {
    const newPath = [...path, node];
    if (node.children && node.children.length === 1) {
      newPath.push(node.children[0]);
    }
    setPath(newPath);
  };

  const goBack = () => {
    setPath((p) => p.slice(0, -1));
  };

  const handleSelect = (item: Category) => {
    if (item.children && item.children.length > 0) {
      drillDown(item);
    } else {
      onSelectCategory?.(item);
    }
  };

  const handleAllAds = () => {
    setPath([]);
    onSelectCategory?.(null);
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
      case "building-stuff":
        return <BuildOutlinedIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        width: 260, 
        bgcolor: "#ffffff", 
        borderRadius: 1,
        border: "1px solid #f0f0f0",
        overflow: "hidden"
      }}
    >
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between"
        p={1.5}
        borderBottom="1px solid #f0f0f0"
      >
        <Typography fontFamily={"inherit"} fontWeight="500" fontSize="14px">دسته بندی</Typography>
        {path.length > 0 && (
          <IconButton size="small" onClick={goBack} sx={{ p: 0.5 }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {path.length > 0 && (
        <List dense disablePadding>
          <ListItemButton 
            onClick={handleAllAds} 
            sx={{ 
              px: 2,
              py: 1,
              "&:hover": { bgcolor: "rgba(0,0,0,0.03)" }
            }}
          >
            <ListItemText 
              primary="همه آگهی ها" 
              primaryTypographyProps={{ 
                color: "primary", 
                fontSize: "14px",
                fontWeight: "500",
                fontFamily:"inherit"
              }} 
            />
            <ChevronLeftIcon fontSize="small" color="primary" />
          </ListItemButton>
        </List>
      )}

      <List disablePadding>
        {list.map((item) => {
          const hasChildren = !!(item.children && item.children.length > 0);
          const active = path[path.length - 1]?.id === item.id && !hasChildren;
          const icon = getCategoryIcon(item.id);

          return (
            <Fragment key={item.id}>
              <ListItemButton
                onClick={() => handleSelect(item)}
                sx={{
                  px: 2,
                  py: 1,
                  color: active ? "primary.main" : "text.primary",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.03)" },
                }}
              >
                {icon && (
                  <ListItemIcon sx={{ minWidth: 36, color: active ? "primary.main" : "text.secondary" }}>
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText 
                  primary={item.name} 
                  
                  primaryTypographyProps={{ 
                    fontSize: "14px",
                    fontWeight: active ? "500" : "normal",
                    fontFamily:"inherit"
                  }}
                />
                {hasChildren && (
                  <ChevronLeftIcon 
                    fontSize="small" 
                    sx={{ 
                      color: active ? "primary.main" : "text.secondary"
                    }} 
                  />
                )}
              </ListItemButton>
            </Fragment>
          );
        })}
      </List>
    </Paper>
  );
} 
