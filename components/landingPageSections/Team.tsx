import Image from "next/image";
import lorena from "@/public/lorena_agent.jpg"
import william from "@/public/william_agent.jpg"
const team = [
  {
    name: 'Lorena Zozaya',
    role: 'Agente de Seguros',
    imageUrl:
      lorena,
  },
  {
    name: 'William Gola',
    role: 'Agente de Seguros',
    imageUrl:
      william,
  }
]

export const Team = () => {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Nuestro equipo</h2>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Somos dos apasionados agentes de seguros que hemos entregado todo desde el 2018. ¿Qué nos impulsa? La dedicación a nuestra misión de proteger a nuestros clientes en cada etapa de la vida.
          Desde el día en que comenzamos esta travesía, hemos estado comprometidos con tu bienestar, brindando asesoramiento personalizado y soluciones de seguros que realmente importan. Cada cliente es especial para nosotros, y cada póliza que emitimos es un testimonio de nuestra devoción para construir un futuro más seguro para todos.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        {team.map((person) => (
          <li className="relative" key={person.name}>
            <Image className="mx-auto rounded-full w-24 h-24 object-cover aspect-[2/3]" src={person.imageUrl} alt="" />
            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-slate-900">{person.name}</h3>
            <p className="text-sm leading-6 text-slate-600">{person.role}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}