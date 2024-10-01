import transactions from '@/appwrite/transactions';
import Transaction from '@/components/transactions/Transaction';
import useAuthStore from '@/app/mystore';
import { useQuery } from '@tanstack/react-query';

function TransactionsList() {

  const user = useAuthStore((state) => state.user);

  const fetchTransactions = async ({queryKey}) => {
    const [_, userId] = queryKey;
    if (!userId) {
      throw new Error('User ID is not available');
    }
    const payments = await transactions.viewTransactions(user.$id);
    return payments.documents;
  }

  const {
    data: transactionsData, 
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['transactions', user?.$id],
    queryFn: fetchTransactions,            
    enabled: !!user?.$id,        
    staleTime : 1000*10          
  });

  if (isLoading) return <div>Loading transactions...</div>;
  if (isError) return <div>Error loading transactions</div>;

  return (
    <>
      <div className='mx-auto max-w-screen-md p-2'>
        <div className='text-3xl text-center m-4'>
          All Tranasactions
        </div>
        {
          transactionsData.length > 0 ? (
            transactionsData.map((transaction) => (
              <Transaction key={transaction.$id} transaction={transaction} />
            ))
          ) : 
          (
            <div className='mx-auto p-4 max-w-screen-sm text-center bg-gray-500 rounded-xl text-black'>No transactions found</div>
          )
        }
      </div>

    </>
    
  )
}

export default TransactionsList