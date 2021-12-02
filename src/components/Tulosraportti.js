import React from 'react';

function Tulosraportti()
{

    const [id, setId] = React.useState('');

    const [title, setTitle] = React.useState('');

    const [done, setDone] = React.useState(false);

    var questions = [];
    var answers = [];
    var qSize = 0;
    var aSize = 0;
    var i = 0;
    var j = 0;

    React.useEffect(() => {    

        fetchAnswers();

    }, )

    function fetchAnswers()
    {
    fetch('https://saerarjojo.herokuapp.com/rest/kyselyt/' + id)
    .then(response => response.json())
    .then(data => {

        qSize = data.kysymykset.length;

        if(!done)
        {   
            setDone(true);

            for(i=0; i < qSize; i++)
            {
                setTitle(data.title);

                questions[i] = data.kysymykset[i].kysymys;

                document.getElementById("report").innerHTML += 
                    "Kysymys " + (i + 1) + " : " + questions[i] + "<br/>Vastaukset : <br/>";
                
                if (data.kysymykset[i].vastaukset[0] != null) {
                    aSize = data.kysymykset[i].vastaukset.length;

                    for(j=0; j < aSize; j++) {
                        answers[j] = data.kysymykset[i].vastaukset[j].vastaus;

                        document.getElementById("report").innerHTML +=
                        answers[j] + "<br/>";
                    }
                } else {
                    answers[j] = "Ei vastattu";

                    document.getElementById("report").innerHTML +=
                    answers[j] + "<br/>";
                }

                document.getElementById("report").innerHTML +=
                    "<br/>";

                
            }


        }
    })

        .catch(err => console.log(err))

}
return(
    <div>
        <h3>Tulosraportti</h3>

        <form>
            <input value={id} onChange={event => setId(event.target.value)}/>
        </form>

        <p>Title: {title}</p>
        <div id="report"></div>

    </div>
    )
}

export default Tulosraportti;
