import { useState } from "react";
import { api } from "../services/api";

function ContactForm({ refresh }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Email check
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Phone check (10 digits only)
  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name) {
      setError("Name is required");
      return;
    }

    if (!isValidPhone(form.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (form.email && !isValidEmail(form.email)) {
      setError("Enter a valid email");
      return;
    }

    await api.post("/contacts", form);

    setForm({
      name: "",
      email: "",
      phone: "",
      message: ""
    });

    setSuccess("Contact saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
    refresh();
  };

  return (
    <div className="card">
      <h3>Add Contact</h3>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={submitHandler}>

        <input
          placeholder="Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          type="submit"
          disabled={
            !form.name ||
            !isValidPhone(form.phone) ||
            (form.email && !isValidEmail(form.email))
          }
        >
          Save Contact
        </button>

      </form>
    </div>
  );
}

export default ContactForm;  