import { Button } from 'antd'
import logo from '../../assets/icon.png';
import styles from './styles.module.css'
import AuthenticateService from '../../api/AuthenticateService';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    if (localStorage.getItem('token')) {
        return <Navigate to="/" />;
    }
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // TODO: Implement authentication API call here
        AuthenticateService.login(username, password)
            .then((response) => {
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                window.location.href = './'
            })
            .catch((error) => { console.log(error) })

    }

    return (
        <div>
            <div className={styles.fullWidth}>
                <div className={styles.Center}>
                    <img className={styles.iconStyles} src={logo} alt="img" />
                </div>
                <h2 className={styles.textCenter}>Breeze</h2>
                <p className={styles.textCenter}>Weather app</p>
                <h1 className={styles.textCenter}>Login</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <input className={styles.searchStyles} type="text" placeholder='Email' onChange={handleUsernameChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <input className={styles.searchStyles} type="password" placeholder='Password' onChange={handlePasswordChange} />
                    </div>
                    <div className={styles.FlexCenter} >
                        <Button htmlType="submit" type="primary" shape="round" size='large' >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
            <p className={styles.regist}>Haven't have account?<Link to='/authenticate/regist'><span className={styles.registButton}> Regist now</span></Link></p>
        </div>
    )
}
