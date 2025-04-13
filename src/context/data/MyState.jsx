import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, Timestamp, updateDoc } from 'firebase/firestore';
import { firedb } from '../../firebase/FirebaseConfig';
import ProductCart from '../../component/ProductCart/ProductCart';

const MyState = (props) => {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';

        }
    }  
    const [loading,setLoading]=useState(false)

    const [products,setProducts]=useState({
        title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
    })
    const addProduct=async()=>{
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error('Please fill all fields')
          }
          const productRef=collection(firedb,'products')
          setLoading(true)
          try {
            await addDoc(productRef,products)
            toast.success("AddProduct Succesfully")
            setTimeout(() => {
                window.location.href='/dashboard'
            }, 800);
            getProducts()
            closeModel()
            setLoading(false)
            
          } catch (error) {
            console.log(error)
            setLoading(false)
          }
          setProducts("")
    }

    const editHandler=async(item)=>{
        setProducts(item)
    }

    const updateProduct=async(item)=>{
        try {
            setLoading(true)
            const productRef=doc(firedb,'products',item.id)
            await updateDoc(productRef,products)
            toast.success("UpdateProduct Succesfully")
            setTimeout(() => {
                window.location.href='/dashboard'
            }, 800);
            getProducts();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [product,setProduct]=useState([])
    /**get product */
    const getProducts=async()=>{
        setLoading(true)
        try {
            const q=query(
                collection(firedb,'products'),
                orderBy('time')
            );
            const data=onSnapshot(q, (QuerySnapshot)=>{
                setProduct(QuerySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
            });
            setLoading(false)
            return ()=>data;
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const deleteProduct=async(item)=>{
        try {
            setLoading(true)
            const productRef=doc(firedb,'products',item.id)
            await deleteDoc(productRef)
            toast.success("Delete Product Succesfully")
            setLoading(false)
            getProducts()


        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [order,setOrder]=useState([])
    const getOrder=async()=>{
        try {
            setLoading(true)
            const result=getDoc(collection(firedb,'order'))
            const orderArray=[];
            result.forEach((doc)=>{
                orderArray.push(doc.data())
                })
                setOrder(orderArray)
                setLoading(false)
            
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [user,setUser]=useState([])
    const getUser=async()=>{
        setLoading(true)
        try {
            
            const result=await getDocs(collection(firedb,'users'))
            const userArray=[];
            result.forEach((doc)=>{
                userArray.push(doc.data())
                setLoading(false)
                })
                setUser(userArray)
                console.log("userArray",userArray)
                setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    console.log("users from fire db",user)

    useEffect(()=>{
        getProducts();
        getOrder();
        getUser();
    },[])

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
    <MyContext value={{mode,toggleMode,loading,setLoading,products,setProducts,addProduct,product,deleteProduct,editHandler,updateProduct,order,user,searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice}}>
    {props.children}
    </MyContext>
  )
}

export default MyState
