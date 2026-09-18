import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import SidebarContent, { ChildItem, MenuItem } from '../sidebar/sidebaritems';
import { Link } from 'react-router';
import SimpleBar from 'simplebar-react';
import { Input } from 'src/components/ui/input';

interface SearchResult {
  name: string
  url: string
  path: string | undefined
  icon?: string
}

function Search() {
  const [query, setQuery] = useState('');

  // 🔍 Recursive search through menu
  const searchItems = (items: (MenuItem | ChildItem)[], q: string, parentPath = ''): SearchResult[] => {
    let results: SearchResult[] = [];

    items.forEach((item) => {
      const currentPath = parentPath ? `${parentPath} → ${item.name}` : item.name;

      // If match found
      if (item.name?.toLowerCase().includes(q.toLowerCase()) && item.url) {
        results.push({
          name: item.name,
          url: item.url,
          path: currentPath,
          icon: item.icon,
        });
      }

      // Search deeper children
      if (item.children) {
        results = [...results, ...searchItems(item.children, q, currentPath)];
      }
    });

    return results;
  };

  // Memoize filtered results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchItems(SidebarContent, query);
  }, [query]);

  return (
    <div className="relative w-full">
      <div className="flex items-center relative lg:w-xs mx-auto ">
        <Icon
          icon="solar:magnifer-linear"
          width="18"
          height="18"
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />

        <Input
          placeholder="Pesquisar no painel..."
          className="rounded-lg pl-9 h-9 text-xs bg-gray-50 border-gray-200 focus:bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div
        className={`absolute w-full bg-white rounded-lg top-11 z-50 start-0 shadow-xl border border-gray-200 ${
          Boolean(query) ? 'block' : 'hidden'
        }`}
      >
        <SimpleBar className="h-72 p-3 custom-scroll">
          {Boolean(results.length) ? (
            results.map((item, i) => (
              <Link
                key={i}
                to={item.url}
                onClick={() => setQuery('')}
                className="p-2.5 mb-1.5 last:mb-0 flex items-center bg-gray-50 hover:bg-[#fcf9f2] gap-2 text-sm font-medium rounded-lg text-gray-800 hover:text-[#9a733e] transition-colors w-full"
              >
                <div className="flex items-center">
                  <Icon icon="iconoir:component" width={18} height={18} className="text-[#c6a87c]" />
                  <div className="ps-3">
                    <h5 className="mb-0.5 text-xs font-semibold text-gray-900 group-hover:text-[#9a733e]">{item.name}</h5>
                    <span className="text-[11px] block truncate text-gray-500">{item.path}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center h-full p-4">
              <h1 className="text-xs font-medium text-gray-500">Nenhum resultado encontrado</h1>
            </div>
          )}
        </SimpleBar>
      </div>
    </div>
  );
}

export default Search;
