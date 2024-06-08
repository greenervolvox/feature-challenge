'use client';

import { useState, useEffect } from 'react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

const ProductCarousel = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/roupa');
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setProdutos([]); 
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="product-carousel">
      {produtos.length > 0 ? (
        <div className="carousel">
          {produtos.map((produto) => (
            <div key={produto.id} className="carousel-item">
              <img src={produto.imagem} alt={produto.nome} className="product-image" />
              <h3>{produto.nome}</h3>
              <p>R${produto.preco.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
};

export default ProductCarousel;