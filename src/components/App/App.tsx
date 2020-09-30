import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import './App.css';
import Header from '../Header';
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table'
import ProductForm, { ProductCreator } from '../Products/ProductForm';
import { 
  getAllProducts, 
  createSingleProduct, 
  updateSingleProduct, deleteSingleProduct } from '../../services/Products.service';
import { Product } from '../../shared/Table/Table.mockdata';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Produto' },
  { key: 'price', value: 'Preço', right: true },
  { key: 'stock', value: 'Disponível', right: true },
]

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [updatingProduct, setUpdatingProduc] = useState<Product | undefined>(undefined)

  async function fetchData() {
    const _products = await getAllProducts()
    setProducts(_products);
  }

useEffect(() => {
        fetchData()
  }, [])
  
  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await createSingleProduct(product)
      fetchData()
    } catch (err) {
      Swal.fire('Oops!', err.message, 'error')
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      await updateSingleProduct(newProduct)

    setUpdatingProduc(undefined)
    fetchData()
  } catch (err) {
    Swal.fire('Oops!', err.message, 'error')
  }
}

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Detalhes do produto',
      `${product.name} custa ${product.price}. Temos ${product.stock} disponíveis no estoque.`,
      'info'
    )
  }

  const handleProducEdit = (product: Product) => {
    setUpdatingProduc(product)
  }

  const deleteProduct = async (id: string) => {
    try {
      await deleteSingleProduct(id)
      Swal.fire('Uhul!', 'Produto excluído com sucesso', 'success')
      fetchData()
    } catch (err) {
    Swal.fire('Oops!', err.message, 'error')
    }
  }

  const handleProducDelete = (product: Product) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não conseguirá reverter isto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sim, exclua ${product.name}!`
    }).then((result) => {
      if (result.value) {
        deleteProduct(product._id)
      }
    })
 }

  return (
    <div className="App">
      <Header title="AlgaStock"/>

      <Container>
        <Table
          headers={headers} 
          data={products}
          enableActions
          onDelete={handleProducDelete}
          onDetail={handleProductDetail}
          onEdit={handleProducEdit}
        />
        <ProductForm 
          form={updatingProduct}
          onSubmit={handleProductSubmit}
          onUpdate={handleProductUpdate}
        />
      </Container>
    </div>
  );
}

export default App;
