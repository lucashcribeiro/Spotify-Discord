import { Conteudo } from "@/components/conteudo";
import Footer from "@/components/footer";
import { HeaderComponent } from "@/components/header";

export default function Lancamentos() {
  return (
    <>
      <HeaderComponent />
      <Conteudo title="NOVOS LANÇAMENTOS" page="lancamentos" />
      <Footer />
    </>
  );
}