import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleEditDialog } from "../Redux/Slices/menuSlice";

// REMINDER
// This component is rigth now in in home component
// Change his place to card component when you done with it

const EditList = (props) => {
  const isEditVisible = useSelector((state) => state.menu.openEditDialog);

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(handleEditDialog(false))
  }

  return (
    <Dialog onClose={handleClose} open={isEditVisible} disableScrollLock>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>TEST</DialogContent>
    </Dialog>
  );
};

export default EditList;
