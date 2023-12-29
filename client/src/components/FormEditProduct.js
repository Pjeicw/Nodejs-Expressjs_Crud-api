//rafce
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { read, update } from '../functions/product'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()


    // console.log(params.id)
    const [data, setData] = useState({
        name:'',
        detail:'',
        price:''
    })

    useEffect(() => {
        loadData(params.id)

    }, [])

    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData(res.data)
            })
    }
    // console.log(data)
    // save variable ...form = copy
    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }
    // console.log(form)

    // save data to database  // console.log(form)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        update(params.id, data)
            .then(res => {
                console.log(res, data)
                navigate('/')
               
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            FormEditProduct

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    onChange={e => handleChange(e)}
                    placeholder='name'
                    value={data.name}
                /> <br />
                <input
                    type='text'
                    name='detail'
                    placeholder='detail'
                    onChange={e => handleChange(e)}
                    value={data.detail}
                /> <br />
                <input
                    type='text'
                    name='price'
                    placeholder='price'
                    onChange={e => handleChange(e)}
                    value={data.price}
                /> <br />
                <button>Submit</button>

            </form>

        </div>
    )
}

export default FormEditProduct