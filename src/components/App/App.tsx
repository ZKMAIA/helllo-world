import React, { useState } from 'react';
import Swal from 'sweetalert2'
import './App.css';
import Header from '../Header';
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table'
import Products, { Product } from '../../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from '../Products/ProductForm';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Produto' },
  { key: 'price', value: 'Preço', right: true },
  { key: 'stock', value: 'Disponível', right: true },
]

function App() {
  const [products, setProducts] = useState(Products)
  const [updatingProduct, setUpdatingProduc] = useState<Product | undefined>(products[0])
  
  const handleProductSubmit = (product: ProductCreator) => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...product
      }
    ])
  }

  const handleProductUpdate = (newProduct: Product) => {
    console.log(newProduct)
    setProducts(products.map(product => 
      product.id === newProduct.id 
        ? newProduct
        : product
    ))

    setUpdatingProduc(undefined)
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

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
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
        deleteProduct(product.id)
        Swal.fire(
          'Exclído!',
          'Seu rpoduto foi excluído com sucesso.',
          'success'
        )
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
