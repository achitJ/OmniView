import Header from '@/components/Header'
import styles from './styles.module.css'

export default function BaseLayout({ children } : { children: React.ReactNode }) {
    return (
        <main className={styles.mainContainer}>
            <Header/>
            {children}
        </main>
    )
}