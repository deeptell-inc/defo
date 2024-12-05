import { Menu } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 cursor-pointer">
          <h1 className="text-xl font-bold text-primary">六次元</h1>
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-text hover:text-primary transition-colors">
            クーポン一覧
          </a>
          <a
            href="https://www.gozigen.com/wp/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primary transition-colors">
            お問い合わせ
          </a>
          <a href="/survey/user" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors">
            ログイン
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
