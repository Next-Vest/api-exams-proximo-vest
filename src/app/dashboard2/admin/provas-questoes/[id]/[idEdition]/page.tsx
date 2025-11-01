import { requireAuthWithRole } from "../../../../../../utils/auth-guard"
export const revalidate = 0; // ou, por ex., 60
type Board = {
    id: number;
    examEditionId: number;
    phaseNumber: number;
    dayNumber?: number
    subjectBlock?: string;
    questionCountExpected?: number
    defaultOptionCount?: number
    isDiscursive: boolean
};


export default async function AdminPage({
    params,
}: {
    params: {
        id: string
        idEdition: string
    }
}) {
    const session = await requireAuthWithRole("admin")
    const { id, idEdition } = await params
    const res = await fetch(`${process.env.API_URL}/exam-phase/list?examEditionId=${idEdition}`, {
    });


    if (!res.ok) throw new Error('Falha ao buscar boards');

   
    const board = await res.json();
   

    return (

        <div>
            <h1>{board.name}</h1>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">Número da fase</th>
                        <th className="border px-2 py-1">Número do dia</th>
                        <th className="border px-2 py-1">subjectBlock</th>
                        <th className="border px-2 py-1">Quantidade de questões</th>
                        <th className="border px-2 py-1">Quantidade de alternativas</th>
                        <th className="border px-2 py-1">É discursiva?</th>
                        <th className="border px-2 py-1">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {board.map((board: Board) => (
                        <tr key={board.id}>
                            <td className="border px-2 py-1">{board.id}</td>
                            <td className="border px-2 py-1">{board.phaseNumber}</td>
                            <td className="border px-2 py-1">{board.dayNumber}</td>
                            <td className="border px-2 py-1">{board.subjectBlock}</td>
                            <td className="border px-2 py-1">{board.questionCountExpected}</td>
                            <td className="border px-2 py-1">{board.defaultOptionCount}</td>
                            <td className="border px-2 py-1">{board.isDiscursive}</td>
                            <td className="border px-2 py-1"><a href={`/dashboard/admin/provas-questoes/${id}/${idEdition}/${board.id}`}>
                                Ver questões
                            </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <a href={`/dashboard/admin/provas-questoes/${board.id}/createPhase`}>
                Criar Fase
            </a>
        </div>
    )



}
