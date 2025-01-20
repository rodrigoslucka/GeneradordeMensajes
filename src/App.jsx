import { useEffect, useState } from "react";
import cursosData from "./data ";
import Modal from "./Modal";
import Swal from 'sweetalert2'

function App() {
  const [isInPotosi, setIsInPotosi] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [precio, setPrecio] = useState(0);
  const [isOpen, setIsOpen] = useState(Boolean);
  const [cambiarNumber, setCambiarNumber] = useState(false);
  const [phonePotosi, setPhonePotosi] = useState('ATENCION AL CLIENTE 68413858')
  const [phoneOthers, setPhoneOthers] = useState('LIC. CARLA VARGAS 69616052')
  const [message, setMessage] = useState(true)

  useEffect(() => {

    cursosSeleccionados.forEach(() => {

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
    setCambiarNumber(!cambiarNumber);
    setMessage(!message)
  }

  const handleChangeNumberMessage = (valor) => {

    if (valor !== phonePotosi) {
      setPhonePotosi(valor);
    }

    if (isInPotosi === false) {
      if (valor !== phoneOthers) {
        setPhoneOthers(valor);
      }
    }
  };

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
    }

    if (othersMessage.length) {
      othersMessage1 = othersMessage[0].textContent
      othersMessage2 = othersMessage[1].textContent
      messageCopy = `${othersMessage1} \n \n${othersMessage2}`
    }

    navigator.clipboard.writeText(messageCopy)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Copiado",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        alert('Error al copiar al portapapeles: ', err);
      });
  }

  const handleReset = () => {
    setCursosFiltrados([]);
    setCursosSeleccionados([]);

    cursosData.forEach(curso => {
      curso.add = false;
    })
  }

  const handleClosedModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <h1 className="text-5xl text-center mt-10 uppercase mb-10">
        seleccione una opcion
      </h1>

      <div className="mt-7 flex justify-center gap-4">
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
            className="mt-5 text-center text-gray-500 hover:text-gray-950 cursor-pointer max-w-sm mx-auto"
            onClick={handleChangeNumber}
          >{message ? '¿Quieres cambiar el numero?' : 'Cerrar'}</p>

          {
            cambiarNumber &&
            <div className="flex flex-col items-center justify-center mt-5">
              <select
                className="p-2 border rounded focus:outline-none focus:border-gray-500 appearance-none transition w-52"
                onChange={(e) => handleChangeNumberMessage(e.target.value)}
                defaultValue="-- Seleccione --"
              >
                <option className="text-center" disabled>-- Seleccione --</option>
                <option value={'LIC. CARLA VARGAS 69616052'}>Lic. Carla</option>
                <option value={'ATENCION AL CLIENTE 68413858'}>Atencion al Cliente</option>
              </select>
            </div>
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
                      <p className="bg-lime-500 potosi py-2 px-2 text-justify">
                        NOSOTROS TE OFRECEMOS LOS CURSOS SOLICITADOS POR LA
                        INSTITUCION RESALTADOS EN COLOR VERDE, ADQUIERELOS YA MISMO Y
                        FORTALECE TU POSTULACION, VISITA NUESTRAS OFICINAS UBICADAS EN
                        CALLE LIDIO USTAREZ ESQUINA ARGOTE CIUDAD DE POTOSI O ESCRIBENOS
                        VIA WHATSAPP - {`${phonePotosi}`} – PRECIO PROMOCIONAL
                        DE {`${precio} BS`}. {`${cursosSeleccionados.length === 1 ? 'POR EL CURSO' : `POR LOS ${cursosSeleccionados.length} CURSOS`}`} (
                        {cursosSeleccionados.map((curso, index) => (
                          index === cursosSeleccionados.length - 1 ? `${curso.nombre}` : `${curso.nombre}, `
                        ))})
                        RECUERDA QUE PUEDES CAPACITARTE GRATIS LAS 24 HORAS EN www.quimerasbolivia.com Y SOLO DEBES HACER LA INVERSION EN CASO DE QUE REQUIERAS LOS CERTIFICADOS Y MATERIAL EXTRA DE CAPACITACION,
                        PUES NOSOTROS NUNCA COBRAMOS POR APRENDER
                      </p>
                      <p
                        className="mt-5 bg-yellow-400 potosi py-2 px-2 text-justify"
                      >OJO QUE NO TENEMOS NADA QUE VER CON LA INSTITUCION, SOLO LES OFRECEMOS LOS CURSOS SOLICITADOS PARA FORTALECER SUS POSTULACIONES</p>
                    </>
                  ) : (
                    <>
                      <p className="bg-lime-500 others py-2 px-2 text-justify">NOSOTROS TE OFRECEMOS LOS CURSOS SOLICITADOS POR LA
                        INSTITUCION RESALTADOS EN COLOR VERDE, ADQUIERELOS YA MISMO Y
                        FORTALECE TU POSTULACION, ESCRIBENOS VIA WHATSAPP - {`${phoneOthers}`} – PRECIO PROMOCIONAL DE {`${precio} BS`}. {`${cursosSeleccionados.length === 1 ? 'POR EL CURSO' : `POR LOS ${cursosSeleccionados.length} CURSOS`}`} ({cursosSeleccionados.map((curso, index) => (
                          index === cursosSeleccionados.length - 1 ? `${curso.nombre}` : `${curso.nombre}, `
                        ))})
                        RECUERDA QUE PUEDES CAPACITARTE GRATIS LAS 24 HORAS EN www.quimerasbolivia.com Y SOLO DEBES HACER LA INVERSION EN CASO DE QUE REQUIERAS LOS CERTIFICADOS Y MATERIAL EXTRA DE CAPACITACION,
                        PUES NOSOTROS NUNCA COBRAMOS POR APRENDER
                      </p>

                      <p
                        className="mt-5 bg-yellow-400 others first:py-2 px-2 text-justify"
                      >OJO QUE NO TENEMOS NADA QUE VER CON LA INSTITUCION, SOLO LES OFRECEMOS LOS CURSOS SOLICITADOS PARA FORTALECER SUS POSTULACIONES</p>

                      <p
                        className="mt-5 bg-yellow-400 others first:py-2 px-2 text-justify"
                      >⚠ ADVERTENCIA: INFORMAMOS QUE PERSONAS INESCRUPULOSAS ESTAN UTILIZANDO REDES SOCIALES, ADEMAS DE NUESTROS COMUNICADOS PARA SUPLANTAR A NUESTROS AGENTES DE VENTA Y REALIZAR ESTAFAS, POR ELLO LES COMUNICAMOS QUE LOS UNICOS NUMEROS DE CONTANTO DE LA CONSULTORA MULTIDISCIPLINARIA QUIMERAS -ICARUS CONSULTORES SON: 69616052 / 68413858 / 72433016</p>
                    </>
                  )}

                  <div className="flex justify-center gap-6">
                    <button
                      className="bg-indigo-700 text-white uppercase font-bold py-2 px-2 rounded-md mt-5  hover:bg-indigo w-44"
                      onClick={handleCopyClick}
                    >Copiar Mensaje</button>

                    <button
                      className="bg-indigo-700 text-white uppercase font-bold py-2 px-2 rounded-md mt-5  hover:bg-indigo w-44"
                      onClick={() => setIsOpen(true)}
                    >Ver Resumen</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-indigo-700 text-white uppercase font-bold py-2 px-2 mt-5 rounded-md mx-auto hover:bg-indigo w-44"
                onClick={handleReset}
              >Restablecer</button>
            </div>
          </div>

          {isOpen &&
            <Modal
              handleClosedModal={handleClosedModal}
              cursosSeleccionados={cursosSeleccionados}
              precio={precio}
            />
          }

          <div className="text-center py-3 text-gray-600">
            <p>Copyright {new Date().getFullYear()} &#169; Consultora Multidisciplinaria Quimeras - Icarus Consultores - Cel: 69616052</p>
            <p>Desarrollado por: Ing. Joel Llanos Puita - Cel: 72549764</p>
          </div>
        </>
      )}
    </>
  );
}

export default App;
