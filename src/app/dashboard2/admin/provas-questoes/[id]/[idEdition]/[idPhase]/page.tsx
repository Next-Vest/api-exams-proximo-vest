import { requireAuthWithRole } from "../../../../../../../utils/auth-guard"
export const revalidate = 0; // ou, por ex., 60

export default async function AdminPage({
    params,
}: {
    params: {
        id: string
        idEdition: string
        idPhase: string
    }
}) {

    const session = await requireAuthWithRole("admin")
    const { idPhase } = await params
    const num = Number(idPhase)
    const res = await fetch(`/api/question/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idPhase: num,
        }),
        cache: "no-store",
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        throw new Error(data?.error?.message ?? `Falha (${res.status}) ao criar Exam Board`)
    }



    const board = data.items


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
                    {board.map((board: any) => (
                        <tr key={board.id}>
                            <td className="border px-2 py-1">{board.id}</td>
                            <td className="border px-2 py-1">{board.phaseNumber}</td>
                            <td className="border px-2 py-1">{board.dayNumber}</td>
                            <td className="border px-2 py-1">{board.subjectBlock}</td>
                            <td className="border px-2 py-1">{board.questionCountExpected}</td>
                            <td className="border px-2 py-1">{board.defaultOptionCount}</td>
                            <td className="border px-2 py-1">{board.isDiscursive}</td>
                            <td className="border px-2 py-1"><a href={`/dashboard/admin/provas-questoes/`}>
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
