import { useEffect, useState } from "react";
import cursosData from "./data ";

function App() {
  const [isInPotosi, setIsInPotosi] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [precio, setPrecio] = useState(0);

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
        setPrecio( nuevoPrecio );
      }

      
    });
    if( cursosSeleccionados.length === 0 ) {
      setPrecio(0)
    }
  }, [cursosSeleccionados, precio, cursosFiltrados]);

  const handleSeletPotosi = () => {
    setIsInPotosi(true);
    setIsSelect(true);
  };

  const handleSelectOther = () => {
    setIsInPotosi(false);
    setIsSelect(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.replace(/\s/g, '').toLowerCase();
    setSearchTerm(term);

    const filteredCursos = cursosData.filter((curso) => {
      return curso.nombre.replace(/\s/g, '').toLowerCase().includes(term);
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
  };

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

          {cursosFiltrados.length > 0 && (
            <div className="max-w-md mx-auto mt-8">
              <ul className="divide-y divide-gray-300">
                {cursosFiltrados.map((curso) => (
                  <li
                    className={`py-2 px-2 cursor-pointer ${curso.add === true ? 'bg-green-200' : 'bg-neutral-300'}`}
                    key={curso.id}
                    onClick={() => handleCursoClick(curso)} > {curso.nombre}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-center mt-10">
            <div className="max-w-xl rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                {isInPotosi ? (
                  <>
                    <p> 
                      NOSOTROS TE OFRECEMOS LOS CURSOS SOLICITADOS POR LA
                      INSTITUCION RESALTADOS EN COLOR VERDE, ADQUIERELOS YA MISMO Y
                      FORTALECE TU POSTULACION, VISITA NUESTRAS OFICINAS UBICADAS EN
                      CALLE LIDIO USTAREZ ESQUINA ARGOTE CIUDAD DE POTOSI O ESCRIBENOS
                      VIA WHATSAPP ATENCION AL CLIENTE N°.68413858 – PRECIO PROMOCIONAL
                      DE {`${precio} BS`}. {`${cursosSeleccionados.length === 1 ? 'POR EL CURSO' : `POR LOS ${cursosSeleccionados.length} CURSOS`}`} ({cursosSeleccionados.map(curso => `${curso.av}, `)})</p>
                    <p
                      className="mt-5"
                    >OJO QUE NO TENEMOS NADA QUE VER CON LA INSTITUCION, SOLO LES OFRECEMOS LOS CURSOS SOLICITADOS PARA FORTALECER SUS POSTULACIONES</p>

                  </>
                ) : (
                  <>
                    <p>NOSOTROS TE OFRECEMOS LOS CURSOS SOLICITADOS POR LA
                      INSTITUCION RESALTADOS EN COLOR VERDE, ADQUIERELOS YA MISMO Y
                      FORTALECE TU POSTULACION, ESCRIBENOS VIA WHATSAPP ATENCION AL
                      CLIENTE N°.68413858 – PRECIO PROMOCIONAL DE {`${precio} BS`}. {`${cursosSeleccionados.length === 1 ? 'POR EL CURSO' : `POR LOS ${cursosSeleccionados.length} CURSOS`}`} ({cursosSeleccionados.map(curso => `${curso.av}, `)})</p>
                    <p
                      className="mt-5"
                    >OJO QUE NO TENEMOS NADA QUE VER CON LA INSTITUCION, SOLO LES OFRECEMOS LOS CURSOS SOLICITADOS PARA FORTALECER SUS POSTULACIONES</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;

// <div className="flex justify-center mt-10">
//   <input
//     className="shadow appearance-none border rounded w-2/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//     type="text"
//     placeholder="Buscar Cursos"
//   />
// </div>

// <div className="flex justify-center mt-10">
//   <div className="max-w-sm rounded overflow-hidden shadow-lg">
//     <div className="px-6 py-4">
//       {isInPotosi ? (
//         <p>Potos zdasdfasdfasdf i</p>
//       ) : (
//         <p>para otras ciudades</p>
//       )}
//     </div>
//   </div>
// </div>

{/* <div className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline select-nombre"
                      onClick={ () => handleClickCurso( curso.id ) }
                    >
                      {curso.nombre}
                      
                    </div>
                    <div
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={ () => handleEliminarCurso(curso.id)} 
                    >
                      X
                    </div> */}


//                     <li className="flex justify-between items-center border-b border-gray-300 py-2">
//   <span
//     className={`self-center ${todo.done ? 'line-through' : ''}`}
//     onClick={() => onToggleTodo(todo.id)}
//   >
//     {description}
//   </span>

//   <button
//     className="bg-red-500 text-white px-3 py-1 rounded"
//     onClick={() => onDeleteTodo(todo.id)}
//   >
//     Borrar
//   </button>
// </li>