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

            for(var i=0; i < qSize; i++)
            {
                setTitle(data.title);

                questions[i] = data.kysymykset[i].kysymys;

                document.getElementById("questions").innerHTML += 
                    "Kysymys " + (i + 1) + " : " + questions[i] + "<br/>Vastaukset : <br/>";

                    
                
                if (data.kysymykset[i].vastaukset[0] != null) {
                    aSize = data.kysymykset[i].vastaukset.length;

                    for(var j=0; j < aSize; j++) {
                        answers[j] = data.kysymykset[i].vastaukset[j].vastaus;

                        document.getElementById("questions").innerHTML +=
                        answers[j] + "<br/>";
                    }
                } else {
                    answers[0] = "Ei vastattu";
                    
                    document.getElementById("questions").innerHTML +=
                    answers[0] + "<br/><br/>";
                }

                document.getElementById("questions").innerHTML +=
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
        <div id="questions"></div>



    </div>
    )
}

export default Tulosraportti;
