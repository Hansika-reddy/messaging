import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from '../styles/Chat.module.css';

let socket;

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    socket = io('http://localhost:4000'); // Your backend URL

    // Listen for incoming messages
    socket.on('message', (incomingMessage) => {
      const { chatId, text, sender, time } = incomingMessage;
      setMessages((prevMessages) => ({
        ...prevMessages,
        [chatId]: [...(prevMessages[chatId] || []), { text, sender, time }],
      }));
    });

    // Fetch contacts and groups from the backend (mocked here)
    const fetchedContacts = [
      { name: 'Friends', lastMessage: 'Hello', time: '8:12 PM' },
      { name: 'Family', lastMessage: 'Enjoyy', time: '8:07 PM' },
      { name: 'Work', lastMessage: 'Work hard', time: '8:03 PM' },
      { name: 'Alice', lastMessage: 'How are you?', time: '7:50 PM' },
      { name: 'Bob', lastMessage: 'Got it!', time: '7:35 PM' },
      { name: 'Charlie', lastMessage: 'Sure, let\'s do that.', time: '7:20 PM' },
      { name: 'David', lastMessage: 'I\'ll call you back.', time: '7:00 PM' },
      { name: 'Eve', lastMessage: 'Great work!', time: '6:45 PM' },
      { name: 'Frank', lastMessage: 'Can you help me with this?', time: '6:30 PM' },
      { name: 'Grace', lastMessage: 'I have the documents.', time: '6:15 PM' },
      { name: 'Henry', lastMessage: 'Sounds good.', time: '6:00 PM' },
      { name: 'Isabel', lastMessage: 'Let\'s meet at 4.', time: '5:45 PM' },
      { name: 'Jack', lastMessage: 'That was awesome!', time: '5:30 PM' },
      { name: 'Katherine', lastMessage: 'Talk to you soon.', time: '5:15 PM' },
      { name: 'Liam', lastMessage: 'See you tomorrow.', time: '5:00 PM' }
    ];
    setContacts(fetchedContacts);
    setFilteredContacts(fetchedContacts);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Filter contacts based on search input
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedChat) {
      const newMessage = { 
        chatId: selectedChat.name, 
        text: message, 
        sender: 'me', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };

      // Save the message to the chat's messages
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat.name]: [...(prevMessages[selectedChat.name] || []), newMessage],
      }));

      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar Section */}
      <div className={styles.sidebar}>
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.filterOptions}>
          <button className={styles.filterButton}>All</button>
          <button className={styles.filterButton}>Unread</button>
          <button className={styles.filterButton}>Groups</button>
        </div>
        <ul className={styles.contactList}>
          {filteredContacts.map((contact, index) => (
            <li
              key={index}
              onClick={() => handleChatSelect(contact)}
              className={styles.contact}
            >
              <div className={styles.contactInfo}>
                <span className={styles.contactName}>{contact.name}</span>
                <span className={styles.lastMessage}>{contact.lastMessage}</span>
              </div>
              <span className={styles.contactTime}>{contact.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className={styles.chatArea}>
        {selectedChat && (
          <>
            <div className={styles.chatHeader}>
              <h2>{selectedChat.name}</h2>
            </div>
            <div className={styles.messages}>
              {(messages[selectedChat.name] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    msg.sender === 'me' ? styles.sent : styles.received
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={styles.messageTime}>{msg.time}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className={styles.form}>
              <button type="button" className={styles.attachmentButton}>+</button>
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.sendButton}>Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
