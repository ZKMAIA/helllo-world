import React, { useEffect, useState } from 'react';
import Table, { TableHeader } from '../../shared/Table';
import { Product } from '../../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from './ProductForm';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import * as ProductsAction from '../../redux/Products/Products.actions';
import { RootState, ThunkDispatch } from '../../redux';

const headers: TableHeader[] = [
    { key: 'id', value: '#' },
    { key: 'name', value: 'Produto' },
    { key: 'price', value: 'Preço', right: true },
    { key: 'stock', value: 'Disponível', right: true },
  ]
 
declare interface ProductsCRUDProps {
  products: Product[]
}

  const ProductsCRUD: React.FC<ProductsCRUDProps>  = (props) => {
    const dispatch:ThunkDispatch = useDispatch()

    const showErrorAlert =
      (err: Error) => Swal.fire('Oops!', err.message, 'error')

    const [updatingProduct, setUpdatingProduc] = useState<Product | undefined>(undefined)

    async function fetchData() {
      console.log("fetchdata")
      dispatch(ProductsAction.getProducts())
        .catch(showErrorAlert)
      }

      useEffect(() => {
        fetchData()
      }, [])
  
      const handleProductSubmit = async (product: ProductCreator) => {
      dispatch(ProductsAction.insertNewProduct(product))
      .catch(showErrorAlert)
    }

    const handleProductUpdate = async (newProduct: Product) => {
      dispatch(ProductsAction.updateProduct(newProduct))
        .then(() => setUpdatingProduc(undefined))
        .catch(showErrorAlert)
    }

    const deleteProduct = async (id: string) => {
      dispatch(ProductsAction.deleteProduct(id))
        .then(() => {
          Swal.fire('Uhul!', 'Produto excluído com sucesso', 'success')
        })
        .catch(showErrorAlert)
      }

const handleProducDelete = (product: Product) => {
  Swal
    .fire({
      title: 'Você tem certeza?',
      text: 'Você não conseguirá reverter isto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sim, exclua ${product.name}!`
    })
    .then(( { value }) => value && deleteProduct(product._id))
      }

const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Detalhes do produto',
      `${product.name} custa ${product.price}. Temos ${product.stock} disponíveis no estoque.`,
      'info'
    )
  }

  return <>
        <Table
          headers={headers} 
          data={props.products}
          enableActions
          onDelete={handleProducDelete}
          onDetail={handleProductDetail}
          onEdit={setUpdatingProduc}
        />

        <ProductForm 
          form={updatingProduct}
          onSubmit={handleProductSubmit}
          onUpdate={handleProductUpdate}
        />
    </>
}

const mapStateToProps = (state: RootState) => ({
    products: state.products
})

export default connect(mapStateToProps)(ProductsCRUD)