import { useUpdateTaskMutation } from "@/app/state/api";
import Modal from "@/components/PagesComponents/Modal";
import { useState, useEffect } from "react";
import { formatISO } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Status } from "@/app/types/statusTypes";
import { Priority } from "@/app/types/priorityTypes";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import { Task } from "@/app/types/taskTypes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  task: Task;
};

const ModalUpdateTask = ({ isOpen, onClose, id, task }: Props) => {
  const dispatch = useAppDispatch();
  const [updateTask, { isLoading }] = useUpdateTaskMutation({
    fixedCacheKey: id,
  });

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Status>(task?.status || Status.ToDo);
  const [priority, setPriority] = useState<Priority>(
    task?.priority || Priority.None,
  );
  const [tags, setTags] = useState(task?.tags || "");
  const [startDate, setStartDate] = useState(
    task?.startDate ? task.startDate.split("T")[0] : "",
  );
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.split("T")[0] : "",
  );
  const [authorUserId, setAuthorUserId] = useState(task?.authorUserId || "");
  const [assignedUserId, setAssignedUserId] = useState(
    task?.assignedUserId || "",
  );
  const [points, setPoints] = useState(task?.points || "");

  const isSideBarCollaped = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sideBarCollapse = () => {
    if (!isSideBarCollaped) {
      dispatch(setIsSidebarCollapsed(true));
    }
  };

  const handleSubmit = async () => {
    if (!title || !authorUserId) return;

    const formattedStartDate = startDate
      ? formatISO(new Date(startDate), {
          representation: "complete",
        })
      : undefined;

    const formattedDueDate = dueDate
      ? formatISO(new Date(dueDate), {
          representation: "complete",
        })
      : undefined;

    try {
      const patchedBody = {
        ...(title !== task.title && { title }),
        ...(description !== task.description && { description }),
        ...(status !== task.status && { status }),
        ...(priority !== task.priority && { priority }),
        ...(tags !== task.tags && { tags }),
        ...(startDate && { startDate: formattedStartDate }),
        ...(dueDate && { dueDate: formattedDueDate }),
        ...(authorUserId !== task.authorUserId && {
          authorUserId: authorUserId,
        }),
        ...(assignedUserId !== task.assignedUserId && {
          assignedUserId: assignedUserId,
        }),
        ...(points !== task.points && { points: Number(points) }),
      };

      await updateTask({
        taskId: id,
        patchedBody,
        projectId: Number(task.projectId),
      }).unwrap();
      sideBarCollapse();
      toast.success("Task updated successfully!");
      resetForm();
    } catch (error: any) {
      const errorMessage = "Failed to update task!";
      console.log(error);
      toast.error(errorMessage);
    }
  };

  const isFormValid = () => {
    return title;
  };

  const resetForm = () => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setStatus(task?.status || Status.ToDo);
    setPriority(task?.priority || Priority.None);
    setTags(task?.tags || "");
    setStartDate(task?.startDate ? task.startDate.split("T")[0] : "");
    setDueDate(task?.dueDate ? task.dueDate.split("T")[0] : "");
    setAuthorUserId(task?.authorUserId || "");
    setAssignedUserId(task?.assignedUserId || "");
    setPoints(task?.points || "");
  };

  useEffect(() => {
    // Prefill form data when modal opens
    if (task) {
      resetForm();
    }
  }, [task]);

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none dark:focus:ring-dark-tertiary";

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      name="Update Task"
    >
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            disabled={isLoading}
          >
            <option value={Status.ToDo}>{Status.ToDo}</option>
            <option value={Status.WorkInProgress}>
              {Status.WorkInProgress}
            </option>
            <option value={Status.UnderReview}>{Status.UnderReview}</option>
            <option value={Status.Completed}>{Status.Completed}</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            disabled={isLoading}
          >
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.BackLog}>Backlog</option>
          </select>
        </div>
        <input
          type="number"
          className={inputStyles}
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={isLoading}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`w-full rounded bg-green-500 p-2 text-white ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Updating..." : "Update Task"}
        </button>
      </form>
      <ToastContainer />
    </Modal>
  );
};

export default ModalUpdateTask;
