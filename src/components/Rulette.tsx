/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { Wheel } from 'react-custom-roulette';
import ConfettiExplosion from 'react-confetti-explosion';

// style
import './rulette.css'
import { Alert, AlertTitle, Button } from '@mui/material';
// const colors = ['#3e3e3e', '#df3428', '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33'];
const colors = [
    "#169ed8",
    "#175fa9",
    "#239b63",
    "#64b031",
    "#f7a416",
    "#e6471d",
    "#dc0936",
    "#e5177b",
    "#be1180",
    "#871f7f",
    "#3f297e",
];

const Rulette = ({ data }) => {

    const [mustSpin, setMustSpin] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [prizeNumber, setPrizeNumber] = React.useState(0);
    const [rouletteData, setRouletteData] = React.useState(data);

    const handleClickSpin = () => {

        if (!data.length || data.length <= 1) {
            alert('Agrege más opciones a la ruleta, por favor!')
            return;
        }
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    }

    const portalRoot = document.getElementById('portal-root');

    React.useEffect(() => {
        const addShortString = data.map((item) => {
            return {
                completeOption: item.text,
                option:
                    item.text.length >= 30
                        ? item.text.substring(0, 30).trimEnd() + "..."
                        : item.text
            };
        });
        setRouletteData(addShortString);
    }, [data]);



    return (
        <>
            <div id="roulette-container">
                <Wheel
                    mustStartSpinning={mustSpin}
                    spinDuration={[0.5]}
                    prizeNumber={prizeNumber} // Generar un numero aleatrio dentro de la lista dada
                    data={rouletteData}
                    radiusLineColor={["tranparent"]}
                    backgroundColors={colors}
                    textColors={['#ffffff']}
                    onStopSpinning={() => {
                        setMustSpin(false);
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false)
                        }, 5000);
                    }}
                    disableInitialAnimation
                />
                <Button variant='contained' onClick={handleClickSpin} className="btnSpin" disabled={mustSpin}>
                    Girar
                </Button>
                {
                    showAlert == true
                        ? ReactDOM.createPortal(<>

                            <ConfettiExplosion id="confetti" />
                            <div id="alert">
                                <ConfettiExplosion id="confetti" />
                                <Alert className="alert" severity="success">
                                    <AlertTitle>
                                        <h2>Ganador!</h2>
                                    </AlertTitle>
                                    <h3>{rouletteData[prizeNumber].completeOption ?? ''}</h3>
                                </Alert>
                                <ConfettiExplosion id="confetti" duration={4000} />
                            </div>
                            </>,
                            portalRoot)
                        : ''
                }
            </div >
        </>
    )

}

export default Rulette;