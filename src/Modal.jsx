import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const Modal = ({ handleClosedModal, cursosSeleccionados, precio }) => {

	const [options, setOptions] = useState(false);
	const [nacionales, setNacionales] = useState(false);
	const [locales, setLocales] = useState(false);

	const hancleOptions = () => {
		setOptions(true);
	}

	const handleNacionales = () => {
		setNacionales(true);
		setLocales(false);
	}

	const handleLocales = () => {
		setLocales(true);
		setNacionales(false);
	}

	const handleCopyClick = () => {
		const messageAll = document.querySelectorAll('.mensaje')
		let messageFind = '';

		if (messageAll.length) {
			messageAll.forEach((message) => {
				messageFind += `${message.textContent} \n\n`;
			});

			navigator.clipboard.writeText(messageFind)
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
	}


	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
			<button
				className="absolute top-3 mt-5 mr-5 right-3 text-gray-600 hover:text-gray-800 rounded-full bg-white py-2 px-3"
				onClick={() => handleClosedModal()}
			>
				<FontAwesomeIcon icon={faTimes} size="2x" />
			</button>
			<div className={`bg-white text-center p-5 rounded items-center gap-5 min-w-96 max-w-3xl ${cursosSeleccionados.length <= 10 ? 'm-h-auto':'h-3/4'} overflow-auto`}>
				<h1 className='uppercase text-xl font-bold'>Resumen</h1>
				{
					cursosSeleccionados.length ?
						<>
							<p
								className='text-center text-gray-500 hover:text-gray-950 cursor-pointer max-w-sm mx-auto my-3'
								onClick={hancleOptions}
							>¿Quieres Seleccionar algunas opciones ?</p>
							{options &&
								<>
									<div className='flex justify-center gap-4 mb-2'>
										<p
											className='text-gray-600 hover:text-gray-800 transition-colors cursor-pointer'
											onClick={handleNacionales}
										>Nacionales</p>

										<p
											className='text-gray-600 hover:text-gray-800 transition-colors cursor-pointer'
											onClick={handleLocales}
										>Locales</p>
									</div>
								</>
							}
							<hr className="w-full border-t-2 border-gray-400 mb-3" />

							<div>
								{cursosSeleccionados.map((curso, index) => (
									<div key={curso.id}>
										<p className='mensaje text-left'>{`${index + 1}. ${curso.nombre}`}</p>
										<br />
									</div>
								))}

								<p className='mensaje text-left'>✅ **PRECIO PROMOCIONAL DE {precio} BS POR {cursosSeleccionados.length === 1 ? 'UN CURSO**' : `LOS ${cursosSeleccionados.length} CURSOS**`}</p>
								<br />
								{nacionales &&
									<p className='mensaje text-left'>✅ INFO DE LOS CURSOS: 69616052 LIC. CARLA VARGAS O DALE CLICK AQUÍ: https://wa.link/1kai2e</p>
								}

								{locales &&
									<p className='mensaje text-left'>✅ INFO DE LOS CURSOS: 68413858 ATENCION AL CLIENTE CONSULTORA MULTIDISCIPLINARIA QUIMERAS – ICARUS CONSULTORES O DALE CLICK AQUÍ: https://wa.link/jmp0kx </p>
								}
							</div>
							<button
								className='bg-indigo-700 uppercase text-white p-3 hover:bg-indigo-800 transition-colors w-60 rounded-md my-4 mt-6'
								onClick={handleCopyClick}
							>Copiar</button>

						</>
						:
						<p>La lista esta vacia</p>
				}
			</div>
		</div>
	)
}

export default Modal
