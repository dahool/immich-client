import Image from "next/image";

export default function ImmichLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <Image
        src="/images/immichlogo.svg"
        alt="Immich"
        width={64}
        height={64}
        className="w-9"/>
    </div>
  );
}
