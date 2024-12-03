import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import './SidebarFilter.css';

type SidebarFilterProps = {
  onFiltersChange: (selectedFilters: { [key: string]: string[] }) => void;
};

const SidebarFilter: React.FC<SidebarFilterProps> = ({ onFiltersChange }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({
    Genre: [],
  });

  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleOptionSelect = (filterName: string, option: string) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[filterName] || [];
      const isSelected = currentOptions.includes(option);
      const updatedOptions = isSelected
        ? currentOptions.filter((opt) => opt !== option)
        : [...currentOptions, option];

      const updatedFilters = { ...prev, [filterName]: updatedOptions };
      onFiltersChange(updatedFilters);
      return updatedFilters;
    });
  };

  const filters: Record<string, string[]> = {
    Genre: ["Action", "Adventure", "RPG", "Strategy", "Shooter"]
  };

  return (
    <aside className="sidebar-filters">
      {Object.keys(filters).map((filter) => (
        <div key={filter} className="filter-section">
          <div className="filter-header" onClick={() => toggleFilter(filter)}>
            <FontAwesomeIcon
              icon={openFilter === filter ? faChevronDown : faChevronRight}
              className="filter-arrow"
            />
            <h4>{filter}</h4>
          </div>
          {openFilter === filter ? (
            <ul className="filter-options">
              {filters[filter].map((option) => (
                <li key={option}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedOptions[filter]?.includes(option)}
                      onChange={() => handleOptionSelect(filter, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="selected-options">
              {selectedOptions[filter]?.length
                ? selectedOptions[filter].join(", ")
                : "None"}
            </p>
          )}
        </div>
      ))}
    </aside>
  );
};

export default SidebarFilter;
