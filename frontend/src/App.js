import { useEffect, useState } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { api } from "./services/api";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <Header />

      <main className="container">
        <ContactForm refresh={fetchContacts} />
        <ContactList contacts={contacts} />
      </main>
    </>
  );
}

export default App;
