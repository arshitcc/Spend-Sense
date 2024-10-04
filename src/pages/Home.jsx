import useAuthStore from '@/app/mystore'
import { useState } from 'react';
import { ExpenseBarChart } from '@/components/home/BarChart';
import { ExpensePieChart } from '@/components/home/PieChart';
import Profile from '@/components/home/Profile'
import TransactionsDemo from '@/components/home/TransactionsDemo';
import transactions from '@/appwrite/transactions';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LandingPage from '@/components/LandingPage';


function getCurrentMonthRange() {
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // 1st of current month
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of current month
  endOfMonth.setHours(23, 59, 59, 999); // End of the last day
  
  return {
    start: startOfMonth.toISOString(),
    end: endOfMonth.toISOString(),
  };
}

function getCurrentWeekRange() {
  const currentDate = new Date();
  const firstDay = currentDate.getDate() - currentDate.getDay() + 1; // Monday = start of the week
  const startOfWeek = new Date(currentDate.setDate(firstDay));
  const endOfWeek = new Date(currentDate.setDate(firstDay + 6));  // Sunday

  startOfWeek.setHours(0, 0, 0, 0); // Start of the week (00:00:00)
  endOfWeek.setHours(23, 59, 59, 999); // End of the week (23:59:59)

  return {
    start: startOfWeek.toISOString(),
    end: endOfWeek.toISOString(),
  };
}

function getCurrentQuarterRange() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let startOfQuarter, endOfQuarter;

  if (currentDate.getMonth() >= 3 && currentDate.getMonth() <= 5) {  // Q1: April-June
    startOfQuarter = new Date(year, 3, 1);
    endOfQuarter = new Date(year, 5, 30);
  } else if (currentDate.getMonth() >= 6 && currentDate.getMonth() <= 8) {  // Q2: July-September
    startOfQuarter = new Date(year, 6, 1);
    endOfQuarter = new Date(year, 8, 30);
  } else if (currentDate.getMonth() >= 9 && currentDate.getMonth() <= 11) {  // Q3: October-December
    startOfQuarter = new Date(year, 9, 1);
    endOfQuarter = new Date(year, 11, 31);
  } else {  // Q4: January-March
    startOfQuarter = new Date(year, 0, 1);
    endOfQuarter = new Date(year, 2, 31);
  }
  endOfQuarter.setHours(23, 59, 59, 999); // End of last day of the quarter

  return {
    start: startOfQuarter.toISOString(),
    end: endOfQuarter.toISOString(),
  };
}

function getPast7DaysRange() {

  const currentDate = new Date();
  const past7Days = new Date(currentDate.setDate(currentDate.getDate() - 7)); // 7 days ago
  
  past7Days.setHours(0, 0, 0, 0);  // Start of the 7th day before
  const now = new Date();  // Current time
  
  return {
    start: past7Days.toISOString(),
    end: now.toISOString(),
  };
}

function Home() {

  const authStatus = useAuthStore((state) => state.authStatus);

  if(!authStatus){
    return (<LandingPage/>);
  }

  const myUser = useAuthStore((state) => state.user);
  const [selectedRange, setSelectedRange] = useState('Current Week');

  const fetchTransactions = async () => {
    try {
      if (!myUser?.$id) {
        throw new Error('User ID is not available');
      }

      const queries = getDateRange(selectedRange);
      const payments = await transactions.viewRangedTransactions(myUser?.$id, queries);
      return payments.documents;
    } 
    catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const { data: transactionsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions', myUser?.$id, selectedRange],
    queryFn: fetchTransactions,
    enabled: !!myUser?.$id && selectedRange !== 'Select Range',
    staleTime: 1000 * 100,
  });

  const handleSelectChange = (value) => {
    setSelectedRange(value);
    refetch();
  };

  const getDateRange = (rangeType) => {
    switch (rangeType) {
      case 'Current Week':
        return getCurrentWeekRange();
      case 'Past Week':
        return getPast7DaysRange();
      case 'Current Month':
        return getCurrentMonthRange();
      case 'Current Quarter (Indian FY)':
        return getCurrentQuarterRange();
      default:
        return getCurrentMonthRange();
    }
  }

  return (
    <>
      <div className='p-4 bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-3 text-center items-center gap-4 bg-white rounded-xl text-black'>
          <div className='md:col-span-1 h-full'>
            {authStatus && <Profile/>}
          </div>
          
          <div className='md:col-span-2 grid md:grid-cols-2 h-full items-center gap-2'>
            <div className='col-span-2 h-full'>
              <Select value={selectedRange} onValueChange={handleSelectChange}>
                <SelectTrigger className="p-2.5 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Current Week">Current Week</SelectItem>
                  <SelectItem value="Past Week">Past 7 Days</SelectItem>
                  <SelectItem value="Current Month">Current Month</SelectItem>
                  <SelectItem value="Current Year">Current Year</SelectItem>
                  <SelectItem value="Current Quarter (Indian FY)">Current Quarter (Indian FY)</SelectItem>

                  {/* <SelectItem value="Date Range">Select Date-Range</SelectItem>
                  <SelectItem value="Month Range">Select Month-Range</SelectItem>
                  <SelectItem value="Year Range">Select Year-Range</SelectItem> */}

                </SelectContent>
              </Select>
            </div>
            <div className='col-span-2 grid md:grid-cols-2 items-center gap-2 h-full'>
              <div className='col-span-1 h-full'>
                {
                  authStatus && 
                  <ExpensePieChart 
                    isLoading={isLoading}
                    isError={isError}
                    transactionsData={transactionsData} 
                  />
                }
              </div>
              <div className='col-span-1 h-full '>
                {
                  authStatus && 
                  <ExpenseBarChart
                    isLoading={isLoading}
                    isError={isError}
                    transactionsData={transactionsData} 
                  />
                }
              </div>
            </div>
            
            <div className='col-span-2 h-full'>
              {
                  authStatus && 
                  <TransactionsDemo/>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home