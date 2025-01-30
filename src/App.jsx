import { useState } from 'react';
import './App.css'

const DAY = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const MONTH = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
const DAY_LETTER = DAY.map((day)=>(day.charAt(0)))
const EVENT_LIST = []
for(let i=0; i<=30; i++){
  EVENT_LIST.push({confirmed:false})
}

function Day({jour, className, onClick}){
  return(
    <div className={className} onClick={onClick}>
      <div>{jour}</div>
    </div>
  )
}

function handleClick(event){
  const element = document.getElementsByClassName('selected');
  if(element.length>0){
    // console.log('element full')
    Array.from(element).forEach(selection=>{
      selection.classList.remove('selected');
    });
  }
  event.target.classList.add('selected')
}

function App() {
  const ROW = [];
  for(let i=1; i<=31;i++){
    ROW.push(<Day key={i} jour={i} className={'backgroundOrange'} onClick={handleClick}/>)
  }
  const [evenement, setEvenement]=useState('')
  const [horaire, setHoraire]=useState('')
  const [lieu, setLieu]=useState('')
  const [eventList, setEventList] = useState(EVENT_LIST)
  // console.log(eventList)
  function handleSubmit(event){
    event.preventDefault()
    const DATE = [...document.querySelectorAll('.backgroundOrange div')];

    let selected;
    DATE.forEach((element, index)=>{
      if(element.classList.contains('selected')){
        selected = index;
      }
      return selected
    });
    if(selected == null || selected == undefined){
      alert('Selectionnez une date !')
      return
    }

    const NEW_EVENEMENT = { 
      nom: event.target[0].value, 
      heure: event.target[1].value , 
      lieu: event.target[2].value, 
      index: selected,
      confirmed:true
    }
    const TAB = [...eventList]
    TAB[selected] = NEW_EVENEMENT
    setEventList(TAB)
    
    if(evenement.length>0 && horaire.length>0 && lieu.length>0){
      // console.log(DATE.length-1);
      // console.log(DATE[0]);
      console.log(NEW_EVENEMENT)
    }else{
      alert('Champ à remplir !')
    }
    return
  }

  function  FormCalendar({onSubmit}){
    return(
        <form onSubmit={event => handleSubmit(event)} id="form">
            <h3 className='titleForm'>Nouvel Evénement :</h3>

            <label htmlFor="event">Evenement :</label>
            <input type="text" placeholder='evenement'name='event' value={evenement} onChange={(event)=>setEvenement(event.target.value)} />

            <label htmlFor="event">Horaire :</label>
            <input type="number" placeholder='horaire' name='horaire'value={horaire} onChange={(event)=>setHoraire(event.target.value)} />

            <label htmlFor="lieu">Lieu :</label>
            <input type="text" placeholder='Lieu' name='lieu'value={lieu} onChange={(event)=>setLieu(event.target.value)} />

            <input type="submit" id='submitBtn'/>
        </form>
    )
  }
  // const valeurEvenement = eventList.map((event)=>
  //   <li key={event.toString()}>{event}</li>
  // );
  return (
    <>
    
      <FormCalendar onSubmit={handleSubmit}/>
      <article className='card'>
        <Day jour={MONTH[9] +" "+"2025"} className="month" />
        <section className='grid-7'>
          {DAY_LETTER.map((letter, index) => (
              <Day key={index} jour={letter} className="day-letter" />
            ))}
        </section>
        <section className="grid-7 days">
          {ROW}
        </section>
      </article>
      <div className='listEvent'>
        <div className="transbox">
          <h3 className='titleListEvent'>Les evenements du mois :</h3>
        </div>
      </div>
      {/* <ul>{valeurEvenement}</ul> */}
    
    </>
  )
}

export default App
