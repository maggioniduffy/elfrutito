import Link from "next/link";

const link =
  "https://wa.me/5492995509968?text=Hola%20El%20Frutito!%2C%20Quiero%consultar%sobre";

const Contact = () => {
  return (
    <div
      className="w-full py-6 px-4 flex flex-col rounded-2xl items-center"
      id="contacto"
    >
      <Link
        target="_blank"
        href={link}
        className="mx-auto bg-primary text-cream font-medium hover:scale-105 p-5 rounded-xl shadow hover:font-bold transition-colors text-center w-fit"
      >
        Hacenos tu consulta por Whatsapp!
      </Link>
    </div>
  );
};

export default Contact;
