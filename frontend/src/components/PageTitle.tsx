import React from 'react';
import styles from './Css/PageTitle.module.css';

interface PageTitleProps{ 
    text: string;
}

const PageTitle:React.FC<PageTitleProps> =({text})=>{

    return(
        <div className={styles.pageTitle}>
            <h1>{text}</h1>
        </div>
    )
}

export default PageTitle;