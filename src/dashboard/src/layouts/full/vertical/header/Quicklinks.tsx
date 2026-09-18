import { Link } from 'react-router';

const STAK_PAGES = [
  { title: 'Projectos & Obras', href: '/projects' },
  { title: 'Briefings de Clientes', href: '/briefings' },
  { title: 'Identidade & Mídia', href: '/atelier' },
  { title: 'Artigos & Notícias', href: '/articles' },
  { title: 'Serviços do Atelier', href: '/services' },
];

const Quicklinks = () => {
  return (
    <div className="p-4">
      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Links Rápidos</h5>
      <ul className="space-y-2">
        {STAK_PAGES.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className="text-xs font-medium text-gray-700 hover:text-black transition-colors"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quicklinks;
