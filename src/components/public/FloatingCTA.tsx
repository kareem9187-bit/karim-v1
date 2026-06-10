'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './FloatingCTA.module.css';

export function FloatingCTA() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const isFocusedFlow = pathname?.startsWith('/admin');

    useEffect(() => {
        if (isFocusedFlow) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show button only after scrolling down 50px
            setIsVisible(currentScrollY > 50);

        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFocusedFlow]);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isFocusedFlow) {
        return null;
    }

    return (
        <div 
            className={styles.ctaContainer} 
            style={{ 
                opacity: isVisible ? 1 : 0, 
                pointerEvents: isVisible ? 'auto' : 'none', 
                transition: 'opacity 0.4s ease'
            }}
            aria-hidden={!isVisible}
        >
            <button 
                className={styles.dynamicButton}
                onClick={handleClick}
                aria-label="Back to top"
            >
                <div className={styles.iconWrapper}>
                    <svg className={`${styles.icon} ${styles.iconUp}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                </div>
            </button>
        </div>
    );
}
