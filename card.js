//create the template
const template = document.createElement('template');
template.innerHTML = `
  <style>
     .user-card{
        font-family: 'sans-serif;
        width: 600px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        margin-bottom: 15px;
        border-bottom: darkorchid 5px solid;
        // border-left: green 5px solid;
        // border-right: red 5px solid;
        border-top: orange 5px solid;
        background: #f4f4f4;
        border-radius:6px;
     }
     .user-card img{
        margin:20px;
        width:7rem;
         height:7rem;
        border-radius:50%;
     }
   .user-card button{
       cursor:pointer;
       background:darkorchid;
       color:#fff;
       border:0;
       border-radius:5px;
       padding:5px 10px;
       margin-bottom:10px;
       font-size:1rem;
   }

  </style>
   <div class='user-card'>
    <img />
    <div>
        <h3></h3>
        <div class='info'>
          <p><slot name='email'/></p>
          <p><slot name='phone' /></p>
        </div>
        <button type='submit' id='toggle-info'>Hide Info</button>
    </div>
   </div>
`;

// first thing create the class to extends html element
class UserCard extends HTMLElement {
	// make constructs
	constructor() {
        super();
        //showinfo
        this.showInfo=true;
		// create the shadow node
		this.attachShadow({ mode: 'open' });
		// append child to shadowroot
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
		this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
		// this.innerHTML = `<h3> ${this.getAttribute(
		// 	'name'
		// )}</h3> and color is <br> <h1 style='color:red'>${this.getAttribute('color')}</h1>`;
	}
	// create toggle info method
	toggleInfo() {
        this.showInfo=!this.showInfo;
        let info=this.shadowRoot.querySelector('.info');
        let toggleBtn=this.shadowRoot.querySelector('#toggle-info');
        if(this.showInfo){
           info.style.display='block';
           toggleBtn.innerText='Hide Info';
        }else{
            info.style.display='none';
            toggleBtn.innerText='Show Info';
        }
	}

	// connected callback
	connectedCallback() {
		this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
	}
	// disconnected callback
	disconnectedCallback() {
		this.shadowRoot.querySelector('#toggle-info').removeEventListener();
	}
}

//use the class to dispaly element
window.customElements.define('user-card', UserCard);
