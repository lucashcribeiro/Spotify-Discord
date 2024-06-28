import { Conteudo } from "@/components/conteudo";
import Footer from "@/components/footer";
import { HeaderComponent } from "@/components/header";

export default function ArtistasPreferidos() {
  return (
    <>
      <HeaderComponent />
      <Conteudo title="Meus Artistas Preferidos" page="artistas-preferidos" />
      <Footer />
    </>
  );
}
