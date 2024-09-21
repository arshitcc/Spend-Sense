import useAuthStore from '@/app/mystore'
import { ExpenseBarChart } from '@/components/home/BarChart';
import { ExpensePieChart } from '@/components/home/PieChart';
import Profile from '@/components/home/Profile'
import TransactionsDemo from '@/components/home/TransactionsDemo';

function Home() {

  const authStatus = useAuthStore((state) => state.authStatus);

  return (
    <>
      <div className='p-4 bg-white'>
        <div className='h-100vh grid grid-cols-1 grid-rows-8 md:grid-rows-2 md:grid-cols-3 text-center items-center gap-4 bg-white rounded-xl text-black p-4 border border-red-500'>
          
          <div className='col-span-1 row-span-2 h-full md:row-span-2 items-center border border-red-500 rounded-xl'>
            {authStatus && <Profile/>}
          </div>
          
          <div className='col-span-2 row-span-6 md:row-span-2 h-full grid grid-rows-2 items-center gap-2 border border-red-500 rounded-xl p-4'>
            
            <div className='row-span-1 grid grid-cols-1 md:grid-cols-2 items-center gap-2 h-full border border-red-500 rounded-xl p-2'>
              <div className='col-span-1 h-full border border-red-500 rounded-xl'>{authStatus && <ExpensePieChart/>}</div>
              <div className='col-span-1 h-full border border-red-500 rounded-xl'>{authStatus && <ExpenseBarChart/>}</div>
            </div>
            
            <div className='row-span-1 h-full border border-red-500 rounded-xl'>
              {authStatus && <TransactionsDemo />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home