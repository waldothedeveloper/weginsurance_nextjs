const stats = [
  { label: 'Clientes protejidos 365 dias al año', value: '5,000' },
  { label: 'Ahorrados en descuento de nuestras polizas', value: '$10,000' },
  { label: 'Nuevos usuarios que ayudamos por dia', value: '200' },
]

export const Mission = () => {
  return (
    <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Nuestra misión</h2>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
            <p className="text-xl leading-8 text-slate-600">
              Nuestra misión es clara: proteger a las personas en cada paso de su vida. Creemos que la tranquilidad y la seguridad son derechos fundamentales, no lujos. Nos esforzamos por brindar soluciones de seguros que no solo protejan el presente, sino que también construyan un futuro más seguro para cada uno de nuestros clientes
            </p>
            <div className="mt-10 max-w-xl text-base leading-7 text-slate-700">
              <p>
                Nuestra pasión es tu bienestar. Trabajamos incansablemente para brindar la paz mental que mereces, ya sea a través de seguros de salud que cuidan de ti y tu familia, seguros de vida que aseguran un legado sólido y seguros suplementarios que proporcionan seguridad en tu día a día. Tu seguridad es nuestra prioridad absoluta.
              </p>
              <p className="mt-10">
                En Weg Insurance, no solo vendemos seguros; construimos confianza y fortalecemos vidas. Cada póliza que emitimos es un compromiso de protección duradera. Nos enorgullece ser tu socio en este viaje, garantizando que puedas enfrentar el futuro con confianza. Tu seguridad, tu confianza, tu futuro: son nuestra razón de ser.
              </p>
            </div>
          </div>
          <div className="lg:flex lg:flex-auto lg:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-slate-600">{stat.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-slate-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}