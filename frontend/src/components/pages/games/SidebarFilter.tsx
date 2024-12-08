import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SidebarFilter.css";
import { genres } from "../../../data/Genres";

type SidebarFilterProps = {
  onSearch: (searchTerm: string) => void;
  onFiltersChange: (selectedFilters: { [key: string]: string[] }) => void;
};

const SidebarFilter: React.FC<SidebarFilterProps> = ({ onSearch, onFiltersChange }) => {
  const [openFilter, setOpenFilter] = useState<string | null>("Genre");
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({
    Genre: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const filters: Record<string, string[]> = {
    Genre: genres,
  };

  return (
    <aside className="sidebar-filters">
      <div className="search-bar-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search games..."
          className="search-bar"
        />
        {searchTerm && (
          <span className="clear-button" onClick={clearSearch}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        )}
      </div>
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
                : "No option selected"}
            </p>
          )}
        </div>
      ))}
    </aside>
  );
};

export default SidebarFilter;