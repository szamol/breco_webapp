import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { isLogged } from '../../utils/auth'

const Home = () => {
    return (
        <Jumbotron 
            className="jumbotron-fluid text-center justify-contnet-center col-10 mx-auto"
            style={{ backgroundColor : 'transparent' }}>
            <h1>Witaj w breco!</h1>
            <h3>
                breco jest pierwszą taką aplikacją, która koncentruje się na polecaniu książek.
            </h3>
            <br/>
            <div className="w-75 mx-auto">
                <hr/>
                <h4>Jak to działa?</h4>
                <p>
                    Wykorzystując grafową bazę danych przechowujemy informacje o książkach razem z ich relacjami.
                    Celem nie jest samo dostarczanie informacji o literaturze, a wyszukiwanie podobieństw.
                </p>
                <hr/>
                <h4>Dlaczego muszę się rejestrować?</h4>
                <p>
                    Wymagamy rejestracji z prostego powodu - w trakcie korzystania serwisu zbieramy informacje.
                    Brzmi to jak naruszenie prywatności, ale tak naprawdę zdobyte dane wykorzystujemy tylko i wyłącznie
                    do zapewniania jak najlepszych powiązań.
                </p>
                <hr/>
                <h4>Dlaczego nie mogę znaleźć wyszukiwanej książki?</h4>
                <p>
                    Aby dostarczyć jak nalepszych wyników, każda książka musi zostać zweryfikowana.
                    Dokładamy wszelkich starań, aby nasz zbiór był najbogatszy.
                    Zachęcamy do dodawania brakujących książek poprzez specjalnie przygotowany formularz
                    w panelu użytkownika.
                </p>
                <hr/>
            </div>
            <br/>
            <h4>Nie trać czasu na szukanie książki, która Cię wciągnie. Wykorzystaj breco!</h4>
            <br/>
            { !isLogged() &&
            <p>
                <Button as={NavLink} variant="primary" to="/login">Zaloguj się!</Button>
            </p> }
        </Jumbotron>
    )
}

export default Home