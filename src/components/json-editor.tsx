import React from "react";
import { Textarea } from "./ui/textarea";

const JSONEditor = ({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <Textarea
      placeholder="Format of JSON {
              [{speaker: 'Samantha', text: '...'}, {speaker: 'Mark', text: '...'}]}"
      onChange={handleInputChange}
    />
  );
};

export default JSONEditor;
