import { Search } from "lucide-react";
import { Input } from "./ui/input";
import Cart from "./Cart";
import { Button } from "./ui/button";

interface HeaderProps {
  onSearch: (term: string) => void;
  cartItems: any[];
  onCheckout: () => void;
}

const Header = ({ onSearch, cartItems, onCheckout }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold">LuxeStore</h1>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary">All Products</a>
            <a href="/?category=electronics" className="text-sm font-medium hover:text-primary">Electronics</a>
            <a href="/?category=fashion" className="text-sm font-medium hover:text-primary">Fashion</a>
            <a href="/?category=home" className="text-sm font-medium hover:text-primary">Home & Living</a>
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
          <Cart items={cartItems} onCheckout={onCheckout} />
        </div>
      </div>
    </header>
  );
};

export default Header;