import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import Logo from "@/assets/images/logo.svg"
import { Search, Menu, PencilLine, User, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { logout } from "@/redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { PostImageHandler } from "../Posts/PostImageHandler"
import { fetchUserData } from "@/redux/slices/getUserDataSlice"
import { SearchBar } from "./SearchBar"

export const Navbar = () => {
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [ isToken, setIsToken ] = useState(false);

  const { width } = useWindowDimensions();
  const { fetchUserData_status, data, error } = useSelector((state:RootState) => state.user);

  const getSideOffset = () => {
    if (width < 640) { 
      return 5; 
    } else if (width >= 640 && width < 1024) { 
      return 8;
    } else { 
      return 15;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true); 
    } else {
      setIsToken(false);
    }  
  }, []);

  useEffect(() => {
    if (fetchUserData_status === "idle") {
      dispatch(fetchUserData())
    }
  }, [dispatch, fetchUserData_status])

  const handleClick_logout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const userProfileImage = (
    <PostImageHandler 
      component="navbar"
      imageUrl={data.avatarUrl}
      altText="User Image"
      name={data.name}
      className="rounded-full"
      imgSize="size-10"
    />
  )

  let info;
  if (fetchUserData_status === "loading") {
    info = <p>Loading...</p>
  } else if (fetchUserData_status === "failed") {
    info = <p>Error: { error || "Failed to fetch user data." }</p>
  }

  return (
    <header className="fixed z-50 top-0 w-full border-b border-neutral-300 border-0.25 bg-white">
      <div className="flex-between max-md:px-4 custom-container h-16 md:h-20" >
        <Link to="/" className="flex-between gap-1.5 h-9 pointer-cursor">
          <Logo />
          <p className="text-neutral-950 font-semibold text-md md:text-xl ">Your Logo</p>
        </Link>
        <SearchBar className="hidden md:max-w-94" />
        { isToken
          ? (
            <div className="flex-between gap-6">
              <Link 
                to="/posts" 
                className="hidden lg:flex justify-center items-center gap-0.5 text-sm font-semibold text-primary-300 underline underline-offset-3 border-r border-neutral-300 br-[1px] pr-6 h-6 cursor-pointer"
              >
                <PencilLine />
                <p>Write Post</p>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger  className="flex-between gap-3 cursor-pointer">
                  { userProfileImage ? userProfileImage : info }
                  <p className="hidden lg:block text-sm font-medium text-neutral-900">{ data.name }</p>
                </DropdownMenuTrigger >
                <DropdownMenuContent sideOffset={getSideOffset()}>
                  <DropdownMenuItem asChild>
                    <Link to="/userProfile">
                      <User className="size-[15px] text-neutral-950"/>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="size-[15px] text-neutral-950"/>
                    <span onClick={handleClick_logout}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        ) : (
          <>
            <div className="flex-between gap-6 lg:hidden">
              <Search className="size-6 cursor-pointer lg:hidden" />
              <Sheet>
                <SheetTrigger asChild>
                  <Menu className="size-6 cursor-pointer lg:hidden" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="flex-between w-full h-16 border-b border-neutral-300">
                      <div className="flex-between gap-1.5 h-6 w-26 ml-4">
                        <Logo className="size-5"/>
                        <p className="text-neutral-950 font-semibold text-md">Your Logo</p>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <SheetClose asChild>
                    <div className="flex flex-col justify-center items-center gap-4 pt-10">
                      <Link 
                        to="/auth/login" 
                        className="text-sm font-semibold text-primary-300 underline underline-offset-3"
                      >
                        Login
                      </Link>
                      <Button asChild className="px-20">
                        <Link to="/auth/register">Register</Link>
                      </Button>
                    </div>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <Link 
                to="/auth/login" 
                className="text-sm font-semibold text-primary-300 underline underline-offset-3 border-r border-neutral-300 br-[1px] pr-6 h-6 cursor-pointer"
              >
                Login
              </Link>
              <Button asChild className="ml-6 px-16">
                <Link to="/auth/register">Register</Link>
              </Button>
            </div>
          </>   
        )}  
      </div>
    </header>
  )
}