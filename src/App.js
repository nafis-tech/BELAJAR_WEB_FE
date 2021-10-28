import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pagesStudents/hompage';
import SoalUjian from './pagesStudents/soalUjian';
import ProfileStudents from './pagesStudents/profileStudents';
import SoalTugas from './pagesStudents/soalTugas';
import RekapNilai from './pagesAdmin/rekap_nilai';

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/profile-students" component={ProfileStudents} exact />
        <Route path="/soal-tugas" component={SoalTugas} exact />
        <Route path="/soal-ujian" component={SoalUjian} exact />
        <Route path="/rekap-nilai" component={RekapNilai} exact />
      </Switch>
    )
  }
}

export default App;
