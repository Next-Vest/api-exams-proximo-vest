
import { requireAuthWithRole } from "../../../../../utils/auth-guard";
import { FormCreateBoard } from "./_components/formCreateBoard";

export default async function Provas() {
    await requireAuthWithRole("Admin");


    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <h1 className="font-bold text-2xl">Criar Prova</h1>
            <p>Essa é primeira etapa para começar a criar um prova. Coloque o nome da prova. Exemplo:    <code>Unicamp</code></p>
         
            <FormCreateBoard />

        </div>
    );
}
