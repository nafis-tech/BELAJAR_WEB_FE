import React from 'react'
import Axios from 'axios'
import {
    Button,
    Table
} from 'react-bootstrap'
// import { Link } from 'react-router-dom'

class ProfileStudents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: [],
            kelas :'',
            nama :''

        }
    }
    studentByid = (fullname) => {
        let name = {
            fullname: 'yoona shi'
        }
        console.log(name)
        Axios.post(`http://localhost:2000/admin/nilai-byname`, name)
            .then(res => {
                console.log(res.data)
                this.setState({ student: res.data })
                this.setState({ nama : res.data[0].fullname })
                this.setState({ kelas: res.data[0].kelas })
            })
            .catch(err => {
                console.log(err + 'Eror data nilai by id')
            })

    }
    componentDidMount() {
        this.studentByid()
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:'column', marginLeft:'10vw',}}>
                <h1>Profile Students</h1>
                <div style={{marginBottom:'5vh'}}>
                    <h4>Nama : {this.state.nama}</h4>
                    <h4>Kelas : {this.state.kelas}</h4>
                </div>
                <div>
                    <h3>Rekap Nilai</h3>
                    <Table striped bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date, Time</th>
                                <th>Materi</th>
                                <th>Nilai Tugas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.student.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}, {item.time}</td>
                                    <td>{item.materi}</td>
                                    <td>{item.nilai_tugas}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>

                </div>
            </div>
        )
    }
}

const styles = {
    table: {
        backgroundColor: 'white',
        marginBottom: '5vh',
        width: '40vw',
    },
}

export default ProfileStudents;