import { requireAuthWithRole } from "../../../../utils/auth-guard"
export const revalidate = 0; // ou, por ex., 60
type Board = { id: number; name: string; slug: string };

export default async function AdminPage() {
    const session = await requireAuthWithRole("admin")
    const res = await fetch(`http://localhost:3000/api/exam-board/list`, {

        next: { revalidate: 60 }, // cache incremental
    });

    if (!res.ok) throw new Error('Falha ao buscar boards');

    const boards = await res.json();
    return (

        <div>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">Nome</th>
                        <th className="border px-2 py-1">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board: Board) => (
                        <tr key={board.id}>
                            <td className="border px-2 py-1">{board.id}</td>
                            <td className="border px-2 py-1">{board.name}</td>
                            <td className="border px-2 py-1"><a href={`/dashboard/admin/provas-questoes/${board.id}`}>
                                Ver questões
                            </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )



}
