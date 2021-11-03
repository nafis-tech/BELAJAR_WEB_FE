import React from 'react'
import Axios from 'axios'
// import { Link } from 'react-router-dom'

class SoalTugas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            soalTugas: []

        }
        Axios.get(`http://localhost:2000/admin/soal-tugas`)
            .then(res => {
                console.log(res.data)
                this.setState({ soalTugas: res.data })
            })
            .catch(err => {
                console.log(err + 'Eror get soal tugas')
            })

    }

    render() {
        return (
            <div>
                <h1>Soal Tugas</h1>
            </div>
        )
    }
}

export default SoalTugas;