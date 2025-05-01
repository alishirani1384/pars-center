import type { ReactNode } from "react";

export interface Category {
  id: string;
  name: string;
  icon?: ReactNode;
  children?: Category[];
}


export const categoryTree: Category[] = [
  {
    id: "ind-build",
    name: "صنعت و ساخت",
    icon: null, 
    children: [
      {
        id: "tool-power",
        name: "ابزار برق",
        children: [
          { id: "tool-power-1", name: "ابزار برق 1" },
          { id: "tool-power-2", name: "ابزار برق 2" },
          { id: "tool-power-3", name: "ابزار برق 3" },
        ],
      },
      {
        id: "building-stuff",
        name: "وسایل ساختمانی",
        children: [
          { id: "child-building-1", name: "فرزند وسایل ساختمانی 1" },
          { id: "child-building-2", name: "فرزند وسایل ساختمانی 2" },
          { id: "child-building-3", name: "فرزند وسایل ساختمانی 3" },
        ],
      },
      {
        id: "electric-equip",
        name: "ابزارات برقی",
        children: [
          { id: "electric-equip-1", name: "ابزارات برقی 1" },
          { id: "electric-equip-2", name: "ابزارات برقی 2" },
        ],
      },
      {
        id: "ind-equip",
        name: "ابزارات صنعتی",
        children: [
          { id: "ind-equip-1", name: "ابزارات صنعتی 1" },
        ],
      },
    ],
  },
  {
    id: "services",
    name: "خدمات",
    children: [
      { id: "service-child-1", name: "نوع خدمات 1" },
      { id: "service-child-2", name: "نوع خدمات 2" },
    ],
  },
  {
    id: "agri",
    name: "کشاورزی و حمل و نقل",
    children: [
      { id: "agri-child-1", name: "فرزند کشاورزی و حمل 1" },
      { id: "agri-child-2", name: "فرزند کشاورزی و حمل 2" },
    ],
  },
  {
    id: "health",
    name: "بهداشت و ایمنی",
    children: [{ id: "health-child", name: "فرزند بهداشت ایمنی" }],
  },
  {
    id: "beauty",
    name: "پوشاک و مد",
    children: [],
  },
  {
    id: "home-garden",
    name: "خانه و کاشانه",
    children: [],
  },
  {
    id: "handicraft",
    name: "صنایع دستی",
    children: [],
  },
  {
    id: "it-tech",
    name: "فناوری ارتباطات",
    children: [],
  },
]; 
