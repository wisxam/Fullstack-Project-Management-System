"use client";

import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery, useGetTasksQuery } from "@/app/state/api";
import { Priority } from "@/app/types/priorityTypes";
import { Task } from "@/app/types/taskTypes";

const HomePage = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });

  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || projectsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <l-tail-chase size="40" speed="1.75" color="gray" />
      </div>
    );
  }

  if (tasksError || projectsError) {
    return <div>An error occurred while fetching tasks</div>;
  }

  //   const priorityCount = tasks?.reduce(
  //     (acc, task) => {
  //       if (task.priority === "Urgent") {
  //         acc.Urgent += 1;
  //       } else if (task.priority === "Medium") {
  //         acc.Medium += 1;
  //       } else if (task.priority === "High") {
  //         acc.High += 1;
  //       } else if (task.priority === "BackLog") {
  //         acc.Backlog += 1;
  //       }
  //       return acc;
  //     },
  //     { Urgent: 0, Medium: 0, High: 0, Backlog: 0 },
  //   );
  const priorityCount = tasks?.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  console.log(priorityCount);

  return <div>HomePage</div>;
};

export default HomePage;
