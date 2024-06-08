'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NavBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/main">Innovation Store</Link>
      </div>
      <div className="navbar-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Digite o produto que deseja buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='botaobuscar' type="submit">Buscar</button>
        </form>
      </div>
      <div className="navbar-account">
        <Link href="/cadastrar">CADASTRAR PEÇAS</Link>
      </div>
    </nav>
  );
};

export default NavBar;



