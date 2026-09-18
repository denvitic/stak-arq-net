






import { Link } from 'react-router';

const FullLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 py-2 group select-none">
      <img
        src="/img/Stak-Logo-Original-PNG-BLACK.png"
        alt="STAK Arquitectura"
        className="h-10 w-auto max-w-[170px] object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/img/stak-logo.png';
        }}
      />
      <div className="flex flex-col border-l border-gray-200 pl-2.5">
        <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#c6a87c] leading-tight">
          Painel
        </span>
        <span className="text-[9px] tracking-wider text-gray-500 font-medium uppercase leading-tight">
          Gestão
        </span>
      </div>
    </Link>
  );
};

export default FullLogo;

