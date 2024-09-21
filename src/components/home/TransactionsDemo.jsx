import React from 'react';
import { useQuery } from '@tanstack/react-query';
import transactions from '@/appwrite/transactions'; // Assumes this module exports your API call
import useAuthStore from '@/app/mystore'; // Redux or state management
import {Button} from '@/components/ui/button'
import { Link } from 'react-router-dom';

function TransactionsDemo() {
  const user = useAuthStore((state) => state.user);

  const fetchTransactions = async () => {
    if (!user?.$id) {
      throw new Error('User ID is not available');
    }
    const payments = await transactions.viewTransactions(user.$id, {
      limit: 10,
    });
    return payments.documents;
  };

  const {
    data: transactionsData, 
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['transactions', user?.$id], 
    queryFn: fetchTransactions,            
    enabled: !!user?.$id,  
    staleTime : 1000*10                
  });
  
  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (isError) {
    console.error('Error fetching transactions:', error);
    return <div>Error loading transactions</div>;
  }

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-2xl px-4 2xl:px-0">
          <div className="mx-auto max-w-screen-xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                My Transactions
              </h2>

            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactionsData?.map((transaction) => (
                  <div key={transaction?.transaction_id} className="w-full">
                    <div>Transaction: {transaction.amount}</div>
                  </div>
                ))}
              </div>
            </div>
            <Button>
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
