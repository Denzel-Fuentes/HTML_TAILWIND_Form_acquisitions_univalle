const http = require('http');

http.createServer((req, res) => {
  if (req.method === 'GET') {
    let proveedor = req.headers['proveedor'];
    console.log('Proveedor:', proveedor);
    proveedor = 3
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = [
        {
          "ID": 1,
          "detalle": "SALICILATO DE METILO x 250gr",
          "unidad": "FRASCO",
          "cantidad": 1
        },
        {
          "ID": 3,
          "detalle": "SALICILATO DE METILO x 350gr",
          "unidad": "FRASCO",
          "cantidad": 10
        },

        {
          "ID": 2,
          "detalle": "SALICILATO DE METILO x 450gr",
          "unidad": "FRASCO",
          "cantidad": 8
        },
      ];

      // Generar contenido HTML dinámico del formulario con Tailwind
      const contenidoHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbLtshqGyd7stG8DYUPmP6ngnmoVM1W5qy_ebObf8MlWoEHkOcF-272kn2Xpbklg0F-EM&usqp=CAU" >

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .hidden {display: none;}
        .image-placeholder {
            height: 150px;
            border: 2px dashed rgb(156 163 175);
            border-radius:12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            background-size: cover;
            background-position: center;
        }
        .highlight-row {background-color: #e0e0e0; /* Morado suave */}
        .logo-container {position: fixed;top: 20px;left: 20px; z-index: 1000;
        }
        .logo {width: 150px;border-radius: 12px;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);}
        body {
  background-image: url('https://arc.net/noise-light.png');
  background-color: #a1364e;
  /* Cubre todo el área disponible */
  background-position: center; /* Centra la imagen en el área disponible */
  background-repeat: repeat; /* Evita que la imagen se repita */
  height: 100vh; /* Opcional: establece la altura del cuerpo para que ocupe toda la ventana visible */
}

    </style>

</head>
<body class=" text-gray-900">
<div class="container mx-auto px-4 flex flex-col lg:flex-row items-center mt-4 lg:mt-8 mb-4 lg:mb-8">
    <img class="logo mb-4 lg:mb-0 lg:mr-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh4769T5B8rMSCwhtdrdJyY8ig2fAZCAH7tg&s" alt="Logo">
    <h1 class="text-3xl text-white font-bold text-center lg:text-left lg:ml-8">Pliego de productos</h1>
</div>

<div class="container mx-auto px-4 rounded-lg shadow-md mb4 pb-5">
    <h5 class="text-xl lg:text-2xl text-white font-semibold text-center lg:text-left ">Complete la información de cada producto o cargue la cotización directamente en la sección inferior</h5>
</div>
        <div class="container mx-auto px-4 pb-10">
        
            <!-- Tabla de productos -->
            <table class="  min-w-full bg-white mb-6  rounded-lg ">
              <thead>
                <tr class="text-left border-b border-gray-300">
                  <th class="p-3">Item</th>
                  <th class="p-3">Producto</th>
                  <th class="p-3">Unidad</th>
                  <th class="p-3">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                ${data.map((detalleObj, index) => `
                  <tr class="table-row ${index === 0 ? 'highlight-row' : ''}">
                    <td class="p-3">${index + 1}</td>
                    <td class="p-3">${detalleObj.detalle}</td>
                    <td class="p-3">${detalleObj.unidad}</td>
                    <td class="p-3">${detalleObj.cantidad}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

  <!-- Contador de producto -->
            <div class="text-center text-white mb-6 text-lg font-bold" id="contador">Producto 1 / ${data.length}</div>

            <!-- Formulario de productos -->
            <form>
            ${data.map((detalleObj, index) => `
              <div class="product-section ${index !== 0 ? 'hidden' : ''}" >
                  <fieldset class="bg-white p-4 mb-6 rounded-lg">
                      <div class="text-left text-xl font-bold mb-4">${detalleObj.detalle}</div>
                      <div class="flex flex-col md:flex-row items-center gap-6">
                          <div class="image-container">
                              <div class="image-placeholder">Imagen (opcional)</div>
                              <div class="mt-2 relative">
                                  <input class="file-input absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" name="imagenProducto_${detalleObj.detalle}" accept="image/*">
                                  <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-purple-700">
                                      Seleccionar Imagen
                                  </button>
                              </div>
                          </div>
                          <div class="w-full md:w-3/4">
                              <div class="mb-4">
                                  <label class="block text-sm font-medium text-gray-700">Precio Unitario</label>
                                  <div class="flex items-center">
                                      <input class="minimal-input input-precio block w-full mt-1 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-600 transition duration-300" 
                                        type="number" step="0.01" name="precioUnitario_${detalleObj.detalle}" 
                                        placeholder="Ingresa el precio unitario" data-cantidad="${detalleObj.cantidad}" 
                                        data-detalle="${detalleObj.detalle}">
                                      <span class="ml-2 text-gray-700">x ${detalleObj.cantidad} ${detalleObj.unidad}</span>
                                      <span class="ml-2 text-gray-700" id="total_${detalleObj.detalle}">= 0.00</span>
                                  </div>
                              </div>
                              <div class="mb-4">
                                  <label class="block text-sm font-medium text-gray-700">Observaciones</label>
                                  <textarea class="minimal-textarea block w-full mt-1 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-600 transition duration-300" name="observaciones_${detalleObj.detalle}" rows="4" placeholder="Añade observaciones (opcional)"></textarea>
                              </div>
                          </div>
                      </div>
                  </fieldset>
              </div>
          `).join('')}
          
              
  <div class="flex justify-between mt-6">
                    <button class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-purple-700" type="button" onclick="previousSection()">Anterior</button>
                    <button class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-purple-700" type="button" onclick="nextSection()">Siguiente</button>
                  
                </div>

                <!-- Tiempo de entrega -->

                <div class="mb-6 bg-white p-4 rounded-lg mt-6">
        <label class="block text-lg font-bold mb-2 text-gray-700" for="tiempoEntrega">Tiempo de Entrega</label>
        <input type="text" id="tiempoEntrega" class="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-purple-600 transition duration-300" placeholder="Ingresa el tiempo de entrega" value="ENTREGA A CONVENIR">
    </div>
                <!-- Campo para cargar archivo -->
                 <div class="mt-8 bg-white p-6 rounded-lg fileUpload">
                    <label class="block  text-lg font-bold mb-2" for="uploadFile">Cargar archivo de cotización (opcional):</label>
                    <input type="file" id="uploadFile" name="uploadFile" class="w-full text-gray-300 bg-gray-400 p-3 rounded-lg cursor-pointer hover:bg-gray-600">
                    <p class="text-sm text-gray-400 mt-2">Puedes cargar un archivo de cotización si prefieres no rellenar el formulario manualmente.</p>
                </div>
                <div class="flex justify-end mt-6">
                    <button class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-purple-700" type="submit">Enviar</button>
                </div>
            </form>
        </div>
    </section>

<script>
      let proveedor = ${proveedor}
      let dadta = ${JSON.stringify(data)}
      let currentSection = 0;
      const totalSections = ${data.length}; // Número total de productos
      let form;

      // Mostrar la sección correspondiente del formulario y resaltar la fila
      function showSection(index) {
        const sections = document.querySelectorAll('.product-section');
        sections.forEach((section, i) => {
          section.classList.toggle('hidden', i !== index);
        });

        // Resaltar la fila correspondiente en la tabla
        const rows = document.querySelectorAll('.table-row');
        rows.forEach((row, i) => {
          row.classList.toggle('highlight-row', i === index);
        });

        // Actualizar el contador de productos
        document.getElementById('contador').textContent = "Producto " + (index + 1) + " / " + totalSections;
      }

      function nextSection() {
        const sections = document.querySelectorAll('.product-section');
        if (currentSection < sections.length - 1) {
          currentSection++;
          showSection(currentSection);
        }
      }

      function previousSection() {
        if (currentSection > 0) {
          currentSection--;
          showSection(currentSection);
        }
      }

      function previewImage(input, placeholder) {
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            placeholder.style.backgroundImage = 'url(' + e.target.result + ')';
          };
          reader.readAsDataURL(input.files[0]);
        }
      }

      // Función para calcular el precio total automáticamente
      function calcularTotal(input, cantidad, totalElement) {
        const precioUnitario = parseFloat(input.value);
        if (!isNaN(precioUnitario)) {
          const total = precioUnitario * cantidad;
          totalElement.textContent = "= " + total.toFixed(2);
        } else {
          totalElement.textContent = "= 0.00";
        }
      }

      // Modificación: Hacer que enviarDatos sea una función asíncrona
      async function enviarDatos() {
          const formSections = document.querySelectorAll('.product-section');
          const datosProductos = [];
        const tiempoEntrega = document.getElementById('tiempoEntrega').value;

          for (let index = 0; index < formSections.length; index++) {
              const section = formSections[index];
              const detalleObj = dadta[index];
              const imagenInput = section.querySelector('input[name="imagenProducto_' + detalleObj.detalle + '"]');
              const precioInput = section.querySelector('input[name="precioUnitario_' + detalleObj.detalle + '"]');
              const observacionesTextarea = section.querySelector('textarea[name="observaciones_' + detalleObj.detalle + '"]');
              
              let imagenData = '';
              if (imagenInput.files.length > 0) {
                  const file = imagenInput.files[0];
                  imagenData = await readFileAsDataURL(file);
              }

              datosProductos.push({
                  "ID": detalleObj.ID,
                  "detalle": detalleObj.detalle,
                  "unidad": detalleObj.unidad,
                  "cantidad": detalleObj.cantidad,
                  "imagen": imagenData,
                  "observaciones": observacionesTextarea.value,
                  "precio": parseFloat(precioInput.value) || 0,
                  "total": (parseFloat(precioInput.value) || 0) * detalleObj.cantidad
              });
          }

          // Manejar el archivo de cotización opcional
          const fileUploadInput = document.querySelector('#uploadFile');
          const file = fileUploadInput && fileUploadInput.files[0];
          let fileContent = '';
          let fileName = null;

          if (file) {
              fileName = file.name;
              fileContent = await readFileAsDataURL(file);
          }

          const response = {
              "proveedor": proveedor, // Asegúrate de que 'proveedor' esté definido
              "productos": datosProductos,
              "file": fileName,
              "tiempo_entrega":tiempoEntrega,
              "fileContent": fileContent // Asignamos el contenido del archivo aquí directamente
          };
          console.log(response)
          console.log(JSON.stringify(response))
          // Enviar los datos
          //postDatos(response);
      }

      // Función auxiliar para leer archivos como Data URL (base64)
      function readFileAsDataURL(file) {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(file);
          });
      }

      function postDatos(datosProductos) {
          console.log(datosProductos); // Puedes ver cómo queda el JSON final antes de enviar

          fetch('https://prod-93.westus.logic.azure.com:443/workflows/d7335d6eda554f328e5d52e9b6deeb60/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IS5ygImFKGtkDr6J4p8r0qJMarw5L1y_FXgEiplN9ow', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(datosProductos)
          })
          .then(response => response.json())
          .then(data => {
              console.log('Respuesta:', data);
              alert('Datos enviados correctamente.');
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Hubo un error al enviar los datos.');
          });
      }

      document.addEventListener('DOMContentLoaded', () => {
          form = document.querySelector('form');
          form.addEventListener('submit', async (event) => { // Modificación: Añadir async
              event.preventDefault();  // Prevenir recarga de página
              await enviarDatos();  // Llamar a la función que envía los datos
          });
          showSection(currentSection); // Mostrar la primera sección
          document.querySelectorAll('.file-input').forEach(input => {
              input.addEventListener('change', (event) => {
                  const placeholder = event.target.closest('.image-container').querySelector('.image-placeholder');
                  previewImage(event.target, placeholder);
              });
          });

          // Escuchar los inputs de precios y calcular el total
          document.querySelectorAll('.input-precio').forEach(input => {
              const cantidad = input.getAttribute('data-cantidad');
              const totalElement = document.getElementById("total_" + input.getAttribute('data-detalle'));
              input.addEventListener('input', (event) => {
                  calcularTotal(input, parseFloat(cantidad), totalElement);
              });
          });
      });
</script>

</body>
</html>
`;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(contenidoHtml);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Método no permitido');
  }
}).listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
