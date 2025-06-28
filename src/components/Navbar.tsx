import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import Logo from "../assets/images/logo.svg"
import { Search, Menu, PencilLine, User, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import UserPhoto from "@/assets/images/logo.svg"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useWindowDimensions from "@/hooks/useWindowsDImensions"
import { logout } from "@/redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useTitleCase } from "@/hooks/useTitleCase"

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ isToken, setIsToken ] = useState(false);
  const { width } = useWindowDimensions();

  const response = useSelector((state:RootState) => state.user);
  const name = useTitleCase(response.data.name);

// Define different sideOffset values based on screen width
const getSideOffset = () => {
  if (width < 640) { // Example: less than 'sm' breakpoint
    return 5; // Smaller offset for small screens
  } else if (width >= 640 && width < 1024) { // Example: 'sm' to 'lg'
    return 8;
  } else { // Example: 'lg' and up
    return 15; // Larger offset for larger screens
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

  const handleClick_logout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <header className="fixed z-50 top-0 w-full border-b border-neutral-300 border-0.25 bg-white">
      <div className="flex-between max-md:px-4 custom-container h-16 md:h-20" >
        <div className="flex-between gap-1.5 h-9">
          <Logo />
          <p className="text-neutral-950 font-semibold text-md md:text-xl ">Your Logo</p>
        </div>
        <div className="relative hidden lg:flex lg:flex-between">
          <input 
            name="search"
            type="search" 
            placeholder="Search" 
            className="h-12 w-93.25 border border-neutral-300 rounded-xl pl-12 text-sm font-regular text-neutral-500"  
          />
          <Search className="absolute top-1/2 translate-y-[-50%] right-1/2 translate-x-[-600%] size-6 cursor-pointer text-neutral-500" />
        </div>

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
                  <UserPhoto className="size-10 rounded-full"/>
                  <p className="hidden lg:block text-sm font-medium text-neutral-900">{ name }</p>
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