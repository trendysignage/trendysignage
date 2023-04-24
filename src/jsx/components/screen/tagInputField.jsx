import React, { useState } from "react";
import "./tagInputField.css";
import { Badge } from "react-bootstrap";
import tagCloseIcon from "../../../img/tag-close-icon.png";
function TagInputField({tags, setTags}) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      if (tags.includes(inputValue.trim())) {
        setInputValue("");
        return;
      }
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  return (
    <div className="tag-input-field">


       {tags.length > 0 && <div className="tag-name-row d-flex flex-wrap">
        {tags.map((tag) => (
          <Badge key={tag}  className="tag-name" variant="outline-primary">
            <span className="tag-name-content">{tag}</span>
            <span className="tag-close">
              <img
                onClick={() => handleRemoveTag(tag)}
                className="tag-close-icon"
                src={tagCloseIcon}
                alt="tag-icon"
              />
            </span>
          </Badge>
          ))}
        </div>} 


      <div className="form-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="form-control input-default form-field"
          placeholder="Tags"
        />
      </div>
    </div>
  );
}

export default TagInputField;
