import React, { useEffect, useState } from 'react';
import Table, { TableHeader } from '../../shared/Table';
import { 
  deleteSingleProduct, 
  updateSingleProduct 
} from '../../services/Products.service';
import { Product } from '../../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from './ProductForm';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import { getProducts, insertNewProduct } from '../../redux/Products/Products.actions';

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
    const dispatch = useDispatch()
  // const [products, setProducts] = useState<Product[]>([])
  const [updatingProduct, setUpdatingProduc] = useState<Product | undefined>(undefined)

   async function fetchData() {
     try {
      await dispatch(getProducts())
      Swal.fire('Uhu!', 'Fetch done', 'success')
    } catch (err) {
      Swal.fire('Oops!', err.message, 'error')
    }
   }

useEffect(() => {
        fetchData()
  }, [])
  
  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      dispatch(insertNewProduct(product))
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
    .then((result) => {
      if (result.value) {
        deleteProduct(product._id)
      }
  })
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

 return <>
        <Table
          headers={headers} 
          data={props.products}
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
    </>
}

const mapStateToProps = (state: any) => ({
    products: state.products
})

export default connect(mapStateToProps)(ProductsCRUD)