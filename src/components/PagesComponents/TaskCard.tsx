import { Task } from "@/app/types/taskTypes";
import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { PriorityTag } from "@/app/projects/BoardView";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const startDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "N/A";

  const dueDate = task.dueDate ? format(new Date(task.dueDate), "P") : "N/A";

  return (
    <div className="mb-3 rounded-md bg-slate-100 p-4 shadow-md dark:bg-stroke-dark dark:text-white">
      <div className="w-fit pb-2">
        {task.priority && <PriorityTag priority={task.priority} />}
      </div>
      <p className="text-sm font-semibold text-gray-700 dark:text-white">
        <strong>Task Name:</strong> {task.title}
      </p>
      {task?.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="rounded-md"
            />
          </div>
        </div>
      )}
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Start Date:</strong> {startDate}
      </p>
      <p>
        <strong>End Date:</strong> {dueDate}
      </p>
      <p>
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;
