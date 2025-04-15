import { useState } from 'react';
import './App.css';
import Markdown from 'marked-react';
import Lowlight from 'react-lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import rust from 'highlight.js/lib/languages/rust';
import 'highlight.js/styles/default.css';

Lowlight.registerLanguage('js', javascript);
Lowlight.registerLanguage('javascript', javascript);
Lowlight.registerLanguage('rust', rust);

const renderer = {
  code(snippet, lang) {
    return <Lowlight key={this.elementId} language={lang} value={snippet} />;
  },
};

// Which programming language is best for creating web servers?
// Can you give me a very brief example of a node server?

function App() {
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);

  return (
    <>
      <output>
        {messages.length > 0 &&
          messages.map((m) => (
            <div key={m.id} className={`chat text-start ${m.role === 'model' ? 'chat-start' : 'chat-end'}`}>
              <div className='chat-bubble'>
                <Markdown value={m.text} renderer={renderer} />
              </div>
            </div>
          ))}
      </output>
      <form onSubmit={() => alert('HANDLE SUBMIT')}>
        <textarea
          type='text'
          placeholder='State your question...'
          className='textarea textarea-primary'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className='btn btn-active btn-primary' disabled={pending}>
          {pending ? <span className='loading loading-spinner'></span> : <span>Send</span>}
        </button>
      </form>
    </>
  );
}

export default App;
