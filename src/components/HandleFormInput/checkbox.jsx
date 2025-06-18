"use client";

import React from "react";
import { Controller } from "react-hook-form";

const Checkbox = ({ name, control, label, value, selectedValues }) => {
  return (
    <div className="flex items-center space-x-2">
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <input
            type="checkbox"
            {...field}
            id={`${name}-${value}`}
            value={value}
            checked={selectedValues?.includes(value)}
            className="accent-green-600"
          />
        )}
      />
      <label htmlFor={`${name}-${value}`} className="text-sm">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
