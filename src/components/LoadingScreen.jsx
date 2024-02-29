import React from 'react'
import styles from '../styles/LoadingScreen.module.css'

function LoadingScreen() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className={styles.spinner}></div>
        </div>
    );
}

export default LoadingScreen