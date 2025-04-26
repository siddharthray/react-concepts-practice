import React from "react";
import styles from "./TextArea.module.css";

export default function TextArea({
  value,
  onChange,
  placeholder,
  className = "",
  wrapperClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperTextClassName = "",
  name,
  id,
  rows = 4,
  cols,
  maxLength,
  minLength,
  required = false,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  label,
  error,
  helperText,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  resize = "vertical", // none, vertical, horizontal, both
  ...restProps
}) {
  const textareaId = id || name;

  return (
    <div className={`${styles.textareaWrapper} ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`${styles.textareaLabel} ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        className={`${styles.textarea} ${error ? styles.textareaError : ""} ${
          styles[`resize-${resize}`]
        } ${className}`}
        {...restProps}
      />

      {error && (
        <div className={`${styles.textareaErrorMessage} ${errorClassName}`}>
          {error}
        </div>
      )}

      {helperText && (
        <div className={`${styles.textareaHelperText} ${helperTextClassName}`}>
          {helperText}
        </div>
      )}
    </div>
  );
}
