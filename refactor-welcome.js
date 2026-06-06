const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add welcomeChaptersData to props
if (!content.includes('welcomeChaptersData,')) {
  content = content.replace(
    'heroData,',
    'heroData,\n    welcomeChaptersData,'
  );
}

if (!content.includes('welcomeChaptersData: any')) {
  content = content.replace(
    'heroData: any,',
    'heroData: any,\n    welcomeChaptersData: any,'
  );
}

// 2. Refactor Welcome Chapters section
const welcomeStart = `{/* Chapter 0 — INTRO */}`;
const welcomeEnd = `    {/* Welcome Text Overlay */}`;
const welcomeSection = content.substring(content.indexOf(welcomeStart), content.indexOf(welcomeEnd));

if (welcomeSection && !welcomeSection.includes('welcomeChaptersData.map')) {
  const newWelcomeSection = `    {/* Chapters rendered from database */}
    {(welcomeChaptersData || []).map((chapter: any, i: number) => {
      if (chapter.isIntro) {
        return (
          <div key={chapter.id} className={\`chapter chapter-intro \${i === 0 ? 'active' : ''}\`} data-chapter={chapter.order}>
            <div className="chapter-inner">
              <div className="intro-logo">
                <img src="/images/karim.jpg" alt="Karim" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <h1 className="intro-title" data-en={chapter.phrase} data-ar={chapter.phraseAr || chapter.phrase} dangerouslySetInnerHTML={{ __html: chapter.phrase }}></h1>
              {chapter.subText && <p className="intro-sub" data-en={chapter.subText} data-ar={chapter.subTextAr || chapter.subText}>{chapter.subText}</p>}
            </div>
          </div>
        );
      }
      
      if (chapter.isFinal) {
        return (
          <div key={chapter.id} className="chapter chapter-outro" data-chapter={chapter.order}>
            <div className="chapter-inner">
              <div className="chap-label">
                <div className="chap-label-line"></div>
                <span data-en={chapter.label} data-ar={chapter.labelAr || chapter.label}>{chapter.label}</span>
                <div className="chap-label-line"></div>
              </div>
              <h2 className="outro-title" data-en={chapter.phrase} data-ar={chapter.phraseAr || chapter.phrase} dangerouslySetInnerHTML={{ __html: chapter.phrase }}></h2>
            </div>
          </div>
        );
      }
      
      return (
        <div key={chapter.id} className="chapter" data-chapter={chapter.order}>
          <div className="chap-glow"></div>
          <div className="chapter-inner">
            <div className="chap-label">
              <div className="chap-label-line"></div>
              <span data-en={chapter.label} data-ar={chapter.labelAr || chapter.label}>{chapter.label}</span>
              <div className="chap-label-line"></div>
            </div>
            <div className="chap-number">
              <span className="num-counter" data-target={chapter.number}>0</span>
              {chapter.suffix && <span className="num-suffix" data-en={chapter.suffix} data-ar={chapter.suffixAr || chapter.suffix}>{chapter.suffix}</span>}
            </div>
            <p className="chap-phrase" data-en={chapter.phrase} data-ar={chapter.phraseAr || chapter.phrase} dangerouslySetInnerHTML={{ __html: chapter.phrase }}></p>
            {chapter.subText && <div className="chap-sub" data-en={chapter.subText} data-ar={chapter.subTextAr || chapter.subText}>{chapter.subText}</div>}
          </div>
        </div>
      );
    })}
`;
  content = content.replace(welcomeSection, newWelcomeSection);
}

fs.writeFileSync(file, content);
console.log('Successfully refactored Welcome Chapters section');
