import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const MenuItems = () => (
    <>
      <span
        onClick={() => handleNavigate('/')}
        className="text-text hover:text-primary transition-colors cursor-pointer">
        クーポン一覧
      </span>
      <a
        href="https://www.gozigen.com/wp/#contact"
        target="_blank"
        rel="noopener noreferrer"
        className="text-text hover:text-primary transition-colors">
        お問い合わせ
      </a>
      <span
        onClick={() => handleNavigate('/survey/user')}
        className="text-text hover:text-primary transition-colors cursor-pointer">
        ログイン
      </span>
    </>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span
          onClick={() => handleNavigate('/')}
          className="flex items-center space-x-4 cursor-pointer">
          <h1 className="text-xl font-bold text-primary">六次元</h1>
        </span>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col space-y-4 mt-8">
              <MenuItems />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <MenuItems />
        </nav>
      </div>
    </header>
  );
};

export default Header;
