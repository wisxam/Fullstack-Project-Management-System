import { Clock, Filter, Grid3x3, List, Share2, Table } from "lucide-react";
import { useEffect, useCallback, memo } from "react";
import { useAppDispatch } from "../redux";
import { setHeaderNameDefined } from "../state";
import Header from "@/components/Header";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeaderNameDefined(activeTab));
  }, [activeTab, dispatch]);

  const handleTabClick = useCallback(
    (tabName: string) => {
      setActiveTab(tabName);
    },
    [setActiveTab],
  );

  return (
    <div className="px-4 xl:px-6">
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name="Product Design Development" />
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={handleTabClick}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={handleTabClick}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={handleTabClick}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={handleTabClick}
            activeTab={activeTab}
          />
        </div>

        {/* Filter and Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300"
            aria-label="Filter"
          >
            <Filter className="h-5 w-5" />
          </button>
          <button
            className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-2 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = memo(
  ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
    const isActive = activeTab === name;

    const buttonClass = `text-grey-500 relative flex items-center gap-2 px-1 py-2 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-yellow-100 sm:px-2 lg:px-4 ${
      isActive
        ? "text-blue-600 after:bg-blue-600 dark:text-yellow-100 dark:after:bg-white"
        : ""
    }`;

    return (
      <button
        className={buttonClass}
        onClick={() => setActiveTab(name)}
        aria-pressed={isActive}
      >
        {icon}
        {name}
      </button>
    );
  },
);

TabButton.displayName = "TabButton";
export default ProjectHeader;
