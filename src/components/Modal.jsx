import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

const Modal = ({ 
    isOpen, 
    onClose,
    title,
    confirmOption,
    onSubmit
 }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex flex-col md:flex-row justify-end gap-2">
          <Button className="order-2" variant="outline" onClick={onClose}>
            No
          </Button>

          <Button className="order-1"  variant="destructive" onClick={onSubmit}>
            <TrashIcon className="mr-2 h-4 w-4" />
            {confirmOption}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
