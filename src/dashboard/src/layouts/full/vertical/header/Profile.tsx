'use client';

import { Icon } from '@iconify/react';
import * as profileData from './data';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Button } from 'src/components/ui/button';

const Profile = () => {
  return (
    <div className="relative group/menu ps-1 shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#111827] text-[#c6a87c] flex items-center justify-center font-bold text-xs border border-gray-300 shadow-2xs">
              SK
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-gray-800 pr-1">
              Admin
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 pb-4 pt-3 rounded-lg shadow-lg border border-gray-200 bg-white"
        >
          <div className="px-4 py-2 border-b border-gray-100 mb-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              STAK Arquitectura
            </h4>
            <p className="text-[11px] text-gray-500">Gestão & Administração</p>
          </div>

          <SimpleBar className="max-h-56">
            {profileData.profileDD.map((item, index) => (
              <DropdownMenuItem
                key={index}
                asChild
                className="px-4 py-2.5 flex items-center hover:bg-gray-50 cursor-pointer"
              >
                <Link to={item.url} className="flex items-center gap-3 w-full">
                  <div className="w-7 h-7 rounded-md bg-[#fbf8f3] text-[#c6a87c] flex items-center justify-center shrink-0">
                    <Icon icon={item.icon} className="text-base" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-semibold text-gray-800 leading-tight">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-gray-500 block leading-tight">
                      {item.subtitle}
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </SimpleBar>

          <DropdownMenuSeparator className="my-2" />

          <div className="pt-1 px-3">
            <Button
              asChild
              variant="outline"
              className="w-full text-xs font-medium border-gray-200 hover:bg-gray-100 text-gray-800 h-8 cursor-pointer"
            >
              <a
                href="#inicio"
                onClick={() => {
                  window.location.hash = 'inicio';
                }}
              >
                ← Voltar ao Website
              </a>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
