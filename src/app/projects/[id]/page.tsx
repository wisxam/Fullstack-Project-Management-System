"use client";
// why projects then [id] because id is dynamic in route and thats how nextjs handles that

import { useState } from "react";
import ProjectHeader from "../projectHeader";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Modal new task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* {activeTab === "Board" && <Board />} */}
    </div>
  );
};

export default Project;
