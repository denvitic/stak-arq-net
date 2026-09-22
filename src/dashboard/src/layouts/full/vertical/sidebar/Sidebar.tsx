import React from 'react';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import FullLogo from '../../shared/logo/FullLogo';
import { Link, useLocation } from 'react-router';
import SidebarContent, { MenuItem, ChildItem } from './sidebaritems';

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const SidebarLayout: React.FC<SidebarProps> = ({ onClose, isMobile = false }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`stak-sidebar flex flex-col bg-white text-gray-900 ${
        isMobile
          ? 'w-full h-full'
          : 'fixed left-0 top-0 w-[270px] h-screen border-r border-gray-200 z-20'
      }`}
      style={{ color: '#111827' }}
    >
      {/* Brand Logo & Mobile Header */}
      <div className="h-[70px] px-6 flex items-center justify-between border-b border-gray-100 shrink-0">
        <FullLogo />
        {isMobile && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Icon icon="solar:close-circle-linear" height={22} width={22} />
          </button>
        )}
      </div>

      {/* Navigation Menu Items */}
      <SimpleBar className="flex-1 px-4 py-4" style={{ height: 'calc(100vh - 70px)' }}>
        <nav className="flex flex-col gap-6" aria-label="Menu Principal">
          {SidebarContent.map((section: MenuItem, sectionIdx: number) => (
            <div key={`section-${section.heading || sectionIdx}`} className="flex flex-col">
              {section.heading && (
                <div className="px-3 pb-2 pt-1 text-[11px] font-bold tracking-wider uppercase text-gray-400 font-mono">
                  {section.heading}
                </div>
              )}

              <div className="flex flex-col gap-1">
                {section.children?.map((item: ChildItem) => {
                  const itemUrl = item.url || '/';
                  const isSelected =
                    itemUrl === '/'
                      ? pathname === '/'
                      : pathname === itemUrl || pathname.startsWith(itemUrl + '/');

                  return (
                    <Link
                      key={item.id || item.url}
                      to={itemUrl}
                      onClick={handleLinkClick}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-[#fcf9f2] text-[#9a733e] font-semibold border border-[#eedec7]'
                          : 'text-gray-700 hover:text-gray-950 hover:bg-gray-100/80 font-medium'
                      }`}
                      style={{
                        color: isSelected ? '#9a733e' : '#374151',
                      }}
                    >
                      <Icon
                        icon={item.icon || 'solar:document-linear'}
                        height={20}
                        width={20}
                        className={`shrink-0 transition-colors ${
                          isSelected
                            ? 'text-[#9a733e]'
                            : 'text-gray-500 group-hover:text-gray-900'
                        }`}
                        style={{
                          color: isSelected ? '#9a733e' : undefined,
                        }}
                      />
                      <span
                        className="truncate flex-1 text-left"
                        style={{
                          color: isSelected ? '#9a733e' : '#374151',
                        }}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Connected Live Website Box */}
          <div className="mt-2 mb-6">
            <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-wider uppercase text-gray-700">
                  Website Conectado
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                As alterações no painel são sincronizadas de imediato no website.
              </p>
              <a
                href="#inicio"
                onClick={() => {
                  window.location.hash = 'inicio';
                  if (onClose) onClose();
                }}
                className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>Ver Website Ao Vivo ↗</span>
              </a>
            </div>
          </div>
        </nav>
      </SimpleBar>
    </aside>
  );
};

export default SidebarLayout;
