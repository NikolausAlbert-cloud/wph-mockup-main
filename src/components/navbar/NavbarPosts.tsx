import { Link, useNavigate } from "react-router-dom"
import { User, LogOut, ArrowLeft } from "lucide-react"
import UserPhoto from "@/assets/images/logo.svg"
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
import { useEffect, useState } from "react"

export const NavbarPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [name, setName] = useState(useTitleCase(""));
  const userReducer = useSelector((state:RootState) => state.user);

  // Define different sideOffset values based on screen width
  const getSideOffset = () => {
    if (width < 640) { 
      return 5; 
    } else if (width >= 640 && width < 1024) { 
      return 8;
    } else { 
      return 15;
    }
  };

  const handleClick_logout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  useEffect(() => {
    setName(userReducer.data.name);
  }, [userReducer]);

  return (
    <header className="fixed z-50 top-0 w-full border-b border-neutral-300 border-0.25 bg-white">
      <div className="flex-between max-md:px-4 custom-container h-16 md:h-20" >
        <div className="flex-between gap-1.5 h-9">
          <ArrowLeft />
          <p className="text-neutral-950 font-semibold text-md md:text-xl ">Write Post</p>
        </div>
          <div className="flex-between gap-6">
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
      </div>
    </header>
  )
}