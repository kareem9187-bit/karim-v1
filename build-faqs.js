const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/client-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Refactor FAQs
const faqStart = '<div className="contact-faq">';
const faqEnd = '</div>\n  \n      <div className="socials">';
const faqBlock = content.substring(content.indexOf(faqStart), content.indexOf(faqEnd));

if (faqBlock) {
  const newFaqBlock = `<div className="contact-faq">
      {(faqsData || []).filter((f: any) => f.active).map((faq: any) => (
        <div key={faq.id} className="faq-item">
          <div className="faq-q" data-en={faq.question} data-ar={faq.questionAr || faq.question}>{faq.question}</div>
          <div className="faq-a" data-en={faq.answer} data-ar={faq.answerAr || faq.answer}>{faq.answer}</div>
        </div>
      ))}
    `;
  content = content.replace(faqBlock, newFaqBlock);
}

// Refactor Socials
const socialsStart = '<div className="socials">';
const socialsEnd = '</div>\n    </div>\n  </section>';
const socialsBlock = content.substring(content.indexOf(socialsStart), content.indexOf(socialsEnd) + '</div>'.length);

if (socialsBlock && !socialsBlock.includes('socialData.map')) {
  const newSocialsBlock = `<div className="socials">
      {(socialData || []).filter((s: any) => s.active).map((social: any) => (
        <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="soc" aria-label={social.platform}>
          {social.icon ? (
            <div dangerouslySetInnerHTML={{ __html: social.icon }} />
          ) : (
            <span>{social.platform}</span>
          )}
        </a>
      ))}
    </div>`;
  content = content.replace(socialsBlock, newSocialsBlock);
}

fs.writeFileSync(file, content);
console.log('Successfully refactored FAQs and Socials');
