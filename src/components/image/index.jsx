import React from "react";
import "./index.css";

const IMAGE_PLACEHOLDER = "https://via.placeholder.com/150";

export function Image({ src, alt, style }) {
  return (
    <img
      src={src || IMAGE_PLACEHOLDER}
      alt={alt}
      style={style}
      loading="lazy"
    />
  );
}
