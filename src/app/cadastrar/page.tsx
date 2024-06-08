'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import Link from 'next/link';


const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const CadastrarPeca = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!originalPhoto) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/roupa', { 
        method: 'POST',
        body: JSON.stringify({  nome, preco, imageUrl: originalPhoto }),
      });

      if (response.ok) {
        alert('Peça cadastrada com sucesso!');
        setNome('');
        setPreco('');
        setImagem(null);
      } else {
        alert('Erro ao cadastrar a peça.'); 
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error); 
      alert('Erro ao cadastrar a peça.'); 
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagem(event.target.files[0]);
    }
  };

  const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    styles: {
      colors: {
        primary: "#DEB142", // Primary buttons & links
        error: "#d23f4d", // Error messages
        shade100: "#fff", // Standard text
        shade200: "#fffe", // Secondary button text
        shade300: "#fffd", // Secondary button text (hover)
        shade400: "#fffc", // Welcome text
        shade500: "#fff9", // Modal close button
        shade600: "#fff7", // Border
        shade700: "#fff2", // Progress indicator background
        shade800: "#fff1", // File item background
        shade900: "#ffff", // Various (draggable crop buttons, etc.)
      },
    },
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  return (
    <div className='cadastr_'>
      <h1 className='cadastrO'>CADASTRAR PEÇA: </h1>
      <div className='cadastrO'></div>
      <form onSubmit={handleSubmit}>
        <div className='cadastrO'>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className='cadastrO'> 
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div className='cadastrO'>
          <label htmlFor="imagem">Imagem:</label>
          <UploadDropZone />
        </div>
        <button className='cadastrO' type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarPeca;