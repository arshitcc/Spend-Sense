import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import user from "@/appwrite/users";
import useAuthStore from "@/app/mystore";
import Modal from "../Modal";

const EditModal = ({ field, isOpen, onClose }) => {

const [formData, setFormData] = useState('');
const myUser = useAuthStore((state) => state.user);

const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
const handleOpenConfirmModal = () => setIsConfirmModalOpen(true);
const handleCloseConfirmModal = () => setIsConfirmModalOpen(false);

const handleUpdateField = async () => {
    const newData = parseFloat(formData);
    if(field === 'expenses') await user.updateExpenses({userId : myUser.$id, newExpenses : newData});
    else if(field === 'salary') await user.updateSalary({userId : myUser.$id, newSalary : newData});
    handleCloseConfirmModal();
    onClose();
    setFormData('');
}

return (
    <>
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md mx-auto p-6">
                <DialogHeader>
                <DialogTitle>Edit {field?.charAt(0).toUpperCase() + field?.slice(1)}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <input
                    type="text"
                    placeholder={`Enter new ${field}`}
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                    className="w-full p-2 border text-black border-gray-300 rounded"
                    />
                </div>

                <DialogFooter>
                    <Button onClick={handleOpenConfirmModal} className="w-full">
                        Next
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Modal
            isOpen={isConfirmModalOpen}
            onClose={handleCloseConfirmModal}
            onSubmit={handleUpdateField}
            title={`Are you sure you want to update ${field} ?`}
            confirmOption={`Update`}
        />
    </>
)};

export default EditModal