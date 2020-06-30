import React, { useState } from 'react';
import Faq from '../component/Faq';
import '../component/style.css';
import SectionHeader from '../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader';
const FAQ = () => {
  const [faqs, setfaqs] = useState([
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      open: false
    },
  ]);

  const toggleFAQ = index => {
    setfaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }


  return (
    <div>
      <SectionHeader
                title="FAQ"
                desc="Please find the question and corresponding answer"
            />
      <div className="faqs">
        {faqs.map((faq, i) => (
          <Faq faq={faq} index={i} toggleFAQ={toggleFAQ}/>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
