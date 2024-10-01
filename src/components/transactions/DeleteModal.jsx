import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this transaction?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex flex-col md:flex-row justify-end gap-2">
          <Button className="order-2" variant="outline" onClick={onClose}>
            No
          </Button>

          <Button className="order-1"  variant="destructive" onClick={onDelete}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
