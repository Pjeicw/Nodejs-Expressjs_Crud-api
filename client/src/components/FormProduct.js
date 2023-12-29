//rafce
import React, { useState, useEffect } from "react";
import axios from 'axios'

import { Link } from "react-router-dom";
import { remove, create, getdata } from "../functions/product";


const FormProduct = () => {
    // javascript
    const [data, setData] = useState([])
    const [form, setForm] = useState({})

    useEffect(() => {
        //code
        loadData()

    }, [])

    // get data from database
    const loadData = async () => {
        // await axios.get(process.env.REACT_APP_API + '/product')
        getdata()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }
    // console.log(data)

    // save variable ...form = copy
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }
    // console.log(form)

    // save data to database  // console.log(form)
    const handleSubmit = async (e) => {
        e.preventDefault()
        // await axios.post(process.env.REACT_APP_API + '/product', form)
        create(form)
            .then(res => {
                console.log(res, data)
                loadData()
            })
            .catch((err) => console.log(err))
    }


    // Delete data
    const handleRemove = async (id) => {
        // console.log(id)
        // await axios.delete(process.env.REACT_APP_API + '/product/' + id)
        remove(id)
            .then((res) => {
                console.log(res)
                loadData()
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            {/* HTML */}

            FormProduct
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    onChange={e => handleChange(e)}
                    placeholder='name'
                /> <br />
                <input
                    type='text'
                    name='detail'
                    placeholder='detail'
                    onChange={e => handleChange(e)}
                /> <br />
                <input
                    type='text'
                    name='price'
                    placeholder='price'
                    onChange={e => handleChange(e)}
                /> <br />
                <button>Submit</button>

            </form>

            <table class="table">
                <thead>
                    <tr>
                        <th color="Orchid" scope="col">#</th>
                        <th color="Orchid" scope="col">name</th>
                        <th color="Orchid" scope="col">detail</th>
                        <th color="Orchid" scope="col">price</th>
                        <th color="Orchid" scope="col">action</th>
                        <th color="Orchid" scope="col">edit</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data ? data.map((item, index) =>

                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.detail}</td>
                                <td>{item.price}</td>

                                <td onClick={() => handleRemove(item._id)}>
                                    <Link color="red">
                                        Delete
                                    </Link>
                                </td>
                                <td>
                                    <Link to={'/edit/' + item._id}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        )
                            : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FormProduct