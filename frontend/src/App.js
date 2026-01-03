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
        {/* Intro Section */}
        <section className="intro">
          <h2>Manage Your Contacts Seamlessly</h2>
          <p>
            A simple and secure MERN-based contact manager to store, organize,
            and access your contacts anytime.
          </p>
        </section>

        {/* Contact Form */}
        <ContactForm refresh={fetchContacts} />

        {/* Contact List */}
        <ContactList contacts={contacts} />
      </main>
    </>
  );
}

export default App;
