"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <div className="sm:my-auto mx-auto px-4 py-10 sm:max-w-xl md:max-w-full md:px-24 lg:w-3/4 lg:px-8 lg:py-10">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="mb-10 lg:mb-0 lg:max-w-lg lg:pr-5">
          <div className="mb-6 max-w-xl">
            <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-snug tracking-tight text-white sm:text-5xl sm:leading-snug">
              Opina y valora ya tus
              <span className="my-1 inline-block rounded bg-white px-2 text-amber-600">
                peliculas y series
              </span>
              favoritas
            </h2>
            <p className="text-base text-gray-200">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque it.
            </p>
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <Link
              href="/login"
              className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-yellow-500 px-6 font-medium tracking-wide text-white shadow-md transition duration-200 hover:bg-amber-500 focus:outline-none md:mr-4 md:mb-0 md:w-auto"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/"
              className="inline-flex items-center font-semibold text-gray-50 underline-offset-2 transition-colors duration-200 hover:underline"
            >
              Sobre nosotros
            </Link>
          </div>
        </div>
        <div className="relative shadow-xl shadow-yellow-500 lg:w-1/2">
          <img
            className="h-56 w-full rounded object-cover shadow-lg sm:h-96"
            src="/images/oppen.webp"
            alt="Banner"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
