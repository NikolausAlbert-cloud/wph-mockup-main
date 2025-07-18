import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { userProfileTab_data } from '@/constants/userProfileTab_data';
import { Post_empty } from '@/components/Posts/Post_empty';
import { UserProfilePost_changePass } from '@/components/userProfile/UserProfilePost_changePass';
import { fetchUserData } from '@/redux/slices/getUserDataSlice';
import { UserProfile_dialog } from '@/components/userProfile/userProfile_dialog';
import { UserBoxInfo } from '@/components/UserBoxInfo';
import { DialogFormDataType } from '@/utils/validation';
import { UserPost_short } from '@/components/UserPost_short';
import { fetchUserPosts } from '@/redux/slices/getUserPostsSlice';
import { WritePostButton } from '@/components/userProfile/WritePostButton';

export const UserProfile_page = () => {
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ activeTab, setActiveTab ] = useState("tab-0");
  const dispatch: AppDispatch = useDispatch();
  const { fetchUserData_status, data: userData, error: user_error } = useSelector((state: RootState) => state.user);
  const { fetchUserPosts_status, data: post_data, error: post_error } = useSelector((state: RootState) => state.post);

  const handleProfileUpdateSuccess = () => {
    dispatch(fetchUserData());
  };
  
  const [dialogFormData, setDialogFormData] = useState<DialogFormDataType>({
    name: "",
    headline: "",
    avatar: null,
  });

  useEffect(() => {
    if (userData) {
      setDialogFormData({
        name: userData.name,
        headline: userData.headline,
        avatar: userData.avatarUrl || null,
      });
    }
  }, [userData]);
  
  useEffect(() => {
    if (fetchUserData_status === "idle") {
      dispatch(fetchUserData());
    }
  }, [dispatch, fetchUserData_status]);

  useEffect(() => {
    if (fetchUserPosts_status === "idle") {
      dispatch(fetchUserPosts({ payload:{ limit: 10, page: 1 } }));
    }
  }, [fetchUserPosts_status])
 
  return (
    <div className="custom-subContainer mt-20 md:mt-32 flex-center flex-col gap-4 md:gap-5">
      { fetchUserData_status === "loading" ? (
        <p className="px-4">Loading user data...</p>
      ) : fetchUserData_status === "failed" ? (
        <p className="text-red-500 px-4">{ user_error }</p>
      ) : (
        <div className="w-full px-4">
          <div 
            className="h-19 md:h-28 px-4 md:px-6 py-3.5 md:py-4 flex-between border border-neutral-300 rounded-2xl"
          >
            <UserBoxInfo dialogFormData={dialogFormData} />
            <UserProfile_dialog 
              isOpenDialog={isOpenDialog}
              setIsOpenDialog={setIsOpenDialog}
              dialogFormData= {dialogFormData}
              onProfileUpdated={handleProfileUpdateSuccess}
            />
          </div>
        </div>
      )}
      
      {/* Tabs */}
      <div className="w-full px-4">
        <div className="flex-start">
        {userProfileTab_data.map((item, i) => {
          return (
            <div 
              key={i} 
              onClick={() => setActiveTab(`tab-${i}`)}
              className={`flex-center flex-row h-11 max-md:w-full w-44.5 cursor-pointer text-xs md:text-sm font-regular border-b ${activeTab === `tab-${i}` ? "text-primary-300 font-semibold border-primary-300 border-b-3" : "text-neutral-950 border-neutral-300"}`}
            >
              <p>{ item.title }</p>
            </div>
          )
        })}
        </div>
      </div>

      {/* Tab's content */}
      <div className="w-full">
        { activeTab === "tab-0" ? (
        fetchUserPosts_status === "loading" ? (
          <p>Loading user's posts...</p>
        ) : 
        fetchUserPosts_status === "failed" ? (
          <p className="text-red-500">{ post_error }</p>
        ) : 
        post_data.total <= 0 ? (
          <Post_empty 
            p1="Your writing journey starts here"
            p2="No posts yet, but every great writer starts with the first one."
            buttonTitle="Write Post"
            buttonLink="/posts"
          />
        ) : (
        <div className="w-full flex-center flex-col px-4">
          <div className="w-full flex flex-col-reverse md:justify-between md:items-center md:flex-row pb-5">
            <p className="text-lg md:text-xl font-bold text-neutral-900 max-md:border-t max-md:border-neutral-300 max-md:pt-4">
              { post_data.total === 1 ? "1 Post" : `${post_data.total} Posts`}
            </p>
            <WritePostButton />
          </div>
          <div className={`w-full flex flex-col`}>
            <UserPost_short status={fetchUserPosts_status} data={post_data} error={post_error} source="userPost"/>
          </div>
        </div>
        )) : ( activeTab === "tab-1" && <UserProfilePost_changePass />)
        } 
      </div>
    </div>
  )
}
