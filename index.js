document.addEventListener('DOMContentLoaded', function () {
    let commentCount = 1; // Variable para llevar el conteo de los comentarios agregados

    function agregarComentario() {
      // Obtener los valores del formulario
      const gameName = document.getElementById('gameName').value;
      const gameDate = document.getElementById('gameDate').value;
      const gameSynopsis = document.getElementById('gameSynopsis').value;

      // Verificar si los campos están llenos
      if (gameName.trim() === '' || gameDate.trim() === '' || gameSynopsis.trim() === '') {
        alert('Por favor, llene todos los campos para agregar un comentario.');
        return;
      }

      // Crear un nuevo elemento de comentario
      const newComment = document.createElement('div');
      newComment.innerHTML = `
        <p>${gameName} - ${gameDate}</p>
        <p>${gameSynopsis}</p>
        <div class="mt-3 d-flex justify-content-end">
            <button type="button" class="btn btn-primary edit-button">Editar</button>
            <button type="button" class="btn btn-danger delete-button">Eliminar</button>
        </div>
      `;

      // Asignar un ID único al comentario
      newComment.setAttribute('id', `comment${commentCount}`);
      commentCount++; // Incrementar el contador de comentarios

      // Agregar el comentario al contenedor
      document.getElementById('post').appendChild(newComment);

      // Agregar eventos click a los botones
      const editButton = newComment.querySelector('.edit-button');
      const deleteButton = newComment.querySelector('.delete-button');

      editButton.addEventListener('click', function () {
        editpost(commentCount - 1);
      });

      deleteButton.addEventListener('click', function () {
        deletepost(commentCount - 1);
      });
    }

    let editpost = (postId) => {
      const post = document.getElementById(`comment${postId}`);
      const commentParagraphs = post.querySelectorAll('p');
      const gameName = commentParagraphs[0].innerText.split(' - ')[0];
      const gameDate = commentParagraphs[0].innerText.split(' - ')[1];
      const gameSynopsis = commentParagraphs[1].innerText;

      // Crear el contenido del formulario de edición en la ventana modal
      const editForm = `
      <div class="modal-container">
        <div class="modal-content">
          <h3>Editar Videojuego</h3>
          <div class="row mt-3">
            <div class="col-12 col-md-6">
              <label>Nombre del Videojuego</label>
              <input type="text" class="form-control" id="editGameName" value="${gameName}">
            </div>
            <div class="col-12 col-md-6">
              <label>Fecha de lanzamiento</label>
              <input type="date" class="form-control" id="editGameDate" value="${gameDate}" required>
            </div>
            <div class="col-12 mt-3">
              <label>Escribe la sinopsis del Videojuego</label>
              <textarea class="form-control" cols="30" rows="5" id="editGameSynopsis">${gameSynopsis}</textarea>
            </div>
            <div class="mt-3 d-flex justify-content-end">
              <button type="button" class="btn btn-success save-button">Guardar</button>
            </div>
          </div>
        </div>
      </div>
      `;

      // Insertar el formulario de edición en el cuerpo del documento
      document.body.insertAdjacentHTML('beforeend', editForm);

      // Mostrar la ventana modal
      const modalContainer = document.querySelector('.modal-container');
      modalContainer.style.display = 'flex';

      const saveButton = document.querySelector('.save-button');

      saveButton.addEventListener('click', function () {
        savepost(postId);
      });
    }

    let savepost = (postId) => {
      const post = document.getElementById(`comment${postId}`);
      const editForm = document.querySelector('.modal-container');
      const gameName = document.getElementById('editGameName').value;
      const gameDate = document.getElementById('editGameDate').value;
      const gameSynopsis = document.getElementById('editGameSynopsis').value;

      // Verificar si los campos del formulario de edición están llenos
      if (gameName.trim() === '' || gameDate.trim() === '' || gameSynopsis.trim() === '') {
        alert('Por favor, llene todos los campos para guardar los cambios.');
        return;
      }

      // Crear un nuevo contenido con los valores editados
      const newContent = `
        <p>${gameName} - ${gameDate}</p>
        <p>${gameSynopsis}</p>
        <div class="mt-3 d-flex justify-content-end">
          <button type="button" class="btn btn-primary edit-button">Editar</button>
          <button type="button" class="btn btn-danger delete-button">Eliminar</button>
        </div>
      `;

      // Reemplazar el contenido original del comentario con el nuevo contenido
      post.innerHTML = newContent;

      // Ocultar la ventana modal
      editForm.style.display = 'none';

      // Volver a agregar eventos click a los botones
      const editButton = post.querySelector('.edit-button');
      const deleteButton = post.querySelector('.delete-button');

      editButton.addEventListener('click', function () {
        editpost(postId);
      });

      deleteButton.addEventListener('click', function () {
        deletepost(postId);
      });
    }

    let deletepost = (postId) => {
      const postContainer = document.getElementById('post');
      const post = document.getElementById(`comment${postId}`);

      // Mostrar una alerta de confirmación al usuario
      const userConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este comentario?');

      // Si el usuario hace clic en "Aceptar", se eliminará el comentario
      if (userConfirmed) {
        postContainer.removeChild(post);
      }
    }

    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function () {
      agregarComentario();
    });

  });