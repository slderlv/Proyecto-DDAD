import Link from 'next/link';
import styles from './Navigation.module.css'

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Sign in',
  route: '/sign-in'
}, {
  label: 'Sign up',
  route: '/sign-up'
}, {
  label: 'Reset Password',
  route: '/reset-password'
}, {
  label: 'Reset Password Code',
  route: '/reset-password-code'
}, {
  label: 'Change Password',
  route: '/change-password'
}]

export function Navigation() {
    return (
        <header className={styles.header}>
          <nav>
            <ul className={styles.navigation}>
              {links?.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
    )
}