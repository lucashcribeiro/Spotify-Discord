import { Conteudo } from "@/components/conteudo";
import { HeaderComponent } from "@/components/header";

export default function Lancamentos() {
  return (
    <>
      <HeaderComponent />
      <Conteudo title="NOVOS LANÇAMENTOS" page="lancamentos" />
    </>
  );
}
