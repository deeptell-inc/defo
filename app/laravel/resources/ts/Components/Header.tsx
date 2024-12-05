import { Menu } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span onClick={() => navigate('/')} className="flex items-center space-x-4 cursor-pointer">
          <h1 className="text-xl font-bold text-primary">六次元</h1>
        </span>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <nav className="hidden md:flex items-center space-x-6">
          <span onClick={() => navigate('/')} className="text-text hover:text-primary transition-colors cursor-pointer">
            クーポン一覧
          </span>
          <a
            href="https://www.gozigen.com/wp/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primary transition-colors">
            お問い合わせ
          </a>
          <span onClick={() => navigate('/survey/user')} className="text-text hover:text-primary transition-colors cursor-pointer">
            ログイン
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
