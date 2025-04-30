
import { motion } from "framer-motion";
import { useState } from "react";

interface ChipTabsProps {
  tabs: string[];
  initialTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

const ChipTabs = ({ tabs, initialTab, onTabChange, className = "" }: ChipTabsProps) => {
  const [selected, setSelected] = useState(initialTab || tabs[0]);

  const handleTabChange = (tab: string) => {
    setSelected(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={handleTabChange}
          key={tab}
        />
      ))}
    </div>
  );
};

interface ChipProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

const Chip = ({ text, selected, setSelected }: ChipProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
