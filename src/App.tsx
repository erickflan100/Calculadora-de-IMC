import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/imagem/powered.png';
import leftArrowImage from './assets/imagem/leftarrow.png';
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    }else{
      alert('Preencha todos os campos.')
    }
  };

  const handleButtonBack = () => {
    setHeightField(0);
    setWeightField(0);
    setToShow(null);
  };

  return (
    <div className={styles.main}>
      <header className={styles.headerContainer}>
        <img src={poweredImage} width='150px'/>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input type="number" disabled={toShow ? true : false} placeholder="Digite sua altura. Ex: 1.5 (em metros)" value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))}/>
          <input type="number" disabled={toShow ? true : false} placeholder="Digite seu peso. Ex: 72.6 (em kg)" value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))}/>
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item}/>
            ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={50} onClick={handleButtonBack}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
