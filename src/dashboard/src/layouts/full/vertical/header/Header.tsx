import { useState } from 'react';
import { Icon } from '@iconify/react';
import Messages from './Messages';
import FullLogo from '../../shared/logo/FullLogo';
import Profile from './Profile';
import SidebarLayout from '../sidebar/Sidebar';
import { Sheet, SheetContent, SheetTitle } from 'src/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Search from './Search';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-2xs">
        <nav className="rounded-none bg-white py-3.5 px-6 !max-w-full flex justify-between items-center">
          {/* Mobile Toggle Icon */}
          <span
            onClick={() => setIsOpen(true)}
            className="px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg xl:hidden flex justify-center items-center cursor-pointer transition-colors"
          >
            <Icon icon="tabler:menu-2" height={20} />
          </span>

          <div className="hidden xl:flex items-center gap-3">
            <Search />
            <a
              href="#inicio"
              onClick={() => {
                window.location.hash = 'inicio';
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#c6a87c] bg-[#c6a87c]/10 hover:bg-[#c6a87c]/20 border border-[#c6a87c]/30 transition-colors cursor-pointer"
              title="Voltar ao Website Principal"
            >
              <Icon icon="tabler:arrow-left" width="16" />
              <span>Voltar ao Website</span>
            </a>
          </div>

          {/* mobile-logo */}
          <div className="block xl:hidden">
            <FullLogo />
          </div>

          <div className="xl:!block !hidden md:!hidden">
            <div className="flex gap-2 items-center">
              {/* Messages / Notifications */}
              <Messages />

              {/* Profile Dropdown */}
              <Profile />
            </div>
          </div>
          {/* Mobile Actions */}
          <div className="flex xl:hidden items-center gap-2">
            <Messages />
            <Profile />
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <VisuallyHidden>
            <SheetTitle>sidebar</SheetTitle>
          </VisuallyHidden>
          <SidebarLayout onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
