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
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  const count3Up = () => {
    setCount((c) => c + 1);
    console.log('HERE IS COUNT: ', count);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!message) return;

  //   setPending(true);

  //   try {
  //     setMessages((prev) => [...prev, { text: message, role: 'user', id: crypto.randomUUID() }]);

  //     const queryString = chatId ? `?chatId=${chatId}` : '';
  //     const res = await fetch(`${import.meta.env.VITE_API_URL}/chats${queryString}`, {
  //       method: 'POST',
  //       body: JSON.stringify({ message }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  //     // console.log({ data });
  //     setMessages((prev) => [...prev, { text: data.aiResponse, role: 'model', id: crypto.randomUUID() }]);
  //     setChatId(data.chatId);
  //     setMessage('');
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setPending(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    setPending(true);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text: message }]);
    try {
      const idQuery = chatId ? `?chatId=${chatId}` : '';
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chats${idQuery}`, {
        method: 'POST',
        body: JSON.stringify({ message, stream: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let responseText = '';

      const responseId = crypto.randomUUID();
      setMessages((m) => [...m, { id: responseId, role: 'model', text: responseText }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (chunk.startsWith('data: chatId: ')) {
          setChatId(chunk.replace('data: chatId: ', ''));
        } else {
          const text = chunk.replaceAll('\ndata: ', '').replaceAll('data:', '');
          responseText += text;
        }
        console.log(chunk);

        setMessages((m) => m.map((msg) => (msg.id === responseId ? { ...msg, text: responseText } : msg)));
      }

      setMessage('');
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

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
      <form onSubmit={handleSubmit} inert={pending}>
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
      <button onClick={count3Up}>{count}</button>
    </>
  );
}

export default App;
