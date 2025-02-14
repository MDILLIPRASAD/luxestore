
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import Cart from "./Cart"
import { Button } from "./ui/button"
import { AuthModal } from "./auth/AuthModal"
import { useAuth } from "@/contexts/AuthContext"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  onSearch: (term: string) => void
  cartItems: any[]
  onCheckout: () => void
  onUpdateQuantity?: (itemId: number, newQuantity: number) => void
  onRemoveItem?: (itemId: number) => void
}

const Header = ({
  onSearch,
  cartItems,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
}: HeaderProps) => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold">
            LuxeStore
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              All Products
            </Link>
            <Link
              to="/?category=electronics"
              className="text-sm font-medium hover:text-primary"
            >
              Electronics
            </Link>
            <Link
              to="/?category=fashion"
              className="text-sm font-medium hover:text-primary"
            >
              Fashion
            </Link>
            <Link
              to="/?category=home"
              className="text-sm font-medium hover:text-primary"
            >
              Home & Living
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8 w-[200px]"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <Cart
            items={cartItems}
            onCheckout={onCheckout}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthModal />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
