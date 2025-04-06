import styles from './styles.module.css';
import Link from 'next/link';
export function Cabecalho(){
    return(
        <header>
            <nav className={styles.nav}> QUIZ CC
                <ul>
                    <Link href='/'><li>Home</li></Link>
                    <li>Períodos</li>
                </ul>
            </nav>
        </header>
    );
}