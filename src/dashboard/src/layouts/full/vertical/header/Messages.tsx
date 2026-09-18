import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { useCms } from '@/src/context/CmsContext';

const Messages = () => {
  const { briefings } = useCms();
  const pendingBriefings = briefings.filter((b) => b.status === 'Pendente');

  return (
    <div className="relative group/menu px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition-colors cursor-pointer"
            title="Notificações de Briefings"
          >
            <Icon icon="solar:bell-linear" height={20} />
            {pendingBriefings.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#c6a87c] rounded-full ring-2 ring-white"></span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-80 py-4 rounded-lg shadow-lg border border-gray-200 bg-white"
        >
          <div className="flex items-center px-4 justify-between border-b border-gray-100 pb-2.5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Briefings de Clientes
            </h3>
            {pendingBriefings.length > 0 ? (
              <Badge className="bg-[#fbf8f3] text-[#c6a87c] border border-[#e8d8be] text-[10px] font-semibold">
                {pendingBriefings.length} pendente{pendingBriefings.length > 1 ? 's' : ''}
              </Badge>
            ) : (
              <span className="text-[10px] text-gray-400">Todos lidos</span>
            )}
          </div>

          <SimpleBar className="max-h-72 mt-1">
            {briefings.slice(0, 5).map((briefing) => (
              <DropdownMenuItem
                className="px-4 py-2.5 flex items-center hover:bg-gray-50 border-b border-gray-50 cursor-pointer"
                key={briefing.id}
                asChild
              >
                <Link to="/briefings" className="w-full">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        briefing.status === 'Pendente'
                          ? 'bg-[#c6a87c]'
                          : briefing.status === 'Em Análise'
                          ? 'bg-blue-500'
                          : briefing.status === 'Reunião Agendada'
                          ? 'bg-indigo-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h5 className="text-xs font-semibold text-gray-900 truncate">
                          {briefing.clientName}
                        </h5>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {new Date(briefing.createdAt).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 truncate">
                        {briefing.projectType} • {briefing.budgetRange || briefing.clientPhone}
                      </p>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </SimpleBar>

          <div className="pt-2 px-4">
            <Button
              asChild
              variant="outline"
              className="w-full text-xs font-medium border-gray-200 hover:bg-gray-100 text-gray-800 h-8 cursor-pointer"
            >
              <Link to="/briefings">Gerir Todos os Briefings →</Link>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Messages;
