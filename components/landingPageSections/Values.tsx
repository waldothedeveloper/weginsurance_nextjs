const values = [
  {
    name: 'Integridad',
    description:
      'La integridad es nuestro pilar fundamental. Nos comprometemos a actuar con honestidad y ética en cada interacción. La confianza de nuestros clientes se basa en la integridad que mostramos en cada póliza y asesoramiento que proporcionamos.',
  },
  {
    name: 'Compromiso con el Cliente',
    description:
      'Nuestro compromiso inquebrantable es con nuestros clientes. Escuchamos, entendemos sus necesidades y estamos dedicados a encontrar soluciones de seguros que realmente importen para ellos.',
  },
  {
    name: 'Excelencia en el Servicio',
    description:
      'Buscamos la excelencia en todo lo que hacemos. Desde la atención al cliente hasta la gestión de reclamaciones, nos esforzamos constantemente por brindar un servicio excepcional que supere las expectativas.',
  },
  {
    name: 'Innovación Continua',
    description:
      'Estamos en constante evolución. Abrazamos la innovación y la tecnología para ofrecer soluciones de seguros actualizadas y efectivas que se adapten a un mundo en cambio constante.',
  },
  {
    name: 'Comunidad y Responsabilidad Social',
    description:
      'Creemos en dar a la comunidad que nos rodea. Contribuimos a la sociedad y promovemos la responsabilidad social, apoyando iniciativas que marcan la diferencia en la vida de las personas.',
  },
  {
    name: 'Trabajo en Equipo',
    description:
      'Nuestro éxito se basa en un equipo sólido. Colaboramos estrechamente para aprovechar la diversidad de talentos y perspectivas, trabajando juntos en pos de un objetivo común: proteger y empoderar a nuestros clientes.',
  },
]

export const Values = () => {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Nuestros Valores</h2>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Creemos en la importancia de la integridad, el compromiso con el cliente, la excelencia en el servicio, la innovación constante, la responsabilidad social y el poder del trabajo en equipo. Estos valores son el corazón de nuestra misión y nos guían en cada paso que damos para construir un futuro seguro y confiable para nuestros clientes.
        </p>
      </div>
      <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {values.map((value) => (
          <div key={value.name}>
            <dt className="font-semibold text-slate-900">{value.name}</dt>
            <dd className="mt-1 text-slate-600">{value.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}