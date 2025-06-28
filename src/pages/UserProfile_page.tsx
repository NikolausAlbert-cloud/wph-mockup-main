import { useEffect, useState } from 'react'
import UserPhoto from "@/assets/images/logo.svg";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';

import { userProfileTab_data } from '@/constants/userProfileTab_data';
import { UserProfilePost } from '@/components/userProfile.tsx/UserProfilePost';
import { UserProfilePost_empty } from '@/components/userProfile.tsx/UserProfilePost_empty';
import { UserProfilePost_changePass } from '@/components/userProfile.tsx/UserProfilePost_changePass';
import { fetchUserData } from '@/redux/slices/getUserDataSlice';
import { UserProfile_dialog } from '@/components/userProfile.tsx/userProfile_dialog';

export type DialogFormDataType = {
  name: string;
  headline: string;
  avatar?: string | File | null;
};

export const UserProfile_page = () => {
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ activeTab, setActiveTab ] = useState("tab-0");
  const dispatch: AppDispatch = useDispatch();
  const { fetchUserData_status: status, data: userData, error } = useSelector((state: RootState) => state.user);

  const handleProfileUpdateSuccess = () => {
    dispatch(fetchUserData());
  };
  
  const [dialogFormData, setDialogFormData] = useState<DialogFormDataType>({
    name: "",
    headline: "",
    avatar: null,
  });

  useEffect(() => {
    setDialogFormData({
      name: userData.name,
      headline: userData.headline,
      avatar: userData.avatarUrl || null,
    });
  }, [userData]);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading....</p>
  }

  if (status === "failed") {
    return <p>Error in fetching user data</p>
  }
  // console.log("User Data:", userData);
  return (
    <div className="mt-20 md:mt-32 flex-center flex-col gap-4 md:gap-5">
      <p>{error}</p>
      <div className="clamped-container h-19 md:h-28 px-4 md:px-6 py-3.5 md:py-4 flex-between border border-neutral-300 rounded-2xl">
        <div className="flex-between gap-3">
          <div>
            {userData.avatarUrl ? (
              <img src={userData.avatarUrl} alt="User Avatar" className="size-20 rounded-full object-cover" />
            ) : (
              <UserPhoto className="size:12.5 md:size-20"/>
            )} 
          </div>
          <div>
            <p className="text-sm md:text-lg font-bold text-neutral-900">{ dialogFormData.name }</p>
            <p className="text-sm md:text-md font-regular text-neutral-900">{ dialogFormData.headline }</p>
          </div>
        </div>
        <UserProfile_dialog 
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
          dialogFormData= {dialogFormData}
          onProfileUpdated={handleProfileUpdateSuccess}
        />
      </div>
      {/* Tabs */}
      <div className="flex-start clamped-container">
      {userProfileTab_data.map((item, i) => {
        return (
          <div 
            key={i} 
            onClick={() => setActiveTab(`tab-${i}`)}
            className={`flex-center flex-row h-11 w-44.5 cursor-pointer text-xs md:text-sm font-regular border-b ${activeTab === `tab-${i}` ? "text-primary-300 font-semibold border-primary-300 border-b-3" : "text-neutral-950 border-neutral-300"}`}
          >
            <p>{ item.title }</p>
          </div>
        )
      })}
      </div>
      <div className="clamped-container">
        {activeTab === "tab-0" ? (
          <UserProfilePost_empty />
        ) : activeTab === "tab-1" ? (
          <UserProfilePost_changePass />
        ) : (
          <UserProfilePost />
        )}
      </div>
    </div>
  )
}
