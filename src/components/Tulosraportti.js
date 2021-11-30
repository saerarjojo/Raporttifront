import React from 'react';

function Tulosraportti()
{

    const [id, setId] = React.useState('');

    const [title, setTitle] = React.useState('');

    const [done, setDone] = React.useState(false);

    var questions = [];
    var answer;
    var qSize = 0;

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
                    "Kysymys " + (i + 1) + " : " + questions[i] + "<br/>Vastaus : ";

                
                if (data.kysymykset[i].vastaukset[0] != null) {
                    answer = data.kysymykset[i].vastaukset[0].vastaus; 
                } else {
                    answer = "Ei vastattu";
                }

                
                document.getElementById("questions").innerHTML +=
                    answer + "<br/><br/>";  
                
                
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
