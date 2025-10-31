import { requireAuthWithRole } from "../../../../../utils/auth-guard"
export const revalidate = 0; // ou, por ex., 60
type Board = {
    id: number;
    examBoardId: number;
    year: number;
    slug: string
    editionLabel: string;
    notes: string

};

export default async function AdminPage({
    params,
}: {
    params: { id: string }
}) {
    const session = await requireAuthWithRole("admin")
    const { id } = await params
    const res = await fetch(`${process.env.API_URL}/exam-board/${id}`, {
    });


    if (!res.ok) throw new Error('Falha ao buscar boards');

    const resTable = await fetch(`${process.env.API_URL}/exam-edition/list?examBoardId=${id}`, {


    });


    if (!resTable.ok) throw new Error('Falha ao buscar boards');

    const board = await res.json();
    const editions = await resTable.json();

    return (

        <div>
            <h1>{board.name}</h1>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">Nome</th>
                        <th className="border px-2 py-1">Ano</th>
                        <th className="border px-2 py-1">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {editions.map((board: Board) => (
                        <tr key={board.id}>
                            <td className="border px-2 py-1">{board.id}</td>
                            <td className="border px-2 py-1">{board.editionLabel}</td>
                            <td className="border px-2 py-1">{board.year}</td>
                            <td className="border px-2 py-1"><a href={`/dashboard/admin/provas-questoes/${board.examBoardId}/${board.id}`}>
                                Ver questões
                            </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <a href={`/dashboard/admin/provas-questoes/${board.id}/createEdtion`}>
                Criar Edição
            </a>
        </div>
    )



}
