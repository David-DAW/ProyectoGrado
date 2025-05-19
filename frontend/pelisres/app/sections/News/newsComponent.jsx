const News = () => {
    return (
      <div className="flex flex-col items-center my-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
          Noticias para los más cinéfilos
        </h2>
        <section className="w-3/4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            <div className="rounded lg:col-span-2">
              <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
                <img
                  alt=""
                  src="https://manuelberlanga.es/wp-content/uploads/2023/04/juego-1.jpg"
                  className="h-56 w-full object-cover"
                />
  
                <div className="bg-white p-4 sm:p-6 h-60">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    10th Oct 2022
                  </time>
  
                  <a href="#">
                    <h3 className="mt-0.5 text-lg text-gray-900">
                      La otra actriz de 'Juego de Tronos' que pudo ser Ellie en
                      'The Last of Us' y no escondió su emoción
                    </h3>
                  </a>
  
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos. Molestias
                    explicabo corporis voluptatem?
                  </p>
                </div>
              </article>
            </div>
            <div className="rounded">
              <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
                <img
                  alt=""
                  src="https://hips.hearstapps.com/vidthumb/35e1c915-cfb3-4f54-a9d3-f5dd4bd2aca6/thumb_1080x1080_00002_1642410386_66598.jpg?crop=1xw:1xh;center,top"
                  className="h-56 w-full object-cover"
                />
  
                <div className="bg-white p-4 sm:p-6 h-60">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    10th Oct 2022
                  </time>
  
                  <a href="#">
                    <h3 className="mt-0.5 text-lg text-gray-900">
                      "Entró en la habitación y ya le odiaba": hace 40 años,
                      Stallone estaba muy celoso de este actor de 'Rocky'
                    </h3>
                  </a>
  
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos. Molestias
                    explicabo corporis voluptatem?
                  </p>
                </div>
              </article>
            </div>
            <div className="rounded">
              <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
                <img
                  alt=""
                  src="https://album.mediaset.es/eimg/2025/01/10/medico-de-familia_b62f.png?w=1200&h=900"
                  className="h-56 w-full object-cover"
                />
  
                <div className="bg-white p-4 sm:p-6 h-60">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    10th Oct 2022
                  </time>
  
                  <a href="#">
                    <h3 className="mt-0.5 text-lg text-gray-900">
                      El actor al que 'Médico de familia' le cambió la vida y casi
                      no hemos vuelto a ver en televisión
                    </h3>
                  </a>
  
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos. Molestias
                    explicabo corporis voluptatem?
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    );
  };
  export default News;