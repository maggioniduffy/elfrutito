import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";

const link =
  "https://wa.me/5492995509968?text=Hola%20El%20Frutito%2C%20quiero%20hacer%20un%20pedido!";

const qr = await QRCode.toDataURL(link);
const Contact = () => {
  return (
    <div
      className="w-full py-6 px-4 flex flex-col rounded-2xl items-center"
      id="contacto"
    >
      <h3 className="text-2xl text-card mb-4">Hace tu pedido!</h3>
      <Image
        src={qr}
        alt="QR Code"
        width={200}
        height={200}
        className="mx-auto mb-4"
      />
      <Link
        target="_blank"
        href={
          "https://wa.me/5492995509968?text=Hola%20El%20Frutito%2C%20quiero%20hacer%20un%20pedido!"
        }
        className="mx-auto bg-primary text-cream font-medium hover:scale-105 p-5 rounded-xl shadow hover:font-bold transition-colors text-center w-fit"
      >
        Contactanos por Whatsapp!
      </Link>
    </div>
  );
};

export default Contact;
