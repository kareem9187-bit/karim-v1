'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './FloatingCTA.module.css';

export function FloatingCTA() {
    const pathname = usePathname();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // true = Let's talk, false = Back to top
    const lastScrollY = useRef(0);

    // Hide it completely if on book page or admin pages
    const isFocusedFlow = pathname?.startsWith('/book') || pathname?.startsWith('/admin');

    useEffect(() => {
        if (isFocusedFlow) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show button only after scrolling down 50px
            setIsVisible(currentScrollY > 50);

            // Determine direction to expand/shrink
            if (currentScrollY < 100) {
                setIsExpanded(false);
            } else if (currentScrollY > lastScrollY.current) {
                // Scrolling down -> Show "Let's Talk" (Expanded)
                setIsExpanded(true);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up -> Show "Back to top" (Shrunk)
                setIsExpanded(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFocusedFlow]);

    const handleClick = () => {
        if (isExpanded) {
            router.push('/book');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
                className={`${styles.dynamicButton} ${isExpanded ? styles.expanded : ''}`}
                onClick={handleClick}
                aria-label={isExpanded ? "Let's Talk" : "Back to top"}
            >
                <div className={styles.iconWrapper}>
                    {/* Arrow Up Icon */}
                    <svg className={`${styles.icon} ${styles.iconUp}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                    
                    {/* Message / Let's talk Icon */}
                    <svg className={`${styles.icon} ${styles.iconTalk}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div className={styles.textWrapper}>
                    LET&apos;S TALK
                </div>
            </button>
        </div>
    );
}
