import React, { useContext } from 'react'
import Layout from '../../component/layout/Layout'

import myContext from '../../context/data/myContext'
import Herosection from '../../component/Herosection/Herosection'
import Filter from '../../component/filter/Filter'
import ProductCart from '../../component/ProductCart/ProductCart'
import Track from '../../component/TrackProduct/Track'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeProduct } from '../../redux/createSlice'

const Home = () => {
    const context=useContext(myContext)
    console.log(context);
    const dispatch=useDispatch();

    const Item=useSelector((state)=>state.cart)
    console.log(Item);
    // function addCart(){
    //   dispatch(addProduct("shirt"))
    // }
    // function deletefromcart(){
    //   dispatch(removeProduct("shirt"))
    // }
  return (
    <div>
      <Layout>
      
        <Herosection/>
        <Filter/>
        <ProductCart/>
        <Track/>
      </Layout>
    </div>
  )
}

export default Home
