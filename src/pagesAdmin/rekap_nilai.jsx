import React from 'react'
import {
    Table,
} from 'react-bootstrap'
// import { Link } from 'react-router-dom'

class RekapNilai extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>Pages1</h1>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2vh' }}>
                        <h3 style={{ marginTop: '1vh', marginLeft: '2vw' }}>Rekap Nilai Tugas</h3>
                        {/* <div style={{ display: 'flex', justifyContent: 'space-between', height: '7vh' }}>
                            <Button variant="outline-secondary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                            <p style={{ margin: '1vh', marginLeft: '1vw', marginRight: '1vw' }}>Page {this.state.page} of {this.state.maxPage}</p>
                            <Button variant="outline-info" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
                        </div> */}
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Siswa</th>
                                <th>Date, Time</th>
                                <th>Materi</th>
                                <th>Tugas/ Ujian</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {this.state.student.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}, {item.time}</td>
                                    <td>{item.materi}</td>
                                    <td>{item.nama_tugas}</td>
                                    <td>{item.nilai_tugas}</td>
                                </tr>
                            ))
                            } */}
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
        width: '70vw',
        marginLeft: '2vw'
    },
}

export default RekapNilai;