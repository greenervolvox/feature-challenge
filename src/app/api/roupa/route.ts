import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
      const {nome, preco, imageUrl} = await request.json();

      if (!nome || !preco || !imageUrl) {
        return Response.json({ body: 'dados imcompletos' }, { status: 400 });
      }

      const novaPeca = await prisma.peca.create({
        data: {
          nome: nome,
          preco: parseFloat(preco),
          imagem: imageUrl,
        },
      });

      return Response.json({ body: novaPeca }, { status: 201 });
  } catch (error) {
    console.log(error)
    return Response.json({ body: 'erro interno do servidor', errors: error   }, { status: 500 });
  }
}

export async function GET() {
  
  try {
    const pecas = await prisma.peca.findMany();

    return new Response(JSON.stringify(pecas), { status: 201 });
  } catch (error) {

    console.error('Erro ao buscar peças:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar peças.' }), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID não fornecido.' }), { status: 400 });
    }

    const pecaDeletada = await prisma.peca.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify(pecaDeletada), { status: 200 });
  } catch (error) {
    console.error('Erro ao deletar peça:', error);
    return new Response(JSON.stringify({ error: 'Erro ao deletar peça.', details: error.message }), { status: 500 });
  }
}