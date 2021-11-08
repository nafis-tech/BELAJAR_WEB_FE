import React from 'react'
import Axios from 'axios'
import {
    FormControl,
    InputGroup,
    Button,
    Table,
    Dropdown,
    Card
} from 'react-bootstrap'
import { PHOTO, IMG_5, IMG_1, IMG_17 } from '../assets'
import { Link } from 'react-router-dom'

class ProfileStudents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: [],
            kelas: '',
            nama: '',
            editUser: [],
            idEdit: null,
            profile: [],
            images: '',
            ujian: [],
            kelasU: '',
            namaU: '',
            page: 1,
            disabled: true,
            next: '',
            prev: '',
            rekapNilai: ''

        }
    }

    profileByid = (fullname) => {
        let name = {
            fullname: 'Amelia Sindi Wijaya'
        }
        console.log(name)
        Axios.post(`http://localhost:2000/student/profile-students`, name)
            .then(res => {
                console.log(res.data)
                this.setState({ profile: res.data })
                console.log(this.state.profile)
                this.setState({ nama: res.data[0].fullname })
                this.setState({ kelas: res.data[0].kelas })
            })
            .catch(err => {
                console.log(err + 'Eror data PROFILE by id')
            })

    }

    nilaiByid = (fullname) => {
        let name = {
            fullname: 'Amelia Sindi Wijaya',
            page: 1
        }
        console.log(name)
        Axios.post(`http://localhost:2000/admin/nilai-byname`, name)
            .then(res => {
                console.log(res.data) //ok
                this.setState({ student: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ nama: res.data[0].fullname })
                this.setState({ kelas: res.data[0].kelas })
                this.setState({ next: 'tugas', prev: 'tugas' })
            })
            .catch(err => {
                console.log(err + 'Eror data nilai tugas by id')
            })

    }

    onNext = () => {
        if (this.state.next === 'tugas') {
            let name = {
                fullname: 'Amelia Sindi Wijaya',
                page: this.state.page + 1
            }
            console.log(name)
            Axios.post(`http://localhost:2000/admin/nilai-byname`, name)
                .then(res => {
                    console.log(res.data)
                    this.setState({ student: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror nextpage')
                })
        } else if (this.state.next === 'ujian') {
            let name = {
                fullname: 'Amelia Sindi Wijaya',
                page: this.state.page + 1
            }
            console.log(name)
            Axios.post(`http://localhost:2000/admin/ujian-byname`, name)
                .then(res => {
                    console.log(res.data)
                    this.setState({ ujian: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror nextujian')
                })
        }
    }

    onPrev = () => {
        if (this.state.prev === 'tugas') {
            let name = {
                fullname: 'Amelia Sindi Wijaya',
                page: this.state.page - 1
            }
            console.log(name)
            Axios.post(`http://localhost:2000/admin/nilai-byname`, name)
                .then(res => {
                    console.log(res.data)
                    this.setState({ student: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror nextpage')
                })
        } else if (this.state.prev === 'ujian') {
            let name = {
                fullname: 'Amelia Sindi Wijaya',
                page: this.state.page - 1
            }
            console.log(name)
            Axios.post(`http://localhost:2000/admin/ujian-byname`, name)
                .then(res => {
                    console.log(res.data)
                    this.setState({ ujian: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err + 'Eror nextpage')
                })
        }
    }

    nilaiUjianByid = (fullname) => {
        let name = {
            fullname: 'Amelia Sindi Wijaya',
            page: 1
        }
        console.log(name)
        Axios.post(`http://localhost:2000/admin/ujian-byname`, name)
            .then(res => {
                console.log(res.data) //ok
                this.setState({ ujian: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ namaU: res.data[0].fullname })
                this.setState({ kelasU: res.data[0].kelas })
                this.setState({ next: 'ujian', prev: 'ujian' })
            })
            .catch(err => {
                console.log(err + 'Eror data nilai tugas by id')
            })

    }
    componentDidMount() {
        this.profileByid()
    }

    nilaiTugas = () => {
        this.nilaiByid()
        this.setState({ rekapNilai: 'tugas' })
        this.onTable()
    }

    nilaiUjian = () => {
        this.nilaiUjianByid()
        this.setState({ rekapNilai: 'ujian' })
        this.onTable()
    }

    renderDataUser = () => {
        return (
            <div>
                {this.state.profile.map((item, index) => {
                    if (this.state.idEdit === item.idUser) {
                        return (
                            <div key={index}>
                                <label>Full Name</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-user-check"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Full Name"
                                        defaultValue={item.fullname}
                                        type="text"
                                        ref="fullnameedit"
                                    />
                                </InputGroup>
                                <label>Username</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-street-view"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Gender Female/ Male"
                                        defaultValue={item.username}
                                        type="text"
                                        ref="useredit"
                                    />
                                </InputGroup>
                                <label>Kelas</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-home"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Kelas"
                                        defaultValue={item.kelas}
                                        type="text"
                                        ref="kelasedit"
                                    />
                                </InputGroup>
                                <label>Email</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-envelope"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Email"
                                        defaultValue={item.email}
                                        type="text"
                                        ref="emailedit"
                                    />
                                </InputGroup>
                                {/* <label>Gender</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-street-view"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Gender Female/ Male"
                                        defaultValue={item.gender}
                                        type="text"
                                        ref="genderedit"
                                    />
                                </InputGroup> */}
                            </div>
                        )
                    }
                    return (
                        <div>
                            <label>Full Name</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-user-check"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.profile ? this.state.profile[0].fullname : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            <label>Username</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-street-view"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.profile ? this.state.profile[0].username : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            <label>Kelas</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-home"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.profile ? this.state.profile[0].kelas : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            <label>Email</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-envelope"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.profile ? this.state.profile[0].email : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            {/* <label>Gender</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-street-view"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.profile ? this.state.profile[0].gender : ""}
                                </InputGroup.Text>
                            </InputGroup> */}
                        </div>
                    )
                })}
            </div>
        )
    }

    onSave = () => {
        const fullnameEdit = this.refs.fullnameedit.value
        const emailEdit = this.refs.emailedit.value
        const kelasEdit = this.refs.kelasedit.value
        // const genderEdit = this.refs.genderedit.value
        const usernameEdit = this.refs.useredit.value

        const body = {
            fullname: fullnameEdit,
            email: emailEdit,
            kelas: kelasEdit,
            // gender: genderEdit,
            username: usernameEdit
        }
        console.log(body)

        Axios.patch(`http://localhost:2000/student/update-profile/2`, body)
            .then(res => {
                console.log(res.data)
                this.setState({ editUser: res.data, idEdit: null })
                this.profileByid()
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
    }

    handleUpload = () => {
        const data = new FormData()
        console.log(data) //siapin form data untuk image

        data.append('IMG', this.state.images)
        console.log(data.get('IMG')) // masukin data Image ke formData

        this.props.uploadFile(data, this.props.iduser)
        this.fetchData()
        this.setState({ images: '' })
    }

    onRemove = () => {
        this.props.deletePhoto(this.props.iduser)
        this.fetchData()
        this.setState({ images: '' })
    }

    onTable = () => {
        if (this.state.rekapNilai === 'tugas') {
            return (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'2vh' }}>
                        <h3 style={{ marginTop: '1vh', marginLeft:'2vw'}}>Rekap Nilai Tugas</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' , height:'7vh'}}>
                            <Button variant="outline-secondary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                            <p style={{ margin: '1vh', marginLeft: '1vw', marginRight: '1vw' }}>Page {this.state.page} of {this.state.maxPage}</p>
                            <Button variant="outline-info" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date, Time</th>
                                <th>Materi</th>
                                <th>Nama Tugas</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.student.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
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
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'2vh' }}>
                        <h3 style={{ marginTop: '1vh', marginLeft:'2vw'}}>Rekap Nilai Ujian</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', height:'7vh' }}>
                            <Button variant="outline-dark" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                            <p style={{ margin: '1vh', marginLeft: '1vw', marginRight: '1vw' }}>Page {this.state.page} of {this.state.maxPage}</p>
                            <Button variant="outline-info" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date, Time</th>
                                <th>Materi</th>
                                <th>Nama Ujian</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ujian.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
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
            <div style={styles.cont} >
                <div style={styles.contForm}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vw' }}>
                        <h1>My Profile</h1>
                        <img style={styles.imgProf} src={IMG_1.default} />
                        {/* <img style={styles.imgProf} src={profilePic ? `${URL_API}/${profilePic}` : PHOTO.default} /> */}
                    </div>
                    <div >
                        <div style={{ margin: '3vh', marginLeft: '5vw', marginBottom: '0' }}>
                            <form encType="multipart/form-data">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="IMG"
                                    onChange={(e) => this.handleChoose(e)}
                                />
                            </form>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '3vh', marginTop: '1vh' }}>
                            <div>
                                <Button
                                    variant="primary" style={styles.button}
                                    className="button"
                                    variant="success"
                                    onClick={this.handleUpload}
                                >
                                    <i class="fas fa-file-upload" style={{ marginRight: '10px' }}></i>
                                    Upload
                                </Button>
                            </div>
                            <div style={styles.contButton}>
                                <Button variant="primary"
                                    style={{ background: '#DF2E2E', border: 'none' }}
                                    onClick={this.onRemove}
                                >
                                    <i class="fas fa-trash" style={{ marginRight: '10px' }}></i>
                                    Remove
                                </Button>
                            </div>
                        </div>

                    </div>
                    {this.renderDataUser()}
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3vh' }}>
                        <div style={styles.contButton}>
                            <Button variant="primary" style={styles.button} onClick={() => this.setState({ idEdit: this.state.idUser })}>
                                <i class="fas fa-user-edit" style={{ marginRight: '10px' }}></i>
                                Edit Profile
                            </Button>
                        </div>
                        <div style={styles.contButton}>
                            <Button variant="primary" style={{ background: '#29BB89', border: 'none' }} onClick={() => this.onSave()}>
                                <i class="fas fa-save" style={{ marginRight: '10px' }}></i>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '12vh' }}>
                    <Card style={{ width: '20rem', marginLeft: '8vw', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <Card.Img variant="top" src="https://media.istockphoto.com/photos/email-message-inbox-notification-on-laptop-screen-business-background-picture-id1229883762?b=1&k=20&m=1229883762&s=170667a&w=0&h=28x3ibf2iGnsC-07X_CIqKkrIIel4uuicWAzmQlN09Y=" />
                        <Card.Body >
                            <Card.Text style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                                <Button style={styles.btn} variant="warning" as={Link} to="/materi">Link Materi</Button>
                                <Button style={styles.btn} variant="warning" as={Link} to="/soal-tugas">Soal Tugas</Button>
                                <Button style={styles.btn} variant="warning" as={Link} to="/soal-ujian">Soal Ujian</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div style={{ marginTop: '3vh', marginLeft:'1vw' }}>
                        <Button style={styles.btn2} onClick={this.nilaiTugas}>Nilai Tugas</Button>
                        <Button style={styles.btn3} onClick={this.nilaiUjian}>Nilai Ujian</Button>
                        {this.onTable()}
                    </div>

                </div>
            </div>
        )
    }
}
const styles = {
    table: {
        backgroundColor: 'white',
        width: '40vw',
        marginLeft: '2vw'
    },
    cont: {
        display: 'flex',
        // background: "url(https://media.istockphoto.com/photos/empty-product-stand-platform-podium-with-cloud-picture-id1252597644?b=1&k=20&m=1252597644&s=170667a&w=0&h=hDkXmpVxiNFDBHiwJbkPLNUA-P_5DCEgILtHIrUiUIU=) no-repeat center",
        background: `url(${IMG_17.default})`,
        backgroundSize: 'cover',
        display: 'flex',
        marginTop: '10vh',

    },
    contForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '40vw',
        marginLeft: '7vw',
        marginRight: '5vw',
        marginBottom: '12vh',
        marginTop: '12vh',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, .6)',
        padding: '2% 3%',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '10px'
    },
    button: {
        backgroundColor: '#6B7AA1',
        border: 'none'
    },
    goToRegis: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0'
    },
    imgProf: {
        height: '36vh',
        width: '17vw',
        display: 'flex',
        margin: '5px',
        borderRadius: '200px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    textprof: {
        width: '30vw',
        backgroundColor: 'rgba(255, 255, 255, .9)',
        fontWeight: 'bold',
        color: 'black'
    },
    textprof2: {
        width: '30vw',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        color: 'black'
    },
    btn: {
        margin: '1vh',
        width: '12vw',
        marginLeft: '5vw',
        marginBottom: '4vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
        borderRadius:'30px 30px'
    },
    btn2: {
        margin: '1vh',
        width: '12vw',
        marginLeft: '5vw',
        marginBottom: '4vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
        background: '#29BB89',
        border:'none',
        borderRadius:'12px 000'
    },
    btn3: {
        margin: '1vh',
        width: '12vw',
        marginLeft: '5vw',
        marginBottom: '4vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
        backgroundColor: '#6B7AA1',
        border:'none',
        borderRadius:'12px 000'
    },
}


export default ProfileStudents;