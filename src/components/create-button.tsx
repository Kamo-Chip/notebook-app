import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Button } from "./ui/button";

function CreateButton() {
  return (
    <Button size={"lg"}>
      <MdOutlinePlaylistAdd size={"1.5rem"} />
      Create
    </Button>
  );
}

export default CreateButton;
