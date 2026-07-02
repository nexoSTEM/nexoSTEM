export default function Footer() {
  const cols = [
    {
      title: 'Plataforma',
      links: ['Explorar', 'Rutas de aprendizaje', 'Simulaciones', 'Para educadores'],
    },
    {
      title: 'Recursos',
      links: ['Centro de ayuda', 'Guías', 'Blog', 'Comunidad'],
    },
    {
      title: 'Empresa',
      links: ['Sobre nosotros', 'Carreras', 'Contacto', 'Prensa'],
    },
  ]

  return (
    <footer className="border-t border-[#30363D] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="6" fill="#0D1117" stroke="#30363D" strokeWidth="1"/>
                <path d="M7 22V10h2.8l4.2 7.2V10H17v12h-2.8L10 14.8V22H7Z" fill="#F0F6FC"/>
                <path d="M19 22V10h6v2.4h-3.2v2.4h3v2.3h-3v2.5H25V22h-6Z" fill="#3FB950"/>
              </svg>
              <span className="text-[#F0F6FC] font-bold text-base">
                Nexo<span className="text-[#3FB950]">STEM</span>
              </span>
            </a>
            <p className="text-[#8B949E] text-sm leading-relaxed mb-4">
              La plataforma de aprendizaje interactivo para mentes curiosas y constructoras.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { label: 'GitHub', path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z' },
                { label: 'Twitter/X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.918l4.259 5.63 5.817-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-md border border-[#30363D] flex items-center justify-center text-[#8B949E] hover:text-[#F0F6FC] hover:border-[#8B949E] transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-[#F0F6FC] font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#8B949E] hover:text-[#F0F6FC] text-sm transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#30363D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8B949E] text-xs">
            © 2024 NexoSTEM. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {['Términos', 'Privacidad', 'Cookies'].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                {i > 0 && <span className="text-[#30363D]">·</span>}
                <a href="#" className="text-[#8B949E] hover:text-[#F0F6FC] text-xs transition-colors duration-150">
                  {item}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
