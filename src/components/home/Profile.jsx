import { useState } from "react";
import { Eye, EyeOff, Edit } from "lucide-react";
import EditModal from "./EditModal";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import useAuthStore from "@/app/mystore";
import user from "@/appwrite/users";
import { useQuery } from "@tanstack/react-query";
import { ProfilePicture } from "./ProfilePicture";

const Profile = () => {


  const [showUserId, setShowUserId] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [editField, setEditField] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const userId = useAuthStore((state) => state.user.$id);

  const fetchUser = async() => {
    const myUser = await user.getUser(userId);
    if(myUser) return myUser;
    throw new Error(`Cannot Fetch User Details`);
  }

  const {
    data : userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey : ['user',userId],
    queryFn : fetchUser,
    enabled : !!userId,
    staleTime : 1000*100
  });

  if(isLoading) return <div>Loading....</div>
  if(isError) return <div>Contact Admin for Details </div>



  const handleEditClick = (field) => {
    setEditField(field);
    setIsEditModalOpen(true);
  };

  const handleToggleUserId = () => setShowUserId((prev) => !prev);
  const handleToggleBalance = () => setShowBalance((prev) => !prev);
  const handleTogglePhone = () =>  setShowPhone((prev) => !prev);
  const handleToggleEmail = () =>  setShowEmail((prev) => !prev);

  return (
    <>
      <Card className="p-6 text-sm lg:text-xl space-y-4 w-full mx-auto">

      <div className="flex flex-col items-center">
        <ProfilePicture
          src={`https://robohash.org/${userId}`}
          alt={userData?.name}
          size={150} 
          isLoading={false}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">User ID:</div>
        <div className="flex items-center space-x-2">
          <span className="text-[12px] sm:text-sm">{showUserId ? userData.userId : "••••••••"}</span>
          <Button variant="ghost" size="icon" onClick={handleToggleUserId}>
            {showUserId ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">User Name:</div>
        <div className="flex items-center space-x-2">
          <span>{userData?.name}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Phone:</div>
        <div className="flex items-center space-x-2">
        <span>{showPhone ? `${userData?.phone}` : "••••••••"}</span>
          <Button variant="ghost" size="icon" onClick={handleTogglePhone}>
            {showPhone ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Email:</div>
        <div className="flex items-center space-x-2">
        <span>{showEmail ? `${userData?.email}` : "••••••••"}</span>
          <Button variant="ghost" size="icon" onClick={handleToggleEmail}>
            {showEmail ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Salary:</div>
        <div className="flex items-center space-x-2">
          <span>₹{userData?.salary}</span>
          <Button variant="ghost" size="icon" onClick={() => handleEditClick('salary')}>
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Monthly Expenses:</div>
        <div className="flex items-center space-x-2">
          <span>₹{userData?.expenses}</span>
          <Button variant="ghost" size="icon" onClick={() => handleEditClick('expenses')}>
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Balance:</div>
        <div className="flex items-center space-x-2">
          <span>{showBalance ? `₹${userData?.balance}` : "••••••••"}</span>
          <Button variant="ghost" size="icon" onClick={handleToggleBalance}>
            {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </Card>

    <EditModal
      field={editField}
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
    />
    </>
  );
};

export default Profile