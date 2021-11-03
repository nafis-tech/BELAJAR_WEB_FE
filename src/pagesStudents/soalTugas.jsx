import React from 'react'
import Axios from 'axios'
import {
    Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class SoalTugas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            soalTugas: [],
            jawabanSiswa: '',
            jawabanBenar: '',
            nilaiAkhir: null,
            totalScore: null,
            page: 1,
            disabled: false,
            nilaiTugas: null,
            materi: '',
            student :'',
            allSoal:[],
            save : false
        }


    }

    // getStudentsById
    studentByid = (fullname) => {
        let name = {
            fullname :'yoona shi'
        }
        console.log(name)
            Axios.post(`http://localhost:2000/admin/student-fullname`, name)
                .then(res => {
                    console.log(res.data)
                    this.setState({ student : res.data })
                    console.log(this.state.student.kelas)
                })
                .catch(err => {
                    console.log(err + 'Eror data student by id')
                })

    }

    //getallsoal.lenght
    allSoalTugas = () => {
        console.log()
            Axios.get(`http://localhost:2000/admin/all-soaltugas`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ allSoal : res.data })
                    console.log(this.state.allSoal.length)
                })
                .catch(err => {
                    console.log(err + 'Eror data All tugas soal biologi')
                })

    }

    getSoal = () => {
        Axios.post(`http://localhost:2000/admin/soal-tugas`, { page: 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ soalTugas: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ materi: res.data[0].materi })
                console.log(res.data[0].materi)
                console.log(this.state.jawabanSiswa)
            })
            .catch(err => {
                console.log(err + 'Eror get soal tugas')
            })
    }
    componentDidMount() {
        this.allSoalTugas()
        this.getSoal()
        this.studentByid()
        // this.jawabanValid()
    }

    onNext = () => {
        Axios.post(`http://localhost:2000/admin/soal-tugas`, { page: this.state.page + 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ soalTugas: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                this.setState({ nilaiAkhir: this.state.nilaiAkhir + this.state.totalScore })
                this.setState({totalScore : 0})
                console.log(this.state.totalScore)
                console.log(this.state.nilaiAkhir)
                console.log(this.state.jawabanSiswa)
            })
            .catch(err => {
                console.log(err + 'Eror nextpage')
            })
    }
    onPrev = () => {
        Axios.post(`http://localhost:2000/admin/soal-tugas`, { page: this.state.page - 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ soalTugas: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
            })
            .catch(err => {
                console.log(err + 'Eror nextpage')
            })
    }

    onSave = () => {
        this.setState({ nilaiAkhir: this.state.nilaiAkhir + this.state.totalScore })
        alert('Are you sure you have completed the Exam? If YES, click SUBMIT')
    }

    //mengambil data jawaban siswa (next --> pindah page, ambil jwaban siswa)
    jawabanValid = () => {
        let newData = {
            fullname: `${this.state.student.fullname}`,
            kelas: `${this.state.student.kelas}`,
            materi: `${this.state.materi}`,
            nilai_tugas: this.state.nilaiAkhir,
            id_students: `${this.state.student.id_students}`,
            date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,

        }
        console.log(newData)
        Axios.post(`http://localhost:2000/admin/nilai-tugas`, newData)
            .then(res => {
                console.log(res.data)
                this.setState({ nilaiAkhir: this.state.nilaiAkhir + this.state.totalScore })
                this.setState({ nilaiTugas: res.data })
                
            })
            .catch(err => {
                console.log(err + 'Eror nilai Tugas')
            })

        console.log(this.state.totalScore)
        console.log(this.state.nilaiAkhir) //berhasil nilai terakhir kecantum ketika save
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: '5vw', marginBottom: '5vh' }}>
                    <h3>Soal Tugas, Materi : {this.state.materi}</h3>
                    <h6>Date : {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</h6>
                    <h6>Time : {new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}</h6>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5vw', marginBottom: '2vh' }}>
                        <Button variant="outline-secondary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                        <Button variant="outline-info" disabled={this.state.page === this.state.allSoal.length ? true : false} onClick={this.onNext}>Next</Button>
                        <h6>Soal ke {this.state.page} dari {this.state.allSoal.length}</h6>
                        <Button variant="warning" onClick={this.onSave} >SAVE</Button>
                        <Button variant="success" onClick={this.jawabanValid} as={Link} to={`/profile-students`} >Submit</Button>
                    </div>
                </div>
                {this.state.soalTugas.map(item => {
                    // console.log(item.jawaban_tugas)
                    return (
                        <div style={{ marginLeft: '5vw', width: '80vw' }}>
                            <p><strong>{item.no_soal_tugas}.</strong> {item.soal}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '40vw', margin: '2vh' }}>
                                <Button style={styles.btn}
                                    value={item.jawaban_a}
                                    type="radio"
                                    onClick={() => item.jawaban_a === item.jawaban_tugas ? [`${this.setState({ totalScore: + 10 })} ${this.setState({ jawabanSiswa: item.jawaban_a })}`] : [`${this.setState({ totalScore: 0 })} ${this.setState({ jawabanSiswa: item.jawaban_a })}`]}
                                    variant={this.state.jawabanSiswa === item.jawaban_a ? 'warning' : 'outline-warning'} > <strong>A.</strong> {item.jawaban_a}</Button>
                                <Button style={styles.btn}
                                    type="radio"
                                    onClick={() => item.jawaban_b === item.jawaban_tugas ? [`${this.setState({ totalScore: + 10 })} ${this.setState({ jawabanSiswa: item.jawaban_b })}`] : [`${this.setState({ totalScore: 0 })} ${this.setState({ jawabanSiswa: item.jawaban_b })}`]}
                                    variant={this.state.jawabanSiswa === item.jawaban_b ? 'warning' : 'outline-warning'} ><strong>B.</strong> {item.jawaban_b}</Button>
                                <Button style={styles.btn}
                                    type="radio"
                                    onClick={() => item.jawaban_c === item.jawaban_tugas ? [`${this.setState({ totalScore: + 10 })} ${this.setState({ jawabanSiswa: item.jawaban_c })}`] : [`${this.setState({ totalScore: 0 })} ${this.setState({ jawabanSiswa: item.jawaban_c })}`]}
                                    variant={this.state.jawabanSiswa === item.jawaban_c ? 'warning' : 'outline-warning'} ><strong>C.</strong> {item.jawaban_c}</Button>
                                <Button style={styles.btn}
                                    type="radio"
                                    onClick={() => item.jawaban_d === item.jawaban_tugas ? [`${this.setState({ totalScore: + 10 })} ${this.setState({ jawabanSiswa: item.jawaban_d })}`] : [`${this.setState({ totalScore: 0 })} ${this.setState({ jawabanSiswa: item.jawaban_d })}`]}
                                    variant={this.state.jawabanSiswa === item.jawaban_d ? 'warning' : 'outline-warning'} ><strong>D.</strong> {item.jawaban_d}</Button>
                                <Button style={styles.btn}
                                    type="radio"
                                    onClick={() => item.jawaban_e === item.jawaban_tugas ? [`${this.setState({ totalScore: + 10 })} ${this.setState({ jawabanSiswa: item.jawaban_e })}`] : [`${this.setState({ totalScore: 0 })} ${this.setState({ jawabanSiswa: item.jawaban_e })}`]}
                                    variant={this.state.jawabanSiswa === item.jawaban_e ? 'warning' : 'outline-warning'} ><strong>E.</strong> {item.jawaban_e}</Button>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
}

const styles = {
    btn: {
        margin: '1vh',
        color: 'black',
        border: '1px solid #FF9300',
        textAlign: 'left',

    },
}

export default SoalTugas;