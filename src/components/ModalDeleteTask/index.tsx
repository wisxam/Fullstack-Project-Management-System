import { useAppSelector } from "@/app/redux";
import { useDeleteTaskMutation } from "@/app/state/api";
import Modal from "@/components/PagesComponents/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskId: number | null;
};

const ModalDeleteTask = ({ isOpen, onClose, taskId }: Props) => {
  const [deleteTask] = useDeleteTaskMutation();
  const handleDelete = async () => {
    if (!taskId) return;
    try {
      await deleteTask(Number(taskId)).unwrap();
      toast.success("Task deleted successfully!");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: unknown) {
      toast.error("Error deleting task");
      console.error("Error deleting task:", error);
    }
  };

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Delete task">
      <div className="mt-4 space-y-6">
        <p className="text-xl dark:text-white">
          Are you sure you want to delete this task?
        </p>
        <button
          onClick={handleDelete}
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600`}
        >
          Delete task
        </button>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        toastStyle={{
          backgroundColor: isDarkMode ? "#3b3d40" : "#d1d5db",
          color: isDarkMode ? "#d1d5db" : "#3b3d40",
        }}
        bodyStyle={{
          color: isDarkMode ? "#d1d5db" : "#3b3d40",
        }}
        progressStyle={{
          backgroundColor: "green",
        }}
      />
    </Modal>
  );
};

export default ModalDeleteTask;
