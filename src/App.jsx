import { useEffect, useState } from "react";
import cursosData from "./data ";

function App() {
  const [isInPotosi, setIsInPotosi] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [precio, setPrecio] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [phonePotosi, setPhonePotosi] = useState('ATENCION AL CLIENTE 68413858')
  const [phoneOthers, setPhoneOthers] = useState('LIC. CARLA VARGAS 69616052')

  useEffect(() => {

    cursosSeleccionados.forEach(curso => {

      if (cursosSeleccionados.length === 1) {
        setPrecio(80);
      }

      if (cursosSeleccionados.length === 2) {
        setPrecio(130);
      }

      if (cursosSeleccionados.length === 3) {
        setPrecio(160);
      }

      if (cursosSeleccionados.length >= 4) {
        let nuevoPrecio = 0;
        for (let i = 0; i < cursosSeleccionados.length; i++) {
          nuevoPrecio += 50;
        }
        setPrecio(nuevoPrecio);
      }
    });

    if (cursosSeleccionados.length === 0) {
      setPrecio(0)
    }
  }, [cursosSeleccionados, precio, cursosFiltrados]);

  const handleSeletPotosi = () => {
    setIsInPotosi(true);
    setIsSelect(true);
    setCursosSeleccionados([]);
    setSearchTerm('')
    setCursosFiltrados([])

    cursosData.forEach(curso => {
      curso.add = false;
    })
  };

  const handleSelectOther = () => {
    setIsInPotosi(false);
    setIsSelect(true);
    setCursosSeleccionados([]);
    setSearchTerm('')
    setCursosFiltrados([])

    cursosData.forEach(curso => {
      curso.add = false;
    })
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredCursos = cursosData.filter((curso) => {
      return curso.nombre.toLowerCase().includes(term);
    });
    setCursosFiltrados(term ? filteredCursos : []);
  };

  const handleCursoClick = (curso) => {
    const cursoYaSeleccionado = cursosSeleccionados.some((c) => c.id === curso.id);
    if (cursoYaSeleccionado) {
      const nuevosCursosSeleccionados = cursosSeleccionados.filter((c) => c.id !== curso.id);
      setCursosSeleccionados(nuevosCursosSeleccionados);
    } else {
      setCursosSeleccionados([...cursosSeleccionados, curso]);
    }
    curso.add = !curso.add
    setSearchTerm('')
  };

  const handleChangeNumber = () => {
    if( isInPotosi === true ) {
      const numero = prompt('Cambiar Numero')
      setPhonePotosi(numero)

      if( numero === null ) {
        setPhonePotosi('ATENCION AL CLIENTE 68413858')
      }

    } else {
      const numero = prompt('Cambiar Numero')
      setPhoneOthers(numero)
      
      if( numero === null ) {
        setPhonePotosi('LIC. CARLA VARGAS 69616052')
      }
    }
  }


  let messagePotosi1;
  let messagePotosi2;
  let othersMessage1;
  let othersMessage2;
  let messageCopy;

  const handleCopyClick = () => {
    const potosiMessage = document.querySelectorAll('.potosi');
    const othersMessage = document.querySelectorAll('.others');
    if (potosiMessage.length) {
      messagePotosi1 = potosiMessage[0].textContent
      messagePotosi2 = potosiMessage[1].textContent
      messageCopy = `${messagePotosi1} \n \n${messagePotosi2}`
      console.log(messageCopy);
    }

    if (othersMessage.length) {
      othersMessage1 = othersMessage[0].textContent
      othersMessage2 = othersMessage[1].textContent
      messageCopy = `${othersMessage1} \n \n${othersMessage2}`
      console.log(messageCopy);
    }

    navigator.clipboard.writeText(messageCopy)
      .then(() => {
        alert("Mensaje copiado al portapapeles");
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  }

  return (
    <>
      <h1 className="text-5xl text-center mt-10 uppercase mb-10">
        seleccione una opcion
      </h1>

      <div className=" mt-7 flex justify-center gap-4">
        <button
          className="bg-indigo-700 uppercase text-white p-3 hover:bg-indigo-800 transition-colors w-60 rounded-md"
          onClick={() => handleSeletPotosi()}
        >
          Potosi
        </button>

        <button
          className="bg-indigo-700 uppercase text-white p-3 hover:bg-indigo-800 transition-colors w-60 rounded-md"
          onClick={() => handleSelectOther()}
        >
          Otras Ciudades
        </button>
      </div>

      {isSelect && (
        <>
          <div className="flex justify-center mt-10">
            <input
              className="shadow appearance-none border rounded w-2/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Buscar Cursos"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <p
            className="mt-3 text-center text-gray-500 hover:text-gray-950 cursor-pointer max-w-sm mx-auto"
            onClick={handleChangeNumber}
          >¿Quieres cambiar el numero de telefono?</p>

          {isInvalid &&
            <p className="max-w-sm rounded mt-5 bg-red-600 text-white py-2 text-center mx-auto">Introduzca un numero valido</p>
          }

          {cursosFiltrados.length > 0 && (
            <div className="max-w-md mx-auto mt-8">
              <ul className="divide-y divide-gray-400">
                {cursosFiltrados.map((curso) => (
                  <li
                    className={`py-2 px-2 cursor-pointer ${curso.add === true ? 'bg-lime-300' : 'bg-gray-100'}`}
                    key={curso.id}
                    onClick={() => handleCursoClick(curso)} > {curso.nombre}
                  </li>
                ))}
              </ul>
            </div>
          )}


          <div className="bg-gray-100 pb-10 mt-10">
            <div className="flex justify-center ">
              <div className="max-w-xl rounded mt-10 overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  {isInPotosi ? (
                    <>
                      <p className="bg-lime-500 potosi py-2 px-2">
                        NOSOTROS TE OFRECEMOS LOS CURSOS SOLICITADOS POR LA
                        INSTITUCION RESALTADOS EN COLOR VERDE, ADQUIERELOS YA MISMO Y
                        FORTALECE TU POSTULACION, VISITA NUESTRAS OFICINAS UBICADAS EN
                        CALLE LIDIO USTAREZ ESQUINA ARGOTE CIUDAD DE POTOSI O ESCRIBENOS
                        VIA WHATSAPP - {`${phonePotosi}`} – PRECIO PROMOCIONAL
                        DE {`${precio} BS`}. {`${cursosSeleccionados.length === 1 ? 'POR EL CURSO' : `POR LOS ${cursosSeleccionados.length} CURSOS`}`} (
                        {cursosSeleccionados.map((curso, index) => (
                          index === cursosSeleccionados.length - 1 ? `${curso.nombre}` : `${curso.nombre}, `
                        ))})
                      </p>
                      <p
                        className="mt-5 bg-yellow-400 potosi py-2 px-2"
                      >OJO QUE NO TENEMOS NADA QUE VER CON LA INSTITUCION, SOLO LES OFRECEMOS LOS CURSOS SOLICITADOS PARA FORTALECER SUS POSTULACIONES</p>
                    </>
                  ) : (
                    <>
                      <p className="bg-lime-500 others py-2 px-2">NOSOTROS TE OFRECEMOS LOS CURSOS SOLICITADOS POR LA
                        INSTITUCION RESALTADOS EN COLOR VERDE, ADQUIERELOS YA MISMO Y
                        FORTALECE TU POSTULACION, ESCRIBENOS VIA WHATSAPP - {`${phoneOthers}`} – PRECIO PROMOCIONAL DE {`${precio} BS`}. {`${cursosSeleccionados.length === 1 ? 'POR EL CURSO' : `POR LOS ${cursosSeleccionados.length} CURSOS`}`} ({cursosSeleccionados.map((curso, index) => (
                          index === cursosSeleccionados.length - 1 ? `${curso.nombre}` : `${curso.nombre}, `
                        ))})</p>
                      <p
                        className="mt-5 bg-yellow-400 others first:py-2 px-2"
                      >OJO QUE NO TENEMOS NADA QUE VER CON LA INSTITUCION, SOLO LES OFRECEMOS LOS CURSOS SOLICITADOS PARA FORTALECER SUS POSTULACIONES</p>
                    </>
                  )}

                  <div className="flex justify-center">
                    <button
                      className="bg-indigo-700 text-white uppercase font-bold py-2 px-2 rounded-md mt-5 mx-auto hover:bg-indigo"
                      onClick={handleCopyClick}
                    >Copiar Mensaje</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;