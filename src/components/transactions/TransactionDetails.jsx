import {useState} from "react"
import { CalendarIcon, CreditCard, Trash2, RepeatIcon, MessageSquare, Wallet} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import useAuthStore from "@/app/mystore"
import user from "@/appwrite/users"
import transactions from "@/appwrite/transactions"
import { useQueryClient } from "@tanstack/react-query"
import DeleteModal from "./DeleteModal"
import { modeColors, categoryColors } from "./Transaction"

const TransactionDetails = ({
  isOpen,
  onClose,
  transaction_id,
  date,
  amount,
  category,
  mode,
  message,
  isRecurring,
  remaining_balance,
}) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
    
  const userId = useAuthStore((state) => state.user?.$id);
  const queryClient = useQueryClient();

  const handleRemoveTransaction = async (e) => {
    e.preventDefault();
    
    try {
      const myUser = await user.getUser(userId);
      let remaining_balance = myUser.balance;
      if ((category !== "Wallet-Deposit") && (category !== "Refund")) remaining_balance += amount;
      else remaining_balance -= amount;
      
      await transactions.removeTransaction(transaction_id);
      await user.updateBalance({ userId, newBalance: remaining_balance });

      queryClient.invalidateQueries(['transactions', userId]);
      handleCloseDeleteModal();
      onClose();
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent aria-describedby={undefined} className="sm:max-w-[425px] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Transaction Details</span>

            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Transaction ID</p>
                <p className="text-sm text-gray-400">{transaction_id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Date & Time</p>
                <p className="text-sm text-gray-400">{date}</p>
              </div>
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex flex-col md:flex-row items-center justify-between">
              <span className="text-2xl font-bold">
              ₹{amount}
              </span>
              <div className="space-x-2">
                <Badge className={`${categoryColors[category]} text-white`} >
                  {category}
                </Badge>
                <Badge variant={amount >= 0 ? "success" : "destructive"}>
                  {(category!=="Wallet-Deposit" && category!=="Refund") ? "Debit" : "Credit"}
                </Badge>
                <Badge className={`${modeColors[mode]} text-white`}>
                  {mode}
                </Badge>
              </div>
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Message</p>
                <p className="text-sm text-gray-400">{message}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <RepeatIcon className="h-5 w-5 text-gray-400" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Recurring</p>
                <p className="text-sm text-gray-400">{isRecurring ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Wallet className="h-5 w-5 text-gray-400" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Remaining Balance</p>
                <p className="text-sm text-gray-400">₹{remaining_balance}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleOpenDeleteModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 ease-in-out transform hover:scale-105"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteModal
        onClose={handleCloseDeleteModal}
        isOpen={isDeleteModalOpen}
        onDelete={handleRemoveTransaction}
      />
    </>
  )
}

export default TransactionDetails