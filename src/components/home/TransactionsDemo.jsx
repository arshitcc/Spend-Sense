import {Button} from '@/components/ui/button'
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useAuthStore from '@/app/mystore';
import { useQuery } from '@tanstack/react-query';
import transactions from '@/appwrite/transactions';

function TransactionsDemo() {
  
  const myUser = useAuthStore((state) => state.user);

  const fetchRecentTransactions = async () => {
    try {
      if (!myUser?.$id) {
        throw new Error('User ID is not available');
      }

      const payments = await transactions.viewRecentTransactions(myUser?.$id);
      return payments.documents;
    } 
    catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  const {data : recentTransactions, isLoading, isError, error} = useQuery({
    queryKey: ['recentTransactions', myUser?.$id],
    queryFn: fetchRecentTransactions,
    enabled: !!myUser?.$id,
    staleTime: 1000 * 100,
  })

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (isError) {
    console.error('Error fetching transactions:', isError);
    return <div>Error loading transactions</div>;
  }

  return (
    <>
      <section className="bg-white w-full antialiased dark:bg-gray-900 rounded-xl">
        <div className="mx-auto max-w-screen-2xl p-2">
          <div className="mx-auto max-w-screen-xl">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">DATE</TableHead>
                    <TableHead className="text-right">AMOUNT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions?.map((transaction) => (
                    <TableRow className="w-full text-md md:text-lg" key={transaction.$id}>
                      <TableCell className="text-left w-1/2 px-1">{transaction.date.substring(0, 10)}</TableCell>
                      <TableCell className={`text-right w-1/2 px-1 ${(transaction.category!=="Wallet-Deposit" && transaction.category!=="Refund" )? 'text-red-600' : 'text-green-600'}`}>
                      {(transaction.category!=="Wallet-Deposit" && transaction.category!=="Refund" )? "-": "+"}₹{transaction.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Button className="mt-2">
            <Link to={'/transactions'}>
              Show More
            </Link>
          </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default TransactionsDemo;
