"use client"

import { useState } from "react"
import { InfoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import TransactionDetails from "./TransactionDetails"


export const modeColors= {
  "CASH": "bg-green-800",
  "CREDIT CARD": "bg-red-500",
  "DEBIT CARD": "bg-green-500",
  "UPI": "bg-purple-500",
  "NET BANKING": "bg-orange-500"
}

export const categoryColors = {
  "Food": "bg-yellow-500",
  "Travel": "bg-blue-500",
  "Entertainment": "bg-purple-500",
  "Online Shopping": "bg-pink-500",
  "Bills": "bg-grey-500",
  "Wallet-Deposit" : "bg-green-600",
  "Refund" : "bg-green-200",
  "Others": "bg-gray-500"
}

export default function Transaction({transaction}) {
  
  const [isOpenDetails, setIsOpenDetails] = useState(false)
  const handleOpenDetails = () => setIsOpenDetails(true)
  const handleCloseDetails = () => setIsOpenDetails(false)

  return (
    <>
      <div className="mx-auto p-4 max-w-screen-sm border border-gray-50 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4  p-4 rounded-lg shadow">
          <Badge className={`${modeColors[transaction.mode]} text-white`}>{transaction.mode}</Badge>
          <Badge className={`${categoryColors[transaction.category]} text-white`}>{transaction.category}</Badge>
          <span className={`font-bold ${(transaction.category!=="Wallet-Deposit" && transaction.category!=="Refund" )? 'text-red-600' : 'text-green-600'}`}>
          {(transaction.category!=="Wallet-Deposit" && transaction.category!=="Refund" )? "-": "+"}₹{transaction.amount.toFixed(2)}
          </span>
          
          <Button onClick={handleOpenDetails} variant="ghost" size="icon" className="h-8 w-8 p-0">
            <InfoIcon className="h-4 w-4" />           
          </Button>  
        </div>
      </div>

      <TransactionDetails
        onClose = {handleCloseDetails}
        isOpen = {isOpenDetails}
        {...transaction}
      /> 
    </>
  )
}