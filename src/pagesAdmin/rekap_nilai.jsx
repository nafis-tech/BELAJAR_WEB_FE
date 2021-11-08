import React from 'react'
import {
    Table,
    Button,
    Form
} from 'react-bootstrap'
import Axios from 'axios'
// import { Link } from 'react-router-dom'

class RekapNilai extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nilaiTugas: [],
            nilaiUjian: [],
            page: 1,
            next: '',
            prev: '',
            rekapNilai: ''


        }
    }

    rekapUjian = () => {
        Axios.post(`http://localhost:2000/admin/rekap-ujian`, { page: 1 })
            .then(res => {
                console.log(res.data) //ok
                this.setState({ nilaiUjian: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ next: 'ujian', prev: 'ujian' })
                this.setState({ rekapNilai: 'ujian' })
            })
            .catch(err => {
                console.log(err + 'Eror REKAP NILAI UJIAN')
            })
    }

    rekapTugas = () => {
        Axios.post(`http://localhost:2000/admin/rekap-tugas`, { page: 1 })
            .then(res => {
                console.log(res.data) //ok
                this.setState({ nilaiTugas: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ next: 'tugas', prev: 'tugas' })
                this.setState({ rekapNilai: 'tugas' })
            })
            .catch(err => {
                console.log(err + 'Eror REKAP NILAI TUGAS')
            })
    }

    componentDidMount() {
        this.rekapTugas()
    }

    onNext = () => {
        if (this.state.next === 'tugas') {
            Axios.post(`http://localhost:2000/admin/rekap-tugas`, { page: this.state.page + 1 })
                .then(res => {
                    console.log(res.data)
                    this.setState({ nilaiTugas: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror nextpage')
                })
        } else if (this.state.next === 'ujian') {
            Axios.post(`http://localhost:2000/admin/rekap-ujian`, { page: this.state.page + 1 })
                .then(res => {
                    console.log(res.data)
                    this.setState({ nilaiUjian: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror nextujian')
                })
        }
    }

    onPrev = () => {
        if (this.state.prev === 'tugas') {
            Axios.post(`http://localhost:2000/admin/rekap-tugas`, { page: this.state.page - 1 })
                .then(res => {
                    console.log(res.data)
                    this.setState({ nilaiTugas: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror prev page')
                })
        } else if (this.state.prev === 'ujian') {
            Axios.post(`http://localhost:2000/admin/rekap-ujian`, { page: this.state.page - 1 })
                .then(res => {
                    console.log(res.data)
                    this.setState({ nilaiUjian: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror prev ujian')
                })
        }
    }

    onTable = () => {
        if (this.state.rekapNilai === 'tugas') {
            return (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2vh' }}>
                        <h3 style={{ marginTop: '1vh', marginLeft: '2vw' }}>Rekap Nilai Tugas</h3>
                        <div style={styles.divForm}>
                            <Form.Control style={styles.filterForm} type="text" placeholder="Filter by Name, date, materi" ref="name" />
                            <Button variant="outline-warning" >Search</Button>
                            {/* <Button style={styles.btn2} onClick={this.state.revenueResep === 'resep' ? this.onFilterResep : this.onFilterSatuan}>Search</Button> */}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', height: '6.5vh', marginRight:'8.5vw' }}>
                            <Button variant="outline-secondary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                            <p style={{ margin: '1vh', marginLeft: '1vw', marginRight: '1vw' }}>Page {this.state.page} of {this.state.maxPage}</p>
                            <Button variant="outline-info" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Siswa</th>
                                <th>Kelas</th>
                                <th>Date, Time</th>
                                <th>Materi</th>
                                <th>Nama Ujian</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.nilaiTugas.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_students - 1}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.kelas}</td>
                                    <td>{item.date}, {item.time}</td>
                                    <td>{item.materi}</td>
                                    <td>{item.nama_tugas}</td>
                                    <td>{item.nilai_tugas}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
            )
        } else if (this.state.rekapNilai === 'ujian') {
            return (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2vh' }}>
                        <h3 style={{ marginTop: '1vh', marginLeft: '2vw' }}>Rekap Nilai Ujian</h3>
                        <div style={styles.divForm}>
                            <Form.Control style={styles.filterForm} type="text" placeholder="Filter by Name, date, materi" ref="name" />
                            <Button variant="outline-warning" >Search</Button>
                            {/* <Button style={styles.btn2} onClick={this.state.revenueResep === 'resep' ? this.onFilterResep : this.onFilterSatuan}>Search</Button> */}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', height: '6.5vh', marginRight:'8.5vw' }}>
                            <Button variant="outline-dark" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                            <p style={{ margin: '1vh', marginLeft: '1vw', marginRight: '1vw' }}>Page {this.state.page} of {this.state.maxPage}</p>
                            <Button variant="outline-info" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Siswa</th>
                                <th>Kelas</th>
                                <th>Date, Time</th>
                                <th>Materi</th>
                                <th>Nama Ujian</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.nilaiUjian.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_students - 1}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.kelas}</td>
                                    <td>{item.date}, {item.time}</td>
                                    <td>{item.materi}</td>
                                    <td>{item.nama_ujian}</td>
                                    <td>{item.nilai_ujian}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>Pages1</h1>
                <div style={{ marginTop: '3vh', margin:'5vw' }}>
                    <Button style={styles.btn2} onClick={this.rekapTugas}>Nilai Tugas</Button>
                    <Button style={styles.btn3} onClick={this.rekapUjian}>Nilai Ujian</Button>
                    {this.onTable()}
                </div>
            </div>
        )
    }
}

const styles = {
    table: {
        backgroundColor: 'white',
        width: '80vw',
        marginLeft: '2vw'
    },
    btn2: {
        margin: '1vh',
        width: '12vw',
        marginRight: '5vw',
        marginBottom: '4vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
        background: '#29BB89',
        border: 'none',
        borderRadius: '12px 000'
    },
    btn3: {
        margin: '1vh',
        width: '12vw',
        marginRight: '5vw',
        marginBottom: '4vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
        backgroundColor: '#6B7AA1',
        border: 'none',
        borderRadius: '12px 000'
    },
    divForm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginRight: '2vw',
        marginTop: '0',
        marginLeft: '0',
    },
    filterForm: {
        width: "13vw",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
    },
}

export default RekapNilai;