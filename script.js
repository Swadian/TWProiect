 let voting_options;
 let last_voted=null;


const url = 'http://localhost:5000/votes';
const getvotes = async () => {
    const response=await fetch(url,{method:'GET'})
    voting_options=await response.json();
}
const updateJson = async () => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(voting_options)
    });
  }
  
window.onload = async ()=>{
    await getvotes();

const container=document.getElementById("container");
    container.style.display='grid';
    container.style.gridRow='auto';
    container.style.gridColumn='auto';
    for(op of voting_options)
    {
        const vote_div=document.createElement('div');
        const rad=document.createElement('input');
        rad.type='radio';
        rad.name='songs';
        rad.value=op.name;
        const lab2=document.createElement('label');
        rad.onchange = () => 
        {
            lab2.innerText=parseInt(lab2.innerText)+1;
      if(last_voted!=null)
      last_voted.innerText=parseInt(last_voted.innerText)-1;
      last_voted=lab2;
            while(rad.parentNode!=rad.parentNode.parentNode.firstChild && parseInt(rad.nextSibling.nextSibling.innerText)>parseInt(rad.parentNode.previousSibling.lastChild.innerText))
                {
                    rad.parentNode.parentNode.insertBefore(rad.parentNode,rad.parentNode.previousSibling);
                }
        }
        const lab1=document.createElement('label');
        lab1.innerText=op.name;
        vote_div.appendChild(rad);
        vote_div.appendChild(lab1);
        lab2.innerText=op.votes;
        vote_div.appendChild(lab2);
        vote_div.className='votes';
        container.appendChild(vote_div);
    }
    const input_div=document.createElement('div');
    const textb= document.createElement('input');
    textb.type='textbox';
    textb.onchange = () => {
       voting_options[voting_options.length]={name: textb.value,votes: 1};
        updateJson();
        const vote_div=document.createElement('div');
        const rad=document.createElement('input');
        rad.type='radio';
        rad.name='songs';
        rad.value=textb.value;
        const lab2=document.createElement('label');
        rad.onchange = () => 
        {
            lab2.innerText=parseInt(lab2.innerText)+1;
            if(last_voted!=null)
                last_voted.innerText=parseInt(last_voted.innerText)-1;
            last_voted=lab2;

            while(rad.parentNode!=rad.parentNode.parentNode.firstChild && parseInt(rad.nextSibling.nextSibling.innerText)>parseInt(rad.parentNode.previousSibling.lastChild.innerText))
                {
                    rad.parentNode.parentNode.insertBefore(rad.parentNode,rad.parentNode.previousSibling);
                }

        }
        last_voted=lab2;
        rad.checked=true;
        const lab1=document.createElement('label');
        lab1.innerText=textb.value;
        container.removeChild(input_div);
        vote_div.appendChild(rad);
        vote_div.appendChild(lab1);
        lab2.innerText=1;
        vote_div.appendChild(lab2);
        container.appendChild(vote_div);
        textb.value="";
        container.appendChild(input_div);
    }
    input_div.appendChild(textb);
    container.appendChild(input_div);


}