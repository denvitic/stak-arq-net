import React from 'react';
import { Icon } from '@iconify/react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-2 text-xs font-mono tracking-wider ${className}`}
    >
      <ol
        className="flex items-center flex-wrap gap-1.5 text-gray-400"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li
              key={index}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  width="12"
                  className="text-gray-500 shrink-0 select-none"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  className="text-[#c6a87c] font-semibold truncate max-w-[240px] sm:max-w-md"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-white transition-colors cursor-pointer truncate max-w-[180px]"
                  itemProp="name"
                >
                  {item.label}
                </button>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="hover:text-white transition-colors truncate max-w-[180px]"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span className="text-gray-400 truncate max-w-[180px]" itemProp="name">
                  {item.label}
                </span>
              )}

              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
