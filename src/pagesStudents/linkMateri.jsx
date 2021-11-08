import React from 'react'
import {
    Button,
    Table
} from 'react-bootstrap'
import Axios from 'axios'
import { MATERI } from '../assets'
import { Link } from 'react-router-dom'

class Materi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkmateri: [],
            page: 1,
            all: []

        }
    }

    linkMateri = () => {
        console.log()
        Axios.post(`http://localhost:2000/student/link-materi`, { page: 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ linkmateri: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
            })
            .catch(err => {
                console.log(err + 'Eror data LINK MATERI')
            })

    }
    componentDidMount() {
        this.linkMateri()
    }

    onNext = () => {
        console.log()
        Axios.post(`http://localhost:2000/student/link-materi`, { page: this.state.page + 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ linkmateri: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
            })
            .catch(err => {
                console.log(err + 'Eror data LINK MATERI ON NEXT')
            })

    }
    onPrev = () => {
        console.log()
        Axios.post(`http://localhost:2000/student/link-materi`, { page: this.state.page - 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ linkmateri: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
            })
            .catch(err => {
                console.log(err + 'Eror data LINK MATERI ON PREVIEW')
            })

    }

    render() {
        return (
            <div style={{ display: 'flex', marginBottom:'2vh' }}>
                <div style={{ margin: '12vh 0 0 5vw', display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'2vh' }}>
                        <h1 style={{ color: '#FFC107' }}>Link Materi</h1>
                        <div style={{ display: 'flex', justifyContent: 'space-between', height:'7vh' }}>
                            <Button variant="outline-warning" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                            <h6 style={{ margin: '2vh 1vw 0 1vw' }} >Link ke {this.state.page} dari {this.state.maxPage}</h6>
                            <Button variant="outline-warning" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Alamat Link</th>
                                <th>Materi</th>
                                {/* <th>Status</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.linkmateri.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><a href={item.alamat_link}>{item.alamat_link}</a></td>
                                    <td>{item.materi}</td>
                                    {/* <td>sudah download</td> */}
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
                <div style={{ display: 'flex', flexBasis: '40%' }}>
                    <img style={{ width: '45vw', height: '105vh', margin: '0 0 0 5vw', }} src={MATERI.default} />
                </div>
            </div>
        )
    }
}
const styles = {
    table: {
        backgroundColor: 'white',
        width: '38vw',
        bordered: ' 1px solid #FFC107',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)'
    },
}

export default Materi;