import React from 'react'
import { IMG_1, IMG_2, IMG_19, IMG_20, IMG_21, IMG_22, IMG_23, IMG_24, IMG_6, IMG_7, IMG_8, IMG_9, IMG_10, IMG_16 } from '../assets'
import {
    FormControl,
    InputGroup,
    Button,
    Image,
    Card,
    CarouselItem,
    Carousel
} from 'react-bootstrap'
// import { Link } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // image: [IMG_6.default, IMG_7.default, IMG_8.default, IMG_9.default, IMG_10.default, IMG_1.default],
            image: [IMG_20.default, IMG_21.default, IMG_22.default, IMG_23.default, IMG_24.default, IMG_6.default]

        }
    }

    render() {
        return (
            <div style={styles.container}>
                <h1>Pages1</h1>
                <div>
                    <Carousel fade>
                        {this.state.image.map((item) => {
                            return (
                                <Carousel.Item style={{
                                    width: '55vw', height: '65vh', margin: '5vh 15vw',
                                }}
                                >
                                    <img
                                        className="d-block w-100"
                                        src={item}
                                        alt="First slide "
                                        style={{ backgroundSize: 'contain', width: '40vw', height: '55vh' }}
                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </div>

                <div style={{ height: '50vh' }}>
                    Video
                </div>
                {/* <Dropdown>
                        <Dropdown.Toggle variant="warning" className="btnTog" id="dropdown-basic">
                            Page_Siswa
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/materi">Link Materi</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/soal-tugas">Soal Tugas</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/soal-ujian">soal-ujian</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
            </div>
        )
    }
}



const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        // background: `url(${IMG_16.default})`,
        background: "white",
        backgroundSize: 'contain',
    }
}

export default Home;