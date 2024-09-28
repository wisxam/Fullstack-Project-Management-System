import { Attachment } from "./attachmentTypes";
import { Priority } from "./priorityTypes";
import { Status } from "./statsTypes";
import { User } from "./userTypes";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId?: number;
  authorUserId?: number;
  assignedUserId?: number;

  // Not in datamodel of tasks data but fetched from other tables using foreign keys
  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}
