import SidebarContent from './sidebaritems';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import FullLogo from '../../shared/logo/FullLogo';
import { Link, useLocation } from 'react-router';
import { AMLogo, AMMenu, AMMenuItem, AMSidebar, AMSubmenu } from 'tailwind-sidebar';
import 'tailwind-sidebar/styles.css';

interface SidebarItemType {
  heading?: string
  id?: number | string
  name?: string
  title?: string
  icon?: string
  url?: string
  children?: SidebarItemType[]
  disabled?: boolean
  isPro?: boolean
}

const renderSidebarItems = (
  items: SidebarItemType[],
  currentPath: string,
  onClose?: () => void,
  isSubItem: boolean = false,
) => {
  return items.map((item, index) => {
    const isSelected = currentPath === item?.url;
    const IconComp = item.icon || null;

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={21} width={21} />
    ) : (
      <Icon icon={'ri:checkbox-blank-circle-line'} height={9} width={9} />
    );

    // Heading
    if (item.heading) {
      return (
        <div className="mb-1" key={`heading-${item.heading}-${index}`}>
          <AMMenu
            subHeading={item.heading}
            ClassName="hide-menu leading-21 text-gray-400 font-bold uppercase text-[10px] tracking-wider py-1"
          />
        </div>
      );
    }

    // Submenu
    if (item.children?.length) {
      return (
        <AMSubmenu
          key={item.id || `sub-${item.name}-${index}`}
          icon={iconElement}
          title={item.name}
          ClassName="mt-0.5 text-gray-700 hover:text-black"
        >
          {renderSidebarItems(item.children, currentPath, onClose, true)}
        </AMSubmenu>
      );
    }

    // Regular menu item
    const linkTarget = item.url?.startsWith('https') ? '_blank' : '_self';

    const itemClassNames = isSubItem
      ? `mt-0.5 text-gray-700 hover:text-black hover:bg-gray-100 ${
          isSelected ? '!bg-[#fcf9f2] !text-[#9a733e] font-semibold' : ''
        }`
      : `mt-0.5 text-gray-700 hover:text-black hover:bg-gray-100 ${
          isSelected ? '!bg-[#fcf9f2] !text-[#9a733e] font-semibold' : ''
        }`;

    return (
      <div key={item.id || item.url || `item-${index}`} onClick={onClose}>
        <AMMenuItem
          icon={iconElement}
          isSelected={isSelected}
          link={item.url || undefined}
          target={linkTarget}
          badge={!!item.isPro}
          badgeColor="bg-lightsecondary"
          badgeTextColor="text-secondary"
          disabled={item.disabled}
          badgeContent={item.isPro ? 'Pro' : undefined}
          component={Link}
          className={`${itemClassNames}`}
        >
          <span className="truncate flex-1">{item.title || item.name}</span>
        </AMMenuItem>
      </div>
    );
  });
};

const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <AMSidebar
      collapsible="none"
      animation={true}
      showProfile={false}
      width={'270px'}
      showTrigger={false}
      mode="light"
      className="fixed left-0 top-0 border-r border-gray-200 bg-white z-10 h-screen"
    >
      {/* Logo */}
      <div className="px-6 flex items-center brand-logo overflow-hidden">
        <FullLogo />
      </div>

      {/* Sidebar items */}

      <SimpleBar className="h-[calc(100vh-100px)]">
        <div className="px-6">
          {SidebarContent.map((section, index) => (
            <div key={`section-${section.heading || index}`}>
              {renderSidebarItems(
                [
                  ...(section.heading ? [{ heading: section.heading }] : []),
                  ...(section.children || []),
                ],
                pathname,
                onClose,
              )}
            </div>
          ))}

          {/* STAK Info & Live Website Card */}
          <div className="mt-8 mb-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-wider uppercase text-gray-700">
                  Website Conectado
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                As alterações no painel são sincronizadas de imediato no website.
              </p>
              <a
                href="#inicio"
                onClick={() => {
                  window.location.hash = 'inicio';
                  onClose?.();
                }}
                className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>Ver Website Ao Vivo ↗</span>
              </a>
            </div>
          </div>
        </div>
      </SimpleBar>
    </AMSidebar>
  );
};

export default SidebarLayout;
