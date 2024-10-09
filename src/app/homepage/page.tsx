"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import React from "react";
import { useGetProjectsQuery } from "../state/api";
import { Project } from "../types/projectTypes";
import ProjectCard from "@/components/ProjectCard";
import { tailChase } from "ldrs";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "../projects/lib/utils";
import { useAppSelector } from "../redux";

tailChase.register();

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const HomePageSelector = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Project ID",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Project Description",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "projectAnalysis",
      headerName: "Project Analysis",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex h-full w-full items-center justify-center">
          <button
            onClick={() => {
              navigateToHomepage(params.row.id);
            }}
            className="flex h-10 w-44 items-center justify-center rounded-full bg-[#8884d8] text-white"
          >
            Analyze Project
          </button>
        </div>
      ),
    },
  ];
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const router = useRouter();

  const navigateToHomepage = (id: number) => {
    router.push(`/home/${id}`);
  };

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <l-tail-chase size="40" speed="1.75" color="gray" />
      </div>
    );
  }

  if (isError) {
    return <div>An error occurred while fetching projects</div>;
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Select Project" />
      <div style={{ height: 650, width: "100%", overflowX: "auto" }}>
        <div style={{ minWidth: 600 }}>
          <DataGrid
            rows={projects || []}
            columns={columns}
            getRowId={(row) => row.id}
            pagination
            className={dataGridClassNames}
            slots={{
              toolbar: CustomToolbar,
            }}
            sx={dataGridSxStyles(isDarkMode)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageSelector;
