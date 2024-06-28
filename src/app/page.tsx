import Footer from "@/components/footer";
import { HeaderComponent } from "@/components/header";

export default function Home() {
  return (
    <>
      <HeaderComponent />

      <section className="bg-black text-white text-[70px] flex justify-center items-center h-[672px] leading-tight">
        <div>
          <h1 className="flex justify-center">DÊ O PLAY</h1>

          <h2 className="flex justify-center">NA SUA </h2>

          <h3 className="flex justify-center">VIDA</h3>
        </div>

      </section>

      <Footer />
    </>
  );
}
