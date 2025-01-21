const socket = io();

socket.on('refreshRegistrar', () => {
    location.reload();
});

socket.on('refreshDelete', () => {
    location.reload();
});

function registerProduct() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const code = document.getElementById("code").value;
    const category = document.getElementById("category").value;

    if (!title || !description || !price || !stock || !code || !category) {
        Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
        return;
    }

    const productData = {
        title,
        description,
        price,
        stock,
        code,
        category,
    };

    axios.post('http://localhost:8080/api/products/', productData)
        .then(response => {
            socket.emit('accionRegistrarRealizada');
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error!', 'No se pudo registrar el producto.', 'error');
        });
}

function deleteProduct(productId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/api/products/${productId}`)
                .then(response => {
                    socket.emit('accionEliminarRealizada');
                })
                .catch(error => {
                    console.error('Error al eliminar el producto:', error);
                    Swal.fire('Error!', 'No se pudo eliminar el producto.', 'error');
                });
        }
    });
}