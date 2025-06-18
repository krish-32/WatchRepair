"use client";

const InputRequired = ({
  id,
  type = "text",
  label,
  disabled,
  register,
  required,
  errors,
  className,
}) => {
  return (
    <input
      id={id}
      type={type}
      className={className}
      placeholder={label}
      {...register(id, { required })}
      disabled={disabled}
      required
    />
  );
};

export default InputRequired;
