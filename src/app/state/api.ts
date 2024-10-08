import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project } from "../types/projectTypes";
import { Task } from "../types/taskTypes";
import { SearchResults } from "../types/searchResults";
import { User } from "../types/userTypes";
import { Team } from "../types/teamTypes";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }), // Grabs the public base URL
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "searchTerm", "Users", "Teams"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        // taskId and status in curly braces because they are now handled as objects
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId }, // I would wanna update only the changed ones not the entire task list (one specific task not all the tasks)
      ],
    }),

    deleteTask: build.mutation<void, number>({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: "DELETE",
      }),
      // Add invalidation for search term
      invalidatesTags: (result, error, taskId) => [
        { type: "Tasks", id: taskId },
        { type: "searchTerm", id: "SEARCH" }, // This should be an identifier for my search cache
        // Incase of deletion i invalidate the searchTerm, and the searchTerm is being used as providedTags in my searchTerm query
      ],
    }),

    searchTerm: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
      providesTags: (result) =>
        result ? [{ type: "searchTerm", id: "SEARCH" }] : [], // Fallback incase the searchTerm returns back with null
    }),

    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
  useSearchTermQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
} = api;
