import './App.css';
import { useAddProductsMutation, useGetAllProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from './store/productsApi';
import { useState } from 'react';
import Modal from './store/Modal';

function App() {
  const { data = [] } = useGetAllProductsQuery();
  const [addProduct] = useAddProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const newProduct = {
      title: e.target.title.value,
    };
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, title: newProduct.title });
      setEditingProduct(null);
    } else {
      addProduct(newProduct);
    }
    e.target.reset();
  }

  function handleDelete(id) {
    setEditingProduct(data.find(item => item.id === id));
    setAction('delete');
    setIsModalOpen(true);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setAction('edit');
    setIsModalOpen(true);
  }

  function confirmDelete() {
    if (editingProduct) {
      deleteProduct(editingProduct.id);
    }
    setIsModalOpen(false);
  }

  function confirmEdit(newTitle) {
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, title: newTitle });
    }
    setIsModalOpen(false);
  }

  return (
    <div className='flex flex-col items-center p-5 bg-gradient-to-t from-pink-300 to-pink-400 min-h-screen'>
      <h1 className='text-4xl font-bold text-white mb-4 mt-11'>Products</h1>
      <form onSubmit={handleSubmit} className='mb-5 w-[500px]'>
        <input
          name='title'
          className='p-2 w-full rounded-md border-2 border-white focus:outline-none focus:border-pink-400'
          type="text"
          placeholder={!editingProduct ? 'Add your products...' : ''}
          defaultValue={editingProduct ? editingProduct.title : ''}
        />
        <button className='mt-2 w-[500px] p-2 bg-pink-500 shadow-lg text-white rounded-md hover:bg-pink-400 border-[2px] border-white transition duration-300 ease-in-out'>
          {editingProduct ? 'Yangilash' : 'Add'}
        </button>
      </form>
      <ul className='w-[500px] bg-pink-300 border-[2px] border-white rounded-lg shadow-lg p-5'>
        {data.map(item => (
          <li key={item.id} className='flex justify-between items-center border-b border-gray-200 py-2'>
            <input
              type="text"
              value={item.title}
              readOnly
              className='flex-1 p-2 rounded-md border-2 border-gray-300 bg-blue-50 focus:outline-none focus:border-pink-400 mr-2'
            />
            <div>
              <button
                onClick={() => handleEdit(item)}
                className='bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-md px-4 py-2 mr-2'
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className='bg-red-500 text-white hover:bg-red-600 transition duration-300 rounded-md px-4 py-2'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>


      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={action === 'delete' ? confirmDelete : confirmEdit}
        title={action === 'delete' ? "Are you sure you want to delete this product?" : "Update"}
        initialTitle={editingProduct ? editingProduct.title : ''}
      />
    </div>
  );
}

export default App;