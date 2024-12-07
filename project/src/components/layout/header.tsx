import { Pen, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";
import { Button } from "../ui";

export function Header() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate()
  const logout =()=>{
    navigate('/signin')
}

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          ModernBlog
        </Link>

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost">
                <Link to="/new-post">
                  <Pen className="mr-2 h-4 w-4" />
                  Write
                </Link>
              </Button>
              {/* <Button
              onClick={logout}
              
              variant="ghost">

                <User className="mr-2 h-4 w-4" />
              </Button> */}
              <Button
               onClick={() => (window.location.href = "/login")}
               variant="ghost"
              >
              <User className="mr-2 h-4 w-4" />
              </Button>


            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
