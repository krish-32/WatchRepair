"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const CategorySelect = ({ categories, label, value, onChange }) => {
  const selectedOption = categories.find(
    (category) => category.value === value
  );

  return (
    <div className="form-gorup">
      <Select
        placeholder="Select Category"
        required
        instanceId={`react-select-${label}`}
        isClearable
        isSearchable={true}
        options={categories}
        className="dashbaord-category-select"
        value={selectedOption || value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.label}</div>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "green",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CategorySelect;
