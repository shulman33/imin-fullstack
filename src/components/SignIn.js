import {useState} from "react";
import {Auth} from 'aws-amplify';
import '../styles/signin.css';
import Subscribe from "./Subscribe";
import {Link} from "react-router-dom";




export default function SignIn({setUser}) {
    async function login(e){
        e.preventDefault();
        try{
            const user = await Auth.signIn(username, password);
            setUser(user);
            console.log('user: ' + user);
        }catch(e){
            console.error(e);
        }
    }


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    const Form = props => (
        <form onSubmit={login}>
            <FormButton title="Log in"/>
            <SignupButton />
        </form>
    );

    const FormButton = props => (
        <div id="button" className="row">
            <button>
                <Link to="/classregistration" style={{color: 'white'}}> {props.title} </Link>
            </button>
        </div>
    );

    const SignupButton = props => (
        <div className="row">
            <Subscribe />
        </div>
    );
    return (
        <div id="loginform">

            <FormHeader title="Login" />

            <div className='row'>
                <input  type="text" name="username" placeholder="username" onChange={e => setUsername(e.target.value)}/>
                <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
            </div>

            <Form />
        </div>
    )
}